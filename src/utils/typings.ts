import { Ref } from 'vue-demi'
import { SignalListenerHandler } from 'vega'
import { Result } from 'vega-embed'

export type VegaView = Result['view']
export type SignalListeners = Record<string, SignalListenerHandler>
export type RenderFunction = () => void
export type ModifyFunction = (modify: (view: VegaView) => void) => void
export type PlainObject = Record<string, unknown>
export type MaybeRef<T> = Ref<T> | T
export type RefElement = HTMLElement | Ref<HTMLElement | undefined | null>
