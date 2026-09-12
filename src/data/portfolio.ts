/**
 * Single source of truth for every piece of portfolio content.
 * Items marked TODO still need real values from the owner.
 */

export const PROFILE = {
  name: 'Muhammad Ulil Albab',
  role: 'Software Engineer & AI Engineer',
  tagline:
    'Fresh Graduate in Informatics Engineering | Passionate about Team Collaboration & Technical Growth',
  location: 'Samarinda, Kalimantan Timur, Indonesia',
  email: 'sir.ulilalbab@gmail.com',
  github: 'https://github.com/Albaaaaaa',
  linkedin: 'https://www.linkedin.com/in/muh-ulil-albab',
  cvUrlId: '/CV/ind/Muhammad_Ulil_Albab_Resume_ID.pdf',
  cvUrlEn: '/CV/eng/Muhammad_Ulil_Albab_Resume.pdf',
  avatar: '/images/profile.jpg',
} as const

/**
 * Web3Forms access key for the contact form. This is a public key by design —
 * it is meant to be used in client-side code and cannot be used to read past
 * submissions. Submissions are delivered to the email registered at
 * web3forms.com (PROFILE.email).
 */
export const WEB3FORMS_ACCESS_KEY = '828d5d6a-6647-4bf9-b285-f493d9c77fa4'

export const SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'education', label: 'Education' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'publikasi', label: 'Publikasi' },
  { id: 'sertifikasi', label: 'Sertifikasi' },
  { id: 'contact', label: 'Contact' },
] as const

export const ABOUT_POINTS = [
  'Fresh graduate Informatics Engineering, lulus dengan predikat Cum Laude sebagai Lulusan Terbaik Fakultas Sains dan Teknologi (GPA 3.95/4.00).',
  'Fokus studi pada Software Engineering dan Artificial Intelligence.',
  'Pengalaman hands-on membangun sistem berbasis web, manajemen database relasional, dan riset machine learning.',
  'Aktif dalam proyek teknologi akademik, menggabungkan technical skill dengan kolaborasi tim.',
] as const

export const ABOUT_STATS = [
  { value: '3.95', label: 'GPA / 4.00' },
  { value: 'Cum Laude', label: 'Lulusan Terbaik Fakultas' },
  { value: '6+', label: 'Project Dikerjakan' },
  { value: '1', label: 'Publikasi Jurnal' },
] as const

export type GalleryItem = {
  /** Path lokal (mis. '/images/gallery/...') atau URL gambar open source. */
  src: string
  alt: string
  title?: string
  description?: string
}

export const EXPERIENCE = [
  {
    role: 'Asisten Pranata Komputer Intern',
    company: 'Badan Pusat Statistik (BPS) Provinsi Kalimantan Timur',
    period: 'Agu 2026 – Sekarang',
    location: 'Samarinda',
    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop',
        alt: 'Kolaborasi tim BPS',
        title: 'Kolaborasi Tim',
        description: 'Dokumentasi kegiatan kolaborasi tim di BPS',
      },
      {
        src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=800&auto=format&fit=crop',
        alt: 'Diskusi pengembangan sistem',
        title: 'Pengembangan Sistem',
        description: 'Diskusi pengembangan sistem informasi dan aplikasi',
      },
      {
        src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
        alt: 'Analisis data dan visualisasi',
        title: 'Analisis Data',
        description: 'Pengolahan dan visualisasi data statistik',
      },
    ] as GalleryItem[],
    videos: [
      {
        label: 'Konten Publikasi Instagram BPS',
        url: 'https://www.instagram.com/reel/DcLgO_xNqsz/',
      },
    ] as { label: string; url: string }[],
    points: [
      'Memberikan IT support serta membantu troubleshooting perangkat keras, perangkat lunak, dan permasalahan teknis pengguna.',
      'Membantu pengelolaan sistem informasi, basis data, dan infrastruktur TI untuk mendukung kegiatan operasional.',
      'Mendukung pengembangan aplikasi dan dashboard sederhana sesuai kebutuhan unit kerja.',
      'Melakukan pengolahan, validasi, dan analisis data menggunakan Microsoft Excel untuk mendukung penyusunan statistik dan laporan.',
      'Membuat visualisasi data serta menyajikan informasi dalam bentuk tabel, grafik, dan infografis.',
      'Membantu dokumentasi teknis terkait sistem, pengolahan data, dan kegiatan pengembangan TI.',
    ],
  },
  {
    role: 'Software Engineer',
    company: 'Dinas Perpustakaan dan Kearsipan Kota Samarinda',
    period: 'Jul 2024 – Sep 2024 (3 bulan)',
    location: 'Samarinda, Kalimantan Timur, Indonesia',
    // TODO: ganti dengan foto dokumentasi asli di public/images/gallery/experience/
    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=800&auto=format&fit=crop',
        alt: 'Dokumentasi kegiatan kerja tim',
        title: 'Kolaborasi Tim',
        description: 'Dokumentasi kegiatan selama bekerja',
      },
      {
        src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop',
        alt: 'Diskusi proyek sistem arsip',
        title: 'Pengembangan Sistem',
        description: 'Diskusi pengembangan sistem arsip digital',
      },
      {
        src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop',
        alt: 'Presentasi hasil kerja',
        title: 'Presentasi',
        description: 'Presentasi hasil pekerjaan',
      },
    ] as GalleryItem[],
    points: [
      'Mengembangkan dan membantu mengelola sistem manajemen arsip berbasis web menggunakan CodeIgniter 4 dan MySQL, termasuk proses digitalisasi data.',
      'Berkontribusi dalam pembuatan konten video sebagai talent dan video editor untuk keperluan publikasi.',
    ],
    /** Hasil konten video publikasi selama masa kerja. */
    videos: [
      {
        label: 'Konten Publikasi #1',
        url: 'https://youtu.be/pavnBKvaxaw',
      },
      {
        label: 'Konten Publikasi #2',
        url: 'https://youtu.be/7EGyKeTlefw',
      },
    ],
  },
] as const

