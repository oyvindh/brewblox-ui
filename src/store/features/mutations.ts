import { createAccessors } from '@/helpers/static-store';
import Vue from 'vue';
import { MutationTree } from 'vuex';
import { Feature, FeatureState } from './state';

const { commit } = createAccessors('features');

export const mutations: MutationTree<FeatureState> = {
  create: (state: FeatureState, feature: Feature) =>
    Vue.set(state.features, feature.id, { ...feature }),

  mutate: (state: FeatureState, feature: Partial<Feature>) => {
    const id = feature.id || '';
    const existing = state.features[id];
    if (!existing) {
      throw new Error(`'${id}' does not exist`);
    }
    Vue.set(state.features, id, { ...existing, ...feature });
  },

  remove: (state: FeatureState, id: string) =>
    Vue.delete(state.features, id),
};

export const createFeature = commit(mutations.create);
export const mutateFeature = commit(mutations.mutate);
export const removeFeature = commit(mutations.remove);
