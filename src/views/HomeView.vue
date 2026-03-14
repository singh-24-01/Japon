<template>
  <div class="min-h-screen bg-washi">

    <!-- ═══════════════════════════════════════════════════════════
         SECTION HERO — Fond dramatique avec kanji en filigrane
         ═══════════════════════════════════════════════════════════ -->
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden bg-japon-noir">

      <!-- Kanji 日本 en filigrane géant -->
      <div class="kanji-watermark" style="top: 10%; right: 5%; opacity: 0.07; font-size: 20rem;">日</div>
      <div class="kanji-watermark" style="top: 30%; left: 5%;  opacity: 0.05; font-size: 14rem;">本</div>

      <!-- Cercle rouge (soleil levant) décoratif -->
      <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div class="w-96 h-96 rounded-full bg-japon-rouge opacity-5 blur-3xl"></div>
      </div>

      <!-- Contenu du hero -->
      <div class="relative z-10 text-center px-4 max-w-4xl mx-auto">

        <!-- Titre principal animé -->
        <div class="animate-fade-in-up" style="animation-delay: 0.1s;">
          <p class="text-japon-dore font-sans text-sm md:text-base tracking-widest uppercase mb-4">
            ✦ Bienvenue au pays du soleil levant ✦
          </p>
          <h1 class="font-serif text-6xl md:text-8xl text-japon-blanc mb-4">
            日本
          </h1>
          <p class="font-serif text-2xl md:text-3xl text-japon-rouge mb-2">
            Nihon • Nippon
          </p>
        </div>

        <!-- Haïku animé -->
        <div class="my-10 animate-fade-in-up" style="animation-delay: 0.4s;">
          <div class="inline-block bg-white bg-opacity-5 border border-japon-dore border-opacity-30 rounded-sm px-8 py-6 max-w-md">
            <p class="font-serif text-japon-blanc text-lg leading-loose italic">
              "古池や<br />蛙飛び込む<br />水の音"
            </p>
            <div class="mt-3 border-t border-japon-dore border-opacity-30 pt-3">
              <p class="text-japon-dore text-sm font-sans italic">
                "Le vieil étang —<br />
                une grenouille plonge,<br />
                bruit de l'eau."
              </p>
              <p class="text-gray-500 text-xs mt-2 font-sans">— Matsuo Bashō, 1686</p>
            </div>
          </div>
        </div>

        <!-- Bouton de découverte -->
        <div class="animate-fade-in-up" style="animation-delay: 0.7s;">
          <RouterLink to="/regions" class="btn-japon inline-block">
            Commencer l'exploration →
          </RouterLink>
        </div>

      </div>

      <!-- Flèche de défilement -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div class="w-6 h-10 rounded-full border-2 border-japon-blanc border-opacity-40 flex items-start justify-center pt-2">
          <div class="w-1 h-3 bg-japon-blanc bg-opacity-60 rounded-full"></div>
        </div>
      </div>

    </section>

    <!-- ═══════════════════════════════════════════════════════════
         SECTION — Citation avec traduction
         ═══════════════════════════════════════════════════════════ -->
    <section class="py-20 bg-japon-blanc border-y-4 border-japon-rouge">
      <div class="max-w-3xl mx-auto px-4 text-center">
        <p class="text-japon-gris text-sm tracking-widest uppercase mb-4 font-sans">Philosophie japonaise</p>
        <blockquote class="font-serif text-3xl md:text-4xl text-japon-noir mb-4 leading-relaxed">
          "七転び八起き"
        </blockquote>
        <p class="text-japon-rouge font-sans text-lg mb-2">
          Nana korobi ya oki
        </p>
        <p class="text-gray-600 font-sans text-base italic">
          "Tombe sept fois, relève-toi huit fois."
        </p>
        <div class="mt-4 text-sm text-gray-400 font-sans">— Proverbe japonais</div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════
         SECTION — Chiffres clés du Japon
         ═══════════════════════════════════════════════════════════ -->
    <section class="py-20 bg-washi">
      <div class="max-w-6xl mx-auto px-4">

        <div class="text-center mb-14">
          <h2 class="titre-section mx-auto">{{ store.t.home.decouvrir }}</h2>
          <p class="text-gray-600 font-sans mt-4 max-w-2xl mx-auto">
            {{ store.t.home.intro }}
          </p>
        </div>

        <!-- Grille de statistiques -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div v-for="stat in stats" :key="stat.label"
               class="text-center p-8 bg-white rounded-sm shadow-md border-t-4 border-japon-rouge
                      hover:shadow-xl transition-shadow duration-300 group">
            <div class="text-4xl mb-3">{{ stat.emoji }}</div>
            <div class="font-serif text-3xl text-japon-rouge mb-2">{{ stat.valeur }}</div>
            <div class="text-gray-500 text-sm font-sans uppercase tracking-wide">{{ stat.label }}</div>
            <div class="text-gray-700 font-sans mt-2 text-sm font-medium">{{ stat.detail }}</div>
          </div>
        </div>

        <!-- Faits intéressants -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div v-for="fait in faitsJapon" :key="fait.titre"
               class="flex items-start gap-4 p-6 bg-white rounded-sm shadow-sm
                      hover:border-l-4 hover:border-japon-rouge transition-all duration-300 group">
            <span class="text-3xl flex-shrink-0">{{ fait.emoji }}</span>
            <div>
              <h3 class="font-serif text-lg text-japon-noir mb-1 group-hover:text-japon-rouge transition-colors">
                {{ fait.titre }}
              </h3>
              <p class="text-gray-600 text-sm font-sans leading-relaxed">{{ fait.texte }}</p>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════
         SECTION — Navigation rapide vers les sections
         ═══════════════════════════════════════════════════════════ -->
    <section class="py-20 bg-japon-noir">
      <div class="max-w-6xl mx-auto px-4">

        <h2 class="font-serif text-3xl text-japon-blanc text-center mb-12">
          Explorez le <span class="text-japon-rouge">Japon</span>
        </h2>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <RouterLink
            v-for="section in sections"
            :key="section.chemin"
            :to="section.chemin"
            class="flex flex-col items-center gap-3 p-6 rounded-sm bg-white bg-opacity-5
                   border border-white border-opacity-10 hover:border-japon-rouge
                   hover:bg-japon-rouge hover:bg-opacity-10 transition-all duration-300 group"
          >
            <span class="text-3xl">{{ section.emoji }}</span>
            <span class="text-white text-sm font-sans text-center group-hover:text-japon-rouge transition-colors">
              {{ section.nom }}
            </span>
          </RouterLink>
        </div>

      </div>
    </section>

  </div>
