'use client'
import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'

interface Props {
  end:     number
  suffix?: string
  prefix?: string
}

export default function CountUpNumber({ end, suffix = '', prefix = '' }: Props) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 })

  return (
    <span ref={ref}>
      {inView ? (
        <CountUp
          end={end}
          duration={2.5}
          separator=","
          prefix={prefix}
          suffix={suffix}
          useEasing
        />
      ) : (
        `${prefix}0${suffix}`
      )}
    </span>
  )
}
