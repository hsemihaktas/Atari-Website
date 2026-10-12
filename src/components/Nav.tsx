import { Link, NavLink, useLocation } from 'react-router-dom'
import type { ReactNode } from 'react'
import { CassetteGlyph } from './icons'
import { ThemeToggle } from './ThemeToggle'
import { NavUnderline } from './ui'
import { navItemClass } from './interaction'
import { site } from '@/data/site'

/** Tek bir navbar bağlantısı — iç bağlantı ve harici bağlantı aynı görünür. */
function NavItem({
  to,
  active,
  children,
  ...rest
}: { to?: string; active: boolean; children: ReactNode } & React.AnchorHTMLAttributes<
  HTMLAnchorElement
>) {
  const className = navItemClass(active)

  return (
    <span className={`${className} text-[15px]`}>
      {to ? (
        <NavLink to={to}>{children}</NavLink>
      ) : (
        <a {...rest}>{children}</a>
      )}
      <NavUnderline active={active} />
    </span>
  )
}

export function Nav() {
  const { pathname } = useLocation()
  const isActive = (to: string) => (to === '/' ? pathname === '/' : pathname.startsWith(to))

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-paper via-paper/95 to-paper/0 backdrop-blur-[2px]" />

      <div className="relative mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-6 py-5 md:px-10">
        <Link
          to="/"
          className="group flex shrink-0 items-center gap-2.5"
          aria-label={site.fullName}
        >
          <CassetteGlyph className="h-5 w-5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-rotate-6" />
          <span className="text-[15px] font-medium tracking-tight">{site.fullName}</span>
        </Link>

        <nav className="flex items-center gap-5 sm:gap-7">
          <NavItem to="/" active={isActive('/')}>
            Ana Sayfa
          </NavItem>
          <NavItem to="/projeler" active={isActive('/projeler')}>
            Projeler
          </NavItem>
          <NavItem href={`mailto:${site.email}`} active={false}>
            İletişim
          </NavItem>

          <span className="h-4 w-px bg-hair" aria-hidden="true" />

          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}