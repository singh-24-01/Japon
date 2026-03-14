<template>
  <!-- Conteneur principal de l'application -->
  <div class="min-h-screen bg-japon-blanc">

    <!-- Barre de navigation fixe -->
    <NavBar />

    <!-- Animation de pétales de sakura (page d'accueil uniquement) -->
    <SakuraAnimation v-if="estAccueil" />

    <!-- Zone de contenu principal avec transition de route -->
    <main class="pt-16">
      <RouterView v-slot="{ Component, route }">
        <Transition name="page" mode="out-in">
          <component :is="Component" :key="route.path" />
        </Transition>
      </RouterView>
    </main>

    <!-- Pied de page discret -->
    <footer class="bg-japon-noir text-japon-blanc py-8 mt-16">
      <div class="max-w-6xl mx-auto px-4 text-center">
        <p class="font-serif text-lg text-japon-dore mb-2">日本</p>
        <p class="text-sm text-gray-400 font-sans">
          Découvrez la beauté et la richesse du Japon — 日本の美しさと豊かさを発見する
        </p>
        <div class="mt-4 flex justify-center gap-6 text-xs text-gray-500">
          <span>🗾 6 852 îles</span>
          <span>🌸 47 préfectures</span>
          <span>⛩️ 80 000 sanctuaires</span>
          <span>🍵 Depuis 660 av. J.-C.</span>
        </div>
      </div>
    </footer>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import SakuraAnimation from '@/components/SakuraAnimation.vue'

const route = useRoute()

// Afficher les sakuras uniquement sur la page d'accueil
const estAccueil = computed(() => route.name === 'accueil')
</script>
