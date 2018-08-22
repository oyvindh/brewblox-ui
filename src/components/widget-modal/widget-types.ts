import { RootStore } from '@/store/state';
import { Block } from '@/store/blocks/state';
import { DeviceService } from '@/store/services/state';

import { getAll as getAllPids } from '@/store/blocks/Pid/getters';
import { getAll as getAllOneWireTempSensors } from '@/store/blocks/OneWireTempSensor/getters';
import { getAll as getAllSetPointSimples } from '@/store/blocks/SetPointSimple/getters';
import { getAll as getAllSensorSetpointPairs } from '@/store/blocks/SensorSetPointPair/getters';
import { deviceServices } from '@/store/services/getters';

export const widgetTypes: { [key in WidgetType]: string } = {
  Metrics: 'Metrics',
  Pid: 'Pid',
  OneWireTempSensor: 'Temperature Sensor',
  SetPointSimple: 'SetPoint',
  SensorSetPointPair: 'Sensor SetPoint Pair',
};

function getBlocksFromServices(
  services: DeviceService[],
  store: RootStore,
  getter: (store: RootStore, serviceId: string) => Block[],
): Block[] {
  return services
    .map(service => getter(store, service.id))
    .reduce((acc, sensors) => [...acc, ...sensors], []);
}

export function blocksByWidgetType(store: RootStore, type: WidgetType): Block[] {
  const services = deviceServices(store);

  switch (type) {
    case 'Pid':
      return getBlocksFromServices(services, store, getAllPids);
    case 'OneWireTempSensor':
      return getBlocksFromServices(services, store, getAllOneWireTempSensors);
    case 'SetPointSimple':
      return getBlocksFromServices(services, store, getAllSetPointSimples);
    case 'SensorSetPointPair':
      return getBlocksFromServices(services, store, getAllSensorSetpointPairs);
    default:
      return [];
  }
}

export const widgetComponents: { [name in WidgetType]: () => Promise<any> } = {
  Metrics: () => import('@/components/widgets/Metrics/CreateMetrics.vue'),
  Pid: () => import('@/components/blocks/Pid/CreatePid.vue'),
  OneWireTempSensor: () => import('@/components/blocks/OneWireTempSensor/CreateOneWireTempSensor.vue'),
  SetPointSimple: () => import('@/components/blocks/SetPointSimple/CreateSetPointSimple.vue'),
  SensorSetPointPair: () => import('@/components/blocks/SensorSetPointPair/CreateSensorSetPointPair.vue'),
};
