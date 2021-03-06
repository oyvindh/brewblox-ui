import Unit from '@/helpers/units/Unit';
import { Block } from '@/plugins/spark/state';

export interface SetpointSimpleBlock extends Block {
  data: {
    setting: Unit;
    setpoint: Unit;
    enabled: boolean;
  };
}