export const EDUCATION = [
  {
    school: 'Universitas Muhammadiyah Kalimantan Timur',
    program: 'S1 Informatics Engineering • GPA 3.95/4.00',
    period: '2022 – 2026',
    location: 'Sidodadi, Samarinda Ulu, Kota Samarinda, Kalimantan Timur',
    gallery: [
      {
        src: '/images/gallery/education/S1/Wisuda_UMKT_Ke-XIV_Samarinda.png',
        alt: 'Wisuda UMKT Ke-XIV Samarinda',
        title: 'Dokumentasi Resmi Wisuda Ke-XIV',
        description:
          'Acara wisuda Universitas Muhammadiyah Kalimantan Timur (UMKT) yang diselenggarakan pada tanggal 15 April 2026 di Convention Hall Samarinda.',
      },
      {
        src: '/images/gallery/education/S1/Lomba_Robotik_Muhammadiyah_01Juni2024.jpeg',
        alt: 'Lomba Robotik CNN Indonesia x BAKTI Kominfo di Universitas Muhammadiyah Kalimantan Timur',
        title: 'Lomba Robotik — CNN Indonesia x BAKTI Kominfo',
        description:
          'Universitas Muhammadiyah, Kalimantan Timur | 1 Juni 2024. Berpartisipasi sebagai Tim dalam kompetisi robotik yang diselenggarakan CNN Indonesia bekerja sama dengan BAKTI Kominfo.',
      },
      {
        src: '/images/gallery/education/S1/Dokumentasi_Sosialisasi_Wawancara_dan_Penyerahan_Bantuan_Sekolah_25April2024.png',
        alt: 'Sosialisasi, wawancara, dan penyaluran bantuan kebutuhan sekolah',
        title: 'Sosialisasi, Wawancara, dan Penyaluran Bantuan Kebutuhan Sekolah',
        description:
          'Pada 25 April 2024, sosialisasi, wawancara, serta penyerahan bantuan kebutuhan sekolah dilaksanakan guna mendukung kelancaran kegiatan belajar siswa.',
      },
      {
        src: '/images/gallery/education/S1/Dokumentasi_Pembuatan_Maket_Smart_Home_IoT_5Desember2025.png',
        alt: 'Perancangan dan pembuatan maket smart home berbasis IoT',
        title: 'Perancangan dan Pembuatan Maket Smart Home Berbasis IoT',
        description:
          'Pada 5 Desember 2025, tim berhasil merancang dan membuat maket smart home berbasis IoT untuk mengoptimalkan otomatisasi dan efisiensi energi rumah.',
      },
      {
        src: '/images/gallery/education/S1/Edukasi_Kreatif_dan_Penyaluran_Bantuan_Kebutuhan_Sekolah_di_TK.png',
        alt: 'Edukasi kreatif dan penyaluran bantuan kebutuhan sekolah di TK',
        title: 'Edukasi Kreatif dan Penyaluran Bantuan Kebutuhan Sekolah di TK',
        description:
          'Melaksanakan sosialisasi edukatif di TK, wawancara pihak sekolah, serta penyerahan bantuan sarana belajar bagi para siswa.',
      },
    ] as GalleryItem[],
    points: [
      'Lulus Cum Laude sebagai Lulusan Terbaik Fakultas Sains dan Teknologi.',
      'Fokus studi: Software Engineering dan Artificial Intelligence.',
    ],
  },
  {
    school: 'Sekolah Menengah Atas Negeri 13 Samarinda',
    program: 'SMA atau Sederajat • Nilai 85.99',
    period: '2019 – 2022',
    location: 'Samarinda Ilir, Kota Samarinda, Kalimantan Timur, Indonesia',
    points: [],
  },
] as const

