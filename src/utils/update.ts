import { vega } from 'vega-embed'
import { PlainObject, VegaView } from './typings'

export function isFunction(
  functionToCheck: unknown
): functionToCheck is Function {
  const getType = {}

  return (
    !!functionToCheck &&
    getType.toString.call(functionToCheck) === '[object Function]'
  )
}

export function updateSingleDatasetInView(
  view: VegaView,
  name: string,
  value: unknown
) {
  if (value) {
    if (isFunction(value)) {
      value(view.data(name))
    } else {
      view.change(
        name,
        vega
          .changeset()
          .remove(() => true)
          .insert(value)
      )
    }
  }
}

export function updateMultipleDatasetsInView(
  view: VegaView,
  data: PlainObject
) {
  Object.keys(data).forEach(name => {
    updateSingleDatasetInView(view, name, data[name])
  })
}
