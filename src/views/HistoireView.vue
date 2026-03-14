<template>
  <div class="min-h-screen bg-washi py-12">
    <div class="max-w-4xl mx-auto px-4">

      <!-- En-tête -->
      <div class="text-center mb-14">
        <p class="text-japon-rouge font-sans text-sm tracking-widest uppercase mb-2">歴史</p>
        <h1 class="titre-section mx-auto">Histoire du Japon</h1>
        <p class="text-gray-600 font-sans mt-4 max-w-2xl mx-auto">
          Du Néolithique à la puissance économique mondiale, le Japon a connu une histoire
          de plus de 14 000 ans, façonnée par des dynasties impériales, des samouraïs
          et une modernisation foudroyante.
        </p>
      </div>

      <!-- Filtre par période -->
      <div class="flex flex-wrap gap-2 mb-10 justify-center">
        <button
          @click="periodeFiltre = null"
          class="px-4 py-2 rounded-full font-sans text-sm font-medium border transition-all"
          :class="!periodeFiltre ? 'bg-japon-rouge text-white border-japon-rouge' : 'bg-white text-gray-600 border-gray-200 hover:border-japon-rouge'"
        >
          Toutes les ères
        </button>
        <button
          v-for="periode in periodes"
          :key="periode.id"
          @click="periodeFiltre = periode.id"
          class="px-4 py-2 rounded-full font-sans text-sm font-medium border transition-all"
          :class="periodeFiltre === periode.id
            ? 'text-white border-transparent'
            : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'"
          :style="periodeFiltre === periode.id ? { backgroundColor: periode.couleur, borderColor: periode.couleur } : {}"
        >
          {{ periode.nom }}
        </button>
      </div>

      <!-- ═══════════════════════════════════════════════════════
           TIMELINE VERTICALE
           ═══════════════════════════════════════════════════════ -->
      <div class="relative">

        <!-- Ligne verticale centrale -->
        <div class="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-japon-rouge via-japon-dore to-japon-rouge"></div>

        <!-- Événements de la timeline -->
        <div class="space-y-0">
          <div
            v-for="(evenement, index) in evenementsFiltres"
            :key="evenement.ere"
            class="relative pl-20 pb-10 timeline-item"
            :class="{ 'opacity-50': selectedEvent && selectedEvent !== evenement.ere }"
          >
            <!-- Point de la timeline -->
            <div
              class="absolute left-8 w-5 h-5 rounded-full border-4 border-japon-blanc shadow-md z-10 -translate-x-1/2 mt-5 cursor-pointer transition-all duration-200"
              :style="{ backgroundColor: evenement.couleur, top: '0' }"
              @click="selectedEvent = selectedEvent === evenement.ere ? null : evenement.ere"
            ></div>

            <!-- Carte de l'événement -->
            <div
              class="bg-white rounded-sm shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
              :class="{ 'ring-2 ring-offset-2': selectedEvent === evenement.ere }"
              :style="selectedEvent === evenement.ere ? { '--tw-ring-color': evenement.couleur } : {}"
              @click="selectedEvent = selectedEvent === evenement.ere ? null : evenement.ere"
            >
              <!-- Bannière colorée avec dates -->
              <div class="h-16 flex items-center justify-between px-6"
                   :style="{ backgroundColor: evenement.couleur }">
                <div>
                  <h3 class="font-serif text-xl text-white">{{ evenement.ere }}</h3>
                  <p class="text-white text-opacity-80 font-sans text-sm">{{ evenement.japonais }}</p>
                </div>
                <div class="text-right">
                  <p class="text-white font-sans font-medium">{{ evenement.dates }}</p>
                  <p class="text-white text-opacity-70 font-sans text-xs">{{ evenement.duree }}</p>
                </div>
              </div>

              <!-- Contenu -->
              <div class="p-6">
                <p class="text-gray-700 font-sans text-sm leading-relaxed mb-4">{{ evenement.description }}</p>

                <!-- Personnages clés -->
                <div class="flex flex-wrap gap-2 mb-4">
                  <span
                    v-for="perso in evenement.personnages"
                    :key="perso"
                    class="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-sans rounded-full"
                  >
                    👤 {{ perso }}
                  </span>
                </div>

                <!-- Détails développés -->
                <Transition name="slide">
                  <div v-if="selectedEvent === evenement.ere" class="border-t border-gray-100 pt-4">
                    <h4 class="font-sans font-semibold text-japon-noir text-sm mb-3">Événements majeurs</h4>
                    <ul class="space-y-2">
                      <li
                        v-for="fait in evenement.faits"
                        :key="fait.date"
                        class="flex items-start gap-3 text-sm font-sans"
                      >
                        <span
                          class="flex-shrink-0 px-2 py-0.5 text-white text-xs rounded font-medium"
                          :style="{ backgroundColor: evenement.couleur }"
                        >
                          {{ fait.date }}
                        </span>
                        <span class="text-gray-700 leading-relaxed">{{ fait.evenement }}</span>
                      </li>
                    </ul>
                  </div>
                </Transition>

                <p class="text-xs text-japon-gris font-sans mt-3 text-right">
                  {{ selectedEvent === evenement.ere ? 'Réduire ▲' : 'Détails ▼' }}
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedEvent  = ref(null)
const periodeFiltre  = ref(null)

