'use client'

import { useOverlayStore } from './overlay.store'

export const Overlay = () => {
  const overlays = useOverlayStore((state) => state.overlays)
  const close = useOverlayStore((state) => state.close)
  if (overlays.length === 0) return null
  return (
    <>
      <div className="fixed inset-0 z-40 flex items-center justify-center">
        {overlays.map((overlay, index) => (
          <div key={overlay.id}>{index !== overlays.length - 1 && <>{overlay.node}</>}</div>
        ))}
      </div>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
        onClick={() => close()}
      >
        <div onClick={(e) => e.stopPropagation()}>{overlays.at(-1)?.node}</div>
      </div>
    </>
  )
}
