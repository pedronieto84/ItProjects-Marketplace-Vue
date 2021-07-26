<template>
  <b-container>
    <h1>EL MEU COMPTE</h1>
    <div class="mb-3">
      <a href="" @click="desconnexio">Desconnexió</a>
    </div>

    <b-tabs content-class="mt-3">
      <b-tab title="Les meves dades" active>
        <b-form-group
          class="text-left"
          label="Nom"
          label-for="userName"
          :invalid-feedback="invalidFeedbackName"
          :state="stateName"
        >
          <b-form-input
            id="userName"
            v-model="name"
            :state="stateName"
            trim
            :disabled="!editMode"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          class="text-left"
          label="Email"
          label-for="email"
          :invalid-feedback="invalidFeedbackEmail"
          :state="stateEmail"
        >
          <b-form-input
            id="email"
            v-model="email"
            :state="stateEmail"
            trim
            :disabled="!editMode"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          class="text-left"
          label="Contrasenya"
          label-for="password"
          :invalid-feedback="invalidFeedbackPassword"
          :state="statePassword"
        >
          <b-form-input
            id="password"
            type="password"
            v-model="password"
            :state="statePassword"
            trim
            :disabled="!editMode"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          class="text-left"
          label="Confirmar contrasenya"
          label-for="cpassword"
          :invalid-feedback="invalidFeedbackCPassword"
          :state="stateCPassword"
        >
          <b-form-input
            id="cpassword"
            type="password"
            v-model="cpassword"
            :state="stateCPassword"
            trim
            :disabled="!editMode"
          ></b-form-input>
        </b-form-group>

        <b-form-group class="text-left" label="Tipus d'organització">
          <b-form-select
            v-model="organizationType"
            :options="organizations"
            :disabled="!editMode"
          ></b-form-select>
        </b-form-group>
        <b-row class="mt-4 mb-4" align-v="center" align-h="center">
          <b-button variant="primary" v-if="!editMode" @click="editMode = true">
            Editar
          </b-button>
          <b-button
            class="mr-1"
            variant="secondary"
            v-if="editMode"
            @click="cancelEdit"
          >
            <span>Cancel·lar</span>
          </b-button>
          <b-button
            class="ml-1"
            variant="primary"
            v-if="editMode"
            :disabled="disableSend"
            @click="updateUser"
          >
            <span
              class="spinner-border spinner-border-sm"
              v-if="sending === true"
            ></span>
            <span v-else>Actualitzar</span>
          </b-button>
        </b-row>
      </b-tab>

      <b-tab title="Els meus projectes">
        <!-- <b-row class="mt-4 mb-4" align-v="center" align-h="center">
          <b-button
            class="btn-sm"
            variant="primary"
            v-if="!editMode"
            @click="editMode = true"
          >
            <span class="material-icons">mode_edit</span>
          </b-button>
          <b-button
            class="btn-sm mr-1"
            variant="danger"
            v-if="editMode"
            @click="cancelEdit"
          >
            <span class="material-icons">cancel</span>
          </b-button>
          <b-button
            class="btn-sm ml-1"
            variant="primary"
            v-if="editMode"
            :disabled="disableSend"
            @click="updateUser"
          >
            <span
              class="spinner-border spinner-border-sm"
              v-if="sending === true"
            ></span>
            <span v-else class="material-icons">check</span>
          </b-button>
        </b-row> -->
      </b-tab>
    </b-tabs>
  </b-container>
</template>

<script>
import axios from "axios";

