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

## Yapı

```
src/
  components/
    three/
      AtariConsole.tsx      prosedürel oyun konsolu modeli
      AtariScene.tsx        ana sayfa sahnesi (konsol + takılı kaset)
      Cassette.tsx          tek kaset (ExtrudeGeometry silüeti)
      CassetteTile.tsx      proje kartı / öne çıkan kaset için 3B sahne
      makeLabelTexture.ts   etiket + kabuk dokularını canvas'ta üretir
    sections.tsx            sayfalar arası ortak bloklar
  pages/
    Home.tsx        tek sayfalık açılış (landing)
    Projects.tsx    tüm kasetler
    About.tsx       eski rota → ana sayfa
  data/
    content.json    tüm içerik
public/
  images/           kaset etiketi görselleri
```

## Notlar

- Kaset ve konsol modelleri hazır 3B dosya değil, kodla üretiliyor.
- Etiket görselleri de `content.json`'daki renklerden ve `image` alanından
  canvas'a çiziliyor.
- Ana sayfadaki konsolu **basılı tutup sürükleyerek** döndürebilirsin; bırakınca
  kısa bir ataletle devam ediyor. Zeminde gölge yok, havada duruyor.
- Kamera, konsolu ekran oranına göre otomatik kadraja alıyor — pencereyi
  boyutlandırdığında model taşmıyor.