'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface Props {
  title: string
  subtitle: string
  image: string
}

export default function PageHeader({ title, subtitle, image }: Props) {
  return (
    <section className="relative h-[50vh] min-h-[400px] max-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src={image}
        alt={title}
        fill
        priority
        className="object-cover"
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-brand-navy-900/70 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-900 to-transparent opacity-80" />
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-eyebrow flex items-center gap-3 justify-center mb-6">{subtitle}</div>
          <h1 className="text-h1 text-white">
            {title}
          </h1>
        </motion.div>
      </div>
    </section>
  )
}
