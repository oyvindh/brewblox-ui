<script lang="ts">
import BlockWidget from '@/plugins/spark/components/BlockWidget';
import Component from 'vue-class-component';
import { getById, state } from './getters';
import { DS2413Block } from './state';

@Component
export default class DS2413Widget extends BlockWidget {
  get block(): DS2413Block {
    return getById(this.$store, this.serviceId, this.blockId);
  }

  get subtitles() {
    return [
      'State',
    ];
  }

  get address() {
    return this.block.data.address;
  }

  get actuatorState() {
    return state[this.block.data.state];
  }

  get boolState() {
    return this.actuatorState === 'Active';
  }
}
</script>

<template>
  <q-card dark class="column">
    <q-modal v-model="modalOpen">
      <DS2413Form v-if="modalOpen" :field="block" :change="saveBlock" :change-id="changeBlockId"/>
    </q-modal>
    <q-card-title class="title-bar">
      <InputPopupEdit
        :field="widgetId"
        :change="v => widgetId = v"
        class="ellipsis"
        label="Widget ID"
        display="span"
      />
      <span slot="right" class="vertical-middle on-left">{{ displayName }}</span>
      <q-btn slot="right" flat round dense icon="settings" @click="openModal"/>
      <q-btn slot="right" flat round dense icon="refresh" @click="refreshBlock"/>
    </q-card-title>
    <q-card-separator/>
    <q-carousel v-model="slideIndex" quick-nav class="col">
      <!-- State -->
      <q-carousel-slide class="unpadded">
        <div :class="['widget-body', orientationClass]">
          <q-card-main class="column col">
            <q-field class="col" label="Address">
              <span>{{ address }}</span>
            </q-field>
            <q-field class="col" label="State">
              <big>{{ actuatorState }}</big>
            </q-field>
          </q-card-main>
        </div>
      </q-carousel-slide>
      <q-btn
        slot-scope="props"
        slot="quick-nav"
        :icon="navIcon(props.slide)"
        :label="navTitle(props.slide)"
        :class="{inactive: !props.current}"
        color="white"
        flat
        dense
        @click="props.goToSlide()"
      />
    </q-carousel>
  </q-card>
</template>


