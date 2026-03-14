import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router/index.js'
import App from './App.vue'

// Import des styles globaux (Tailwind CSS)
import './assets/main.css'

// Création de l'application Vue avec Pinia et Vue Router
const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
