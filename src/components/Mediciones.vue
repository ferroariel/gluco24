<template>
  <div class="container">
    <h3>Mediciones ({{ count }})</h3>
  <MsgBox />
  <SelectorOrden @change="changeMedsSort" :sort="sort" :options="['fecha', 'valor']" />
<table>
<thead>
<tr>
<th>Valor</th>
<th>Fecha</th>
<th></th>
</tr>
</thead>
<tbody 
v-bind:key="index" 
v-for="(m, index) in sortedMeds"
  track-by="m.id">
<tr :class="trClass(m.fecha)">
<td><router-link :to="{ name: 'detalle', params:{id: m.id } }">{{ m.valor }}</router-link></td>
<td>{{ m.fecha | humanized }}</td>
<td><a href="#" @click.prevent="deleteDoc(m.id)">borrar</a></td>
</tr>
</tbody>
</table>
  </div>
</template>

<script>	
import { mapState } from "vuex";
import MsgBox from "./MsgBox";
import SelectorOrden from "./SelectorOrden";
import ls from "localforage";
import Moment from "moment";
Moment.locale('es');

export default {
  name: 'Mediciones',
  components: { MsgBox, SelectorOrden },
  data() {
    return {
    lastread: null,
      sort: {
      order: "desc",
      by: "fecha"
    }
}
},
  filters: {
    humanized: function(time) {
      return Moment(time) > Moment().add(-2, "days") ? Moment(time).fromNow() : Moment(time).format("DD-MM-YYYY HH:mm");
    },
  },
  mounted() {
    ls.getItem("lastread").then( v => this.lastread = v );
  },
  computed: {
    ...mapState( ['meds'] ),
    sortedMeds: function() {
   let sorted = this.meds.slice().sort( (a,b) => (a[this.sort.by] - b[this.sort.by]) );
    if (this.sort.order == "desc") { sorted = sorted.reverse(); }
return sorted;
      },
      count: function() { return this.meds.length; },
},
  beforeDestroy() {
  ls.setItem( "lastread", this.meds[0].fecha );
},
methods: {
    changeMedsSort: function(newSort) { this.sort = newSort; },
    isUnread: function(time) { return this.lastread && this.lastread < time; },
    trClass: function(time) { return this.isUnread(time) ? "font-weight-bold" : null; },
      deleteDoc: function(docId) {
 this.$store.dispatch({ type: "delDoc", id: docId }); 
},
},
};
</script>

<style scoped>
/*   .font-weight-bold td { font-weight: bold; } */
</style>