export const SKILL_GROUPS = [
  {
    category: 'Backend & Web Development',
    icon: '⚙️',
    items: [
      'CodeIgniter 4',
      'PHP',
      'Laravel',
      'Django',
      'WordPress',
      'HTML5 & CSS3',
      'Bootstrap',
      'Laragon',
    ],
  },
  {
    category: 'Mobile & Programming',
    icon: '💻',
    items: ['Flutter', 'Java', 'Git'],
  },
  {
    category: 'Database',
    icon: '🗄️',
    items: ['MySQL'],
  },
  {
    category: 'AI / Machine Learning',
    icon: '🧠',
    items: [
      'Python',
      'Computer Vision',
      'Convolutional Neural Networks (CNN)',
      'Support Vector Regression',
      'Genetic Algorithm',
    ],
  },
  {
    category: 'Data Science',
    icon: '📊',
    items: [
      'Microsoft Fabric',
      'Data Engineering',
      'Probability & Statistics',
      'Data Mining',
    ],
  },
  {
    category: 'Systems, Security & Blockchain',
    icon: '🔐',
    items: [
      'Linux System Administration',
      'Kriptografi',
      'Smart Contracts',
    ],
  },
  {
    category: 'Design & Productivity',
    icon: '🎨',
    items: ['UI/UX Design', 'Microsoft Word'],
  },
  {
    category: 'Professional Skills',
    icon: '🤝',
    items: ['Problem Solving', 'Critical Thinking', 'Adaptability'],
  },
] as const

export type Project = {
  title: string
  description: string
  stack: string[]
  demo?: string
  repo?: string
  placeholder?: boolean
  /** Ganti dengan path gambar sendiri, mis. '/images/projects/nama.jpg' */
  image?: string
}

export const PROJECTS: Project[] = [
  {
    title: 'Digital Archive Management System with CodeIgniter 4',
    description:
      'Sistem manajemen arsip digital untuk instansi pemerintah: pengelolaan dokumen, digitalisasi data, dan pencarian arsip berbasis web.',
    stack: ['PHP', 'CodeIgniter 4', 'MySQL'],
    demo: 'https://silayar-perpus.gt.tc/',
    repo: 'https://github.com/Albaaaaaa/Digital-Archive-Management-System-with-CodeIgniter-4',
    image:
      'https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'System for Diabetes Detection',
    description:
      'Sistem prediksi risiko diabetes berbasis machine learning dari parameter kesehatan pasien.',
    stack: ['Python', 'Machine Learning'],
    demo: 'https://alba-portofolio.site.je/',
    repo: 'https://github.com/Albaaaaaa/System-for-Diabetes-Detection',
    image:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'Islamic Companion App for Worship and Learning',
    description:
      'Aplikasi pendamping ibadah dan pembelajaran Islam: jadwal salat, bacaan, dan materi dakwah dalam satu tempat.',
    stack: ['Web App', 'JavaScript'],
    demo: 'https://dakwah.albajourney.my.id/',
    repo: 'https://github.com/Albaaaaaa/Islamic-Companion-App-for-Worship-and-Learning',
    image:
      'https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'Job Application System',
    description:
      'Platform lamaran kerja dengan alur pendaftaran pelamar, manajemen lowongan, dan pemantauan status seleksi.',
    stack: ['Web App', 'Database'],
    demo: 'https://jobs.albajourney.my.id/',
    repo: 'https://github.com/Albaaaaaa/Job-Application-System',
    image:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'Hybrid SVR-GA Model for Forecasting Stock Prices',
    description:
      'Model hybrid Support Vector Regression yang dioptimasi Genetic Algorithm untuk prediksi harga saham. Dasar dari publikasi jurnal IJAIDM.',
    stack: ['Python', 'SVR', 'Genetic Algorithm'],
    repo: 'https://github.com/Albaaaaaa/Hybrid-SVR-GA-Model-for-Forecasting-Stock-Prices',
    image:
      'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'Facial Expression Recognition System Using CNN',
    description:
      'Sistem pengenalan ekspresi wajah menggunakan Convolutional Neural Network dan teknik computer vision.',
    stack: ['Python', 'CNN', 'Computer Vision'],
    repo: 'https://github.com/Albaaaaaa/Facial-Expression-Recognition-System-Using-Convolutional-Neural-Networks-CNN-',
    image:
      'https://images.unsplash.com/photo-1526378800651-c32d170fe6f8?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'Project berikutnya',
    description: 'Slot ini menunggu detail project tambahan.',
    stack: [],
    placeholder: true,
  },
  {
    title: 'Project berikutnya',
    description: 'Slot ini menunggu detail project tambahan.',
    stack: [],
    placeholder: true,
  },
]

