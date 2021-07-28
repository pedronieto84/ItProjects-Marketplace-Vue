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
        <b-table
          id="taula"
          striped
          hover
          responsive
          :items="projects"
          :fields="fields"
          primary-key="projectId"
          show-empty
        >
          <template #empty>
            <h4>No hi ha projectes per mostrar</h4>
          </template>
          <template #cell(edition)="row">
            <b-button-group>
              <b-button
                variant="primary"
                size="sm"
                class="mr-2"
                @click="editProject(row.item)"
                ><span class="material-icons">mode_edit</span></b-button
              >
              <b-button
                variant="danger"
                size="sm"
                @click="deleteProject(row.item)"
                ><span class="material-icons">cancel</span></b-button
              >
            </b-button-group>
          </template>
        </b-table>
      </b-tab>

      <b-modal id="modal-edit-project" title="Editar projecte">
        <b-form-group
          label="Títol"
          label-for="title"
          :invalid-feedback="invalidFeedbackTitle"
          :state="stateTitle"
        >
          <b-form-input
            id="title"
            v-model="title"
            :state="stateTitle"
            trim
            autofocus
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Publicació" label-for="publishedDate">
          <b-form-input
            id="publishedDate"
            type="date"
            v-model="publishedDate"
            disabled
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="Entrega"
          label-for="deadline"
          :invalid-feedback="invalidFeedbackDeadline"
          :state="stateDeadline"
        >
          <b-form-input
            id="deadline"
            type="date"
            v-model="deadline"
            :state="stateDeadline"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="Oferta"
          label-for="bid"
          :invalid-feedback="invalidFeedbackBid"
          :state="stateBid"
        >
          <b-form-input
            id="bid"
            type="number"
            number
            v-model="bid"
            :state="stateBid"
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Estat" label-for="state">
          <b-form-select
            id="state"
            v-model="state"
            :options="stateOptions"
          ></b-form-select>
        </b-form-group>

        <template #modal-footer>
          <b-button size="sm" variant="secondary" @click="cancelEditProject"
            >Cancel·lar</b-button
          >
          <b-button
            size="sm"
            variant="primary"
            @click="updateProject"
            :disabled="disableSendProject"
            >Actualitzar</b-button
          >
        </template>
      </b-modal>
    </b-tabs>
  </b-container>
</template>

<script>
import axios from "axios";

