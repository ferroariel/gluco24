import Vue from "vue";
import Vuex from "vuex";

const fb = require("./providers/firebase");

Vue.use(Vuex);

// check for state of user on each refresh
fb.auth.onAuthStateChanged(user => {
  if (user) store.commit("setCurrentUser", user);
});

// realtime updates for meds collection
fb.meds.orderBy("fecha", "desc").onSnapshot(data => {
  store.commit("setMeds", data.docs);
  store.commit("setReady", true);
});

const store = new Vuex.Store({
  state: {
    meds: [],
    msg: null,
    ready: false,
    currentUser: null
  },
  getters: {
    meds(state) {
      return state.meds;
    },
    msg(state) {
      return state.msg;
    },
    ready(state) {
      return state.ready;
    },
    currentUser(state) {
      return state.currentUser;
    }
  },
  mutations: {
    setCurrentUser(state, user) {
      state.currentUser = user;
    },
    setReady(state, ready) {
      state.ready = ready;
    },
    setMeds(state, meds) {
      try {
        // I will not use the firestore api, I{ll use local array handling of a plain array of objects instead
        let m = [];
        meds.forEach(med => {
          m.push(Object.assign({}, { id: med.id, ...med.data() }));
        });
        state.meds = m;
      } catch (e) {
        store.commit("setMsg", { type: "danger", text: e });
      }
    },
    setMsg(state, m) {
      state.msg = m;
    }
  },
  actions: {
    signIn({ commit }) {
      fb.auth
        .signInWithPopup(fb.GoogleAuthProvider)
        .then(user => commit("setCurrentUser", user))
        .catch(err => commit("setMsg", { type: "warning", text: err.message }));
    },
    signOut({ commit }) {
      fb.auth
        .signOut()
        .then(() => commit("setCurrentUser", null))
        .catch(err => commit("setMsg", { type: "warning", text: err.message }));
    },
    addDoc({ commit }, payload) {
      try {
        const doc = fb.meds.add(payload);
        doc.then(() =>
          commit("setMsg", {
            type: "success",
            text: "Medici{on agregada correctamente"
          })
        );
        doc.catch(err => commit("setMsg", { type: "danger", text: err }));
      } catch (e) {
        commit("setMsg", { type: "danger", text: e });
      }
    },
    delDoc({ commit }, payload) {
      try {
        const doc = fb.meds.doc(payload.id);
        doc.delete();
        commit("setMsg", {
          type: "success",
          text: "Medici{on eliminada correctamente"
        });
      } catch (e) {
        commit("setMsg", { type: "danger", text: e });
      }
    }
  }
});

export default store;
