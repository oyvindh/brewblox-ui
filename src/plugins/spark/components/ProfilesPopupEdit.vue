<script lang="ts">
import { profileNames } from '@/plugins/spark/store/getters';
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  props: {
    field: {
      required: true,
    },
    serviceId: {
      type: String,
      required: true,
    },
    change: {
      type: Function,
      required: true,
    },
    display: {
      type: String,
      default: 'big',
    },
  },
})
export default class ProfilesPopupEdit extends Vue {
  placeholder: any[] = [undefined]; // Ensures that value always changes during edit

  get profileOpts() {
    return profileNames(this.$store, this.$props.serviceId)
      .map((name: string, idx: number) => ({
        label: name,
        value: idx,
      }));
  }

  get displayValue() {
    const text = this.$props.field
      .map((v: any) => this.profileOpts.find((opt: any) => opt.value === v))
      .map((v: any) => v.label)
      .join(', ');
    return text || 'Click to set';
  }

  startEdit() {
    this.placeholder = [...this.$props.field];
  }

  endEdit() {
    this.$props.change([...this.placeholder]);
  }
}
</script>

<template>
  <div>
    <component :is="$props.display" class="editable">{{ displayValue }}</component>
    <q-popup-edit
      v-model="placeholder"
      buttons
      persistent
      title="Select active profiles"
      @show="startEdit"
      @save="endEdit"
    >
      <q-select v-model="placeholder" :options="profileOpts" clearable multiple/>
    </q-popup-edit>
  </div>
</template>

