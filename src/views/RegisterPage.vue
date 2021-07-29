<template>
  <b-container class="p-3">
    <h1>ALTA USUARI</h1>
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
        autofocus
        @keydown="entrada($event)"
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
        @keydown="entrada($event)"
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
        @keydown="entrada($event)"
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
        @keydown="entrada($event)"
      ></b-form-input>
    </b-form-group>

    <b-form-group class="text-left" label="Tipus d'organització">
      <b-form-select
        v-model="organizationType"
        :options="organizations"
      ></b-form-select>
    </b-form-group>
    <b-button variant="secondary" class="mr-2" @click="cancela"
      >Cancel·lar</b-button
    >
    <b-button variant="primary" :disabled="disableSend" @click="altaUsuari"
      ><span
        class="spinner-border spinner-border-sm"
        v-if="sending === true"
      ></span
      ><span v-else>Enviar</span></b-button
    >
  </b-container>
</template>

<script>
import axios from "axios";

export default {
  name: "Register",

  data() {
    return {
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
      disableAll: false,
      disableSend: true,
      sending: false,
      firstName: true,
      firstEmail: true,
      firstPassword: true,
      firstCPassword: true,
    };
  },

  computed: {
    stateName() {
      if (this.firstName) {
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
      if (this.firstEmail) {
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
      if (this.firstPassword) {
        return null;
      }
      if (this.password.match(pattern) === null) {
        return false;
      } else {
        return true;
      }
    },
    invalidFeedbackPassword() {
      const pattern = /^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,10}$/;
      if (this.password.match(pattern) === null) {
        return "La contrasenya ha de tenir entre 5 y 10 caràcters i al menys un símbol";
      }
      return "";
    },
    stateCPassword() {
      if (this.firstCPassword) {
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
    stateName(value) {
      this.activar(
        value,
        this.stateEmail,
        this.statePassword,
        this.stateCPassword
      );
    },
    stateEmail(value) {
      this.activar(
        this.stateName,
        value,
        this.statePassword,
        this.stateCPassword
      );
    },
    statePassword(value) {
      this.activar(this.stateName, this.stateEmail, value, this.stateCPassword);
    },
    stateCPassword(value) {
      this.activar(this.stateName, this.stateEmail, this.statePassword, value);
    },
  },

  methods: {
    entrada(event) {
      switch (event.target.id) {
        case "userName":
          this.firstName = false;
          break;
        case "email":
          this.firstEmail = false;
          break;
        case "password":
          this.firstPassword = false;
          this.firstCPassword = false;
          break;
        case "cpassword":
          this.firstCPassword = false;
          break;
      }
    },
    activar(okName, okEmail, okPass, okCPass) {
      if (okName && okEmail && okPass && okCPass) {
        this.disableSend = false;
      } else {
        this.disableSend = true;
      }
    },
    cancela() {
      this.name = "";
      this.email = "";
      this.password = "";
      this.cpassword = "";
      this.organizationType = "1";
      this.disableSend = true;
      this.disableAll = false;
      this.firstName = true;
      this.firstEmail = true;
      this.firstPassword = true;
      this.firstCPassword = true;
    },
    altaUsuari() {
      const aixo = this;
      const baseURL = this.$store.getters.getBaseURL;
      this.disableSend = true;
      this.disableAll = true;
      this.sending = true;
      this.firstName = true;
      this.firstEmail = true;
      this.firstPassword = true;
      this.firstCPassword = true;

      axios({
        method: "post",
        url: baseURL + "createUser",
        data: {
          name: this.name,
          email: this.email,
          password: this.password,
          typeOfInstitution: this.organizationType,
        },
      })
        .then(function (response) {
          aixo.sending = false;
          aixo.cancela();
          if (response.data.userId != undefined) {
            aixo.$bvToast.toast("S'ha donat d'alta l'usuari", {
              variant: "success",
              toaster: "b-toaster-top-center",
              solid: true,
              title: "Èxit",
              autoHideDelay: 3000,
            });

            setTimeout(() => {
              let user = {};
              user.userId = response.data.userId;
              user.name = response.data.name;
              user.email = response.data.email;
              user.admin = false;
              user.projectsPublished = [];
              user.typeOfInstitution = response.data.typeOfInstitution;
              user.verified = false;
              aixo.$store.commit("setUser", ["object", user]);
              aixo.$router.push("/crear-projecte");

            }, 3000);
          } else {
            aixo.$bvToast.toast("Errada en el procés d'alta d'usuari", {
              variant: "warning",
              toaster: "b-toaster-top-center",
              solid: true,
              title: "Fallada",
              autoHideDelay: 5000,
            });
          }
        })
        .catch(function (error) {
          aixo.$bvToast.toast("S'ha produït un error a la petició", {
            variant: "warning",
            toaster: "b-toaster-top-center",
            solid: true,
            title: "Fallada",
            autoHideDelay: 5000,
          });
          aixo.sending = false;
          aixo.disableSend = false;
          aixo.disableAll = false;
          console.log(error);
        });
    },
  },
};
</script>
