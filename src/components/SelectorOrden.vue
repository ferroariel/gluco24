<template>
  <div class="pull-right">
    <label for="orden">Ordenar por:</label>
    <select id="orden" @change="changeBy($event)" v-model="sort.by">
<option v-for="(o,i) in options"
v-bind:key="i"
:value="o"
>{{ o }}</option>
    </select>
  <button @click="changeOrder()">{{ sortLabel }}
</button>
  </div>
</template>

<script>
export default {
  name: 'SelectorOrden',
  computed: {
    sortLabel: function() { return this.sort.order != "asc" ? "Asc" : "Desc" },
  },
  props: {
    sort: {
    default: { order: null, by: null }
},
    options: { 
      default: []
}
  },
  methods: {
    changeOrder: function() {
      this.$emit( "change", Object.assign( {}, this.sort, { order: this.sort.order == "asc" ? "desc" : "asc" } ) );
    },
    changeBy: function(e) {
      this.$emit( "change", Object.assign( {}, this.sort, { by: e.target.value } ) );
    },
  },
};
</script>