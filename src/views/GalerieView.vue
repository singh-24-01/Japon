<template>
  <div class="min-h-screen bg-washi py-12">
    <div class="max-w-7xl mx-auto px-4">

      <!-- En-tête -->
      <div class="text-center mb-12">
        <p class="text-japon-rouge font-sans text-sm tracking-widest uppercase mb-2">ギャラリー</p>
        <h1 class="titre-section mx-auto">Galerie du Japon</h1>
        <p class="text-gray-600 font-sans mt-4 max-w-2xl mx-auto">
          Plongez dans les paysages et lieux emblématiques du Japon, des temples millénaires
          aux cités futuristes, en passant par la beauté éphémère des saisons.
        </p>
      </div>

      <!-- Filtres thématiques -->
      <div class="flex flex-wrap gap-2 mb-10 justify-center">
        <button
          @click="filtreActif = null"
          class="px-5 py-2.5 rounded-full font-sans text-sm font-medium border-2 transition-all duration-200"
          :class="!filtreActif ? 'bg-japon-rouge text-white border-japon-rouge' : 'bg-white text-gray-600 border-gray-200 hover:border-japon-rouge'"
        >
          Tout
        </button>
        <button
          v-for="theme in themes"
          :key="theme.id"
          @click="filtreActif = theme.id"
          class="flex items-center gap-2 px-5 py-2.5 rounded-full font-sans text-sm font-medium border-2 transition-all duration-200"
          :class="filtreActif === theme.id
            ? 'bg-japon-rouge text-white border-japon-rouge'
            : 'bg-white text-gray-600 border-gray-200 hover:border-japon-rouge'"
        >
          {{ theme.emoji }} {{ theme.nom }}
        </button>
      </div>

      <!-- Grille de photos -->
      <div class="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
        <div
          v-for="photo in photosFiltrees"
          :key="photo.id"
          class="break-inside-avoid rounded-sm overflow-hidden shadow-md hover:shadow-xl
                 transition-all duration-300 cursor-pointer group relative"
          @click="photoSelectionnee = photo"
        >
          <!-- Placeholder coloré avec emoji -->
          <div
            class="w-full flex flex-col items-center justify-center select-none"
            :style="{
              height: photo.hauteur + 'px',
              background: `linear-gradient(135deg, ${photo.couleur1}, ${photo.couleur2})`
            }"
          >
            <span class="text-6xl mb-3 transition-transform duration-300 group-hover:scale-125">
              {{ photo.emoji }}
            </span>
            <span class="text-white text-opacity-80 font-sans text-sm text-center px-4 font-medium">
              {{ photo.lieu }}
            </span>
          </div>

          <!-- Overlay au survol -->
          <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30
                      transition-all duration-300 flex items-end p-4">
            <div class="transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 opacity-0 group-hover:opacity-100">
              <span class="badge-rouge text-xs">{{ photo.theme }}</span>
              <p class="text-white font-sans text-sm font-medium mt-1">{{ photo.titre }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal photo -->
      <Transition name="fade">
        <div
          v-if="photoSelectionnee"
          class="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
          @click.self="photoSelectionnee = null"
        >
          <div class="bg-white rounded-sm shadow-2xl max-w-lg w-full overflow-hidden">

            <!-- Image grande -->
            <div
              class="w-full flex items-center justify-center"
              style="height: 280px;"
              :style="{
                background: `linear-gradient(135deg, ${photoSelectionnee.couleur1}, ${photoSelectionnee.couleur2})`
              }"
            >
              <span class="text-9xl">{{ photoSelectionnee.emoji }}</span>
            </div>

            <!-- Infos -->
            <div class="p-6">
              <div class="flex items-start justify-between mb-3">
                <div>
                  <h3 class="font-serif text-2xl text-japon-noir">{{ photoSelectionnee.titre }}</h3>
                  <p class="text-japon-gris font-sans text-sm">📍 {{ photoSelectionnee.lieu }}</p>
                </div>
                <span class="badge-rouge">{{ photoSelectionnee.theme }}</span>
              </div>
              <p class="text-gray-700 font-sans text-sm leading-relaxed mb-4">
                {{ photoSelectionnee.description }}
              </p>
              <div class="flex items-center justify-between">
                <div class="flex gap-2">
                  <span class="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-sans rounded-full">
                    {{ photoSelectionnee.saison }}
                  </span>
                  <span class="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-sans rounded-full">
                    {{ photoSelectionnee.prefecture }}
                  </span>
                </div>
                <button
                  @click="photoSelectionnee = null"
                  class="text-sm font-sans text-japon-rouge hover:underline"
                >
                  Fermer ✕
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>

      <!-- Statistiques en bas -->
      <div class="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div v-for="stat in statsGalerie" :key="stat.label"
             class="text-center p-6 bg-white rounded-sm shadow-sm">
          <p class="text-3xl mb-2">{{ stat.emoji }}</p>
          <p class="font-serif text-2xl text-japon-rouge">{{ stat.valeur }}</p>
          <p class="text-gray-500 font-sans text-sm">{{ stat.label }}</p>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const filtreActif      = ref(null)
