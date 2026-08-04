import { ReactNode } from 'react'
import { create } from 'zustand'

interface OverlayChild {
  id: string
  node: ReactNode
}

interface OverlayState {
  overlays: OverlayChild[]
  open: (overlay: ReactNode) => void
  close: (id?: string) => void
}

export const useOverlayStore = create<OverlayState>((set) => ({
  overlays: [],
  open: (overlay) =>
    set((state) => ({ overlays: [...state.overlays, { node: overlay, id: crypto.randomUUID() }] })),
  close: (id?: string) =>
    set((state) => ({
      overlays: id ? state.overlays.filter((o) => o.id !== id) : state.overlays.slice(0, -1),
    })),
}))

export const overlayStore = {
  open: (overlay: ReactNode) => useOverlayStore.getState().open(overlay),
  close: (id?: string) => useOverlayStore.getState().close(id),
}
