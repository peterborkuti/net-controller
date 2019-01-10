/**
 * It returns with an id for using when adding new element to the input array.
 *
 * The input array should contain elements, which has an "id" (number) property
 * @param arr array of elements {id:number, ...}
 */
export function getNewId(arr: any[]): number {
  const maxId = Math.max.apply(null, arr.map(e => e.id));
  const newId: number = maxId === -Infinity ? 0 : maxId + 1;

  return newId;
}
