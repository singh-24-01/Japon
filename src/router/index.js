import { createRouter, createWebHistory } from 'vue-router'

// Import paresseux des vues pour optimiser le chargement initial
const HomeView     = () => import('@/views/HomeView.vue')
const RegionsView  = () => import('@/views/RegionsView.vue')
const CultureView  = () => import('@/views/CultureView.vue')
const CuisineView  = () => import('@/views/CuisineView.vue')
const LangueView   = () => import('@/views/LangueView.vue')
const HistoireView = () => import('@/views/HistoireView.vue')
const GalerieView  = () => import('@/views/GalerieView.vue')

// Définition des routes de l'application
const routes = [
  {
    path: '/',
    name: 'accueil',
    component: HomeView,
    meta: {
      title: '日本 — Accueil',
      emoji: '⛩️'
    }
  },
  {
    path: '/regions',
    name: 'regions',
    component: RegionsView,
    meta: {
      title: 'Régions du Japon',
      emoji: '🗾'
    }
  },
  {
    path: '/culture',
    name: 'culture',
    component: CultureView,
    meta: {
      title: 'Culture japonaise',
      emoji: '🎎'
    }
  },
  {
    path: '/cuisine',
    name: 'cuisine',
    component: CuisineView,
    meta: {
      title: 'Cuisine japonaise',
      emoji: '🍜'
    }
  },
  {
    path: '/langue',
    name: 'langue',
    component: LangueView,
    meta: {
      title: 'Langue japonaise',
      emoji: '🈵'
    }
  },
  {
    path: '/histoire',
    name: 'histoire',
    component: HistoireView,
    meta: {
      title: 'Histoire du Japon',
      emoji: '📜'
    }
  },
  {
    path: '/galerie',
    name: 'galerie',
    component: GalerieView,
    meta: {
      title: 'Galerie — Japon',
      emoji: '🌸'
    }
  },
  // Redirection des routes inconnues vers l'accueil
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // Retour en haut de page lors de chaque navigation
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0, behavior: 'smooth' }
  }
})

// Mise à jour du titre de l'onglet navigateur
router.afterEach((to) => {
  document.title = to.meta.title || '日本 — Découvrir le Japon'
})

export default router
