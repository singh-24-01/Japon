import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

/**
 * Store principal de l'application Japon
 * Gère : la langue FR/EN, les favoris, et l'état de l'UI
 */
export const useAppStore = defineStore('app', () => {

  // ─── État : langue ───────────────────────────────────────────────────────────
  const langue = ref('fr') // 'fr' ou 'en'

  // Bascule entre français et anglais
  function toggleLangue() {
    langue.value = langue.value === 'fr' ? 'en' : 'fr'
  }

  const estFrancais = computed(() => langue.value === 'fr')

  // ─── Traductions globales ────────────────────────────────────────────────────
  const traductions = {
    fr: {
      nav: {
        accueil:  'Accueil',
        regions:  'Régions',
        culture:  'Culture',
        cuisine:  'Cuisine',
        langue:   'Langue',
        histoire: 'Histoire',
        galerie:  'Galerie',
      },
      home: {
        decouvrir:   'Découvrir le Japon',
        superficie:  'Superficie',
        population:  'Population',
        capitale:    'Capitale',
        km2:         '377 975 km²',
        habitants:   '125,7 millions',
        tokyo:       'Tokyo',
        intro:       'Le Japon, archipel de 6 852 îles, est une nation où la tradition et la modernité coexistent en harmonie parfaite. Terre des samouraïs, de la cérémonie du thé, des cerisiers en fleurs et de la technologie de pointe.'
      }
    },
    en: {
      nav: {
        accueil:  'Home',
        regions:  'Regions',
        culture:  'Culture',
        cuisine:  'Cuisine',
        langue:   'Language',
        histoire: 'History',
        galerie:  'Gallery',
      },
      home: {
        decouvrir:   'Discover Japan',
        superficie:  'Area',
        population:  'Population',
        capitale:    'Capital',
        km2:         '377,975 km²',
        habitants:   '125.7 million',
        tokyo:       'Tokyo',
        intro:       'Japan, an archipelago of 6,852 islands, is a nation where tradition and modernity coexist in perfect harmony. Land of samurai, tea ceremony, cherry blossoms, and cutting-edge technology.'
      }
    }
  }

  // Texte traduit selon la langue active
  const t = computed(() => traductions[langue.value])

  // ─── Favoris (régions, plats...) ────────────────────────────────────────────
  const favoris = ref(new Set())

  function toggleFavori(id) {
    if (favoris.value.has(id)) {
      favoris.value.delete(id)
    } else {
      favoris.value.add(id)
    }
  }

  function estFavori(id) {
    return favoris.value.has(id)
  }

  // ─── Quiz langue (état global) ───────────────────────────────────────────────
  const scoreQuiz    = ref(0)
  const totalQuiz    = ref(0)
  const quizTermine  = ref(false)

  function resetQuiz() {
    scoreQuiz.value   = 0
    totalQuiz.value   = 0
    quizTermine.value = false
  }

  // ─── Région sélectionnée ─────────────────────────────────────────────────────
  const regionSelectionnee = ref(null)

  function selectionnerRegion(id) {
    regionSelectionnee.value = regionSelectionnee.value === id ? null : id
  }

  return {
    // Langue
    langue,
    estFrancais,
    t,
    toggleLangue,
    // Favoris
    favoris,
    toggleFavori,
    estFavori,
    // Quiz
    scoreQuiz,
    totalQuiz,
    quizTermine,
    resetQuiz,
    // Région
    regionSelectionnee,
    selectionnerRegion,
  }
})
