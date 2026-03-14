<template>
  <div class="min-h-screen bg-washi py-12">
    <div class="max-w-7xl mx-auto px-4">

      <!-- En-tête de page -->
      <div class="text-center mb-12">
        <p class="text-japon-rouge font-sans text-sm tracking-widest uppercase mb-2">地方</p>
        <h1 class="titre-section mx-auto">Les Régions du Japon</h1>
        <p class="text-gray-600 font-sans mt-4 max-w-2xl mx-auto">
          Le Japon est divisé en 8 grandes régions regroupant 47 préfectures.
          Cliquez sur une région pour découvrir ses spécificités.
        </p>
      </div>

      <div class="grid grid-cols-1 xl:grid-cols-2 gap-10">

        <!-- ═══════════════════════════════════════════════════════
             CARTE INTERACTIVE — SVG schématique du Japon
             ═══════════════════════════════════════════════════════ -->
        <div class="bg-white rounded-sm shadow-lg p-6">
          <h2 class="font-serif text-xl text-japon-noir mb-4 text-center">
            Carte des régions 🗾
          </h2>

          <!-- Carte SVG schématique du Japon -->
          <div class="relative w-full" style="aspect-ratio: 0.7;">
            <svg viewBox="0 0 300 430" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">

              <!-- Fond océan -->
              <rect width="300" height="430" fill="#E8F4F8" rx="8"/>

              <!-- Grille légère -->
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#C5DDE8" stroke-width="0.3"/>
                </pattern>
              </defs>
              <rect width="300" height="430" fill="url(#grid)"/>

              <!-- Régions du Japon — formes schématiques simplifiées -->
              <g v-for="region in regions" :key="region.id">
                <polygon
                  :points="region.points"
                  :fill="regionSelectionnee === region.id ? region.couleur : region.couleurClaire"
                  :stroke="region.couleur"
                  stroke-width="1.5"
                  class="cursor-pointer transition-all duration-200"
                  :class="{ 'opacity-80': regionSelectionnee && regionSelectionnee !== region.id }"
                  @click="selectionner(region.id)"
                  @mouseenter="survol = region.id"
                  @mouseleave="survol = null"
                />
                <!-- Label de la région -->
                <text
                  :x="region.labelX"
                  :y="region.labelY"
                  text-anchor="middle"
                  class="select-none cursor-pointer"
                  :fill="regionSelectionnee === region.id ? 'white' : '#1A1A2E'"
                  font-size="7"
                  font-family="sans-serif"
                  font-weight="600"
                  @click="selectionner(region.id)"
                >
                  {{ region.nom }}
                </text>
              </g>

              <!-- Légende -->
              <text x="10" y="420" font-size="6" fill="#8C8C9E" font-family="sans-serif">
                Cliquez sur une région pour plus d'infos
              </text>

            </svg>
          </div>
        </div>

        <!-- ═══════════════════════════════════════════════════════
             LISTE DES RÉGIONS + FICHE DÉTAIL
             ═══════════════════════════════════════════════════════ -->
        <div class="space-y-4">

          <!-- Fiche détail de la région sélectionnée -->
          <Transition name="page">
            <div v-if="regionActuelle" class="card-japon bg-white mb-6 ring-2 ring-japon-rouge ring-offset-2">
              <div class="flex items-center gap-3 mb-4">
                <span class="text-4xl">{{ regionActuelle.emoji }}</span>
                <div>
                  <h3 class="font-serif text-2xl text-japon-rouge">{{ regionActuelle.nom }}</h3>
                  <p class="text-japon-gris text-sm font-sans">{{ regionActuelle.japonais }} — {{ regionActuelle.prefectures }} préfectures</p>
                </div>
              </div>
              <p class="text-gray-700 font-sans text-sm leading-relaxed mb-4">{{ regionActuelle.description }}</p>

              <!-- Informations clés -->
              <div class="grid grid-cols-2 gap-3 mb-4">
                <div v-for="info in regionActuelle.infos" :key="info.label"
                     class="bg-gray-50 rounded-sm p-3">
                  <div class="text-xs text-japon-gris font-sans uppercase tracking-wide">{{ info.label }}</div>
                  <div class="font-sans font-medium text-japon-noir text-sm mt-0.5">{{ info.valeur }}</div>
                </div>
              </div>

              <!-- Spécialités -->
              <div>
                <p class="text-xs text-japon-gris font-sans uppercase tracking-wide mb-2">À ne pas manquer</p>
                <div class="flex flex-wrap gap-2">
                  <span v-for="spec in regionActuelle.specialites" :key="spec"
                        class="px-3 py-1 bg-red-50 text-japon-rouge text-xs font-sans rounded-full border border-red-100">
                    {{ spec }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Message si aucune région sélectionnée -->
            <div v-else class="card-japon bg-japon-noir text-center py-10">
              <p class="text-4xl mb-3">👆</p>
              <p class="text-japon-blanc font-sans text-sm">
                Sélectionnez une région sur la carte ou dans la liste
              </p>
            </div>
          </Transition>

          <!-- Liste compacte des régions -->
          <div class="grid grid-cols-2 gap-3">
            <button
              v-for="region in regions"
              :key="region.id"
              @click="selectionner(region.id)"
              class="flex items-center gap-3 p-4 bg-white rounded-sm shadow-sm border-2 text-left
                     transition-all duration-200 hover:shadow-md"
              :class="regionSelectionnee === region.id
                ? 'border-japon-rouge bg-red-50'
                : 'border-transparent hover:border-gray-200'"
            >
              <span class="text-2xl">{{ region.emoji }}</span>
              <div class="min-w-0">
                <div class="font-sans font-medium text-japon-noir text-sm truncate">{{ region.nom }}</div>
                <div class="text-japon-gris text-xs font-sans">{{ region.japonais }}</div>
              </div>
            </button>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAppStore } from '@/stores/appStore.js'

