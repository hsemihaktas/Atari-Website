# Rewosama — kişisel site

Vite + React + TypeScript + Tailwind v4 + Three.js.

## Komutlar

```bash
npm install
npm run dev      # geliştirme sunucusu
npm run build    # üretim derlemesi
npm run preview  # derlemeyi yerelde aç
```

## İçerik

Tüm metin, kaset ve bağlantı verileri iki dosyada, aynı şemayla:

```
src/data/en.json   İngilizce (varsayılan)
src/data/tr.json   Türkçe
```

Varsayılan dil **İngilizce**. İlk girişte işletim sistemi dili yok sayılır,
yani site daima İngilizce açılır. Seçim `localStorage`'da `rewosama-locale`
anahtarıyla tutulur ve navbar'daki `EN` / `TR` düğmesiyle değiştirilir.

### Neler çevrildi

Her iki JSON'da beş bölüm var:

| bölüm      | içerik                                                   |
| ---------- | -------------------------------------------------------- |
| `site`     | ad, unvan, şehir, e-posta, sosyal linkler                |
| `about`    | hakkımda blokları (başlık + paragraflar)                 |
| `cassettes`| projeler — etiket yazıları, renkler, özetler, etiketler   |
| `funList`  | "eğleniyorum" listesi                                     |
| `feed`     | günlük listesi                                            |
| `ui`       | arayüz metinleri (butonlar, başlıklar, nav, footer, tema) |

Arayüz metinleri `ui` altında; böylece buton yazısı ya da bölüm başlığı
değiştirmek için JSON'u düzenlemek yeterli, koda dokunmana gerek yok.

### Yer tutucular ve işaretleme

- `{count}` yerine tutucu: `t.home.all` → `"All ({count})"`
- `**kalın**`: başlıklardaki vurgulu parçalar. `RichText` bileşeni işler,
  böylece iki dilde de cümle yapısı bozulmadan doğal görünür:

  ```jsonc
  "headline": "**Rewosama** — from **Istanbul**, I keep design and code together in one **cartridge**."
  ```

### Kodda kullanım

```tsx
import { useContent, useT, useLocale } from '@/i18n'

const t = useT()                    // arayüz metinleri
const { site, projects } = useContent()   // dil değişince yeniden türer
const { other, setLocale } = useLocale()  // dil değiştirme
```

