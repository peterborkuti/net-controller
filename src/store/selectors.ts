import { createSelector } from '@ngrx/store';
import { State } from './model';
import { dictionaryToArray, getDeviceTimeList, getDeviceChildList } from './helpers/helper';

export const selectState = (globalState: any) => globalState.state || {};
export const selectChildren = createSelector(selectState, (state: State) => state.children || {});
export const selectFlatChildren = createSelector(selectState, (state: State) => dictionaryToArray(state.children || {}));
export const selectDevices = createSelector(selectState, (state: State) => state.devices || {});
export const selectFlatDevices = createSelector(selectState, (state: State) => dictionaryToArray(state.devices || {}));
export const selectDeviceChild = createSelector(selectState, (state: State) => state.deviceChild || {});

export const selectDeviceTimeDisplay =
  createSelector(selectState,
    (state: State) => getDeviceTimeList(dictionaryToArray(state.devices || {}), state.deviceTime || {}));

export const selectDeviceChildDisplay =
    createSelector(selectState,
      (state: State) => getDeviceChildList(dictionaryToArray(state.devices || {}), state.deviceChild || {}));
