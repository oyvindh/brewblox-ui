<script lang="ts">
import merge from 'lodash/merge';
import { Layout, PlotData } from 'plotly.js';
import Vue from 'vue';
import Component from 'vue-class-component';

Vue.component('PlotlyGraph', () => import('./PlotlyGraph'));

@Component({
  props: {
    data: {
      type: Array,
      required: true,
    },
    layout: {
      type: Object,
      required: true,
    },
  },
})
export default class GraphDisplay extends Vue {
  layoutDefaults: Partial<Layout> = {
    title: '',
    font: {
      color: '#fff',
    },
    margin: {
      t: 40,
      l: 40,
      r: 40,
      b: 40,
    },
    legend: { orientation: 'h' },
    xaxis: {
      type: 'date',
      gridcolor: '#666',
      autorange: true,
    },
    yaxis: {
      gridcolor: '#666',
      zerolinecolor: '#eee',
      autorange: true,
    },
    paper_bgcolor: '#1b1d21',
    plot_bgcolor: '#1b1d21',
  };

  get plotlyData(): PlotData[] {
    return this.$props.data;
  }

  get plotlyLayout(): Partial<Layout> {
    return merge(
      this.layoutDefaults,
      this.$props.layout,
    );
  }

  get plotlyConfig() {
    return {
      displaylogo: false,
      responsive: true,
    };
  }

  get ready() {
    return this.plotlyData !== undefined
      && this.plotlyLayout !== undefined
      && this.plotlyConfig !== undefined;
  }
}
</script>

<template>
  <PlotlyGraph v-if="ready" :data="plotlyData" :layout="plotlyLayout" :config="plotlyConfig" fit/>
</template>

<style scoped>
.js-plotly-plot .plotly .modebar {
  top: 10px;
  background: transparent;
}

.js-plotly-plot .plotly .modebar-btn path {
  fill: rgba(255, 255, 255, 0.6);
}

.js-plotly-plot .plotly .modebar-btn.active path,
.js-plotly-plot .plotly .modebar-btn:hover path {
  fill: rgba(255, 255, 255, 1);
}
</style>
