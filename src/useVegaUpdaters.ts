import { computed, Ref } from 'vue-demi'
import { EmbedOptions, VisualizationSpec } from 'vega-embed'
import {
  hasChanged,
  ModifyFunction,
  PlainObject,
  RenderFunction,
  SignalListeners,
  updateMultipleDatasetsInView,
  VegaView,
  watchOn
} from './utils'

export function useVegaSpecUpdater(
  spec: Ref<VisualizationSpec>,
  rerender: RenderFunction
) {
  const onSpecChange = watchOn(spec)
  onSpecChange(rerender)
}

type OptionsViewProperty = keyof VegaView & keyof EmbedOptions
export function useVegaOptionsUpdater(
  options: Ref<EmbedOptions>,
  rerender: RenderFunction,
  modify: ModifyFunction
) {
  const onOptionsChange = watchOn(options)

  onOptionsChange((n, o) => {
    const isNewConfig = (n == null && o != null) || (o == null && n != null)
    if (isNewConfig) return rerender()
    if (n == null) return

    const checkProperties: Array<OptionsViewProperty> = [
      'width',
      'height',
      'logLevel',
      'padding',
      'tooltip'
    ]
    const changes: Array<[
      OptionsViewProperty,
      boolean
    ]> = checkProperties.map(p => [p, hasChanged(n, o, p)])

    modify(view => {
      // Check for changes and update values
      for (const change of changes) {
        const [property, hasChanged] = change
        const propertyValue = n[property]
        if (hasChanged && propertyValue != null)
          (view as any)[property](propertyValue)
      }

      // Process changes if there was any
      const anyChanges = checkProperties.some(([, changed]) => changed)

      if (anyChanges) view.run()
    })
  })
}

export function useVegaSignalsUpdater(
  signals: Ref<SignalListeners>,
  rerender: RenderFunction
) {
  const hasSignalListeners = computed(
    () => signals && Object.keys(signals.value ?? {}).length > 0
  )
  if (hasSignalListeners) {
    const onSignalsChange = watchOn(signals)
    onSignalsChange(rerender)
  }
}

export function useVegaDataUpdater(
  data: Ref<PlainObject>,
  modify: ModifyFunction
) {
  const onDataChange = watchOn(data)
  onDataChange(newData => {
    if (Object.keys(newData).length > 0) return

    modify(view => {
      updateMultipleDatasetsInView(view, newData)
      view.resize().run()
    })
  })
}

export function useVegaUpdater(
  spec: Ref<VisualizationSpec>,
  vega: Ref<EmbedOptions>,
  signals: Ref<SignalListeners>,
  data: Ref<PlainObject>,
  rerender: RenderFunction,
  modify: ModifyFunction
) {
  useVegaSpecUpdater(spec, rerender)
  useVegaSignalsUpdater(signals, rerender)
  useVegaOptionsUpdater(vega, rerender, modify)
  useVegaDataUpdater(data, modify)
}
