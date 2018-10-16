import { getStoreAccessors } from 'vuex-typescript';

import { Dashboard, DashboardItem, DashboardState, DashboardContext } from './state';
import { RootState, RootStore } from '../state';

const { read } = getStoreAccessors<DashboardState, RootState>('dashboards');

const getters = {
  dashboards: (state: DashboardState): { [id: string]: Dashboard } => state.dashboards,
  dashboardIds: (state: DashboardState): string[] => Object.keys(state.dashboards),
  dashboardValues: (state: DashboardState): Dashboard[] => Object.values(state.dashboards),
  items: (state: DashboardState): { [id: string]: DashboardItem } => state.items,
  itemIds: (state: DashboardState): string[] => Object.keys(state.items),
  itemValues: (state: DashboardState): DashboardItem[] => Object.values(state.items),
  isFetching: (state: DashboardState): boolean => state.fetching,
  primaryDashboard: (state: DashboardState): string | null => {
    const sorted = Object
      .values(state.dashboards)
      .sort((left, right) => {
        if (left.primary && !right.primary) {
          return -1;
        }
        if (!left.primary && right.primary) {
          return 1;
        }
        return left.order - right.order;
      });
    return sorted.length > 0
      ? sorted[0].id
      : null;
  },
};

const dashboards = read(getters.dashboards);
export const dashboardIds = read(getters.dashboardIds);
export const allDashboards = read(getters.dashboardValues);

const dashboardItems = read(getters.items);
export const dashboardItemIds = read(getters.itemIds);
export const allDashboardItems = read(getters.itemValues);
export const primaryDashboard = read(getters.primaryDashboard);

export const dashboardById =
  (store: RootStore | DashboardContext, id: string): Dashboard => dashboards(store)[id];
export const dashboardItemById =
  (store: RootStore | DashboardContext, id: string): DashboardItem => dashboardItems(store)[id];

export const isFetching = read(getters.isFetching);

export default getters;
