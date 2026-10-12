import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

/** Sondaki eğik çizgiyi atıp protokolü tamamlar. */
function normalizeSite(value?: string) {
  const raw = value?.trim()
  if (!raw) return ''
  const withProto = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`
  return withProto.replace(/\/+$/, '')
}

/**
 * Paylaşım görseli etiketlerini mutlak URL'ye çevirir.
 *
 * `og:image` göreli yolla da çalışır ama Slack, WhatsApp ve Facebook gibi
 * bazı platformlar göreli adresi çözemeyip görseli atlayabiliyor. Site adresi
 * build ortamından gelir — kodda hiçbir yer yazmana gerek yok:
 *
 *   Vercel  → VERCEL_PROJECT_PRODUCTION_URL, onu bulamazsa VERCEL_URL
 *              ikisi de Vercel tarafından otomatik verilir
 *   yerel   → SITE_URL=... ile; hiçbiri yoksa göreli yol olduğu gibi kalır
 *
 * Alan adı sonradan değişirse tek yapman gereken: Vercel'de ortam
 * değişkeni olarak `SITE_URL` tanımlamak. Öncelik sırası bu yüzden
 * SITE_URL > VERCEL_PROJECT_PRODUCTION_URL > VERCEL_URL.
 */
function absoluteOgUrls(): Plugin {
  const site = normalizeSite(
    process.env.SITE_URL ??
      process.env.VERCEL_PROJECT_PRODUCTION_URL ??
      process.env.VERCEL_URL,
  )

  return {
    name: 'og-absolute-urls',
    // Sadece üretimde: geliştirmede gereksiz iş
    apply: 'build',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        if (!site) return html
        return html
          .replaceAll('content="/og.png"', `content="${site}/og.png"`)
          .replaceAll('property="og:url"', `property="og:url" content="${site}/"`)
      },
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), absoluteOgUrls()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})