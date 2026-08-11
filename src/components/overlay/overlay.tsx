'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useOverlayStore } from './overlay.store'

export const Overlay = () => {
  const overlays = useOverlayStore((state) => state.overlays)
  const close = useOverlayStore((state) => state.close)
  return (
    <AnimatePresence>
      {overlays.length > 0 && (
        <>
          <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {overlays.map((overlay, index) => (
              <div key={overlay.id}>{index !== overlays.length - 1 && <>{overlay.node}</>}</div>
            ))}
          </motion.div>

          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            onClick={() => close()}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div onClick={(e) => e.stopPropagation()}>{overlays.at(-1)?.node}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