- `src/i18n/index.ts` — sözlükler, tipler, hook'lar
- `src/i18n/provider.tsx` — `I18nProvider` (uygulamayı `main.tsx`'te sarar)
- `src/data/site.ts` — içerik tipleri (artık veri dışa aktarmıyor)

`<html lang>` hem ilk boyamada (`index.html` içindeki betik) hem de dil
değişiminde güncelleniyor; sekme başlığı da dile uyuyor.

`cassettes` dizisi kasetleri besler:

| alan       | açıklama                                             |
| ---------- | ---------------------------------------------------- |
| `id`       | benzersiz anahtar                                     |
| `featured` | `true` ise ana sayfadaki "Seçili işler"de görünür     |
| `name`     | kasetin üzerindeki oyun adı                          |
| `role`     | etiketin sol alt köşesi                              |
| `years`    | etiketin sağ alt köşesi                              |
| `location` | etiketin sol alt üst satırı                          |
| `shell`    | kabuk rengi (koyu plastik)                            |
| `label`    | etiket zemin rengi (dönemin soluk tonları)            |
| `image`    | etiket kapağındaki görsel — aşağıya bak             |
| `summary`  | ana sayfadaki açıklama                               |
| `tags`     | etiketler                                             |
| `link`     | dış bağlantı (opsiyonel)                             |

Yeni kaset eklemek için `cassettes` dizisine bir nesne daha ekle — 3B model,
etiket dokusu ve kart otomatik üretilir.

## Etiket görselleri

`image` alanı iki şekilde çalışır:

```jsonc
"image": "/images/arc.jpg"              // public/ altından — en hızlı yol
"image": "https://cdn.site/kapak.webp"  // uzak adres (CORS açık olmalı)
```

- Dosyaları `public/images/` altına koy. Vite bunları `/images/...` adresinden
  doğrudan servis eder.
- Görsel, etiketin siyah bant ile alt yazılar arasındaki kapak alanına
  **kapsayacak şekilde merkezden kırparak** yerleştirilir. En-boy oranı
  önemli değil, kadraj önemli.
- Yükleme bitene kadar yerine geometrik kapak çizilir, sonra resimle
  değişir — sayfa zıplamaz.
- Görsel yüklenemezse kaset yine sorunsuz görünür, geometrik kapak kalır.
- Alanı tamamen kaldırırsan da kaset çalışır.

`public/images/` içindeki `*.svg` dosyaları yer tutucudur. Kendi
`.jpg` / `.png` / `.webp` dosyalarını koyup JSON'daki yolu güncellemen yeterli.

## Etkileşim dili

Sitedeki her tıklanabilir öğe tek bir sistemden geliyor, kopyala-yapıştır
stiller yok:

| rol            | nerede                                  | davranış                                   |
| -------------- | --------------------------------------- | ------------------------------------------ |
| `Action`       | hero butonları                          | hap; `solid` ve `outline` birbirinin aynası |
| `TextLink`     | "Ziyaret et", CTA e-postası, "Tümü (n)" | alt çizgi + ok birlikte hareket eder      |
| `NavItem`      | navbar ve footer bağlantıları           | metin + soldan açılan ince çizgi         |
| `iconButton`   | tema düğmesi                            | çerçevesiz ikon; hover'da yumuşak daire   |

- `solid` hover'da `outline`'a, `outline` hover'da `solid`'a dönüşüyor.
- Süre, easing ve ok hareketi tek yerden geliyor:
  `src/components/interaction.ts` (`T`, `EASE`, `ARROW`, sınıf üreticileri).
- Bileşenler `src/components/ui.tsx` içinde: `Action`, `TextLink`,
  `NavUnderline`.

## Tema

Aydınlık ve karanlık tema destekleniyor. Nav'daki düğmeyle değiştiriliyor,
tercih `localStorage`'da `rewosama-theme` anahtarıyla tutuluyor. İlk girişte
işletim sistemindeki tercih kullanılıyor.

- Tema `<html>` üzerine `.dark` sınıfı olarak uygulanıyor, renkler CSS
  değişkenlerinden geliyor (`src/index.css`).
- `index.html` içinde küçük bir betik, React yüklenmeden önce temayı
  uyguluyor — sayfa boyanırken flaş olmuyor.
- 3B sahneler de temayı okuyor: karanlıkta kabuk rengi `shade()` ile açılıyor
  (siyah zemin üzerinde kaybolmasın diye), ışık şiddetleri ve ortam rengi
  sertleşiyor. Etiket kâğıt rengi her iki temada aynı kalıyor.
- `color-scheme` ve `theme-color` meta etiketleri temayla eşleşiyor.
- `theme.ts` içindeki `shade(hex, amount)` rengi açar (`+`) veya koyultur (`−`),
  3B modellerde karanlık zemine göre ayar yapmak için kullanılıyor.

## Yapı

```
index.html                  tema betiği (ilk boyama öncesi .dark uygular)
public/
  favicon.svg               kaset silüetli site ikonu
  images/                   kaset etiketi görselleri (yer tutucu *.svg)
src/
  index.css                 palet değişkenleri, .dark varyantı, temel katman
  theme.ts                  useTheme() + shade() yardımcıları
  i18n/
    index.ts                sözlükler, locale durumu, useT / useContent / useLocale
    provider.tsx            I18nProvider — uygulamayı sarar
  data/
    en.json                 İngilizce içerik (varsayılan)
    tr.json                 Türkçe içerik
    site.ts                 içerik tipleri
  components/
    Nav.tsx                 navbar
    Footer.tsx              alt bilgi
    ThemeToggle.tsx         güneş/ay düğmesi
    icons.tsx               CassetteGlyph, ArrowUpRight
    interaction.ts          ortak süre / easing / ok hareketi / sınıflar
    ui.tsx                  Action, TextLink, NavUnderline, RichText
    sections.tsx            sayfalar arası ortak bloklar
    three/
      AtariConsole.tsx      prosedürel oyun konsolu modeli
      AtariScene.tsx        ana sayfa sahnesi (konsol + takılı kaset)
      Cassette.tsx          tek kaset (ExtrudeGeometry silüeti)
      CassetteTile.tsx      proje kartı / öne çıkan kaset için 3B sahne
      makeLabelTexture.ts   etiket + kabuk dokularını canvas'ta üretir
  pages/
    Home.tsx                tek sayfalık açılış (landing)
    Projects.tsx            tüm kasetler
    About.tsx               eski rota → ana sayfa
```

## Notlar

- Kaset ve konsol modelleri hazır 3B dosya değil, kodla üretiliyor.
- Etiket görselleri de `en.json` / `tr.json` içindeki renklerden ve `image`
  alanından canvas'a çiziliyor.
- Ana sayfadaki konsolu **basılı tutup sürükleyerek** döndürebilirsin; bırakınca
  kısa bir ataletle devam ediyor. Zeminde gölge yok, havada duruyor.
- Kamera, konsolu ekran oranına göre otomatik kadraja alıyor — pencereyi
  boyutlandırdığında model taşmıyor.