// Filtres par grande période
const periodes = [
  { id: 'ancien',   nom: 'Ancien Japon',   couleur: '#2D6A4F' },
  { id: 'medieval', nom: 'Moyen Âge',       couleur: '#8E44AD' },
  { id: 'edo',      nom: 'Ère Edo',         couleur: '#D4AF37' },
  { id: 'moderne',  nom: 'Ère moderne',     couleur: '#D62828' },
]

// Données complètes de la timeline
const evenements = [
  {
    ere: 'Période Jōmon',
    japonais: '縄文時代',
    dates: '14 000 — 300 av. J.-C.',
    duree: '~13 700 ans',
    couleur: '#2D6A4F',
    periode: 'ancien',
    description: 'La plus ancienne civilisation japonaise, nommée d\'après les motifs de corde de sa poterie (jōmon = marque de corde). Les Jōmon étaient des chasseurs-cueilleurs-pêcheurs qui produisaient la poterie la plus ancienne du monde.',
    personnages: ['Peuple Jōmon (ancêtres des Aïnous)'],
    faits: [
      { date: '14 000 av. J.-C.', evenement: 'Apparition de la poterie jōmon, la plus ancienne au monde' },
      { date: '7 000 av. J.-C.', evenement: 'Développement de villages semi-sédentaires sur toutes les îles' },
      { date: '4 000 av. J.-C.', evenement: 'Apogée de la civilisation jōmon, nombreux sites archéologiques' },
    ]
  },
  {
    ere: 'Période Yayoi',
    japonais: '弥生時代',
    dates: '300 av. J.-C. — 250 apr. J.-C.',
    duree: '~550 ans',
    couleur: '#1B4F72',
    periode: 'ancien',
    description: 'Arrivée de nouvelles populations d\'Asie continentale apportant la riziculture, la métallurgie du fer et du bronze, et de nouvelles pratiques sociales. L\'agriculture transforme radicalement la société japonaise.',
    personnages: ['Reine Himiko (Yamatai)'],
    faits: [
      { date: '300 av. J.-C.', evenement: 'Introduction de la riziculture irriguée en provenance de Corée/Chine' },
      { date: '200 av. J.-C.', evenement: 'Diffusion de la métallurgie du bronze et du fer dans l\'archipel' },
      { date: '200 apr. J.-C.', evenement: 'Règne de la reine-chaman Himiko du royaume de Yamatai' },
    ]
  },
  {
    ere: 'Période Kofun',
    japonais: '古墳時代',
    dates: '250 — 538',
    duree: '~288 ans',
    couleur: '#A04000',
    periode: 'ancien',
    description: 'Ère des grandes tombes en forme de trou de serrure (kofun) où étaient inhumés les chefs de clans. Unification progressive de l\'archipel sous l\'autorité du clan Yamato, ancêtre de la famille impériale actuelle.',
    personnages: ['Clan Yamato', 'Ojin (16e Empereur)'],
    faits: [
      { date: '300', evenement: 'Construction des premiers grands tumulus kofun à Yamato (Nara)' },
      { date: '400', evenement: 'Introduction de l\'écriture chinoise (kanji) et du bouddhisme via la Corée' },
      { date: '478', evenement: 'L\'Ambassade japonaise envoie une lettre à l\'Empereur de Chine' },
    ]
  },
  {
    ere: 'Périodes Asuka & Nara',
    japonais: '飛鳥・奈良時代',
    dates: '538 — 794',
    duree: '~256 ans',
    couleur: '#E67E22',
    periode: 'ancien',
    description: 'Âge d\'or du bouddhisme et des premières grandes réformes politiques (Réforme Taika 645). Construction des premiers temples bouddhistes monumentaux. Nara devient la première capitale permanente du Japon.',
    personnages: ['Prince Shōtoku Taishi', 'Empress Suiko', 'Fujiwara no Kamatari'],
    faits: [
      { date: '538', evenement: 'Introduction officielle du bouddhisme via le royaume de Baekje (Corée)' },
      { date: '604', evenement: 'Le Prince Shōtoku promulgue la Constitution en 17 articles' },
      { date: '645', evenement: 'Réforme Taika : centralisation du pouvoir sur le modèle chinois Tang' },
      { date: '710', evenement: 'Fondation de Heijō-kyō (Nara), première capitale permanente' },
      { date: '752', evenement: 'Inauguration du Grand Bouddha de Tōdai-ji à Nara (15 mètres de haut)' },
    ]
  },
  {
    ere: 'Période Heian',
    japonais: '平安時代',
    dates: '794 — 1185',
    duree: '~391 ans',
    couleur: '#8E44AD',
    periode: 'medieval',
    description: 'Âge d\'or de la culture aristocratique japonaise à Kyoto (Heian-kyō). La cour impériale cultive la poésie, la peinture et la littérature. C\'est l\'époque du "Genji Monogatari", premier roman psychologique de l\'histoire.',
    personnages: ['Murasaki Shikibu', 'Sei Shōnagon', 'Fujiwara no Michinaga', 'Minamoto no Yoritomo'],
    faits: [
      { date: '794', evenement: 'La capitale est transférée à Heian-kyō (Kyoto)' },
      { date: '1000', evenement: 'Murasaki Shikibu écrit "Genji Monogatari" (Le Dit du Genji), premier roman du monde' },
      { date: '1000', evenement: 'Invention du hiragana et katakana, permettant une littérature japonaise autonome' },
      { date: '1156', evenement: 'Rébellion de Hōgen : les samouraïs entrent dans l\'arène politique' },
      { date: '1185', evenement: 'Minamoto no Yoritomo triomphe des Taira à la bataille de Dan-no-ura' },
    ]
  },
  {
    ere: 'Shogunat de Kamakura',
    japonais: '鎌倉幕府',
    dates: '1185 — 1333',
    duree: '~148 ans',
    couleur: '#5D6D7E',
    periode: 'medieval',
    description: 'Premier shogunat militaire du Japon. Les samouraïs prennent le pouvoir, développent un code d\'honneur (bushidō) et adoptent le bouddhisme zen. Le Japon résiste à deux invasions mongoles (1274 et 1281) grâce aux typhons providentiels (kamikaze).',
    personnages: ['Minamoto no Yoritomo', 'Hōjō Masako', 'Kublai Khan (invasions mongoles)'],
    faits: [
      { date: '1192', evenement: 'Minamoto no Yoritomo devient le premier shogun — naissance du bakufu (gouvernement militaire)' },
      { date: '1274', evenement: 'Première invasion mongole de Kublai Khan repoussée par les samouraïs et un typhon' },
      { date: '1281', evenement: 'Deuxième invasion mongole (140 000 hommes) détruite par le "vent divin" (kamikaze)' },
      { date: '1333', evenement: 'L\'Empereu Go-Daigo renverse le shogunat de Kamakura' },
    ]
  },
  {
    ere: 'Période des États en guerre',
    japonais: '戦国時代 (Sengoku)',
    dates: '1467 — 1615',
    duree: '~148 ans',
    couleur: '#D62828',
    periode: 'medieval',
    description: 'Siècle de guerres civiles entre seigneurs féodaux (daimyo) cherchant à unifier le Japon. Époque des trois grands unificateurs : Oda Nobunaga, Toyotomi Hideyoshi et Tokugawa Ieyasu. Arrivée des Portugais et de la poudre à canon.',
    personnages: ['Oda Nobunaga', 'Toyotomi Hideyoshi', 'Tokugawa Ieyasu', 'Uesugi Kenshin', 'Takeda Shingen'],
    faits: [
      { date: '1543', evenement: 'Arrivée des Portugais à Tanegashima — introduction des armes à feu au Japon' },
      { date: '1549', evenement: 'François Xavier introduit le christianisme au Japon' },
      { date: '1560', evenement: 'Oda Nobunaga écrase Imagawa Yoshimoto à la bataille d\'Okehazama' },
      { date: '1582', evenement: 'Nobunaga est assassiné à Honnō-ji par son vassal Akechi Mitsuhide' },
      { date: '1600', evenement: 'Tokugawa Ieyasu remporte la bataille décisive de Sekigahara' },
    ]
  },
  {
    ere: 'Shogunat Tokugawa (Edo)',
    japonais: '江戸時代',
    dates: '1603 — 1868',
    duree: '~265 ans',
    couleur: '#D4AF37',
    periode: 'edo',
    description: 'Période de paix et d\'isolement (sakoku) instaurée par les Tokugawa. Le Japon se ferme aux étrangers (sauf les Hollandais à Dejima, Nagasaki). La culture urbaine (kabuki, ukiyo-e, haïku) s\'épanouit à Edo (Tokyo). Population : 30 millions.',
    personnages: ['Tokugawa Ieyasu', 'Miyamoto Musashi', 'Matsuo Bashō', 'Hokusai', 'Hiroshige'],
    faits: [
      { date: '1603', evenement: 'Tokugawa Ieyasu reçoit le titre de shogun — début d\'un règne de 265 ans' },
      { date: '1635', evenement: 'Politique d\'isolement (sakoku) : interdiction aux Japonais de quitter l\'archipel' },
      { date: '1657', evenement: 'Grand incendie d\'Edo — reconstruction de la ville' },
      { date: '1688', evenement: 'Bashō publie "L\'Étroit Chemin du fond" (Oku no Hosomichi) — chef-d\'œuvre du haïku' },
      { date: '1853', evenement: 'Commodore Perry arrive avec ses "bateaux noirs" et force l\'ouverture du Japon' },
    ]
  },
  {
    ere: 'Ère Meiji',
    japonais: '明治時代',
    dates: '1868 — 1912',
    duree: '44 ans',
    couleur: '#1B4F72',
    periode: 'moderne',
    description: 'Révolution modernisatrice : l\'Empereur Meiji reprend le pouvoir aux shoguns et engage la modernisation accélérée du Japon sur le modèle occidental. Création d\'une armée, d\'industries, d\'un système éducatif universel et d\'une constitution.',
    personnages: ['Empereur Meiji', 'Itō Hirobumi', 'Saigō Takamori', 'Yamagata Aritomo'],
    faits: [
      { date: '1868', evenement: 'Restauration Meiji : fin du shogunat, retour du pouvoir impérial à Edo (renommée Tokyo)' },
      { date: '1872', evenement: 'Première ligne de chemin de fer entre Tokyo et Yokohama' },
      { date: '1889', evenement: 'Promulgation de la Constitution de Meiji — première constitution d\'Asie' },
      { date: '1894', evenement: 'Guerre sino-japonaise : le Japon s\'impose en Asie orientale' },
      { date: '1905', evenement: 'Victoire japonaise contre la Russie (guerre russo-japonaise) — choc mondial' },
    ]
  },
  {
    ere: 'Ère Shōwa — Guerre & Paix',
    japonais: '昭和時代',
    dates: '1926 — 1989',
    duree: '63 ans',
    couleur: '#7D3C98',
    periode: 'moderne',
    description: 'Ère la plus contrastée : militarisme, Seconde Guerre mondiale (bombardements atomiques d\'Hiroshima et Nagasaki), occupation américaine, puis "Miracle économique japonais" qui fait du Japon la 2ème économie mondiale.',
    personnages: ['Hirohito', 'Hideki Tōjō', 'Douglas MacArthur', 'Shigeru Yoshida'],
    faits: [
      { date: '1937', evenement: 'Début de la guerre sino-japonaise — invasion de Nankin' },
      { date: '1941', evenement: 'Attaque de Pearl Harbor — le Japon entre dans la Seconde Guerre mondiale' },
      { date: '1945', evenement: 'Bombardements atomiques d\'Hiroshima (6 août) et Nagasaki (9 août)' },
      { date: '1945', evenement: 'Capitulation du Japon — fin de la Seconde Guerre mondiale' },
      { date: '1964', evenement: 'Jeux Olympiques de Tokyo — lancement du Shinkansen, vitrine du renouveau japonais' },
      { date: '1968', evenement: 'Le Japon devient la 2ème puissance économique mondiale' },
    ]
  },
  {
    ere: 'Ère Heisei & Reiwa',
    japonais: '平成・令和時代',
    dates: '1989 — aujourd\'hui',
    duree: 'Depuis 35 ans',
    couleur: '#2ECC71',
    periode: 'moderne',
    description: 'Après une "décennie perdue" économique (1990s), le Japon affronte le séisme et tsunami de 2011 (Fukushima) et s\'adapte aux défis du vieillissement démographique. L\'Empereur Naruhito inaugure l\'ère Reiwa ("belle harmonie") en 2019.',
    personnages: ['Akihito (Heisei)', 'Naruhito (Reiwa)', 'Shinzo Abe'],
    faits: [
      { date: '1995', evenement: 'Séisme de Kobe (6 400 morts) — réforme du système de gestion des catastrophes' },
      { date: '2011', evenement: 'Tremblement de terre de Tōhoku, tsunami et accident nucléaire de Fukushima Daiichi' },
      { date: '2019', evenement: 'Abdication d\'Akihito — début de l\'ère Reiwa avec Naruhito' },
      { date: '2020', evenement: 'JO de Tokyo reportés d\'un an à cause de la pandémie de COVID-19' },
      { date: '2021', evenement: 'JO de Tokyo 2020 — le Japon décroche 27 médailles d\'or' },
    ]
  },
]

// Filtrage des événements selon la période sélectionnée
const evenementsFiltres = computed(() => {
  if (!periodeFiltre.value) return evenements
  return evenements.filter(e => e.periode === periodeFiltre.value)
})
</script>