export default {
  name: "MyAccount",

  data() {
    return {
      // Pestanya Les meves dades
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

      // Pestanya Els meus projectes
      projectId: "",
      title: "",
      publishedDate: "",
      deadline: "",
      bid: 0,
      state: "",
      stateOptions: [
        { value: "accepted", text: "Acceptat" },
        { value: "published", text: "Publicat" },
        { value: "refused", text: "Rebutjat" },
        { value: "doing", text: "En procés" },
        { value: "finished", text: "Finalitzat" },
      ],
      disableSendProject: true,
      updatingProject: false,

      fields: [
        {
          key: "title",
          label: "Títol",
          sortable: true,
          tdClass: "text-left",
        },
        {
          key: "publishedDate",
          label: "Publicació",
          sortable: true,
        },
        {
          key: "deadline",
          label: "Entrega",
          sortable: true,
        },
        {
          key: "bid",
          label: "Oferta",
          sortable: true,
          tdClass: "text-right",
        },
        {
          key: "stateLiteral",
          label: "Estat",
          sortable: true,
          tdClass: "text-left",
        },
        {
          key: "edition",
        },
      ],
      // projects: [],

      // Start Mockup
      projects: [
        {
          projectId: "projecte001",
          title: "ERP",
          publishedDate: "2021-03-01",
          deadline: "2021-11-15",
          bid: 750.55,
          state: "doing",
          stateLiteral: "En procés",
        },
        {
          projectId: "projecte002",
          title: "Autoedició",
          publishedDate: "2020-12-28",
          deadline: "2021-07-20",
          bid: 500,
          state: "finished",
          stateLiteral: "Finalitzat",
        },
        {
          projectId: "projecte003",
          title: "Escaneig d'imatges",
          publishedDate: "2021-07-04",
          deadline: "2022-02-28",
          bid: 0,
          state: "accepted",
          stateLiteral: "Acceptat",
        },
      ],
      // End mockup
    };
  },

  methods: {
    // Pestanya Les meves dades
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
    },

    // Pestanya Els meus projectes
    deleteProject(row) {
      const id = row.projectId;
      if (confirm("Desitja eliminar el projecte?")) {
        // Start mockup
        for (let i = 0; i < this.projects.length; i++) {
          if (this.projects[i].projectId === id) {
            this.projects.splice(i, 1);
            break;
          }
        }
        // End mockup
      }
    },

    canISendProject() {
      let pucEnviar = true;
      this.disableSendProject = true;

      if (this.stateTitle === false) {
        pucEnviar = false;
      }
      if (this.stateDeadline === false) {
        pucEnviar = false;
      }
      if (this.stateBid === false) {
        pucEnviar = false;
      }

      if (pucEnviar) {
        for (let i = 0; i < this.projects.length; i++) {
          if (this.projects[i].projectId === this.projectId) {
            if (
              this.title !== this.projects[i].title ||
              this.deadline !== this.projects[i].deadline ||
              this.bid !== this.projects[i].bid ||
              this.state !== this.projects[i].state
            ) {
              this.disableSendProject = false;
            }
            break;
          }
        }
      }
    },

    updateProject() {
      // Start mockup
      for (let i = 0; i < this.projects.length; i++) {
        if (this.projects[i].projectId === this.projectId) {
          this.projects[i].title = this.title;
          this.projects[i].deadline = this.deadline;
          this.projects[i].bid = this.bid;
          this.projects[i].state = this.state;
          switch(this.state) {
            case "accepted":
              this.projects[i].stateLiteral = "Acceptat";
              break;
            case "published":
              this.projects[i].stateLiteral = "Publicat";
              break;
            case "refused":
              this.projects[i].stateLiteral = "Rebutjat";
              break;
            case "doing":
              this.projects[i].stateLiteral = "En procés";
              break;
            case "finished":
              this.projects[i].stateLiteral = "Finalitzat";
              break;
          }
          break;
        }
      }
      // End mockup

      this.updatingProject = true;
      this.initEditProjectModal();
      this.$bvModal.hide("modal-edit-project");
    },

    cancelEditProject() {
      this.initEditProjectModal();
      this.$bvModal.hide("modal-edit-project");
    },

    editProject(row) {
      const id = row.projectId;

      for (let i = 0; i < this.projects.length; i++) {
        if (this.projects[i].projectId === id) {
          this.projectId = this.projects[i].projectId;
          this.title = this.projects[i].title;
          this.publishedDate = this.projects[i].publishedDate;
          this.deadline = this.projects[i].deadline;
          this.bid = this.projects[i].bid;
          this.state = this.projects[i].state;
          break;
        }
      }

      this.updatingProject = false;
      this.$bvModal.show("modal-edit-project");
    },

    initEditProjectModal() {
      this.projectId = "";
      this.title = "";
      this.publishedDate = "";
      this.deadline = "";
      this.bid = 0;
      this.state = "";
    },
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
    stateTitle() {
      if (this.updatingProject) {
        return true;
      }
      return this.title.length > 0;
    },
    invalidFeedbackTitle() {
      if (this.title.length === 0) {
        return "Camp obligatori";
      }
      return "";
    },
    stateDeadline() {
      if (this.updatingProject) {
        return true;
      }
      return this.deadline > this.publishedDate;
    },
    invalidFeedbackDeadline() {
      if (this.publishedDate > this.deadline) {
        return "La data d'entrega ha de ser posterior a la de publicació";
      }
      return "";
    },
    stateBid() {
      if (this.updatingProject) {
        return true;
      }
      return this.bid >= 0;
    },
    invalidFeedbackBid() {
      if (this.bid < 0) {
        return "La oferta ha de ser un nombre positiu";
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

    title() {
      this.canISendProject();
    },

    deadline() {
      this.canISendProject();
    },

    bid() {
      this.canISendProject();
    },

    state() {
      this.canISendProject();
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
