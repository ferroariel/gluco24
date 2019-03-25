<template>
  <div>
    <transition name="fade">
      <div v-if="msg" :class="msgClass">
        {{ msg.text }}
        <span v-if="autohide" class="pull-right">
          Cerrando en {{ seconds }} segs...
        </span>
        <a
          v-else
          href="#"
          @click.prevent="dismiss()"
          class="pull-right btn-info btn-sm"
          >Cerrar</a
        >
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "MsgBox",
  data() {
    return {
      autohide: true,
      seconds: 5,
      timer: null
    };
  },
  computed: {
    ...mapState(["msg"]),
    msgClass: function() {
      return this.msg ? `alert alert-${this.msg.type}` : "hidden";
    }
  },
  beforeUpdate() {
    if (this.autohide && !this.timer && this.msg) {
      this.timer = window.setInterval(() => {
        this.seconds -= 1;
        if (this.seconds < 0) {
          this.dismiss();
        }
      }, 1000);
    }
  },
  beforeDestroy() {
    this.timer && window.clearInterval(this.timer);
  },
  methods: {
    dismiss: function() {
      this.$store.commit("setMsg", null);
    }
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>