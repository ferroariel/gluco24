<template>
  <div class="navbar navbar-inverse">      
  <button v-if="currentUser" @click="signOut">Salir</button>
  <button v-else @click="signIn">Ingresar</button>
    <router-link to="/nueva" class="btn btn-primary btn-lg pull-right">Nueva</router-link>
  </div>
</template>

<script>
import { mapState } from "vuex";
// const fb = require("../providers/firebase");
export default {
  name: 'Menu',
  computed: mapState( ['currentUser'] ),
  methods: {
        signIn() { this.$store.dispatch("signIn") },
    signOut() { this.$store.dispatch("signOut") },
  },
};
</script>