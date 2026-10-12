import { Link } from 'react-router-dom'
import { AtariScene } from '@/components/three/AtariScene'
import { CassetteTile } from '@/components/three/CassetteTile'
import { CassetteGlyph, ArrowUpRight } from '@/components/icons'
import {
  ContactCta,
  LinkList,
  MetaList,
  SectionHead,
  TextBlock,
} from '@/components/sections'
import { about, feed, featured, funList, projects, site } from '@/data/site'

const capabilities: [string, string][] = [
  ['Ürün tasarımı', 'Araştırmadan piksele kadar uçtan uca akış.'],
  ['Tasarım sistemleri', 'Bileşen kütüphaneleri, token mimarisi, dokümantasyon.'],
  ['Etkileşimli arayüzler', 'Three.js, WebGL, hareket tasarımı ve prototipleme.'],
  ['Ön yüz mühendisliği', 'React, TypeScript, performans ve erişilebilirlik.'],
]

const quickFacts: [string, string][] = [
  ['Konum', site.location],
  ['Odak', 'Tasarım + kod'],
  ['Deneyim', '8+ yıl'],
  ['Durum', 'Yeni projelere açık'],
]

export default function Home() {
  const [lead, ...introRest] = about[0].body

  return (
    <>
      {/* ---------------- Hero — tam ekran, Atari sağda ---------------- */}
      <section className="grid min-h-[100svh] lg:grid-cols-2">
        <div className="flex flex-col justify-center px-6 pt-32 pb-14 md:px-10 lg:col-start-1 lg:row-start-1 lg:py-28 lg:pr-14 xl:pr-24">
          <div className="flex items-center gap-2.5">
            <CassetteGlyph className="h-5 w-5" />
            <span className="label text-mute">{site.location}</span>
          </div>
          <p className="label mt-8 text-mute">{site.title}</p>

          <h1 className="mt-6 max-w-[17ch] text-[clamp(1.9rem,3.4vw,3rem)] leading-[1.16] tracking-[-0.03em]">
            <span className="font-semibold">{site.name}</span>, {site.city}&rsquo;da
            tasarımı ve kodu aynı <span className="font-semibold">kasette</span>{' '}
            topluyorum.
          </h1>

          <div className="mt-10 max-w-[46ch] space-y-6 text-[clamp(1.05rem,1.35vw,1.2rem)] leading-[1.5] tracking-[-0.01em] text-ink-soft">
            {about[0].body.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-3">
            <a
              href="#isler"
              className="group inline-flex items-center gap-1.5 rounded-full bg-ink px-5 py-2.5 text-[16px] text-paper transition-transform duration-300 hover:-translate-y-0.5"
            >
              Seçili işler
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-hair-strong px-5 py-2.5 text-[16px] transition-colors duration-300 hover:border-ink"
            >
              İletişim
            </a>
          </div>

          <div className="mt-12 flex items-center gap-3 label text-mute">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Yeni projelere açık
          </div>
        </div>

        {/* 3B — büyük ekranda sağ yarıyı kaplar.
            Üstte navbar, altta başlık için pay bırakılıyor ki model
            hiçbir döndürme açısında ikisinin de üstüne binmesin. */}
        <div className="relative h-[50vh] w-full lg:col-start-2 lg:row-start-1 lg:h-auto">
          <div className="absolute inset-x-0 top-14 bottom-12 lg:top-20 lg:bottom-16">
            <AtariScene className="absolute inset-0" />
          </div>
          <p className="pointer-events-none absolute inset-x-0 bottom-0 text-center font-mono text-[12px] uppercase tracking-[0.18em] text-mute">
            Home Arcade · Model 1977
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        {/* ---------------- Hakkımda ---------------- */}
      <section className="border-t border-hair py-24">
        <SectionHead title="Hakkımda" />

        {/* giriş — büyük punto, tek kolon */}
        <p className="mt-12 max-w-[30ch] text-[clamp(1.35rem,2.7vw,2.15rem)] leading-[1.3] tracking-[-0.025em]">
          {lead}
        </p>
        {introRest.length > 0 && (
          <div className="mt-8 max-w-[52ch] space-y-5 text-[17px] leading-relaxed text-ink-soft">
            {introRest.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        )}

        {/* ayrıntı blokları — etiket üstte, metin tam genişlikte */}
        <div className="mt-20 grid gap-x-20 gap-y-14 md:grid-cols-2">
          {about.slice(1).map((section) => (
            <TextBlock key={section.heading} label={section.heading}>
              {section.body.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </TextBlock>
          ))}
        </div>

        {/* hızlı bilgiler */}
        <dl className="mt-20 grid grid-cols-2 gap-x-10 gap-y-8 border-t border-hair pt-10 sm:grid-cols-4">
          {quickFacts.map(([k, v]) => (
            <div key={k}>
              <dt className="label text-mute">{k}</dt>
              <dd className="mt-3 text-[16px] text-ink-soft">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ---------------- Seçili işler: tam ekran, 3 kaset yan yana ---------------- */}
      <section
        id="isler"
        className="flex min-h-[100svh] scroll-mt-16 flex-col justify-center border-t border-hair py-16"
      >
        <SectionHead
          title="Seçili işler"
          meta={
            <Link
              to="/projeler"
              className="inline-flex items-center gap-1.5 border-b border-hair-strong pb-0.5 transition-colors hover:border-ink"
            >
              Tümü ({projects.length})
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          }
        />

        <div className="mt-10 grid grid-cols-3 gap-x-3 gap-y-12 sm:gap-x-6">
          {featured.map((p) => (
            <Link
              key={p.id}
              to="/projeler"
              className="group flex flex-col items-center text-center"
            >
              <CassetteTile project={p} />
              <div className="mt-4 w-full sm:mt-5">
                <div className="flex items-baseline justify-center gap-1.5 sm:gap-2">
                  <h3 className="truncate text-[15px] font-medium tracking-tight sm:text-[20px]">
                    {p.name}
                  </h3>
                  <ArrowUpRight className="hidden h-4 w-4 shrink-0 text-mute transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink sm:block" />
                </div>
                <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-mute sm:text-[12px]">
                  {p.role} · {p.years}
                </p>
                <p className="mx-auto mt-3 hidden max-w-[34ch] text-[15px] leading-relaxed text-ink-soft sm:block">
                  {p.summary}
                </p>
                <ul className="mt-4 hidden flex-wrap justify-center gap-1.5 sm:flex">
                  {p.tags.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-hair px-2.5 py-0.5 font-mono text-[11px] tracking-wide text-mute"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ---------------- Yetenekler ---------------- */}
      <section className="border-t border-hair py-24">
        <SectionHead title="Yetenekler" />
        <MetaList items={capabilities} />
      </section>

      {/* ---------------- Listeler ---------------- */}
      <div className="grid gap-12 border-t border-hair pt-16 sm:grid-cols-2 sm:gap-10">
        <LinkList title="Eğleniyorum" rows={funList} />
        <LinkList title="Günlük" rows={feed} />
      </div>

      <ContactCta heading="Bir şey üretmek için konuşalım." email={site.email} />
      </div>
    </>
  )
}