export default {
  name: "MyAccount",

  data() {
    return {
      userId: "",
      name: "",
      email: "",
      password: "",
      cpassword: "",
      organizationType: "1",
      organizations: [
        { value: "1", text: "Empresa pública" },
        { value: "2", text: "3er sector" },
        { value: "3", text: "Empresa privada" },
        { value: "4", text: "Altres" },
      ],
      editMode: false,
      disableSend: true,
      sending: false,
    };
  },

  methods: {
    cancelEdit() {
      const user = this.$store.getters.getUser;
      this.userId = user.userId;
      this.name = user.name;
      this.email = user.email;
      this.organizationType = user.typeOfInstitution;
      this.password = "";
      this.cpassword = "";
      this.editMode = false;
      this.disableSend = true;
    },

    canISend() {
      let pucEnviar = true;
      this.disableSend = true;

      if (this.stateName === false) {
        pucEnviar = false;
      }
      if (this.stateEmail === false) {
        pucEnviar = false;
      }
      if (this.statePassword === false) {
        pucEnviar = false;
      }
      if (this.stateCPassword === false) {
        pucEnviar = false;
      }

      if (pucEnviar) {
        const user = this.$store.getters.getUser;
        if (
          this.name !== user.name ||
          this.email !== user.email ||
          this.organizationType !== user.typeOfInstitution ||
          this.password !== ""
        ) {
          this.disableSend = false;
        }
      }
    },

    updateUser() {
      const aixo = this;
      const baseURL = this.$store.getters.getBaseURL;
      const dades = {
        userId: this.userId,
        name: this.name,
        email: this.email,
        password: this.password,
        typeOfInstitution: this.organizationType,
      };
      this.disableSend = true;
      this.editMode = false;

      if (this.password === "") {
        delete dades.password;
      }

      axios({
        method: "post",
        url: baseURL + "updateUser",
        data: dades,
      })
        .then(function (response) {
          if (response.status === 200) {
            const user = aixo.$store.getters.getUser;
            user.name = aixo.name;
            user.email = aixo.email;
            user.typeOfInstitution = aixo.organizationType;
            aixo.$store.commit("setUser", ["object", user]);

            aixo.password = "";
            aixo.cpassword = "";
            aixo.editMode = false;
            aixo.disableSend = true;

            aixo.$bvToast.toast("S'ha actualitzat les dades d'usuari", {
              title: "Èxit",
              autoHideDelay: 5000,
            });
          } else {
            aixo.$bvToast.toast("Errada en el procés d'actualització", {
              title: "Fallada",
              autoHideDelay: 5000,
            });
          }
          aixo.sending = false;
        })
        .catch(function (error) {
          aixo.$bvToast.toast("S'ha produït un error a la petició", {
            title: "Fallada",
            autoHideDelay: 5000,
          });
          aixo.sending = false;
          console.log(error);
        });
    },

    desconnexio() {
      sessionStorage.removeItem("itAcademyProjects-storedUser");
      this.$store.commit("setUser", ["logout", null]);
      this.$router.push("/");
    }
  },

  computed: {
    stateName() {
      if (!this.editMode) {
        return null;
      }
      return this.name.length > 0 && this.name.length <= 20;
    },
    invalidFeedbackName() {
      if (this.name.length == 0) {
        return "Camp obligatori";
      } else if (this.name.length > 20) {
        return "La longitut màxima del nom és de 20 caràcters";
      }
      return "";
    },
    stateEmail() {
      const pattern =
        /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
      if (!this.editMode) {
        return null;
      }
      if (this.email.match(pattern) === null) {
        return false;
      } else {
        return true;
      }
    },
    invalidFeedbackEmail() {
      const pattern =
        /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
      if (this.email.match(pattern) === null) {
        return "Introduïr adreça email vàlida";
      }

      return "";
    },
    statePassword() {
      const pattern = /^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,10}$/;
      if (!this.editMode) {
        return null;
      }
      if (this.password.length > 0) {
        if (this.password.match(pattern) === null) {
          return false;
        } else {
          return true;
        }
      } else {
        return null;
      }
    },
    invalidFeedbackPassword() {
      const pattern = /^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,10}$/;

      if (this.password.length > 0 && this.password.match(pattern) === null) {
        return "La contrasenya ha de tenir entre 5 y 10 caràcters i al menys un símbol";
      }

      return "";
    },
    stateCPassword() {
      if (!this.editMode || this.password.length === 0) {
        return null;
      }
      if (this.cpassword === this.password) {
        return true;
      } else {
        return false;
      }
    },
    invalidFeedbackCPassword() {
      if (this.cpassword !== this.password) {
        return "Les contrasenyes han de coincidir";
      }

      return "";
    },
  },

  watch: {
    name() {
      if (this.editMode) {
        this.canISend();
      }
    },

    email() {
      if (this.editMode) {
        this.canISend();
      }
    },

    organizationType() {
      if (this.editMode) {
        this.canISend();
      }
    },

    password() {
      if (this.editMode) {
        this.canISend();
      }
    },

    cpassword() {
      if (this.editMode) {
        this.canISend();
      }
    },
  },

  created() {
    const user = this.$store.getters.getUser;

    if (user && user.userId === "") {
      this.$router.push("/");
    }

    this.userId = user.userId;
    this.name = user.name;
    this.email = user.email;
    this.organizationType = user.typeOfInstitution;
    this.password = "";
    this.cpassword = "";
  },

  components: {},
};
</script>