</template>

<script setup>
import { useAppStore } from '@/stores/appStore.js'

const store = useAppStore()

// Statistiques principales du Japon
const stats = [
  {
    emoji:  '🗾',
    valeur: '377 975',
    label:  'Superficie (km²)',
    detail: '4ème plus grand archipel mondial'
  },
  {
    emoji:  '👥',
    valeur: '125,7 M',
    label:  'Habitants',
    detail: 'Dont 13,9 M à Tokyo'
  },
  {
    emoji:  '🏙️',
    valeur: 'Tokyo',
    label:  'Capitale',
    detail: 'Plus grande métropole au monde'
  }
]

// Faits marquants sur le Japon
const faitsJapon = [
  {
    emoji: '⛩️',
    titre: '80 000 sanctuaires shinto',
    texte: 'Le Japon compte plus de 80 000 jinja (sanctuaires) et 77 000 temples bouddhistes, témoignant d\'une spiritualité profondément ancrée dans la vie quotidienne.'
  },
  {
    emoji: '🚄',
    titre: 'Le Shinkansen depuis 1964',
    texte: 'Le réseau de trains à grande vitesse (jusqu\'à 320 km/h) transporte plus de 450 000 passagers par jour avec une ponctualité légendaire : retard moyen de 54 secondes.'
  },
  {
    emoji: '🌸',
    titre: 'La culture Sakura',
    texte: 'Le Hanami (contemplation des cerisiers) est une tradition millénaire. Les Japonais suivent l\'avancée des fleurs via des "fronts de floraison" publiés chaque printemps.'
  },
  {
    emoji: '🍱',
    titre: 'Gastronomie mondialement reconnue',
    texte: 'Tokyo est la ville au monde avec le plus d\'étoiles Michelin (230+). La cuisine japonaise (washoku) est inscrite au patrimoine immatériel de l\'UNESCO depuis 2013.'
  },
  {
    emoji: '🤖',
    titre: 'Leader technologique mondial',
    texte: 'Le Japon est le 3ème pays en nombre de brevets déposés et le 2ème producteur mondial de robots industriels, répondant au vieillissement de sa population.'
  },
  {
    emoji: '📚',
    titre: 'Taux d\'alphabétisation de 99%',
    texte: 'Avec un système éducatif rigoureux, le Japon affiche l\'un des meilleurs taux d\'alphabétisation au monde. Les élèves apprennent 2 000 kanji avant la fin du lycée.'
  }
]

// Liens de navigation rapide
const sections = [
  { emoji: '🗾', nom: 'Régions',  chemin: '/regions'  },
  { emoji: '🎎', nom: 'Culture',  chemin: '/culture'  },
  { emoji: '🍜', nom: 'Cuisine',  chemin: '/cuisine'  },
  { emoji: '🈵', nom: 'Langue',   chemin: '/langue'   },
  { emoji: '📜', nom: 'Histoire', chemin: '/histoire' },
  { emoji: '🌸', nom: 'Galerie',  chemin: '/galerie'  },
]
</script>