export const PUBLICATION = {
  title:
    'Hybrid Support Vector Regression-Genetic Algorithm Model for Forecasting Stock Price',
  journal:
    'Indonesian Journal of Artificial Intelligence and Data Mining (IJAIDM)',
  url: 'https://ejournal.uin-suska.ac.id/index.php/IJAIDM/article/view/39057',
  date: '16 Maret 2026',
  points: [
    'Penelitian financial time-series forecasting menggunakan Machine Learning.',
    'Model hybrid SVR dioptimasi dengan Genetic Algorithm (GA) untuk memprediksi harga saham PT Aneka Tambang Tbk (ANTM.JK).',
    'Menggunakan 1.202 data historis dan kernel Radial Basis Function (RBF).',
  ],
  metrics: [
    { label: 'RMSE', value: '75.97' },
    { label: 'MAE', value: '52.42' },
    { label: 'MAPE', value: '2.42%' },
  ],
} as const

export type Certification = {
  title: string
  issuer: string
  issued: string
  expires: string | null
  /** Ganti dengan scan sertifikat sendiri, mis. '/images/certs/nama.jpg' */
  image?: string
  /** Link verifikasi kredensial (edX, Dicoding, dll.) */
  credentialUrl?: string
}

export const CERTIFICATIONS: Certification[] = [
  {
    title: 'IBM Certificate — Information Technology Support',
    issuer: 'edX',
    issued: 'Jul 2026',
    expires: null,
    image: '/images/certs/edx-ibm-it.png',
    credentialUrl:
      'https://courses.edx.org/certificates/82141a0d0a254533a944ddcd0c826adb?trk=public_profile_see-credential',
  },
  {
    title: 'edX Verified Certificate — Probability and Statistics',
    issuer: 'edX',
    issued: 'Mei 2026',
    expires: null,
    image: '/images/certs/edx-probability.png',
    credentialUrl:
      'https://courses.edx.org/certificates/5c0f0c773ad244a886e3b1b147167d17?trk=public_profile_see-credential',
  },
  {
    title: 'edX Verified Certificate — Python for Data Engineering',
    issuer: 'edX',
    issued: 'Mei 2026',
    expires: null,
    image: '/images/certs/edx-python.png',
    credentialUrl:
      'https://courses.edx.org/certificates/b52f6ac52c1c4c6f842ea9b6794506cc?trk=public_profile_see-credential',
  },
  {
    title: 'Data Science With Microsoft Fabric',
    issuer: 'Dicoding Indonesia',
    issued: 'Mei 2026',
    expires: 'Mei 2029',
    image: '/images/certs/dicoding-fabric.png',
    credentialUrl:
      'https://www.dicoding.com/certificates/ERZRLJD49WZV?trk=public_profile_see-credential',
  },
  {
    title: 'Associate Data Scientist',
    issuer: 'BNSP',
    issued: 'Agu 2025',
    expires: 'Agu 2028',
    image: '/images/certs/bnsp-associate-data-scientist.png',
  },
  {
    title: 'TOEFL Prediction Test',
    issuer: 'Asterdam Course',
    issued: 'Jun 2026',
    expires: 'Jun 2028',
    image: '/images/certs/toefl.png',
    credentialUrl:
      'https://test.asterdamcourse.com/certificate/26062176?trk=public_profile_see-credential',
  },
]