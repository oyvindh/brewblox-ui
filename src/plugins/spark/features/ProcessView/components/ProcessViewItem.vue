<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
})
export default class ProcessViewItem extends Vue {
  get style() {
    return this.$props.value.rotate
      ? { transform: `rotate(${this.$props.value.rotate}deg)` }
      : {};
  }

  get component() {
    return Vue.component(this.$props.value.type);
  }
}
</script>

<template>
  <component
    v-if="component"
    :style="style"
    :value="value"
    :is="component"
    class="ProcessViewPart"
  />
</template>

<style>
/* not scoped */
.ProcessViewPart,
.ProcessViewPart svg {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.ProcessViewPart {
  stroke-width: 2px;
  stroke-linecap: round;
  fill: none;
}

.ProcessViewPart .fill {
  fill: #fff;
}

.ProcessViewPart .outline {
  stroke: #fff;
}

.ProcessViewPart .liquid {
  stroke-width: 7px;
}
</style>
