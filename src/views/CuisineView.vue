<template>
  <div class="min-h-screen bg-washi py-12">
    <div class="max-w-6xl mx-auto px-4">

      <!-- En-tête -->
      <div class="text-center mb-12">
        <p class="text-japon-rouge font-sans text-sm tracking-widest uppercase mb-2">料理</p>
        <h1 class="titre-section mx-auto">Cuisine japonaise</h1>
        <p class="text-gray-600 font-sans mt-4 max-w-2xl mx-auto">
          Le washoku (和食), inscrit au patrimoine immatériel de l'UNESCO depuis 2013, incarne
          l'harmonie entre nature et gastronomie. Tokyo possède plus d'étoiles Michelin que toute autre ville au monde.
        </p>
      </div>

      <!-- Filtres par catégorie -->
      <div class="flex flex-wrap gap-2 mb-10 justify-center">
        <button
          @click="filtre = null"
          class="px-4 py-2 rounded-full font-sans text-sm font-medium transition-all duration-200"
          :class="filtre === null
            ? 'bg-japon-rouge text-white'
            : 'bg-white text-gray-600 hover:border-japon-rouge border border-gray-200'"
        >
          Tout voir
        </button>
        <button
          v-for="cat in categories"
          :key="cat.id"
          @click="filtre = cat.id"
          class="px-4 py-2 rounded-full font-sans text-sm font-medium transition-all duration-200 border"
          :class="filtre === cat.id
            ? 'bg-japon-rouge text-white border-japon-rouge'
            : 'bg-white text-gray-600 hover:border-japon-rouge border-gray-200'"
        >
          {{ cat.emoji }} {{ cat.nom }}
        </button>
      </div>

      <!-- Grille de plats -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <article
          v-for="plat in platsAffiches"
          :key="plat.nom"
          class="bg-white rounded-sm shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
          @click="platSelectionne = platSelectionne === plat.nom ? null : plat.nom"
        >
          <!-- Image illustrative (emoji géant + fond coloré) -->
          <div class="h-44 flex items-center justify-center relative overflow-hidden"
               :style="{ background: `linear-gradient(135deg, ${plat.couleur}22, ${plat.couleur}44)` }">
            <span class="text-8xl transition-transform duration-300 group-hover:scale-110">{{ plat.emoji }}</span>
            <!-- Badge catégorie -->
            <div class="absolute top-3 right-3">
              <span class="badge-rouge text-xs">{{ plat.categorie }}</span>
            </div>
            <!-- Badge région -->
            <div class="absolute bottom-3 left-3">
              <span class="px-2 py-1 bg-black bg-opacity-50 text-white text-xs font-sans rounded-full">
                📍 {{ plat.region }}
              </span>
            </div>
          </div>

          <!-- Corps de la carte -->
          <div class="p-5">
            <div class="flex items-center justify-between mb-2">
              <h3 class="font-serif text-xl text-japon-noir group-hover:text-japon-rouge transition-colors">
                {{ plat.nom }}
              </h3>
              <span class="text-japon-gris font-sans text-sm">{{ plat.japonais }}</span>
            </div>
            <p class="text-gray-600 font-sans text-sm leading-relaxed mb-3">{{ plat.description }}</p>

            <!-- Niveau de difficulté -->
            <div class="flex items-center gap-2 mb-3">
              <span class="text-xs text-japon-gris font-sans">Difficulté :</span>
              <div class="flex gap-1">
                <span
                  v-for="n in 5"
                  :key="n"
                  class="w-3 h-3 rounded-full"
                  :class="n <= plat.difficulte ? 'bg-japon-rouge' : 'bg-gray-200'"
                ></span>
              </div>
            </div>

            <!-- Détails développés au clic -->
            <Transition name="slide">
              <div v-if="platSelectionne === plat.nom" class="border-t border-gray-100 pt-4 mt-2">

                <!-- Ingrédients principaux -->
                <div class="mb-4">
                  <p class="text-xs text-japon-gris font-sans uppercase tracking-wide mb-2">Ingrédients clés</p>
                  <div class="flex flex-wrap gap-1.5">
                    <span
                      v-for="ing in plat.ingredients"
                      :key="ing"
                      class="px-2 py-1 bg-gray-50 border border-gray-200 text-gray-700 text-xs font-sans rounded"
                    >
                      {{ ing }}
                    </span>
                  </div>
                </div>

                <!-- Anecdote -->
                <div class="bg-red-50 rounded-sm p-3 border-l-3 border-japon-rouge">
                  <p class="text-xs font-sans text-gray-700 italic leading-relaxed">
                    💡 {{ plat.anecdote }}
                  </p>
                </div>

              </div>
            </Transition>

            <!-- Indicateur -->
            <p class="text-xs text-japon-gris font-sans mt-2 text-right">
              {{ platSelectionne === plat.nom ? 'Réduire ▲' : 'Voir les détails ▼' }}
            </p>
          </div>
        </article>
      </div>

      <!-- Section : Étiquette à table au Japon -->
      <section class="mt-16 bg-japon-noir rounded-sm p-8 md:p-12">
        <h2 class="font-serif text-2xl text-japon-blanc mb-6 text-center">
          🥢 Étiquette à table au Japon
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="regle in etiquette" :key="regle.regle"
               class="flex items-start gap-3 bg-white bg-opacity-5 rounded-sm p-4">
            <span class="text-2xl flex-shrink-0">{{ regle.emoji }}</span>
            <div>
              <p class="text-white font-sans font-medium text-sm">{{ regle.regle }}</p>
              <p class="text-gray-400 font-sans text-xs mt-1 leading-relaxed">{{ regle.explication }}</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const filtre         = ref(null)
