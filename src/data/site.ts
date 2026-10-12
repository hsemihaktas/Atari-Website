import content from './content.json'

/**
 * Tüm site içeriği `content.json` dosyasından gelir.
 * Kasetlerin yazıları, renkleri ve etiketleri oradan düzenlenir.
 */

export type Project = {
  id: string
  /** Ana sayfada öne çıkan kaset mi? */
  featured: boolean
  /** Kaset üzerindeki oyun adı */
  name: string
  /** Etiketin sol alt köşesi */
  role: string
  /** Etiketin sağ alt köşesi */
  years: string
  /** Etiketin sol alt köşesinin üst satırı */
  location: string
  /** Kabuk rengi (plastik) */
  shell: string
  /** Etiket zemin rengi */
  label: string
  /** Etiket kapağı için resim: `public/` altından yol ya da tam URL (opsiyonel) */
  image?: string
  /** Etiket dokusu: scan | beam | dots (resim yoksa kullanılır) */
  art: string
  summary: string
  tags: string[]
  link?: string
}

export type LinkRow = {
  title: string
  note?: string
  meta?: string
  href?: string
}

export const site = content.site
export const about = content.about as { heading: string; body: string[] }[]
export const projects = content.cassettes as Project[]
/** Ana sayfada gösterilen öne çıkan kasetler */
export const featured = projects.filter((p) => p.featured)
export const funList = content.funList as LinkRow[]
export const feed = content.feed as LinkRow[]