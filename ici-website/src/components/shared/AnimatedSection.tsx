'use client'

import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'

interface Props {
  children:  React.ReactNode
  className?: string
  delay?:    number
  direction?: 'up' | 'left' | 'right' | 'none'
}

const hiddenOffset = {
  up: 'opacity-0 translate-y-8',
  left: 'opacity-0 -translate-x-8',
  right: 'opacity-0 translate-x-8',
  none: 'opacity-0',
} as const

export default function AnimatedSection({ children, className, delay = 0, direction = 'up' }: Props) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let active = true
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && active) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    observer.observe(el)
    return () => {
      active = false
      observer.disconnect()
    }
  }, [])

  return (
    <div
      ref={ref}
      className={clsx(
        'max-w-full transition-all duration-500 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-x-0 motion-reduce:translate-y-0',
        visible ? 'opacity-100 translate-x-0 translate-y-0' : hiddenOffset[direction],
        className,
      )}
      style={{ transitionDelay: visible ? `${delay}s` : undefined }}
    >
      {children}
    </div>
  )
}
