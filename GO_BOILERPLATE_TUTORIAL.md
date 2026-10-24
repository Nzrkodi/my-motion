# GO-boilerplate tutorial video

Komposisi: `GoBoilerplateTutorial` · 1080×1920 · 30 fps · 59 detik.

Tujuan: tutorial setup dari clone repositori sampai aplikasi tersambung ke PostgreSQL: prasyarat, `.env`, `docker compose up`, migration + seed lewat runner bawaan, lalu verifikasi via `/ping` dan `/health`.

## Preview dan export

```sh
npm run dev
# Buka komposisi GoBoilerplateTutorial di Studio.

npx remotion render GoBoilerplateTutorial out/go-boilerplate-tutorial.mp4 --codec=h264 --crf=18 --audio-codec=aac
```

## Timeline

| Waktu | Adegan | Isi |
|---|---|---|
| 00–05 | Intro | Judul + diagram alur App → PostgreSQL |
| 05–12 | Prasyarat | Git, Go 1.26+, Docker |
| 12–19 | Step 1 | `git clone` + `cd GO-boilerplate` |
| 19–27 | Step 2 | `cp .env.example .env` + isi variabel `POSTGRES_*` dan `API_KEY` |
| 27–35 | Step 3 | `docker compose up -d --build` |
| 35–46 | Step 4 | Migration + seed via `docker compose exec app /app/migrate ...` |
| 46–54 | Step 5 | `GET /ping` → PONG, `GET /health` → postgres/redis UP |
| 54–59 | Outro | Checklist + link GitHub |

Command pada scene terminal mengikuti README repositori GO-boilerplate (jalur Docker). Animasi terminal merupakan ilustrasi workflow, bukan rekaman eksekusi live.

## Source dan audio

- `src/GoBoilerplateTutorial.tsx`: scene, animasi, teks, timing, dan narasi.
- `src/Root.tsx`: registrasi komposisi.
- `public/tutorial/01.wav` sampai `08.wav`: narasi laki-laki Indonesia, Microsoft Ardi (`id-ID-ArdiNeural`), rate +13% (scene 8 +18%).
- Musik: memakai ulang `public/go-promo/music.wav` dua kali berurutan dengan fade-out di akhir video.

Narasi dimulai 0,3 detik setelah tiap scene. Regenerasi contoh:

```sh
.venv/bin/edge-tts --voice id-ID-ArdiNeural --rate=+13% \
  --text "..." --write-media public/tutorial/01.wav
```

Catatan pelafalan: teks TTS memakai ejaan fonetik untuk kata serapan bila pelafalan default melenceng (lihat catatan di `GO_BOILERPLATE_VIDEO.md`).

## Naskah narasi

1. Tutorial singkat: install Go Boilerplate sampai tersambung ke database.
2. Siapkan tiga hal: Git, Go versi terbaru, dan Docker yang sedang berjalan.
3. Langkah pertama: clone repositorinya, lalu masuk ke folder proyek.
4. Salin dot env example menjadi dot env. Lalu isi API key dan kredensial PostgreSQL kamu.
5. Jalankan docker compose up. Aplikasi, PostgreSQL, dan Redis langsung berjalan bersamaan.
6. Terapkan migration lewat runner bawaan, lalu jalankan seed. Tidak perlu install tools tambahan.
7. Cek slash ping: server membalas PONG. Cek slash health: PostgreSQL dan Redis UP.
8. Selesai! Detail lengkap ada di README.
