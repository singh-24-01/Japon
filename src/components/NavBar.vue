<template>
  <!-- Barre de navigation fixe en haut de page -->
  <nav class="fixed top-0 left-0 right-0 z-50 bg-japon-noir shadow-lg" role="navigation" aria-label="Navigation principale">

    <div class="max-w-7xl mx-auto px-4">
      <div class="flex items-center justify-between h-16">

        <!-- Logo / Titre de l'application -->
        <RouterLink to="/" class="flex items-center gap-3 group">
          <!-- Drapeau japonais SVG -->
          <div class="w-8 h-6 bg-japon-blanc rounded-sm flex items-center justify-center shadow-sm flex-shrink-0">
            <div class="w-4 h-4 bg-japon-rouge rounded-full"></div>
          </div>
          <span class="font-serif text-xl text-japon-blanc group-hover:text-japon-dore transition-colors duration-200">
            日本
          </span>
          <span class="hidden md:block text-japon-gris text-sm font-sans">
            Découvrir le Japon
          </span>
        </RouterLink>

        <!-- Onglets de navigation — Desktop -->
        <div class="hidden lg:flex items-center gap-1">
          <RouterLink
            v-for="lien in liens"
            :key="lien.nom"
            :to="lien.chemin"
            class="nav-link"
            :class="{ 'nav-link-actif': $route.name === lien.nom }"
          >
            <span class="mr-1">{{ lien.emoji }}</span>
            {{ store.t.nav[lien.nom] }}
          </RouterLink>
        </div>

        <!-- Contrôles droite : Langue + Menu mobile -->
        <div class="flex items-center gap-3">

          <!-- Toggle langue FR/EN -->
          <button
            @click="store.toggleLangue()"
            class="flex items-center gap-1 px-3 py-1.5 rounded-sm border border-japon-gris
                   text-japon-blanc text-xs font-sans font-medium
                   hover:border-japon-dore hover:text-japon-dore transition-all duration-200"
            :aria-label="`Changer la langue vers ${store.estFrancais ? 'anglais' : 'français'}`"
          >
            <span>{{ store.estFrancais ? '🇫🇷 FR' : '🇬🇧 EN' }}</span>
          </button>

          <!-- Bouton menu hamburger — Mobile -->
          <button
            @click="menuOuvert = !menuOuvert"
            class="lg:hidden p-2 text-japon-blanc hover:text-japon-dore transition-colors"
            :aria-label="menuOuvert ? 'Fermer le menu' : 'Ouvrir le menu'"
            :aria-expanded="menuOuvert"
          >
            <!-- Icône hamburger / croix -->
            <div class="w-5 h-4 flex flex-col justify-between">
              <span class="block h-0.5 bg-current transition-all duration-300"
                    :class="menuOuvert ? 'rotate-45 translate-y-1.5' : ''"></span>
              <span class="block h-0.5 bg-current transition-all duration-300"
                    :class="menuOuvert ? 'opacity-0' : ''"></span>
              <span class="block h-0.5 bg-current transition-all duration-300"
                    :class="menuOuvert ? '-rotate-45 -translate-y-2' : ''"></span>
            </div>
          </button>

        </div>
      </div>
    </div>

    <!-- Menu mobile déroulant -->
    <Transition name="slide">
      <div v-if="menuOuvert" class="lg:hidden bg-japon-noir border-t border-gray-700">
        <div class="px-4 py-3 space-y-1">
          <RouterLink
            v-for="lien in liens"
            :key="lien.nom"
            :to="lien.chemin"
            @click="menuOuvert = false"
            class="flex items-center gap-3 px-4 py-3 rounded-sm text-japon-blanc
                   hover:bg-japon-rouge hover:text-white transition-all duration-200 font-sans"
            :class="{ 'bg-japon-rouge text-white': $route.name === lien.nom }"
          >
            <span class="text-xl">{{ lien.emoji }}</span>
            <span>{{ store.t.nav[lien.nom] }}</span>
          </RouterLink>
        </div>
      </div>
    </Transition>

  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useAppStore } from '@/stores/appStore.js'

const store = useAppStore()
const menuOuvert = ref(false)

// Définition des liens de navigation
const liens = [
  { nom: 'accueil',  chemin: '/',         emoji: '⛩️' },
  { nom: 'regions',  chemin: '/regions',  emoji: '🗾' },
  { nom: 'culture',  chemin: '/culture',  emoji: '🎎' },
  { nom: 'cuisine',  chemin: '/cuisine',  emoji: '🍜' },
  { nom: 'langue',   chemin: '/langue',   emoji: '🈵' },
  { nom: 'histoire', chemin: '/histoire', emoji: '📜' },
  { nom: 'galerie',  chemin: '/galerie',  emoji: '🌸' },
]
</script>

<style scoped>
/* Lien de navigation */
.nav-link {
  @apply px-3 py-2 text-sm font-sans font-medium text-gray-300
         hover:text-white rounded-sm transition-all duration-200
         relative whitespace-nowrap;
}

/* Soulignement animé au survol et état actif */
.nav-link::after {
  content: '';
  @apply absolute bottom-0 left-0 right-0 h-0.5 bg-japon-rouge
         scale-x-0 transition-transform duration-200 origin-left;
}

.nav-link:hover::after,
.nav-link-actif::after {
  @apply scale-x-100;
}

/* Onglet actif */
.nav-link-actif {
  @apply text-white;
}
</style>
