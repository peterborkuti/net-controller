import { Dictionary, FlatDictionary , Device, DeviceTime, DeviceTimeDisplay} from '../model';
import { isArray } from 'util';
/**
 * It returns with an id for using when adding new element to a Dictionary.
 *
 * @param dict Dictionary to add
 */
export function getNewId<T>(dict: Dictionary<T>): number {
  const maxId = Math.max.apply(null, Object.keys(dict));

  const newId: number = maxId === -Infinity ? 0 : maxId + 1;

  return newId;
}

export function addToDictionary<T>(dict: Dictionary<T>, element: T): Dictionary<T> {
  const newId = getNewId(dict);

  const newDict: Dictionary<T> = Object.assign({}, dict);
  newDict[newId] = element;

  return newDict;
}

export function deleteFromDictionary<T>(dict: Dictionary<T>, ...id: number[]): Dictionary<T> {
  const newDict: Dictionary<T> = Object.assign({}, dict);

  id.forEach(i => delete newDict[i]);

  return newDict;
}

export function modElementInDictionary<T>(dict: Dictionary<T>, id: number, element: T): Dictionary<T> {
  const newDict: Dictionary<T> = Object.assign({}, dict);

  newDict[id] = element;

  return newDict;
}

export function dictionaryToArray<T>(dict: Dictionary<T>): FlatDictionary<T>[] {
  const arr: FlatDictionary<T>[] = [];

  return Object.keys(dict).map(i => +i).map(i => ({id: i, e: dict[i]}));
}

export function getDeviceTimeList(device: FlatDictionary<Device>[] , deviceTime: DeviceTime): DeviceTimeDisplay[] {
  return device.map(d =>
    (
      {
        id: d.id, device: d.e,
        allocatedTime: (deviceTime[d.id] && deviceTime[d.id].allocated) || 0,
        remainingTime: (deviceTime[d.id] && deviceTime[d.id].remaining) || 0
      }
    ));
}

