import { Link } from 'react-router-dom'
import { CassetteGlyph } from './icons'
import { site } from '@/data/site'

const YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="mx-auto max-w-[1600px] px-6 pb-10 pt-16 md:px-10">
      <div className="border-t border-hair pt-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <CassetteGlyph className="h-6 w-6" />
            <p className="mt-4 max-w-xs text-[15px] leading-snug text-ink-soft">
              {site.title}, {site.location}. Tasarım ve kodun arasında gidip geliyorum.
            </p>
          </div>

          <div className="flex gap-16">
            <div>
              <p className="label text-mute">Sayfalar</p>
              <ul className="mt-4 space-y-2 text-[15px]">
                <li>
                  <Link to="/" className="text-ink-soft transition-colors hover:text-ink">
                    Ana Sayfa
                  </Link>
                </li>
                <li>
                  <Link to="/projeler" className="text-ink-soft transition-colors hover:text-ink">
                    Projeler
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="label text-mute">Else</p>
              <ul className="mt-4 space-y-2 text-[15px]">
                {site.socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-ink-soft transition-colors hover:text-ink"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="text-ink-soft transition-colors hover:text-ink"
                  >
                    {site.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 text-[13px] text-mute sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {YEAR} {site.fullName}
          </p>
          <p>React · Tailwind · Three.js ile yapıldı</p>
        </div>
      </div>
    </footer>
  )
}