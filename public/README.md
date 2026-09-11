# Static assets

Files here are served from the site root. Nothing in this folder is bundled or
hashed, so the paths below are the exact ones referenced in the code.

## Yang masih perlu diisi

| File | Dipakai di | Keterangan |
| --- | --- | --- |
| `cv/Muhammad-Ulil-Albab-CV.pdf` | `PROFILE.cvUrl` — tombol "Download CV" di navbar, hero, mobile menu, dan section Contact | Sampai file ini ada, tombol download akan menghasilkan 404. |
| `images/profile.jpg` | `PROFILE.avatar` | Foto profil/avatar. Belum dirender di UI — hero saat ini memakai background image, bukan avatar. |
| `fonts/HelveticaNeue-Roman.woff2` + `.woff` | `@font-face` di `src/index.css` | Opsional. Lihat `fonts/README.md`. |

## Hero assets

Tiga asset hero (background image, front video, overlay PNG) saat ini masih
memakai URL placeholder eksternal yang didefinisikan di `src/constants.ts`.
Untuk menggantinya dengan file sendiri:

1. Taruh file di `public/images/` dan `public/video/`.
2. Ubah nilai di `src/constants.ts`, misalnya:

```ts
export const BG_IMAGE = '/images/hero-bg.jpg'
export const FRONT_VIDEO = '/video/hero-showcase.mp4'
export const OVERLAY_IMAGE = null // set null untuk mematikan layer overlay
```

`OVERLAY_IMAGE` boleh `null` — layer overlay otomatis tidak dirender.

## Data teks

Semua konten teks (nama, pengalaman, skill, project, publikasi, sertifikasi)
ada di satu file: `src/data/portfolio.ts`. Cari komentar `TODO` untuk nilai
yang masih placeholder:

- Dua entry terakhir di `PROJECTS` — masih slot placeholder

## Contact form

Form di section Contact mengirim submission ke [Web3Forms](https://web3forms.com),
yang meneruskannya ke email terdaftar di akun tersebut (`PROFILE.email`).

Access key ada di `WEB3FORMS_ACCESS_KEY` (`src/data/portfolio.ts`). Key ini
memang **public** — dipakai di client-side dan hanya bisa membuat submission,
tidak bisa membaca submission lama. Jadi aman ada di repo.

Spam ditahan lewat field honeypot `botcheck` yang tersembunyi dari user.
Kalau volume spam naik, aktifkan reCAPTCHA/hCaptcha dari dashboard Web3Forms.