const photoSelectionnee = ref(null)

// Thèmes disponibles
const themes = [
  { id: 'nature',   nom: 'Nature',   emoji: '🌿' },
  { id: 'temples',  nom: 'Temples',  emoji: '⛩️' },
  { id: 'villes',   nom: 'Villes',   emoji: '🏙️' },
  { id: 'saisons',  nom: 'Saisons',  emoji: '🌸' },
]

// Collection de photos (avec couleurs de gradient et emojis en placeholder)
const photos = [
  {
    id: 1,
    titre: 'Mont Fuji au lever du soleil',
    lieu: 'Mont Fuji, Shizuoka',
    theme: 'Nature',
    emoji: '🗻',
    couleur1: '#1B4F72', couleur2: '#D62828',
    hauteur: 280,
    saison: 'Hiver',
    prefecture: 'Shizuoka / Yamanashi',
    description: 'Le Fuji-san (3 776 m) est le symbole ultime du Japon. Volcan dormant inscrit au patrimoine UNESCO, il est visible par temps clair depuis Tokyo, à 100 km de distance. Sa silhouette parfaite inspire les artistes depuis des siècles (Hokusai, Hiroshige).'
  },
  {
    id: 2,
    titre: 'Torii de Fushimi Inari',
    lieu: 'Fushimi Inari Taisha, Kyoto',
    theme: 'Temples',
    emoji: '⛩️',
    couleur1: '#D62828', couleur2: '#D4AF37',
    hauteur: 320,
    saison: 'Toutes saisons',
    prefecture: 'Kyoto',
    description: 'Des milliers de torii vermillon forment des tunnels sur les flancs du mont Inari. Offerts par des entreprises et particuliers en remerciement, les plus anciens datent du XVIIIe siècle. Ce sanctuaire shinto dédié à Inari (dieu du renard et du riz) est le plus visité du Japon.'
  },
  {
    id: 3,
    titre: 'Shibuya Crossing by night',
    lieu: 'Shibuya, Tokyo',
    theme: 'Villes',
    emoji: '🌆',
    couleur1: '#1A1A2E', couleur2: '#D62828',
    hauteur: 240,
    saison: 'Toutes saisons',
    prefecture: 'Tokyo',
    description: 'Le carrefour le plus fréquenté du monde avec plus de 3 000 piétons à chaque passage. Entouré de grands écrans LED, il symbolise l\'énergie hypermoderne de Tokyo. Best visible from the Starbucks overpass or Mag\'s Park rooftop terrace.'
  },
  {
    id: 4,
    titre: 'Sakura au Parc Maruyama',
    lieu: 'Parc Maruyama, Kyoto',
    theme: 'Saisons',
    emoji: '🌸',
    couleur1: '#FFB7C5', couleur2: '#FFF0F0',
    hauteur: 260,
    saison: 'Printemps (mars-avril)',
    prefecture: 'Kyoto',
    description: 'Le cerisier pleureur du Parc Maruyama est l\'un des plus célèbres du Japon. Illuminé la nuit (yozakura), il attire des milliers de visiteurs lors du Hanami. La floraison dure seulement 7 à 10 jours, incarnant la philosophie japonaise du mono no aware.'
  },
  {
    id: 5,
    titre: 'Forêt de bambous d\'Arashiyama',
    lieu: 'Arashiyama, Kyoto',
    theme: 'Nature',
    emoji: '🎋',
    couleur1: '#2D6A4F', couleur2: '#A9DFBF',
    hauteur: 360,
    saison: 'Toutes saisons',
    prefecture: 'Kyoto',
    description: 'La forêt de bambous géants de Sagano crée un couloir naturel surnaturel. Les tiges de moso (jusqu\'à 30m de haut) s\'entrechoquent dans le vent, produisant un son classé parmi les 100 sons à préserver au Japon par l\'Agence pour l\'Environnement.'
  },
  {
    id: 6,
    titre: 'Château Himeji sous la neige',
    lieu: 'Himeji, Hyōgo',
    theme: 'Temples',
    emoji: '🏯',
    couleur1: '#ECF0F1', couleur2: '#BDC3C7',
    hauteur: 300,
    saison: 'Hiver',
    prefecture: 'Hyōgo',
    description: 'Surnommé "Château du Héron Blanc" pour ses murs immaculés, le château d\'Himeji est le chef-d\'œuvre de l\'architecture militaire japonaise. Construit au XIVe siècle, il n\'a jamais été détruit par la guerre. Premier site japonais inscrit au patrimoine UNESCO (1993).'
  },
  {
    id: 7,
    titre: 'Feuillage automnal de Nikko',
    lieu: 'Nikko, Tochigi',
    theme: 'Saisons',
    emoji: '🍁',
    couleur1: '#E67E22', couleur2: '#D62828',
    hauteur: 250,
    saison: 'Automne (oct-nov)',
    prefecture: 'Tochigi',
    description: 'Le momiji (feuillage d\'automne) de Nikko est parmi les plus spectaculaires du Japon. Les forêts de érables, gingkos et chênes rougissent en cascade autour du sanctuaire Tōshō-gū. L\'automne japonais (koyo) est aussi célébré que le printemps.'
  },
  {
    id: 8,
    titre: 'Tour Skytree de Tokyo',
    lieu: 'Asakusa, Tokyo',
    theme: 'Villes',
    emoji: '🗼',
    couleur1: '#1B4F72', couleur2: '#2E86C1',
    hauteur: 340,
    saison: 'Toutes saisons',
    prefecture: 'Tokyo',
    description: 'La Tokyo Skytree (634 mètres) est la plus haute tour du monde, surpassant la Tokyo Tower. Son altitude symbolique (6-3-4 = mu-sa-shi, ancien nom de la région) est intentionnelle. Depuis le pont d\'observation, on voit parfois le Mont Fuji par temps clair.'
  },
  {
    id: 9,
    titre: 'Mer de nuages sur les Alpes',
    lieu: 'Tateyama, Toyama',
    theme: 'Nature',
    emoji: '☁️',
    couleur1: '#AED6F1', couleur2: '#FAF9F6',
    hauteur: 220,
    saison: 'Printemps',
    prefecture: 'Toyama',
    description: 'La "Route Alpine Tateyama Kurobe" traverse les Alpes japonaises à 2 450m d\'altitude. Au printemps, des corridors de neige de 20 mètres de haut s\'étendent sur des kilomètres. Cette route est fermée 6 mois par an sous la neige.'
  },
  {
    id: 10,
    titre: 'Illuminations de Kenroku-en',
    lieu: 'Kenroku-en, Kanazawa',
    theme: 'Saisons',
    emoji: '🌟',
    couleur1: '#2C3E50', couleur2: '#D4AF37',
    hauteur: 300,
    saison: 'Hiver (déc-mars)',
    prefecture: 'Ishikawa',
    description: 'Kenroku-en ("jardin aux six attributs") est l\'un des trois jardins les plus beaux du Japon. En hiver, les pins sont liés avec des cordes de paille (yukitsuri) pour protéger leurs branches de la neige — une technique à la fois fonctionnelle et artistique.'
  },
  {
    id: 11,
    titre: 'Quartier Gion au crépuscule',
    lieu: 'Gion, Kyoto',
    theme: 'Villes',
    emoji: '🏮',
    couleur1: '#922B21', couleur2: '#D4AC0D',
    hauteur: 270,
    saison: 'Toutes saisons',
    prefecture: 'Kyoto',
    description: 'Le quartier de Gion est le plus célèbre des hanamachi (quartiers de geishas) du Japon. Le soir, les rues pavées de Hanamikoji s\'animent de lanternes rouge et or. Les maisons de thé (okiya) cachent la vie secrète des geiko (geishas de Kyoto) et maiko (apprenties).'
  },
  {
    id: 12,
    titre: 'Torii dans la mer de Miyajima',
    lieu: 'Itsukushima, Hiroshima',
    theme: 'Temples',
    emoji: '🌊',
    couleur1: '#1B4F72', couleur2: '#D62828',
    hauteur: 310,
    saison: 'Toutes saisons',
    prefecture: 'Hiroshima',
    description: 'Le grand torii vermillon du sanctuaire Itsukushima semble flotter sur la mer à marée haute — l\'une des vues les plus emblématiques du Japon (Nihon sankei, les "trois vues du Japon"). Construit en 1168, l\'actuel torii date de 1875 et mesure 16 mètres de haut.'
  },
]

// Photos filtrées par thème
const photosFiltrees = computed(() => {
  if (!filtreActif.value) return photos
  return photos.filter(p => p.theme.toLowerCase() === filtreActif.value)
})

// Statistiques de la galerie
const statsGalerie = [
  { emoji: '📸', valeur: photos.length, label: 'Photos' },
  { emoji: '🗾', valeur: '12', label: 'Préfectures' },
  { emoji: '🏆', valeur: '5', label: 'Sites UNESCO' },
  { emoji: '🌸', valeur: '4', label: 'Saisons' },
]
</script>
