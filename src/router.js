import Vue from "vue";
import VueRouter from "vue-router";

import Mediciones from "./components/Mediciones";
import Medicion from "./components/Medicion";
import MedicionNueva from "./components/MedicionNueva";

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    { path: '/', component: Mediciones },
    { path: "/nueva", component: MedicionNueva },
    { name: 'detalle', path: "/medicion/:id", component: Medicion },
  ]
});