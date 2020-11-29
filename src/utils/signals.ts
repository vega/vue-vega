import { SignalListeners, VegaView } from './typings'

export function addSignalListenersToView(
  view: VegaView,
  listeners: SignalListeners
) {
  for (const [signal, handler] of Object.entries(listeners)) {
    try {
      view.addSignalListener(signal, handler)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('Cannot add invalid signal listener.', error)
    }
  }
}
