export const SITE_CONFIG = {
  name: 'PêcheBlog',
  description: 'Votre guide complet sur la pêche en France',
  url: 'https://peche-blog.fr', // À remplacer par votre URL
  author: 'Julien',
  defaultImage: '/images/default-og.webp', // À créer
  themeColor: '#0f172a',
  defaultLocale: 'fr',

  // SEO et Open Graph
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'PêcheBlog',
  },

  // Navigation
  nav: {
    links: [
      { name: 'Accueil', href: '/' },
      { name: 'Blog', href: '/blog' },
      { name: 'Équipement', href: '/equipement' },
      { name: 'Contact', href: '/contact' }
    ]
  },

  // Pagination
  pagination: {
    postsPerPage: 9
  },

  // Catégories principales
  categories: [
    'carnassiers',
    'mer',
    'mouche',
    'carpe',
    'matériel',
    'techniques'
  ] as const,

  // Réseaux sociaux
  social: {
    facebook: 'https://facebook.com/pecheblog',
    instagram: 'https://instagram.com/pecheblog',
    youtube: 'https://youtube.com/pecheblog'
  }
} as const;