const store = useAppStore()
const survol = ref(null)

// Région actuellement sélectionnée (ID)
const regionSelectionnee = ref(null)

function selectionner(id) {
  regionSelectionnee.value = regionSelectionnee.value === id ? null : id
}

// Données complètes des 8 régions
const regions = [
  {
    id: 'hokkaido',
    nom: 'Hokkaido',
    japonais: '北海道',
    emoji: '🏔️',
    prefectures: 1,
    couleur: '#2D6A4F',
    couleurClaire: '#B7DFCE',
    // Coordonnées SVG de la forme schématique
    points: '140,15 220,15 240,50 220,80 180,90 150,80 130,60',
    labelX: 185, labelY: 52,
    description: 'La grande île du nord du Japon, connue pour ses paysages enneigés, ses stations de ski de classe mondiale, ses parcs nationaux et ses délicieux fruits de mer. Hokkaido représente 22% du territoire japonais mais seulement 4% de sa population.',
    infos: [
      { label: 'Chef-lieu',   valeur: 'Sapporo' },
      { label: 'Superficie',  valeur: '83 456 km²' },
      { label: 'Population',  valeur: '5,2 millions' },
      { label: 'Climat',      valeur: 'Subarctique' },
    ],
    specialites: ['Festival de neige de Sapporo', 'Fromage et laitages', 'Crabe du roi', 'Parc national Daisetsuzan', 'Ski à Niseko']
  },
  {
    id: 'tohoku',
    nom: 'Tōhoku',
    japonais: '東北',
    emoji: '🌿',
    prefectures: 6,
    couleur: '#1B4F72',
    couleurClaire: '#AED6F1',
    points: '160,90 210,85 225,110 220,150 200,165 170,160 150,140 145,110',
    labelX: 188, labelY: 128,
    description: 'Région sauvage et authentique du nord de Honshu, Tōhoku est célèbre pour ses montagnes, ses onsen (sources thermales) et sa culture traditionnelle préservée. La région a été durement touchée par le tremblement de terre et le tsunami de 2011.',
    infos: [
      { label: 'Chef-lieu',   valeur: 'Sendai' },
      { label: 'Préfectures', valeur: 'Aomori, Iwate, Miyagi, Akita, Yamagata, Fukushima' },
      { label: 'Population',  valeur: '8,9 millions' },
      { label: 'Point haut',  valeur: 'Sanriku 2 374m' },
    ],
    specialites: ['Matsuri de Sendai', 'Sanctuaire Ōsorezan', 'Cerisiers de Kakunodate', 'Saké de Yamagata', 'Onsen de Nyūtō']
  },
  {
    id: 'kanto',
    nom: 'Kantō',
    japonais: '関東',
    emoji: '🏙️',
    prefectures: 7,
    couleur: '#D62828',
    couleurClaire: '#F5B7B1',
    points: '155,160 215,155 230,185 225,210 200,220 165,215 150,195',
    labelX: 192, labelY: 190,
    description: 'Cœur économique et culturel du Japon, le Kantō abrite Tokyo, la plus grande métropole du monde. Cette plaine côtière densément peuplée concentre un tiers de la population japonaise et les principales institutions du pays.',
    infos: [
      { label: 'Chef-lieu',   valeur: 'Tokyo' },
      { label: 'Préfectures', valeur: 'Tokyo, Kanagawa, Saitama, Chiba, Ibaraki, Tochigi, Gunma' },
      { label: 'Population',  valeur: '43 millions' },
      { label: 'PIB',         valeur: '~40% du PIB national' },
    ],
    specialites: ['Tokyo Disneyland', 'Nikko', 'Yokohama Chinatown', 'Kamakura', 'Mont Fuji (accès)']
  },
  {
    id: 'chubu',
    nom: 'Chūbu',
    japonais: '中部',
    emoji: '⛰️',
    prefectures: 9,
    couleur: '#8E44AD',
    couleurClaire: '#D7BDE2',
    points: '130,200 185,195 200,215 205,250 185,275 155,270 130,255 115,230',
    labelX: 165, labelY: 238,
    description: 'Région centrale de Honshu dominée par les Alpes japonaises. Chūbu est traversée par les deux anciennes routes impériales (Tōkaidō et Nakasendō) et abrite Nagoya, 4ème ville du Japon.',
    infos: [
      { label: 'Chef-lieu',   valeur: 'Nagoya' },
      { label: 'Préfectures', valeur: 'Aichi, Niigata, Toyama, Ishikawa, Fukui, Nagano, Yamanashi, Shizuoka, Gifu' },
      { label: 'Population',  valeur: '21,7 millions' },
      { label: 'Altitude max','valeur': 'Mont Fuji 3 776m' },
    ],
    specialites: ['Mont Fuji', 'Village de Shirakawa-go', 'Alpes japonaises', 'Château de Matsumoto', 'Parc de Kenroku-en']
  },
  {
    id: 'kansai',
    nom: 'Kansai',
    japonais: '関西',
    emoji: '⛩️',
    prefectures: 7,
    couleur: '#D4AF37',
    couleurClaire: '#FAD7A0',
    points: '100,250 150,245 170,265 165,300 145,315 110,310 90,285',
    labelX: 132, labelY: 283,
    description: 'Berceau culturel du Japon, le Kansai regroupe les anciennes capitales Kyoto et Nara, ainsi qu\'Osaka la gourmande et Kobe la cosmopolite. C\'est ici que l\'âme traditionnelle du Japon est la plus vivante.',
    infos: [
      { label: 'Villes phares', valeur: 'Osaka, Kyoto, Kobe, Nara' },
      { label: 'Préfectures',   valeur: 'Osaka, Kyoto, Hyogo, Nara, Wakayama, Shiga, Mie' },
      { label: 'Population',    valeur: '22,3 millions' },
      { label: 'Patrimoine',    valeur: '17 sites UNESCO à Kyoto' },
    ],
    specialites: ['Temples de Kyoto', 'Geishas de Gion', 'Takoyaki à Osaka', 'Cerfs de Nara', 'Château d\'Himeji']
  },
  {
    id: 'chugoku',
    nom: 'Chūgoku',
    japonais: '中国',
    emoji: '🌊',
    prefectures: 5,
    couleur: '#2E86C1',
    couleurClaire: '#AED6F1',
    points: '75,305 130,300 145,320 140,350 115,360 80,355 65,330',
    labelX: 107, labelY: 332,
    description: 'Région de l\'ouest de Honshu, Chūgoku est célèbre pour le mémorial de la paix d\'Hiroshima et l\'île sacrée de Miyajima. Sa côte nord sur la mer du Japon contraste avec sa côte sud sur la mer intérieure de Seto.',
    infos: [
      { label: 'Chef-lieu',   valeur: 'Hiroshima' },
      { label: 'Préfectures', valeur: 'Hiroshima, Okayama, Yamaguchi, Tottori, Shimane' },
      { label: 'Population',  valeur: '7,4 millions' },
      { label: 'Symbole',     valeur: 'Torii de Miyajima' },
    ],
    specialites: ['Mémorial d\'Hiroshima', 'Île de Miyajima', 'Château d\'Okayama', 'Dunes de Tottori', 'Musée d\'art de Shimane']
  },
  {
    id: 'shikoku',
    nom: 'Shikoku',
    japonais: '四国',
    emoji: '🏝️',
    prefectures: 4,
    couleur: '#E67E22',
    couleurClaire: '#FAD7A0',
    points: '100,345 145,340 155,365 148,390 120,398 95,385 90,360',
    labelX: 123, labelY: 370,
    description: 'La plus petite des 4 grandes îles du Japon, Shikoku est connue pour son pèlerinage bouddhiste de 88 temples (Ohenro) qui parcourt les 4 préfectures de l\'île sur 1 200 km.',
    infos: [
      { label: 'Chef-lieu',   valeur: 'Matsuyama' },
      { label: 'Préfectures', valeur: 'Tokushima, Kochi, Ehime, Kagawa' },
      { label: 'Population',  valeur: '3,7 millions' },
      { label: 'Pèlerinage',  valeur: '88 temples / 1 200 km' },
    ],
    specialites: ['Pèlerinage Ohenro', 'Château de Matsuyama', 'Gorges d\'Iya', 'Festival Awa Odori', 'Udon de Kagawa']
  },
  {
    id: 'kyushu',
    nom: 'Kyūshū',
    japonais: '九州',
    emoji: '🌋',
    prefectures: 7,
    couleur: '#A04000',
    couleurClaire: '#E59866',
    points: '65,355 100,350 115,375 110,415 85,420 60,405 50,375',
    labelX: 83, labelY: 390,
    description: 'L\'île la plus méridionale des grandes îles japonaises, Kyūshū est connue pour son volcanisme actif (mont Aso), ses onsen (Beppu), sa culture Izakaya animée (Fukuoka) et ses liens historiques avec l\'Asie continentale.',
    infos: [
      { label: 'Chef-lieu',   valeur: 'Fukuoka' },
      { label: 'Préfectures', valeur: 'Fukuoka, Saga, Nagasaki, Kumamoto, Oita, Miyazaki, Kagoshima' },
      { label: 'Population',  valeur: '12,9 millions' },
      { label: 'Volcan',      valeur: 'Mont Aso (plus grand cratère actif)' },
    ],
    specialites: ['Ramen de Fukuoka', 'Onsen de Beppu', 'Mont Aso', 'Château de Kumamoto', 'Île de Nagasaki']
  }
]

// Région actuellement sélectionnée (objet complet)
const regionActuelle = computed(() =>
  regions.find(r => r.id === regionSelectionnee.value) ?? null
)
</script>
