<template>
  <div class="min-h-screen bg-washi py-12">
    <div class="max-w-6xl mx-auto px-4">

      <!-- En-tête -->
      <div class="text-center mb-12">
        <p class="text-japon-rouge font-sans text-sm tracking-widest uppercase mb-2">文化</p>
        <h1 class="titre-section mx-auto">Culture japonaise</h1>
        <p class="text-gray-600 font-sans mt-4 max-w-2xl mx-auto">
          Entre raffinement ancestral et modernité inventive, la culture japonaise est un équilibre subtil
          entre Wabi-sabi (beauté de l'impermanence) et Monozukuri (art de faire les choses avec soin).
        </p>
      </div>

      <!-- Onglets de sous-sections -->
      <div class="flex gap-2 mb-10 border-b border-gray-200 overflow-x-auto pb-px">
        <button
          v-for="onglet in onglets"
          :key="onglet.id"
          @click="ongletActif = onglet.id"
          class="flex items-center gap-2 px-5 py-3 font-sans font-medium text-sm whitespace-nowrap
                 border-b-2 transition-all duration-200 flex-shrink-0"
          :class="ongletActif === onglet.id
            ? 'border-japon-rouge text-japon-rouge'
            : 'border-transparent text-gray-500 hover:text-japon-noir hover:border-gray-300'"
        >
          <span>{{ onglet.emoji }}</span>
          {{ onglet.nom }}
        </button>
      </div>

      <!-- ═══════════════════════════════════════════════════════
           ARTS TRADITIONNELS
           ═══════════════════════════════════════════════════════ -->
      <Transition name="page" mode="out-in">
        <div v-if="ongletActif === 'arts'" key="arts">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="art in artsTraditionnels"
              :key="art.nom"
              class="bg-white rounded-sm shadow-md overflow-hidden hover:shadow-xl
                     transition-all duration-300 group border-t-4"
              :style="{ borderColor: art.couleur }"
            >
              <!-- Illustration -->
              <div class="h-40 flex items-center justify-center text-8xl"
                   :style="{ backgroundColor: art.couleurFond }">
                {{ art.emoji }}
              </div>
              <div class="p-6">
                <div class="flex items-center justify-between mb-2">
                  <h3 class="font-serif text-xl text-japon-noir">{{ art.nom }}</h3>
                  <span class="text-japon-gris text-sm font-sans">{{ art.japonais }}</span>
                </div>
                <p class="text-gray-600 font-sans text-sm leading-relaxed mb-4">{{ art.description }}</p>
                <div class="border-t border-gray-100 pt-4">
                  <p class="text-xs text-japon-gris font-sans uppercase tracking-wide mb-2">Origine</p>
                  <p class="text-sm font-sans text-japon-noir">{{ art.origine }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ═══════════════════════════════════════════════════════
             ARTS MARTIAUX
             ═══════════════════════════════════════════════════════ -->
        <div v-else-if="ongletActif === 'martiaux'" key="martiaux">
          <div class="space-y-6">
            <div
              v-for="art in artsMartiaux"
              :key="art.nom"
              class="bg-white rounded-sm shadow-md p-6 flex flex-col md:flex-row gap-6
                     hover:shadow-xl transition-shadow duration-300 border-l-4 border-japon-rouge"
            >
              <!-- Emoji grand -->
              <div class="text-7xl flex-shrink-0 flex items-center justify-center
                          w-28 h-28 bg-red-50 rounded-sm">
                {{ art.emoji }}
              </div>
              <div class="flex-1">
                <div class="flex items-baseline gap-3 mb-2">
                  <h3 class="font-serif text-2xl text-japon-noir">{{ art.nom }}</h3>
                  <span class="text-japon-rouge font-sans text-lg">{{ art.japonais }}</span>
                  <span class="badge-rouge ml-auto">{{ art.niveau }}</span>
                </div>
                <p class="text-gray-600 font-sans text-sm leading-relaxed mb-4">{{ art.description }}</p>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div v-for="info in art.infos" :key="info.label" class="bg-gray-50 rounded-sm p-2 text-center">
                    <div class="text-xs text-japon-gris font-sans">{{ info.label }}</div>
                    <div class="text-sm font-sans font-medium text-japon-noir mt-0.5">{{ info.valeur }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ═══════════════════════════════════════════════════════
             FÊTES ET FESTIVALS
             ═══════════════════════════════════════════════════════ -->
        <div v-else-if="ongletActif === 'fetes'" key="fetes">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              v-for="fete in fetes"
              :key="fete.nom"
              class="bg-white rounded-sm shadow-md overflow-hidden hover:shadow-xl
                     transition-all duration-300 cursor-pointer"
              @click="feteSelectionnee = feteSelectionnee === fete.nom ? null : fete.nom"
            >
              <!-- Bannière colorée -->
              <div class="h-24 flex items-center justify-between px-6"
                   :style="{ backgroundColor: fete.couleur }">
                <div>
                  <h3 class="font-serif text-2xl text-white">{{ fete.nom }}</h3>
                  <p class="text-white text-opacity-80 font-sans text-sm">{{ fete.japonais }}</p>
                </div>
                <span class="text-5xl">{{ fete.emoji }}</span>
              </div>

              <div class="p-6">
                <!-- Date et lieu -->
                <div class="flex items-center gap-4 mb-3 text-sm font-sans">
                  <span class="flex items-center gap-1 text-japon-gris">
                    📅 {{ fete.date }}
                  </span>
                  <span class="flex items-center gap-1 text-japon-gris">
                    📍 {{ fete.lieu }}
                  </span>
                </div>
                <p class="text-gray-600 font-sans text-sm leading-relaxed">{{ fete.description }}</p>

                <!-- Détails développés -->
                <Transition name="slide">
                  <div v-if="feteSelectionnee === fete.nom" class="mt-4 pt-4 border-t border-gray-100">
                    <h4 class="font-sans font-semibold text-japon-noir text-sm mb-2">Traditions</h4>
                    <ul class="space-y-1.5">
                      <li v-for="tradition in fete.traditions" :key="tradition"
                          class="flex items-start gap-2 text-sm font-sans text-gray-700">
                        <span class="text-japon-rouge mt-0.5 flex-shrink-0">✦</span>
                        {{ tradition }}
                      </li>
                    </ul>
                  </div>
                </Transition>

                <p class="text-xs text-japon-gris font-sans mt-3 text-right">
                  {{ feteSelectionnee === fete.nom ? 'Réduire ▲' : 'En savoir plus ▼' }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Transition>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Onglet actif par défaut
const ongletActif    = ref('arts')
const feteSelectionnee = ref(null)

// Définition des sous-onglets
const onglets = [
  { id: 'arts',     nom: 'Arts traditionnels', emoji: '🎨' },
  { id: 'martiaux', nom: 'Arts martiaux',       emoji: '🥋' },
  { id: 'fetes',    nom: 'Fêtes & Festivals',   emoji: '🎎' },
]

// Données : Arts traditionnels japonais
const artsTraditionnels = [
  {
    nom: 'Ikebana',
    japonais: '生け花',
    emoji: '💐',
    couleur: '#D62828',
    couleurFond: '#FFF0F0',
    origine: 'Période Muromachi (XIVe siècle), lié au bouddhisme Zen',
    description: 'Art floral japonais fondé sur les principes d\'harmonie, d\'équilibre et de beauté naturelle. Contrairement aux bouquets occidentaux, l\'ikebana utilise l\'espace vide (ma) comme élément essentiel de la composition.'
  },
  {
    nom: 'Origami',
    japonais: '折り紙',
    emoji: '🦢',
    couleur: '#1B4F72',
    couleurFond: '#EBF5FB',
    origine: 'Période Edo (XVIIe siècle), popularisé lors des cérémonies de cour',
    description: 'Art du pliage de papier, de "oru" (plier) et "kami" (papier). La grue (tsuru) est le symbole le plus emblématique : selon la légende, plier 1 000 grues (senbazuru) exauce un vœu.'
  },
  {
    nom: 'Calligraphie',
    japonais: '書道 (shodō)',
    emoji: '🖌️',
    couleur: '#1A1A2E',
    couleurFond: '#F5F5F5',
    origine: 'Importée de Chine au IVe siècle, codifiée au Japon à la période Heian',
    description: 'Art de l\'écriture au pinceau (fude) avec de l\'encre noire (sumi). La calligraphie japonaise (shodō) est à la fois un art visuel et une discipline spirituelle cherchant l\'harmonie entre le geste et la pensée.'
  },
  {
    nom: 'Cérémonie du thé',
    japonais: '茶道 (chadō)',
    emoji: '🍵',
    couleur: '#2D6A4F',
    couleurFond: '#EAFAF1',
    origine: 'Codifiée par Sen no Rikyū au XVIe siècle, influencée par le Zen',
    description: 'Ritual artistique préparant et servant le matcha selon des gestes précis. Ses quatre principes (wa, kei, sei, jaku : harmonie, respect, pureté, tranquillité) reflètent la philosophie zen japonaise.'
  },
  {
    nom: 'Nō & Kabuki',
    japonais: '能・歌舞伎',
    emoji: '🎭',
    couleur: '#8E44AD',
    couleurFond: '#F4ECF7',
    origine: 'Nō : XIVe siècle par Zeami ; Kabuki : XVIIe siècle à Kyoto',
    description: 'Deux grandes formes de théâtre traditionnel. Le Nō, lent et mystique avec masques, est inscrit au patrimoine UNESCO. Le Kabuki, spectaculaire avec maquillages elaborés (kumadori), est populaire depuis l\'ère Edo.'
  },
  {
    nom: 'Kōdō',
    japonais: '香道',
    emoji: '🌿',
    couleur: '#D4AF37',
    couleurFond: '#FDFAE5',
    origine: 'Période Muromachi, art des nobles et samouraïs',
    description: 'L\'art de l\'encens — "kō" (encens) et "dō" (voie). Participants identifient à l\'aveugle les essences de bois précieux (aloès, santal) dans un silence contemplatif. Le kōdō fait partie des trois arts classiques avec l\'ikebana et la cérémonie du thé.'
  }
]

// Données : Arts martiaux
const artsMartiaux = [
  {
    nom: 'Judo',
    japonais: '柔道',
    emoji: '🥋',
    niveau: 'Sport olympique',
    description: 'Créé en 1882 par Jigorō Kanō à Tokyo, le judo ("voie de la souplesse") est fondé sur le principe de céder pour mieux vaincre. Il devient sport olympique en 1964 lors des JO de Tokyo. Pratiqué par 40 millions de personnes dans 200 pays.',
    infos: [
      { label: 'Fondateur',   valeur: 'Jigorō Kanō' },
      { label: 'Fondation',   valeur: '1882' },
      { label: 'Pratiquants', valeur: '40 millions' },
      { label: 'JO',          valeur: 'Depuis 1964' },
    ]
  },
  {
    nom: 'Karaté',
    japonais: '空手',
    emoji: '👊',
    niveau: 'Sport olympique',
    description: 'Originaire de l\'île d\'Okinawa, le karaté ("main vide") est un art martial de frappe utilisant poings, pieds, coudes et genoux. Introduit au Japon en 1922 par Gichin Funakoshi, il devient olympique à Tokyo 2020. Ses valeurs : respect, persévérance, maîtrise de soi.',
    infos: [
      { label: 'Origine',     valeur: 'Okinawa, XVIe siècle' },
      { label: 'Popularisé',  valeur: 'Funakoshi, 1922' },
      { label: 'Styles',      valeur: 'Shotokan, Kyokushin, Gōjū-ryū...' },
      { label: 'JO',          valeur: 'Tokyo 2020' },
    ]
  },
  {
    nom: 'Kendo',
    japonais: '剣道',
    emoji: '⚔️',
    niveau: 'Art martial traditionnel',
    description: 'La "voie du sabre" — art martial dérivé de la pratique des samouraïs avec le katana. Pratiqué avec un shinai (bambou) et une armure (bōgu), le kendo enseigne la discipline, la concentration et le respect. Ses règles morales (kendo no rinen) guident la vie quotidienne.',
    infos: [
      { label: 'Origine',     valeur: 'Ère Meiji, XIXe siècle' },
      { label: 'Arme',        valeur: 'Shinai (bambou) / bokken' },
      { label: 'Pratiquants', valeur: '1,7 million au Japon' },
      { label: 'Cible',       valeur: '4 zones (tête, tronc, poignets)' },
    ]
  },
  {
    nom: 'Aikido',
    japonais: '合気道',
    emoji: '☯️',
    niveau: 'Art martial philosophique',
    description: 'Créé par Morihei Ueshiba dans les années 1920, l\'aïkido est un art martial de défense pure. Il utilise la force de l\'adversaire contre lui-même via des projections et immobilisations. Son philosophie (aimer et protéger) en fait un art martial non-violent.',
    infos: [
      { label: 'Fondateur',   valeur: 'Morihei Ueshiba' },
      { label: 'Fondation',   valeur: 'Années 1920' },
      { label: 'Principe',    valeur: 'Harmonie des énergies' },
      { label: 'Pratiquants', valeur: '1,6 million mondial' },
    ]
  }
]

// Données : Fêtes et festivals
const fetes = [
  {
    nom: 'Hanami',
    japonais: '花見',
    emoji: '🌸',
    date: 'Mars — Avril',
    lieu: 'Tout le Japon',
    couleur: '#FFB7C5',
    description: 'La contemplation des cerisiers en fleurs est une tradition millénaire. Les Japonais se rassemblent sous les sakura pour des pique-niques festifs (o-hanami). Le Front de floraison (sakura zensen) est suivi avec passion dans tout le pays.',
    traditions: [
      'Pique-niques sous les cerisiers avec bentō et saké',
      'Illumination nocturne des parcs (yozakura)',
      'Poèmes composés sur l\'impermanence des fleurs (mono no aware)',
      'Dégustations de sakura mochi et sakura latte',
      'Fête au Parc d\'Ueno (Tokyo) depuis le XVIIIe siècle'
    ]
  },
  {
    nom: 'Obon',
    japonais: 'お盆',
    emoji: '🏮',
    date: 'Mi-août (13-16 août)',
    lieu: 'Tout le Japon',
    couleur: '#E67E22',
    description: 'Fête bouddhiste des ancêtres pendant laquelle les esprits des défunts reviennent visiter leur famille. Les familles nettoient les tombes, allument des lanternes et dansent la Bon Odori pour guider et honorer les âmes.',
    traditions: [
      'Allumage de feux de bienvenue (mukaebi) à l\'entrée des maisons',
      'Danse Bon Odori en cercle autour d\'une tour (yagura)',
      'Lancement de lanternes sur l\'eau (tōrō nagashi)',
      'Visite des cimetières et nettoyage des tombes',
      'Grand exode estival (retour au village natal)'
    ]
  },
  {
    nom: 'Tanabata',
    japonais: '七夕',
    emoji: '⭐',
    date: '7 juillet (calendrier luni-solaire : 7 août)',
    lieu: 'Sendai (le plus grand), Hiratsuka',
    couleur: '#8E44AD',
    description: 'Fête des étoiles inspirée de la légende chinoise de Orihime (Vega) et Hikoboshi (Altaïr), deux étoiles amantes séparées par la Voie Lactée qui ne se retrouvent qu\'une fois par an. On écrit ses vœux sur des tanzaku (papiers colorés) et on les suspend à des branches de bambou.',
    traditions: [
      'Écriture de souhaits sur tanzaku (papiers colorés)',
      'Suspension de décorations en papier sur bambous',
      'Défilé de chars géants à Sendai',
      'Feux d\'artifice et yukata (kimono d\'été)',
      'Chants traditionnels et danses folkloriques'
    ]
  },
  {
    nom: 'Shichi-Go-San',
    japonais: '七五三',
    emoji: '👘',
    date: '15 novembre',
    lieu: 'Sanctuaires shinto de tout le Japon',
    couleur: '#D4AF37',
    description: 'Fête traditionnelle pour les enfants de 3, 5 et 7 ans (les chiffres impairs porte-bonheur). Les parents emmènent leurs enfants en kimono aux sanctuaires shinto pour rendre grâce et prier pour leur santé et longévité. Les enfants reçoivent des chitose-ame (bonbons de "1000 ans").',
    traditions: [
      'Visite au sanctuaire en kimono (furisode pour filles)',
      'Prière pour la santé, la croissance et le bonheur',
      'Distribution de chitose-ame dans un sac décoré de grues',
      'Séance photo en famille et souvenirs',
      'Repas de célébration en famille'
    ]
  }
]
</script>
