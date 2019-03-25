<template>
  <div class="container">
    <h3>Registro Medicion</h3>
<MsgBox />
<div v-if="med">
<div>
<label for="valor">Valor:</label>
    <input type="number" 
  id="valor"
 v-model="med.valor" 
   readonly="true"
/>
</div>
<div >
  <label>Fecha:</label>
    <SelectorFecha :start="toMoment(med.fecha)" readonly="true" />
</div>
<div>
  <label for="nota">Nota</label>
<textarea
  id="nota"
v-model="med.nota"
      readonly="true"
></textarea>
</div>
  <div>
<router-link v-if="prev" :to="{ name: 'detalle', params: { id: prev.id } }">Anterior</router-link>
  <router-link v-if="next" :to="{ name: 'detalle', params: { id: next.id } }">Siguiente</router-link>
</div>
</div>
  </div>
</template>

<script>
import SelectorFecha from "./SelectorFecha";
import MsgBox from "./MsgBox";
import { mapState } from "vuex";
import Moment from "moment";
export default {
  name: 'Medicion',
  components: { SelectorFecha, MsgBox },
  data() {
    return {
    med: null
}
  },
  computed: {
    ...mapState( [ 'meds', 'count' ] ),
    next: function() {
    const index = this.meds.findIndex( m => m.id == this.$route.params.id );
  if (!this.med || index >= (this.count-1))
  return null;
    return this.meds[ index+1 ];
},
    prev: function() { 
    const index = this.meds.findIndex( m => m.id == this.$route.params.id );
  if (!this.med || index < 0 )
  return null;
    return this.meds[ index-1 ];
 },
},
mounted() {
    this.isMed();
},
  watch: {
    '$route' () {
    this.isMed();
}
  },
  methods: {
    isMed: function() {
    const med = this.meds.find( m => m.id == this.$route.params.id );
 if (typeof med === undefined)
this.$store.commit("setMsg", { type: "danger", text: "No se encontro la medicion" } );
 else 
    this.med = med;
    },
      toMoment: function(value) { return Moment(value) },
},
};
</script>