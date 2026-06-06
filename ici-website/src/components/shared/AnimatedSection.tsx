'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface Props {
  children:  React.ReactNode
  className?: string
  delay?:    number
  direction?: 'up' | 'left' | 'right' | 'none'
}

export default function AnimatedSection({ children, className, delay = 0, direction = 'up' }: Props) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const variants = {
    up:    { hidden: { opacity: 0, y: 30 },  visible: { opacity: 1, y: 0 } },
    left:  { hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: 30 },  visible: { opacity: 1, x: 0 } },
    none:  { hidden: { opacity: 0 },         visible: { opacity: 1 } },
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants[direction]}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
