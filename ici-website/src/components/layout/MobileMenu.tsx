'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import Link from 'next/link'
import { navItems } from '@/data/navigation'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export default function MobileMenu({ isOpen, onClose }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed inset-0 z-[60] bg-white overflow-y-auto flex flex-col xl:hidden"
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <span className="font-display font-bold text-xl text-navy-700">ICI Menu</span>
            <button onClick={onClose} className="p-2 text-navy-600 hover:bg-gray-100 rounded-lg">
              <X size={24} />
            </button>
          </div>
          <div className="p-4 flex-1">
            <ul className="space-y-4">
              {navItems.map((item) => (
                <li key={item.label}>
                  {item.children ? (
                    <div className="font-sans font-bold text-navy-700 mb-2">{item.label}</div>
                  ) : (
                    <Link href={item.href} className="font-sans font-bold text-navy-700 mb-2 block" onClick={onClose}>
                      {item.label}
                    </Link>
                  )}
                  {item.children && (
                    <ul className="pl-4 space-y-2 border-l-2 border-gold-200">
                      {item.children.map((group) => (
                        <li key={group.heading}>
                          <div className="text-xs text-gold-600 font-semibold uppercase tracking-wider mb-1 mt-2">{group.heading}</div>
                          <ul className="space-y-2">
                            {group.links.map((link) => (
                              <li key={link.label}>
                                <Link href={link.href} className="text-sm text-gray-600 hover:text-navy-700 block" onClick={onClose}>
                                  {link.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-4 border-t border-gray-100 bg-gray-50">
            <Link href="/apply" className="btn-primary w-full justify-center" onClick={onClose}>
              Apply Now
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
