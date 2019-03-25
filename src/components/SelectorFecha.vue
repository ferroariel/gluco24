<template>
  <div>
    <input
      id="ano"
      v-model.number="customDate.y"
      min="2019"
      max="2030"
      :readonly="readonly"
      v-select-on-focus
    />
    <input
      v-model.number="customDate.m"
      min="1"
      max="12"
      :readonly="readonly"
      v-select-on-focus
    />
    <input
      v-model.number="customDate.d"
      min="1"
      max="31"
      :readonly="readonly"
      v-select-on-focus
    />
    <input
      v-model.number="customDate.h"
      min="0"
      max="23"
      :readonly="readonly"
      v-select-on-focus
    />
    <input
      v-model.number="customDate.n"
      min="0"
      max="59"
      :readonly="readonly"
      v-select-on-focus
    />
    <div v-if="!readonly">
      <button @click.prevent="setCustomDate(true)">Ok</button>
      <button @click.prevent="setCustomDate(false)">Cancelar</button>
    </div>
  </div>
</template>

<script>
import Moment from "moment";
import selectOnFocus from "vue-select-on-focus";
export default {
  name: "SelectorFecha",
  directives: { selectOnFocus },
  data() {
    return {
      focus: false,
      customDate: {
        y: this.start.year(),
        m: this.start.format("M"),
        d: this.start.format("D"),
        h: this.start.hour(),
        n: this.start.minutes()
      }
    };
  },
  mounted() {
    document.querySelector("#ano").focus();
  },
  props: {
    readonly: {
      default: false
    },
    start: {
      default: function() {
        return Moment();
      }
    }
  },
  methods: {
    setCustomDate: function(create) {
      let newDate = null;
      if (create) {
        const cd = this.customDate;
        newDate = Moment(`${cd.y}-${cd.m}-${cd.d} ${cd.h}:${cd.n}:00`);
      }
      this.$emit("change", newDate);
    }
  }
};
</script>