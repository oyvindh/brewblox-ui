import { FeatureState } from '@/store/features/state';
import { ProviderState } from '@/store/providers/state';
import { Store } from 'vuex';
import { DashboardState } from './dashboards/state';
import { ServiceState } from './services/state';

export interface RootState {
  dashboards: DashboardState;
  services: ServiceState;
  providers: ProviderState;
  features: FeatureState;
}

export type RootStore = Store<RootState>;
