<template>
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
          <b-button variant="danger" size="sm" @click="deleteProject(row.item)"
            ><span class="material-icons">cancel</span></b-button
          >
        </b-button-group>
      </template>
    </b-table>

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
  </b-tab>
</template>

<script>
import axios from "axios";
import { formatDate } from "@/scripts/utilities.js";
import { literalState } from "@/scripts/utilities.js";

export default {
  name: "projectList",

  data() {
    return {
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
      projects: [],
    };
  },

  methods: {
    deleteProject(row) {
      const aixo = this;
      const baseURL = this.$store.getters.getBaseURL;
      const id = row.projectId;

      if (confirm("Desitja eliminar el projecte?")) {
        axios({
          method: "post",
          url: baseURL + "deleteProject",
          data: {
            projectId: id,
          },
        })
          .then(function (response) {
            if (response.status === 200) {
              for (let i = 0; i < aixo.projects.length; i++) {
                if (aixo.projects[i].projectId === id) {
                  aixo.projects.splice(i, 1);
                  break;
                }
              }
            } else {
              aixo.$bvToast.toast("Errada en eliminació del projecte", {
                variant: "warning",
                toaster: "b-toaster-top-center",
                title: "Fallada",
                autoHideDelay: 5000,
              });
            }
            aixo.sending = false;
          })
          .catch(function (error) {
            aixo.$bvToast.toast("S'ha produït un error a la petició", {
              variant: "warning",
              toaster: "b-toaster-top-center",
              title: "Fallada",
              autoHideDelay: 5000,
            });
            console.log(error);
          });

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
      const aixo = this;
      const baseURL = this.$store.getters.getBaseURL;
      const deadline = new Date(this.deadline).getTime();
      const id = this.projectId;

      axios({
        method: "post",
        url: baseURL + "updateProject",
        data: {
          projectId: this.projectId,
          title: this.title,
          deadline: deadline,
          bid: this.bid,
          state: this.state,
        },
      })
        .then(function (response) {
          if (response.status === 200) {
            for (let i = 0; i < aixo.projects.length; i++) {
              if (aixo.projects[i].projectId === id) {
                aixo.projects[i].title = aixo.title;
                aixo.projects[i].deadline = aixo.deadline;
                aixo.projects[i].bid = aixo.bid;
                aixo.projects[i].state = aixo.state;
                aixo.projects[i].stateLiteral = literalState(aixo.state);
                break;
              }
            }
            aixo.initEditProjectModal();
            aixo.$bvToast.toast("S'ha actualitzat el projecte", {
              variant: "success",
              toaster: "b-toaster-top-center",
              title: "Èxit",
              autoHideDelay: 5000,
            });
          } else {
            aixo.initEditProjectModal();
            aixo.$bvToast.toast("Errada en l'actualització del projecte", {
              variant: "warning",
              toaster: "b-toaster-top-center",
              title: "Fallada",
              autoHideDelay: 5000,
            });
          }
          aixo.sending = false;
        })
        .catch(function (error) {
          aixo.initEditProjectModal();
          aixo.$bvToast.toast("S'ha produït un error a la petició", {
            variant: "warning",
            toaster: "b-toaster-top-center",
            title: "Fallada",
            autoHideDelay: 5000,
          });
          aixo.sending = false;
          console.log(error);
        });

      this.updatingProject = true;
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
          this.stateLiteral = literalState(this.projects[i].state);
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

    setProjectData(projects) {
      this.projects = [];

      for (let project of projects) {
        let objecte = {};
        const dateP = new Date(project.publishedDate);
        const deadL = new Date(project.deadline);

        objecte.projectId = project.projectId;
        objecte.title = project.title;
        objecte.bid = project.bid;
        objecte.state = project.state;
        objecte.stateLiteral = literalState(project.state);
        objecte.publishedDate = formatDate(dateP);
        objecte.deadline = formatDate(deadL);

        this.projects.push(objecte);
      }
    },
  },

  computed: {
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
      if (this.deadline >= this.publishedDate) {
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

  props: {
    userId: String,
  },

  created() {
    const aixo = this;
    const baseURL = this.$store.getters.getBaseURL;

    axios({
      method: "get",
      url: baseURL + "getProjects",
      params: {
        userId: this.userId,
      },
    })
      .then(function (response) {
        if (response.status === 200) {
          aixo.setProjectData(response.data);
        } else {
          aixo.$bvToast.toast(
            "Errada en el procés de descàrrega de projectes",
            {
              variant: "warning",
              toaster: "b-toaster-top-center",
              title: "Fallada",
              autoHideDelay: 5000,
            }
          );
        }
        aixo.sending = false;
      })
      .catch(function (error) {
        aixo.$bvToast.toast("S'ha produït un error a la petició", {
          variant: "warning",
          toaster: "b-toaster-top-center",
          title: "Fallada",
          autoHideDelay: 5000,
        });
        console.log(error);
      });
  },
};
</script>
