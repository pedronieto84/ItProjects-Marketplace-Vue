<template>
  <b-container class="p-3">
    <h1>LOGIN</h1>
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
        autofocus
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
      ></b-form-input>
    </b-form-group>

    <b-button variant="primary" :disabled="disableSend" @click="login"
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
  name: "Login",

  data() {
    return {
      email: "",
      password: "",
      disableAll: false,
      disableSend: true,
      sending: false,
    };
  },

  computed: {
    stateEmail() {
      const pattern =
        /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
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
  },

  watch: {
    stateEmail(value) {
      this.activar(value, this.statePassword);
    },
    statePassword(value) {
      this.activar(this.stateEmail, value);
    },
  },

  methods: {
    activar(okEmail, okPass) {
      if (okEmail && okPass) {
        this.disableSend = false;
      } else {
        this.disableSend = true;
      }
    },

    login() {
      const aixo = this;
      const baseURL = this.$store.getters.getBaseURL;
      this.disableSend = true;
      this.disableAll = true;
      this.sending = true;

      axios({
        method: "post",
        url: baseURL + "login",
        data: {
          email: this.email,
          password: this.password,
        },
      })
        .then(function (response) {
          if (response.data.user.userId != undefined) {
            aixo.$store.commit("setUser", ["object", response.data.user]);
            aixo.$router.push("/");
          } else {
            aixo.password = "";
            aixo.$bvToast.toast("Usuari i/o contrasenya invàlids", {
              title: "Fallada",
              autoHideDelay: 5000,
            });
          }
          aixo.sending = false;
          aixo.disableSend = false;
          aixo.disableAll = false;
        })
        .catch(function (error) {
          aixo.$bvToast.toast("S'ha produït un error a la petició", {
            title: "Fallada",
            autoHideDelay: 5000,
          });
          aixo.password = "";
          aixo.sending = false;
          aixo.disableSend = false;
          aixo.disableAll = false;
          console.log(error);
        });
    },
  },

  created() {
    const user = this.$store.getters.getUser;
    if (user.userId !== "") {
      this.$router.push("/");
    }
  },
};
</script>