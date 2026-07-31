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
  // TODO: replace with the real contact address.
  email: 'hello@example.com',
  github: 'https://github.com/Albaaaaaa',
  linkedin: 'https://www.linkedin.com/in/muhammad-ulil-albab',
  // TODO: drop the real PDF at public/cv/Muhammad-Ulil-Albab-CV.pdf
  cvUrl: '/cv/Muhammad-Ulil-Albab-CV.pdf',
  avatar: '/images/profile.jpg',
} as const

export const SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
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

export const EXPERIENCE = [
  {
    role: 'Software Engineer',
    company: 'Dinas Perpustakaan dan Kearsipan Kota Samarinda',
    period: 'Jul 2024 – Sep 2024 (3 bulan)',
    location: 'Samarinda, Kalimantan Timur, Indonesia',
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
    program: 'Informatics Engineering — GPA 3.95/4.00',
    period: '2022 – 2026',
    points: [
      'Lulus Cum Laude sebagai Lulusan Terbaik Fakultas Sains dan Teknologi.',
      'Fokus studi: Software Engineering dan Artificial Intelligence.',
    ],
  },
] as const

export const SKILL_GROUPS = [
  {
    category: 'Backend',
    icon: '⚙️',
    items: ['CodeIgniter 4', 'PHP'],
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
    ],
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
    demo: 'https://silayar-perpus.gt.tc/',
    repo: 'https://github.com/Albaaaaaa/System-for-Diabetes-Detection',
    image:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'Islamic Companion App for Worship and Learning',
    description:
      'Aplikasi pendamping ibadah dan pembelajaran Islam: jadwal salat, bacaan, dan materi dakwah dalam satu tempat.',
    stack: ['Web App', 'JavaScript'],
    demo: 'https://dakwah-up.vercel.app/',
    repo: 'https://github.com/Albaaaaaa/Islamic-Companion-App-for-Worship-and-Learning',
    image:
      'https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'Job Application System',
    description:
      'Platform lamaran kerja dengan alur pendaftaran pelamar, manajemen lowongan, dan pemantauan status seleksi.',
    stack: ['Web App', 'Database'],
    demo: 'https://job-application-system-cyan.vercel.app/',
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
    image: '/images/certs/bnsp.png',
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