<script lang="ts">
import { ActuatorDigitalLink } from '@/helpers/units/KnownLinks';
import BlockForm from '@/plugins/spark/components/BlockForm';
import { ActuatorPwmBlock } from '@/plugins/spark/features/ActuatorPwm/state';
import Component from 'vue-class-component';

@Component
export default class ActuatorPwmForm extends BlockForm {
  get block(): ActuatorPwmBlock {
    return this.blockField as ActuatorPwmBlock;
  }

  presets() {
    return [
      {
        label: 'Default',
        value: {
          actuatorId: new ActuatorDigitalLink(null),
          period: 0,
          setting: 0,
          constrainedBy: { constraints: [] },
        },
      },
    ];
  }
}
</script>

<template>
  <div class="widget-modal">
    <q-btn
      v-close-overlay
      v-if="$props.buttons"
      rounded
      label="close"
      icon="close"
      style="position: absolute; right: 18px; top: 18px"
    />
    <q-card>
      <q-card-title>Settings</q-card-title>
      <q-card-main>
        <q-field class="col" label="Actuator">
          <LinkPopupEdit
            :field="block.data.actuatorId"
            :service-id="serviceId"
            :change="callAndSaveBlock(v => block.data.actuatorId = v)"
            label="Actuator"
          />
        </q-field>
        <q-field class="col" label="Period">
          <InputPopupEdit
            :field="block.data.period"
            :change="callAndSaveBlock(v => block.data.period = v)"
            label="Period"
            type="number"
          />
        </q-field>
        <q-field class="col" label="Setting">
          <InputPopupEdit
            :field="block.data.setting"
            :change="callAndSaveBlock(v => block.data.setting = v)"
            label="Setting"
            type="number"
          />
        </q-field>
        <q-field class="col" label="Value">
          <big>{{ block.data.value | round }}</big>
        </q-field>
      </q-card-main>
    </q-card>
    <q-card>
      <q-card-title>Constraints</q-card-title>
      <q-card-main>
        <q-field class="col" label="Constraints" orientation="vertical">
          <AnalogConstraints
            :service-id="block.serviceId"
            :field="block.data.constrainedBy"
            :change="callAndSaveBlock(v => block.data.constrainedBy = v)"
          />
        </q-field>
      </q-card-main>
    </q-card>
    <q-card>
      <q-card-title>Block Settings</q-card-title>
      <q-card-main>
        <q-field class="col" label="Block ID">
          <InputPopupEdit :field="block.id" :change="changeBlockId" label="Block ID"/>
        </q-field>
        <q-field class="col" label="Service ID">
          <big>{{ serviceId }}</big>
        </q-field>
        <q-field class="col" label="Block Type">
          <big>{{ block.type }}</big>
        </q-field>
        <q-field class="col" label="Profiles">
          <ProfilesPopupEdit
            :field="block.profiles"
            :service-id="serviceId"
            :change="callAndSaveBlock(v => block.profiles = v)"
          />
        </q-field>
        <q-field class="col" label="Preset">
          <SelectPopupEdit
            :field="block.data"
            :options="presets()"
            :change="callAndSaveBlock(v => block.data = v)"
            label="Preset"
          />
        </q-field>
      </q-card-main>
    </q-card>
  </div>
</template>

<style scoped>
.q-card {
  min-width: 400px;
  width: 100%;
  margin-bottom: 10px;
}
</style>

