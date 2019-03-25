<template>
  <div class="container">
    <h3>Nueva Medici&oacute;n</h3>
    <MsgBox />
    <form @submit.prevent="add">
      <div>
        <label for="valor">Valor:</label>
        <input
          id="valor"
          v-select-on-focus
          v-model.number="med.valor"
          min="0"
          max="900"
          required="true"
        />
      </div>
      <div v-if="customDate">
        <label>Fecha:</label>
        <SelectorFecha v-on:change="setCustomDate" />
      </div>
      <div v-else>
        <span>{{ today }}</span> -
        <a href="#" @click.prevent="changeDate(true)">Cambiar fecha</a>
      </div>
      <div>
        <label for="nota">Nota</label>
        <textarea
          id="nota"
          v-model="med.nota"
          placeholder="Agregar nota"
        ></textarea>
      </div>
      <button type="submit" class="btn btn-primary btn-lg">Agregar</button>
      <router-link to="/" class="btn btn-default btn-lg">Cancelar</router-link>
    </form>
  </div>
</template>

<script>
import model from "../models/Medicion";
import SelectorFecha from "./SelectorFecha";
import MsgBox from "./MsgBox";
import Moment from "moment";
import selectOnFocus from "vue-select-on-focus";

export default {
  name: "MedicionNueva",
  directives: { selectOnFocus },
  components: { SelectorFecha, MsgBox },
  data() {
    return {
      med: Object.assign({}, model),
      customDate: null
    };
  },
  computed: {
    today: function() {
      return Moment().format("DD/MM/YYYY HH:NN");
    }
  },
  mounted() {
    document.querySelector("#valor").focus();
  },
  methods: {
    reset: function() {
      this.med = Object.assign({}, model);
      this.customDate = null;
    },
    changeDate: function(create = true) {
      this.customDate = create;
    },
    setCustomDate: function(newDate) {
      if (newDate) this.med.fecha = newDate.valueOf();
      this.changeDate(false);
    },
    add: function() {
      let med = this.med;
      //   if (this.customDate) { med.fecha = this.customDate; }
      this.$store.dispatch("addDoc", med);
      this.reset();
      this.$router.push("/");
    }
  }
};
</script>