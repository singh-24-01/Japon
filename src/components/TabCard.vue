<template>
  <!-- Carte générique réutilisable dans toute l'application -->
  <article
    class="card-japon group cursor-pointer"
    :class="[
      ouvert ? 'ring-2 ring-japon-rouge ring-offset-2' : '',
      large ? 'col-span-2' : ''
    ]"
    @click="$emit('click')"
    role="button"
    :aria-expanded="ouvert"
  >
    <!-- En-tête de la carte -->
    <header class="flex items-start justify-between gap-4 mb-3">

      <!-- Icône / Emoji -->
      <div v-if="emoji" class="text-3xl flex-shrink-0 leading-none">
        {{ emoji }}
      </div>

      <!-- Titre et badge -->
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2 flex-wrap">
          <h3 class="font-serif text-lg text-japon-noir group-hover:text-japon-rouge transition-colors">
            {{ titre }}
          </h3>
          <span v-if="badge" class="badge-rouge">{{ badge }}</span>
        </div>
        <!-- Sous-titre optionnel en japonais -->
        <p v-if="sousTitre" class="text-japon-gris text-sm font-sans mt-0.5">
          {{ sousTitre }}
        </p>
      </div>

      <!-- Indicateur d'ouverture -->
      <div
        class="flex-shrink-0 w-6 h-6 rounded-full border-2 border-japon-rouge
               flex items-center justify-center transition-transform duration-300"
        :class="ouvert ? 'rotate-180 bg-japon-rouge' : ''"
      >
        <svg class="w-3 h-3" :class="ouvert ? 'text-white' : 'text-japon-rouge'"
             fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

    </header>

    <!-- Ligne décorative -->
    <div class="h-px bg-gradient-to-r from-japon-rouge to-transparent mb-3 opacity-30"></div>

    <!-- Description courte (toujours visible) -->
    <p v-if="description" class="text-sm text-gray-600 font-sans leading-relaxed">
      {{ description }}
    </p>

    <!-- Contenu développé (slot) -->
    <Transition name="slide">
      <div v-if="ouvert" class="mt-4 pt-4 border-t border-gray-100">
        <slot />
      </div>
    </Transition>

  </article>
</template>

<script setup>
// Props du composant TabCard
defineProps({
  titre:       { type: String,  required: true },
  sousTitre:   { type: String,  default: '' },
  description: { type: String,  default: '' },
  emoji:       { type: String,  default: '' },
  badge:       { type: String,  default: '' },
  ouvert:      { type: Boolean, default: false },
  large:       { type: Boolean, default: false },  // Prend 2 colonnes dans une grille
})

// Événement émis au clic
defineEmits(['click'])
</script>