const platSelectionne = ref(null)

// Catégories de cuisine
const categories = [
  { id: 'plat',    nom: 'Plats',      emoji: '🍜' },
  { id: 'sushi',   nom: 'Sushis',     emoji: '🍣' },
  { id: 'sucrerie',nom: 'Sucreries',  emoji: '🍡' },
  { id: 'snack',   nom: 'Snacks',     emoji: '🍱' },
]

// Plats japonais avec données complètes
const plats = [
  {
    nom: 'Ramen',
    japonais: 'ラーメン',
    emoji: '🍜',
    categorie: 'Plat',
    couleur: '#D62828',
    region: 'Fukuoka / Sapporo',
    difficulte: 4,
    description: 'Soupe de nouilles emblématique aux déclinaisons régionales infinies. Le bouillon peut être à base de porc (tonkotsu), de soja (shōyu), de sel (shio) ou de miso, mijoté parfois plus de 12 heures.',
    ingredients: ['Nouilles de blé', 'Bouillon de porc/poulet', 'Chashu (porc rôti)', 'Œuf mariné', 'Nori', 'Menma (bambou)', 'Oignons verts'],
    anecdote: 'Il existe plus de 30 styles régionaux de ramen au Japon. Le tonkotsu ramen de Fukuoka utilise un bouillon blanchi pendant 18h+ pour obtenir sa texture crémeuse unique.'
  },
  {
    nom: 'Sushi',
    japonais: '寿司',
    emoji: '🍣',
    categorie: 'Sushi',
    couleur: '#1B4F72',
    region: 'Edo (Tokyo)',
    difficulte: 3,
    description: 'Plus qu\'un plat, le sushi est un art. Né à Edo (Tokyo) au XIXe siècle, le nigiri-sushi est une bouchée de riz vinaigré (shari) surmontée d\'un poisson frais (neta). Le kaiten-zushi (sushi sur tapis roulant) est une invention japonaise de 1958.',
    ingredients: ['Riz à sushi (shari)', 'Thon (maguro)', 'Saumon (sake)', 'Daurade (tai)', 'Wasabi', 'Sauce soja', 'Gingembre mariné (gari)'],
    anecdote: 'Un chef itamae (maître sushi) se forme pendant 10 ans minimum. Les 2-3 premières années sont consacrées uniquement à apprendre à cuire et assaisonner le riz parfaitement.'
  },
  {
    nom: 'Tempura',
    japonais: '天ぷら',
    emoji: '🍤',
    categorie: 'Plat',
    couleur: '#D4AF37',
    region: 'Tokyo (Edo)',
    difficulte: 3,
    description: 'Fruits de mer et légumes enrobés d\'une pâte légère et dorée, frits à haute température dans l\'huile de sésame. La pâte doit rester froide et peu mélangée pour garantir une texture croustillante et aérienne.',
    ingredients: ['Crevettes (ebi)', 'Aubergine', 'Patate douce', 'Farine de blé', 'Eau glacée', 'Œuf', 'Huile de sésame', 'Dashi tentsuyu'],
    anecdote: 'La tempura a été introduite au Japon par les missionnaires portugais au XVIe siècle, lors du jeûne du "Quatre-Temps" (Quatuor Anni Tempora). Les Japonais ont perfectionné la technique jusqu\'à en faire un art à part entière.'
  },
  {
    nom: 'Wagashi',
    japonais: '和菓子',
    emoji: '🍡',
    categorie: 'Sucrerie',
    couleur: '#FFB7C5',
    region: 'Kyoto',
    difficulte: 5,
    description: 'Confiseries traditionnelles japonaises, souvent servies lors de la cérémonie du thé. Fabriquées à partir de pâte de haricots rouges (anko), de riz gluant ou de kanten, elles représentent les saisons et la nature selon des formes délicates.',
    ingredients: ['Pâte d\'anko (haricots rouges)', 'Riz gluant (mochi)', 'Kanten (agar-agar)', 'Sucre', 'Matcha', 'Châtaignes', 'Osmanthus'],
    anecdote: 'Les wagashi de Kyoto sont considérés comme les plus raffinés du Japon. Les confiseries s\'appellent namagashi (fraîches), higashi (sèches) ou han-namagashi (semi-fraîches) selon leur teneur en eau.'
  },
  {
    nom: 'Bento',
    japonais: '弁当',
    emoji: '🍱',
    categorie: 'Snack',
    couleur: '#2D6A4F',
    region: 'Tout le Japon',
    difficulte: 2,
    description: 'Repas compartimenté dans une boîte, représentant l\'équilibre nutritionnel et esthétique japonais. Le "kyaraben" (character bento) est une forme d\'art populaire au Japon, transformant les repas des enfants en personnages de mangas.',
    ingredients: ['Riz blanc ou onigiri', 'Poisson ou viande', 'Légumes de saison', 'Tamagoyaki (omelette roulée)', 'Pickles (tsukemono)', 'Edamame'],
    anecdote: 'Le concept de bento existe depuis la période Kamakura (XIIe siècle) pour les soldats et voyageurs. Aujourd\'hui, les gares proposent des ekiben (bento ferroviaires) avec des spécialités régionales, très collectionnés.'
  },
  {
    nom: 'Takoyaki',
    japonais: 'たこ焼き',
    emoji: '🐙',
    categorie: 'Snack',
    couleur: '#E67E22',
    region: 'Osaka (Kansai)',
    difficulte: 3,
    description: 'Boulettes de pâte farcies de pieuvre (tako), oignons verts et gingembre mariné, cuites dans un moule hémisphérique spécial. Emblème gastronomique d\'Osaka, elles sont recouvertes de sauce takoyaki, mayonnaise, bonites séchées (katsuobushi) et nori.',
    ingredients: ['Pieuvre (tako)', 'Pâte à base de dashi', 'Oignons verts', 'Gingembre rouge (benishōga)', 'Sauce takoyaki', 'Mayonnaise Kewpie', 'Bonites séchées'],
    anecdote: 'Osaka est surnommée "kuidaore" (se ruiner en mangeant). Le takoyaki a été inventé en 1935 par Tomekichi Endo qui cherchait à utiliser les restes de pieuvre du marché. Chaque famille d\'Osaka possède son propre grill à takoyaki.'
  },
  {
    nom: 'Matcha',
    japonais: '抹茶',
    emoji: '🍵',
    categorie: 'Sucrerie',
    couleur: '#2D6A4F',
    region: 'Uji (Kyoto)',
    difficulte: 2,
    description: 'Poudre de thé vert finement broyée, pilier de la cérémonie du thé (chadō) et arôme omniprésent dans la pâtisserie japonaise moderne. Les meilleures feuilles de thé (tencha) sont cultivées à l\'ombre 3 semaines avant la récolte.',
    ingredients: ['Feuilles de tencha séchées et moulues', 'Eau chaude (75-80°C)', 'Matcha grade cérémonie', 'Chasen (fouet en bambou)'],
    anecdote: 'Le matcha est importé de Chine au XIIe siècle par le moine Eisai. Aujourd\'hui Uji (Kyoto) et Nishio (Aichi) produisent les matchas les plus réputés. La couleur verte intense indique une haute teneur en chlorophylle, signe de qualité.'
  },
  {
    nom: 'Okonomiyaki',
    japonais: 'お好み焼き',
    emoji: '🥞',
    categorie: 'Plat',
    couleur: '#8E44AD',
    region: 'Osaka & Hiroshima',
    difficulte: 2,
    description: 'Galette salée à base de farine, chou, œufs et divers garnitures (fruits de mer, viande, fromage). Son nom signifie "ce que vous aimez, grillé". Il en existe deux styles : Osaka (mélangé) et Hiroshima (en couches).',
    ingredients: ['Farine', 'Chou émincé', 'Œufs', 'Bouillon dashi', 'Porc (buta)', 'Crevettes', 'Sauce okonomiyaki', 'Aonori (algue verte)'],
    anecdote: 'Pendant la Seconde Guerre mondiale, l\'okonomiyaki était un plat de survie car il permettait de mélanger toutes sortes de restes disponibles. À Hiroshima, on empile les couches au lieu de les mélanger — une différence régionale source de vifs débats !'
  }
]

