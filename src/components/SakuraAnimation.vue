<template>
  <!-- Conteneur des pétales de sakura — position fixe, z-index élevé, non-interactif -->
  <div class="sakura-container" aria-hidden="true">
    <div
      v-for="petale in petales"
      :key="petale.id"
      class="sakura-petal"
      :style="petale.style"
    >
      {{ petale.symbole }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Symboles représentant les pétales de sakura
const SYMBOLES = ['🌸', '🌸', '🌸', '🌺', '🍃', '🌸']

// Nombre de pétales simultanés
const NB_PETALES = 18

const petales = ref([])

/**
 * Génère les propriétés CSS aléatoires pour un pétale
 * @param {number} id - Identifiant unique du pétale
 */
function creerPetale(id) {
  const duree    = 7 + Math.random() * 8          // Durée de chute : 7–15 secondes
  const delai    = Math.random() * -15             // Décalage initial pour étaler les pétales
  const posX     = Math.random() * 100             // Position horizontale en %
  const taille   = 0.8 + Math.random() * 1.2      // Taille entre 0.8 et 2em
  const balancmt = 30 + Math.random() * 60         // Amplitude de balancement horizontal

  return {
    id,
    symbole: SYMBOLES[Math.floor(Math.random() * SYMBOLES.length)],
    style: {
      left:             `${posX}vw`,
      fontSize:         `${taille}rem`,
      animationName:    'sakuraFall, sakuraSway',
      animationDuration:`${duree}s, ${2 + Math.random() * 3}s`,
      animationDelay:   `${delai}s, ${Math.random() * 2}s`,
      animationTimingFunction: 'linear, ease-in-out',
      animationIterationCount: 'infinite, infinite',
      '--balancement':  `${balancmt}px`,
      opacity:          0.7 + Math.random() * 0.3,
    }
  }
}

onMounted(() => {
  // Création des pétales au montage du composant
  petales.value = Array.from({ length: NB_PETALES }, (_, i) => creerPetale(i))
})

onUnmounted(() => {
  // Nettoyage : vider les pétales
  petales.value = []
})
</script>

<style scoped>
/* Conteneur fixe couvrant tout l'écran */
.sakura-container {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9998;
  overflow: hidden;
}

/* Chaque pétale */
.sakura-petal {
  position: absolute;
  top: -3rem;
  will-change: transform, opacity;
  animation: sakuraFall linear infinite, sakuraSway ease-in-out infinite;
}

/* Animation de chute verticale */
@keyframes sakuraFall {
  0% {
    transform: translateY(-3rem) rotate(0deg) scale(1);
    opacity: 0;
  }
  5% {
    opacity: 1;
  }
  95% {
    opacity: 0.6;
  }
  100% {
    transform: translateY(105vh) rotate(720deg) scale(0.8);
    opacity: 0;
  }
}

/* Animation de balancement horizontal */
@keyframes sakuraSway {
  0%, 100% {
    margin-left: 0;
  }
  25% {
    margin-left: calc(var(--balancement, 40px));
  }
  75% {
    margin-left: calc(-1 * var(--balancement, 40px) / 2);
  }
}
</style>
