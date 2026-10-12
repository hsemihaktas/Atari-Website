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

Tüm metin, kaset ve bağlantı verileri tek dosyada:

```
src/data/content.json
```

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
  data/
    content.json            tüm içerik
    site.ts                 tipler + türetilmiş listeler (featured, projects)
  components/
    Nav.tsx                 navbar
    Footer.tsx              alt bilgi
    ThemeToggle.tsx         güneş/ay düğmesi
    icons.tsx               CassetteGlyph, ArrowUpRight
    interaction.ts          ortak süre / easing / ok hareketi / sınıflar
    ui.tsx                  Action, TextLink, NavUnderline
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
- Etiket görselleri de `content.json`'daki renklerden ve `image` alanından
  canvas'a çiziliyor.
- Ana sayfadaki konsolu **basılı tutup sürükleyerek** döndürebilirsin; bırakınca
  kısa bir ataletle devam ediyor. Zeminde gölge yok, havada duruyor.
- Kamera, konsolu ekran oranına göre otomatik kadraja alıyor — pencereyi
  boyutlandırdığında model taşmıyor.