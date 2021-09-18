import { Ref } from 'vue-demi'
import { SignalListenerHandler, View } from 'vega'

export type SignalListeners = Record<string, SignalListenerHandler>
export type RenderFunction = () => void
export type ModifyFunction = (modify: (view: View) => void) => void
export type PlainObject = Record<string, unknown>
export type MaybeRef<T> = Ref<T> | T
export type RefElement = HTMLElement | Ref<HTMLElement | undefined | null>
export type VegaView = View;
