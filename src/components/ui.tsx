import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { ArrowUpRight } from './icons'
import { ARROW, EASE, T, textLinkClass } from './interaction'

/* Sitedeki eylem/bağlantı bileşenleri. Dil kuralları `interaction.ts`
   içinde; orada tanımlı. */

/** Eylem butonu. `solid` ve `outline` birbirinin aynasıdır. */
type ActionProps = {
  variant?: 'solid' | 'outline'
  /** oka ihtiyaç yoksa kapat */
  arrow?: boolean
} & ComponentPropsWithoutRef<'a'>

export function Action({
  variant = 'solid',
  arrow = true,
  className = '',
  children,
  ...rest
}: ActionProps) {
  const skin =
    variant === 'solid'
      ? 'bg-ink text-paper ring-ink hover:bg-transparent hover:text-ink'
      : 'ring-hair-strong text-ink hover:bg-ink hover:text-paper hover:ring-ink'

  return (
    <a
      {...rest}
      className={`group inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-[16px] ring-1 ring-inset transition-colors ${T} ${EASE} ${skin} ${className}`}
    >
      {children}
      {arrow && <ArrowUpRight className={ARROW} />}
    </a>
  )
}

/** Satır içi bağlantı — alt çizgi ve ok birlikte hareket eder. */
type TextLinkProps = { children: ReactNode } & ComponentPropsWithoutRef<'a'>

export function TextLink({ className = '', children, ...rest }: TextLinkProps) {
  return (
    <a {...rest} className={textLinkClass(className)}>
      {children}
      <ArrowUpRight className={ARROW} />
    </a>
  )
}

/** Aktifse hep açık, değilse hover'da soldan açılır. */
export function NavUnderline({ active }: { active: boolean }) {
  return (
    <span
      className={`absolute -bottom-0.5 left-0 h-px bg-current transition-all ${T} ${EASE} ${
        active ? 'w-full' : 'w-0 group-hover:w-full'
      }`}
    />
  )
}