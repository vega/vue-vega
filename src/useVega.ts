import { ref } from 'vue-demi'
import { View } from 'vega'
import { EmbedOptions, VisualizationSpec } from 'vega-embed'
import { useVegaEmbed } from './useVegaEmbed'
import { useVegaUpdater } from './useVegaUpdaters'
import { MaybeRef, PlainObject, RefElement, SignalListeners } from './utils'

export type VueVegaConfig = {
  el: RefElement
  spec: MaybeRef<VisualizationSpec>
  data?: MaybeRef<PlainObject>
  embedOptions?: MaybeRef<EmbedOptions>
  signals?: MaybeRef<SignalListeners>
  onError?: (error: Error) => void
  onNewView?: (view: View) => void
}

/**
 * Normalizes all MaybeRefs to refs.
 */
function configToRefs(config: VueVegaConfig) {
  return {
    ...config,
    el: ref(config.el),
    spec: ref(config.spec),
    data: ref(config.data ?? {}),
    embedOptions: ref(config.embedOptions ?? {}),
    signals: ref(config.signals ?? {})
  }
}

export function useVega(config: VueVegaConfig) {
  const { el, spec, data, embedOptions, signals, ...options } = configToRefs(
    config
  )
  const { embed, ...vegaEmbed } = useVegaEmbed(el, spec, embedOptions)
  const loading = ref(false)

  // Wrapper around the embed function to add support for function callbacks and
  // loading status.
  const render = async () => {
    loading.value = true
    try {
      const output = await embed()
      if (output?.view != null) options?.onNewView?.(output.view)
      return output
    } catch (error) {
      options?.onError?.(error)
      return
    } finally {
      loading.value = false
    }
  }

  const { modify } = vegaEmbed
  // Watchers that update vega in the most optimal way by either modifying or
  // re-rendering
  useVegaUpdater(spec, embedOptions, signals, data, render, modify)

  return { render, loading, ...vegaEmbed }
}
