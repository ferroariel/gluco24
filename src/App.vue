<template>
    <div id="app">
    <Menu />
    <div class="container">
      <div v-if="ready">
      <router-view></router-view>
    </div>
  <div v-else><Loading /></div>
    </div>
    </div>
</template>

<script>
import Menu from "./components/Menu";
import Loading from "./components/Loading";
import { mapState } from "vuex";
    export default {
        name: 'app',
  components: { Menu, Loading },
  computed: mapState([ 'ready' ]),
};
</script>
