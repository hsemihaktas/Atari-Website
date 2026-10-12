import { AtariScene } from '@/components/three/AtariScene'
import { Action } from '@/components/ui'
import { useContent, useT } from '@/i18n'

/**
 * Var olmayan sayfa.
 *
 * Fikir: konsolun kaset yuvası boş — kullanıcının aradığı sayfa takılı
 * değil. `AtariScene` bu yüzden `emptySlot` ile kaseti gizliyor.
 */
export default function NotFound() {
  const t = useT()
  const { site } = useContent()
  const n = t.notFound

  return (
    <section className="grid min-h-[100svh] grid-cols-[1fr_1fr] items-center gap-x-4 px-6 md:gap-x-8 lg:px-10 lg:gap-x-16">
      <div className="flex flex-col justify-center py-28">
        <p className="label text-mute">{n.kicker}</p>

        <h1 className="mt-6 text-[clamp(3rem,9vw,7.5rem)] leading-[0.86] tracking-[-0.055em]">
          {n.code}
        </h1>

        <h2 className="mt-7 max-w-[22ch] text-[clamp(1.2rem,2.2vw,1.75rem)] leading-[1.24] tracking-[-0.025em]">
          {n.title}
        </h2>

        <p className="mt-5 max-w-[46ch] text-[17px] leading-relaxed text-ink-soft">{n.body}</p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <Action href="/">{n.back}</Action>
          <Action href="/projeler" variant="outline" arrow={false}>
            {n.projects}
          </Action>
        </div>

        {/* konsol boş yuvada: tek çizgili alt künye, sitenin geri kalanıyla aynı */}
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-hair pt-6 label text-mute">
          <span>{n.sceneCaption}</span>
          <span className="h-3 w-px bg-hair-strong" aria-hidden="true" />
          <span>{site.location}</span>
        </div>
      </div>

      <div className="relative h-[62svh] w-full">
        {/* dar kutu: model küçülüyor, yukarı kaydırma kapalı */}
        <AtariScene className="absolute inset-0" emptySlot scale={1.22} liftMax={0} />
      </div>
    </section>
  )
}