// Plats filtrés selon la catégorie sélectionnée
const platsAffiches = computed(() => {
  if (!filtre.value) return plats
  return plats.filter(p =>
    p.categorie.toLowerCase() === filtre.value
  )
})

// Règles d'étiquette à table
const etiquette = [
  {
    emoji: '🙏',
    regle: 'Itadakimasu & Gochisōsama',
    explication: 'Dire "itadakimasu" (je reçois humblement) avant de manger et "gochisōsama deshita" (merci pour ce festin) après. Ces formules expriment la gratitude envers ceux qui ont préparé le repas.'
  },
  {
    emoji: '🥢',
    regle: 'Ne jamais planter ses baguettes dans le riz',
    explication: 'C\'est un symbole funéraire (on offre du riz avec des baguettes plantées lors des funérailles). Ne jamais non plus passer de la nourriture de baguette à baguette — autre geste funéraire.'
  },
  {
    emoji: '🍶',
    regle: 'Ne pas se resservir soi-même',
    explication: 'On sert ses voisins de table, et on attend qu\'ils vous servent en retour. Ne jamais laisser le verre de son voisin vide sans lui proposer de le remplir.'
  },
  {
    emoji: '🍜',
    regle: 'Slurper les nouilles et le bouillon',
    explication: 'Contrairement à l\'étiquette occidentale, aspirer bruyamment les nouilles (ramen, soba, udon) est non seulement acceptable mais signe d\'appréciation ! Cela refroidit aussi les nouilles chaudes.'
  },
  {
    emoji: '🚫',
    regle: 'Éviter de manger en marchant',
    explication: 'Manger en se déplaçant dans la rue est considéré comme grossier dans la culture japonaise. Les exceptions : les festivals matsuri et les cornets de glace dans les parcs.'
  },
  {
    emoji: '💴',
    regle: 'Ne jamais laisser de pourboire',
    explication: 'Laisser un pourboire au Japon peut être perçu comme une insulte, laissant entendre que le personnel n\'est pas suffisamment payé. Le service est toujours inclus et de qualité (omotenashi).'
  }
]
</script>
