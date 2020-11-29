import { computed, Ref, ref } from 'vue-demi'
import vegaEmbed, { VisualizationSpec, Result, EmbedOptions } from 'vega-embed'

import { ModifyFunction } from './utils'

/**
 * A low level hook that simply wraps the vega embed.
 *
 * Properties are not dynamically update.
 */
export function useVegaEmbed(
  el: Ref<HTMLElement | null | undefined>,
  spec: Ref<VisualizationSpec>,
  options?: Ref<EmbedOptions>
) {
  const result = ref<Result | null>(null)
  const view = computed(() => result.value?.view ?? null)

  const clear: () => void = () =>
    result.value != null && result.value.finalize()

  const embed = async () => {
    if (el.value == null) return
    const output = await vegaEmbed(el.value, spec.value, options?.value)
    result.value = output
    return output
  }

  const modify: ModifyFunction = action => {
    if (view.value == null) return
    action(view.value)
  }

  return {
    result,
    view,
    clear,
    embed,
    modify
  }
}
