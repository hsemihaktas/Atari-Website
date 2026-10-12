import { CassetteTile } from '@/components/three/CassetteTile'
import { ArrowUpRight } from '@/components/icons'
import { ContactCta, SectionHead } from '@/components/sections'
import { projects, site } from '@/data/site'

export default function Projects() {
  return (
    <div className="mx-auto max-w-[1600px] px-6 md:px-10">
      <div className="lg:grid lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        {/* ---------- Sol: başlık ---------- */}
        <div className="lg:sticky lg:top-0 lg:h-screen lg:py-40">
          <section className="pb-16 pt-32 lg:pt-40">
            <p className="label text-mute">Projeler</p>
            <h1 className="mt-6 max-w-[14ch] text-[clamp(1.9rem,4.1vw,3.1rem)] leading-[1.16] tracking-[-0.03em]">
              Kaset rafındaki her şey.
            </h1>
            <p className="mt-8 max-w-[38ch] text-[17px] leading-relaxed text-ink-soft">
              Her kart gerçek bir 3B kaset. İmleci üzerine götür — dönsün.
            </p>
          </section>
        </div>

        {/* ---------- Sağ: 3B kartlar ---------- */}
        <div className="pb-24">
          <div className="grid gap-x-10 gap-y-20 pt-32 sm:grid-cols-2 lg:pt-40">
            {projects.map((p) => (
              <article key={p.id}>
                <a href={p.link ?? '#'} target="_blank" rel="noreferrer" className="group block">
                  <CassetteTile project={p} />
                  <div className="mt-6 flex items-baseline justify-between gap-4">
                    <div className="min-w-0">
                      <h2 className="truncate text-[19px] font-medium tracking-tight">
                        {p.name}
                      </h2>
                      <p className="mt-1 truncate font-mono text-[12px] uppercase tracking-[0.14em] text-mute">
                        {p.role} · {p.years}
                      </p>
                    </div>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-mute transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
                  </div>
                </a>
              </article>
            ))}
          </div>

          <div className="mt-20 border-t border-hair pt-10">
            <SectionHead title="Başka bir şey mi?" meta={`${String(projects.length).padStart(2, '0')} kaset`} />
            <ContactCta heading="Birlikte bir şey yapalım mı?" email={site.email} />
          </div>
        </div>
      </div>
    </div>
  )
}