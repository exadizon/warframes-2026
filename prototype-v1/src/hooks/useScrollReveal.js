import { useEffect, useRef, useState, useCallback } from 'react'

/**
 * useScrollReveal — Intersection Observer hook for scroll-triggered animations.
 *
 * @param {Object} options
 * @param {number} options.threshold - Visibility threshold (0-1). Default: 0.15
 * @param {string} options.rootMargin - Root margin for observer. Default: '0px 0px -60px 0px'
 * @param {boolean} options.once - Only trigger once. Default: true
 * @param {number} options.delay - Delay in ms before setting visible. Default: 0
 *
 * @returns {{ ref: React.RefObject, isVisible: boolean }}
 */
export function useScrollReveal({
  threshold = 0.15,
  rootMargin = '0px 0px -60px 0px',
  once = true,
  delay = 0,
} = {}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const hasTriggered = useRef(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Skip if already triggered and once mode is on
    if (once && hasTriggered.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            const timer = setTimeout(() => {
              setIsVisible(true)
              hasTriggered.current = true
            }, delay)
            return () => clearTimeout(timer)
          } else {
            setIsVisible(true)
            hasTriggered.current = true
          }

          if (once) {
            observer.unobserve(element)
          }
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [threshold, rootMargin, once, delay])

  return { ref, isVisible }
}

/**
 * useStaggerReveal — Returns refs and visibility states for staggered child animations.
 *
 * @param {number} count - Number of items to stagger.
 * @param {Object} options
 * @param {number} options.staggerDelay - Delay between each item in ms. Default: 100
 * @param {number} options.threshold - Visibility threshold. Default: 0.1
 * @param {string} options.rootMargin - Root margin. Default: '0px 0px -40px 0px'
 *
 * @returns {{ containerRef: React.RefObject, isContainerVisible: boolean, getItemStyle: (index: number) => Object }}
 */
export function useStaggerReveal(count, {
  staggerDelay = 100,
  threshold = 0.1,
  rootMargin = '0px 0px -40px 0px',
} = {}) {
  const { ref: containerRef, isVisible: isContainerVisible } = useScrollReveal({
    threshold,
    rootMargin,
    once: true,
  })

  const getItemStyle = useCallback(
    (index) => ({
      opacity: isContainerVisible ? 1 : 0,
      transform: isContainerVisible ? 'translateY(0)' : 'translateY(24px)',
      transition: `opacity 600ms cubic-bezier(0.16, 1, 0.3, 1) ${index * staggerDelay}ms, transform 600ms cubic-bezier(0.16, 1, 0.3, 1) ${index * staggerDelay}ms`,
    }),
    [isContainerVisible, staggerDelay]
  )

  return { containerRef, isContainerVisible, getItemStyle }
}

/**
 * useCountUp — Animates a number counting up when visible.
 *
 * @param {number} end - Target number.
 * @param {Object} options
 * @param {number} options.duration - Animation duration in ms. Default: 2000
 * @param {number} options.startDelay - Delay before counting starts. Default: 0
 * @param {string} options.suffix - String to append (e.g., 'M', '%'). Default: ''
 * @param {string} options.prefix - String to prepend (e.g., '$'). Default: ''
 * @param {number} options.decimals - Number of decimal places. Default: 0
 *
 * @returns {{ ref: React.RefObject, displayValue: string, isVisible: boolean }}
 */
export function useCountUp(end, {
  duration = 2000,
  startDelay = 0,
  suffix = '',
  prefix = '',
  decimals = 0,
} = {}) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.3, once: true })
  const [displayValue, setDisplayValue] = useState(`${prefix}0${suffix}`)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return
    hasAnimated.current = true

    const startTime = performance.now() + startDelay
    let animationFrame

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime

      if (elapsed < 0) {
        animationFrame = requestAnimationFrame(animate)
        return
      }

      const progress = Math.min(elapsed / duration, 1)
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = eased * end

      setDisplayValue(`${prefix}${current.toFixed(decimals)}${suffix}`)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [isVisible, end, duration, startDelay, suffix, prefix, decimals])

  return { ref, displayValue, isVisible }
}

export default useScrollReveal
