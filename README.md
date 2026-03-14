# 日本 — Découvrir le Japon

Une application Vue.js 3 complète dédiée à la découverte du Japon : culture, cuisine, langue, histoire et régions.

![Vue 3](https://img.shields.io/badge/Vue-3.4-42b883?logo=vue.js)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38BDF8?logo=tailwindcss)
![Pinia](https://img.shields.io/badge/Pinia-2.1-FFD859?logo=pinia)

---

## Aperçu

| Page | Description |
|------|-------------|
| **Accueil** | Hero animé avec haïku, citation japonaise, statistiques clés |
| **Régions** | Carte SVG interactive des 8 régions avec fiches détaillées |
| **Culture** | Arts traditionnels, arts martiaux, fêtes et festivals |
| **Cuisine** | 8 plats emblématiques avec ingrédients et anecdotes |
| **Langue** | Tableaux hiragana/katakana cliquables, 9 kanji, mini quiz |
| **Histoire** | Timeline verticale interactive de Jōmon à aujourd'hui |
| **Galerie** | Grille masonry de 12 lieux avec modal et filtres thématiques |

---

## Stack technique

- **[Vue 3](https://vuejs.org/)** — Composition API (`<script setup>`)
- **[Vite 5](https://vitejs.dev/)** — Bundler ultra-rapide
- **[Vue Router 4](https://router.vuejs.org/)** — Navigation en history mode avec lazy loading
- **[Pinia](https://pinia.vuejs.org/)** — State management (langue FR/EN, quiz, favoris)
- **[Tailwind CSS 3](https://tailwindcss.com/)** — Utility-first styling
- **[Lucide Vue Next](https://lucide.dev/)** — Icônes SVG

---

## Démarrage rapide

### Prérequis

- Node.js ≥ 18
- npm ≥ 9

### Installation

```bash
# Cloner le projet
git clone <url-du-repo>
cd japon

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

L'application est accessible sur **http://localhost:3000**

### Build de production

```bash
npm run build      # Génère le dossier dist/
npm run preview    # Prévisualise le build de production
```

---

## Structure du projet

```
japon/
├── index.html
├── package.json
├── vite.config.js          # Alias @ → src/
├── tailwind.config.js      # Palette japonaise + animations custom
├── postcss.config.js
├── public/
│   └── favicon.svg         # Drapeau japonais SVG
└── src/
    ├── main.js             # Point d'entrée : Vue + Pinia + Router
    ├── App.vue             # Layout global + RouterView + footer
    ├── assets/
    │   └── main.css        # Tailwind + composants + keyframes sakura
    ├── router/
    │   └── index.js        # 7 routes lazy-loaded
    ├── stores/
    │   └── appStore.js     # Pinia : langue, favoris, quiz
    ├── components/
    │   ├── NavBar.vue          # Navbar fixe + menu hamburger mobile
    │   ├── SakuraAnimation.vue # 18 pétales CSS animés (accueil)
    │   └── TabCard.vue         # Carte accordéon réutilisable
    └── views/
        ├── HomeView.vue        # Hero + haïku + stats + navigation rapide
        ├── RegionsView.vue     # Carte SVG + fiches des 8 régions
        ├── CultureView.vue     # 3 onglets : arts / martiaux / fêtes
        ├── CuisineView.vue     # 8 plats + étiquette à table
        ├── LangueView.vue      # Kana (46×2) + kanji + quiz 10 questions
        ├── HistoireView.vue    # Timeline 11 ères (Jōmon → Reiwa)
        └── GalerieView.vue     # Masonry 12 lieux + modal + filtres
```

---

## Fonctionnalités

### Navigation
- Navbar fixe avec soulignement rouge sur l'onglet actif
- Menu hamburger responsive sur mobile
- Transitions de route fluides (fade + slide vertical)
- Retour en haut de page automatique lors de la navigation

### Accueil
- Animation de pétales de sakura (18 pétales avec trajectoires aléatoires)
- Haïku de Matsuo Bashō avec traduction
- Citation japonaise : *"七転び八起き"*
- Grille de statistiques et faits marquants

### Régions
- Carte SVG schématique cliquable des 8 régions (Hokkaido → Kyūshū)
- Fiche détaillée par région : chef-lieu, superficie, population, spécialités
- Sélection synchronisée carte ↔ liste

### Culture
- **Arts traditionnels** : Ikebana, Origami, Calligraphie, Cérémonie du thé, Nō/Kabuki, Kōdō
- **Arts martiaux** : Judo, Karaté, Kendo, Aïkido avec historique complet
- **Fêtes** : Hanami, Obon, Tanabata, Shichi-Go-San avec traditions détaillées

### Cuisine
- 8 plats : Ramen, Sushi, Tempura, Wagashi, Bento, Takoyaki, Matcha, Okonomiyaki
- Filtre par catégorie (plats / sushis / sucreries / snacks)
- Jauge de difficulté de préparation
- Ingrédients et anecdote historique par plat
- Section étiquette à table (omotenashi)

### Langue
- Tableau complet des **46 hiragana** avec exemples de mots
- Tableau complet des **46 katakana** avec mots empruntés
- **9 kanji** essentiels avec on'yomi, kun'yomi et exemples
- **Quiz** 10 questions avec score, feedback coloré et message de résultat

### Histoire
- **11 ères** de la période Jōmon (14 000 av. J.-C.) à l'ère Reiwa (2019–)
- Filtres par grande période (Ancien Japon / Moyen Âge / Edo / Moderne)
- Personnages clés et événements datés par ère

### Galerie
- **12 lieux** emblématiques en grille masonry
- Filtres : Nature / Temples / Villes / Saisons
- Modal au clic avec description, préfecture et saison

### Internationalisation
- Toggle FR / EN dans la navbar
- Textes de navigation et d'accueil traduits via Pinia

---

## Palette de couleurs

| Nom | Hex | Usage |
|-----|-----|-------|
| Rouge soleil levant | `#D62828` | Accents principaux, CTA |
| Blanc washi | `#FFF8F0` | Fond de page |
| Noir encre | `#1A1A2E` | Navbar, textes forts |
| Doré laque | `#D4AF37` | Accents secondaires |
| Rose sakura | `#FFB7C5` | Éléments doux |
| Vert matcha | `#2D6A4F` | Badges nature |

---

## Polices

- **Noto Serif JP** — Titres (h1, h2, h3) et caractères japonais
- **Inter** — Corps de texte et interface

---

## Scripts disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Lance le serveur de développement sur le port 3000 |
| `npm run build` | Compile pour la production dans `dist/` |
| `npm run preview` | Prévisualise le build de production |

---

## Licence

Projet éducatif — contenu historique et culturel issu de sources publiques.
