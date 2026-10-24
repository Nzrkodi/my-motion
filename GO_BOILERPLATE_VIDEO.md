# GO-boilerplate marketing video

Komposisi: `GoBoilerplatePromo` · 1080×1920 · 30 fps · 45 detik.

Tujuan: mengenalkan fondasi backend Go, menjelaskan migration CLI, lalu mengarahkan penonton ke https://github.com/Nzrkodi/GO-boilerplate untuk clone dan membaca README.

## Preview dan export

```sh
npm run dev
# Buka komposisi GoBoilerplatePromo di Studio.

npx remotion render GoBoilerplatePromo out/go-boilerplate-promo.mp4 --codec=h264 --crf=18 --audio-codec=aac --port=3101
```

## Timeline

| Waktu | Adegan | Isi |
|---|---|---|
| 00–06 | Hook | Setup backend yang berulang |
| 06–15 | Produk | Fiber, PostgreSQL, Redis, handler–service–repository |
| 15–25 | Migration | Generator, bagian up/down dalam satu file, rollback |
| 25–34 | Fondasi | Fresh/seed, logging, request ID, Docker, test/CI |
| 34–45 | CTA | Alamat GitHub dan perintah clone |

Animasi terminal merupakan ilustrasi workflow, bukan rekaman eksekusi live. Nomor 000004 pada contoh migration mengikuti tiga migration yang ada saat video dibuat; generator menentukan nomor sesungguhnya dari isi folder.

## Source dan audio

- `src/GoBoilerplatePromo.tsx`: scene, animasi, teks, timing, dan CTA.
- `src/Root.tsx`: registrasi komposisi baru; komposisi demo lama dipertahankan.
- `public/go-promo/01-male.wav` sampai `05-male.wav`: narasi laki-laki Indonesia, suara Microsoft Ardi (`id-ID-ArdiNeural`).
- `public/go-promo/music.wav`: musik ambient sintetis yang dibuat untuk video ini.

Narasi berupa suara sintetis. Untuk menggunakan suara rekaman sendiri, ganti WAV dengan durasi yang muat di scene masing-masing. Narasi mulai 0,3 detik setelah scene; adegan pertama mulai 0,4 detik. Aset audio lokal disertakan sehingga preview dan render tidak memerlukan layanan TTS eksternal.

## Naskah narasi

1. Mulai proyek Go, tapi setup backend selalu diulang dari nol?
2. Kenalan dengan Go Boilerplate. Fiber, PostgreSQL, dan Redis, dengan struktur handler, service, dan repository yang tertata.
3. Buat migration cukup satu perintah. Isi bagian up dan down dalam satu file. Lalu jalankan, rollback, atau reset schema saat development.4. Sudah dilengkapi seed, logging, request ID, Docker, test, dan CI. Tinggal sesuaikan fondasinya untuk kebutuhan proyekmu.
5. Lihat source code-nya di GitHub, Nzrkodi, Go Boilerplate. Clone repositorinya, ikuti README, dan mulai bangun backend Go kamu.

Catatan pelafalan: teks yang dikirim ke TTS memakai ejaan fonetik untuk kata serapan — misalnya "rollback" ditulis "rolbek" agar Ardi melafalkannya "rol-bek", bukan "rol-bak". Kata lain: "boilerplate" → "boilerpleit", "database" → "deitebeis". Regenerasi narasi 3:

```sh
.venv/bin/edge-tts --voice id-ID-ArdiNeural --rate=+13% \
  --text "Buat migration cukup satu perintah. Isi bagian up dan down dalam satu file. Lalu jalankan, rolbek, atau reset schema saat development." \
  --write-media public/go-promo/03-male.wav
```

## Caption publikasi

Mulai backend Go dengan fondasi yang sudah tertata: Fiber, PostgreSQL, Redis, migration CLI satu file, Docker, logging, test, dan CI.

Lihat source code dan cara menjalankannya:
https://github.com/Nzrkodi/GO-boilerplate

#Golang #GoLangIndonesia #BackendDeveloper #PostgreSQL #Fiber

## Versi suara laki-laki

`out/go-boilerplate-promo-male.mp4` memakai suara Ardi; file utama `out/go-boilerplate-promo.mp4` juga diperbarui ke versi ini. Versi suara sebelumnya disimpan sebagai `out/go-boilerplate-promo-female.mp4`. Visual dan durasi 45 detik tetap sama. Narasi disesuaikan kecepatannya per adegan agar tidak melewati batas scene.
