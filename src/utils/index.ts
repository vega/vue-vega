import { Ref, watch, WatchCallback } from 'vue-demi'

export * from './typings'
export * from './signals'
export * from './update'

export const hasChanged = <T>(
  newObj: T | undefined,
  oldObj: T | undefined,
  property: keyof T
) => newObj?.[property] !== oldObj?.[property]

export const watchOn = <T>(ref?: Ref<T>) => {
  return (cb: WatchCallback<T, T>) => ref && watch(ref, cb, { deep: true })
}
