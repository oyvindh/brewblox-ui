<script lang="ts">
import PartCard from './PartCard';
import Component from 'vue-class-component';
import { clampRotation } from '@/helpers/functional';
import { component } from '../calculateFlows';
import { SQUARE_SIZE, COLD_WATER, HOT_WATER, BEER, WORT } from '../getters';

@Component
export default class LiquidSourcePartCard extends PartCard {
  get liquidColors() {
    return [
      COLD_WATER,
      HOT_WATER,
      BEER,
      WORT,
    ];
  }

  changeLiquidSource(liquidSource: string) {
    this.savePart({ ...this.part, liquidSource });
  }
}
</script>

<template>
  <q-card>
    <q-card-title>Liquid Source</q-card-title>
    <q-card-main>
      <div class="row justify-around">
        <q-btn
          v-for="color in liquidColors"
          :key="color"
          :style="`background-color: ${color}`"
          fab
          round
          icon="format_color_fill"
          @click="changeLiquidSource(color)"
        />
      </div>
    </q-card-main>
  </q-card>
</template>

