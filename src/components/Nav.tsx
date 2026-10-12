import { Link, NavLink, useLocation } from 'react-router-dom'
import { CassetteGlyph } from './icons'
import { site } from '@/data/site'

const links = [
  { to: '/', label: 'Ana Sayfa' },
  { to: '/projeler', label: 'Projeler' },
]

export function Nav() {
  const { pathname } = useLocation()

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-paper via-paper/95 to-paper/0 backdrop-blur-[2px]" />
      <div className="relative mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-10">
        <Link
          to="/"
          className="group pointer-events-auto flex items-center gap-2.5"
          aria-label={site.fullName}
        >
          <CassetteGlyph className="h-5 w-5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-12" />
          <span className="text-[15px] font-medium tracking-tight">{site.fullName}</span>
        </Link>

        <nav className="pointer-events-auto flex items-center gap-1 text-[15px]">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `relative rounded-full px-3 py-1.5 transition-colors duration-300 ${
                  isActive || (l.to === '/' && pathname === '/')
                    ? 'text-ink'
                    : 'text-mute hover:text-ink'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <a
            href={`mailto:${site.email}`}
            className="ml-2 rounded-full border border-hair-strong px-3.5 py-1.5 text-[15px] transition-colors duration-300 hover:bg-ink hover:text-paper"
          >
            İletişim
          </a>
        </nav>
      </div>
    </header>
  )
}