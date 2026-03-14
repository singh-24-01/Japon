<template>
  <div class="min-h-screen bg-washi py-12">
    <div class="max-w-6xl mx-auto px-4">

      <!-- En-tête -->
      <div class="text-center mb-12">
        <p class="text-japon-rouge font-sans text-sm tracking-widest uppercase mb-2">言語</p>
        <h1 class="titre-section mx-auto">La langue japonaise</h1>
        <p class="text-gray-600 font-sans mt-4 max-w-2xl mx-auto">
          Le japonais s'écrit avec trois systèmes : hiragana (平仮名), katakana (片仮名) et kanji (漢字).
          Les locuteurs natifs maîtrisent les trois simultanément.
        </p>
      </div>

      <!-- Onglets -->
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
          {{ onglet.emoji }} {{ onglet.nom }}
        </button>
      </div>

      <!-- ═══════════════════════════════════════════════════════
           HIRAGANA
           ═══════════════════════════════════════════════════════ -->
      <Transition name="page" mode="out-in">
        <div v-if="ongletActif === 'hiragana'" key="hiragana">
          <div class="bg-white rounded-sm shadow-md p-6 mb-4">
            <h2 class="font-serif text-xl text-japon-noir mb-2">Hiragana 平仮名</h2>
            <p class="text-gray-600 font-sans text-sm mb-6">
              Le hiragana est le syllabaire de base du japonais (46 caractères).
              Il s'utilise pour les mots natifs japonais et les terminaisons grammaticales.
              Cliquez sur un caractère pour entendre sa prononciation.
            </p>

            <!-- Tableau des hiragana -->
            <div class="overflow-x-auto">
              <div class="grid gap-2 min-w-max mx-auto" style="grid-template-columns: repeat(10, 1fr);">
                <div
                  v-for="kana in hiragana"
                  :key="kana.kana"
                  class="kana-cell min-w-16"
                  :class="kanaSelectionnee === kana.kana ? 'border-japon-rouge bg-red-50' : ''"
                  @click="selectionnerKana(kana, 'hiragana')"
                >
                  <span class="font-serif text-2xl text-japon-noir">{{ kana.kana }}</span>
                  <span class="romaji">{{ kana.romaji }}</span>
                </div>
              </div>
            </div>

            <!-- Détail du kana sélectionné -->
            <Transition name="fade">
              <div v-if="kanaActif" class="mt-6 p-6 bg-red-50 rounded-sm border border-red-100 text-center">
                <span class="font-serif text-7xl text-japon-rouge block mb-2">{{ kanaActif.kana }}</span>
                <p class="font-sans text-2xl text-japon-noir font-medium">{{ kanaActif.romaji }}</p>
                <p class="text-gray-600 font-sans text-sm mt-2">{{ kanaActif.exemple }}</p>
              </div>
            </Transition>
          </div>
        </div>

        <!-- ═══════════════════════════════════════════════════════
             KATAKANA
             ═══════════════════════════════════════════════════════ -->
        <div v-else-if="ongletActif === 'katakana'" key="katakana">
          <div class="bg-white rounded-sm shadow-md p-6 mb-4">
            <h2 class="font-serif text-xl text-japon-noir mb-2">Katakana 片仮名</h2>
            <p class="text-gray-600 font-sans text-sm mb-6">
              Le katakana est utilisé principalement pour les mots étrangers (gairaigo), les noms propres étrangers,
              les onomatopées et les termes scientifiques. Même sons que le hiragana, graphie différente et anguleuse.
            </p>

            <div class="overflow-x-auto">
              <div class="grid gap-2 min-w-max mx-auto" style="grid-template-columns: repeat(10, 1fr);">
                <div
                  v-for="kana in katakana"
                  :key="kana.kana"
                  class="kana-cell min-w-16"
                  :class="kanaSelectionnee === kana.kana ? 'border-japon-rouge bg-red-50' : ''"
                  @click="selectionnerKana(kana, 'katakana')"
                >
                  <span class="font-serif text-2xl text-japon-bleu">{{ kana.kana }}</span>
                  <span class="romaji">{{ kana.romaji }}</span>
                </div>
              </div>
            </div>

            <Transition name="fade">
              <div v-if="kanaActif && ongletActif === 'katakana'" class="mt-6 p-6 bg-blue-50 rounded-sm border border-blue-100 text-center">
                <span class="font-serif text-7xl text-japon-bleu block mb-2">{{ kanaActif.kana }}</span>
                <p class="font-sans text-2xl text-japon-noir font-medium">{{ kanaActif.romaji }}</p>
                <p class="text-gray-600 font-sans text-sm mt-2">{{ kanaActif.exemple }}</p>
              </div>
            </Transition>
          </div>
        </div>

        <!-- ═══════════════════════════════════════════════════════
             KANJI ESSENTIELS
             ═══════════════════════════════════════════════════════ -->
        <div v-else-if="ongletActif === 'kanji'" key="kanji">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
              v-for="kanji in kanjisEssentiels"
              :key="kanji.kanji"
              class="bg-white rounded-sm shadow-md p-5 hover:shadow-lg transition-shadow duration-200 cursor-pointer
                     hover:border-l-4 hover:border-japon-rouge group"
              @click="kanjiActif = kanjiActif === kanji.kanji ? null : kanji.kanji"
            >
              <div class="flex items-center gap-5 mb-3">
                <span class="font-serif text-6xl text-japon-rouge leading-none">{{ kanji.kanji }}</span>
                <div>
                  <p class="font-sans font-bold text-japon-noir text-lg">{{ kanji.signification }}</p>
                  <p class="text-japon-gris text-sm font-sans">On'yomi : {{ kanji.on }}</p>
                  <p class="text-japon-gris text-sm font-sans">Kun'yomi : {{ kanji.kun }}</p>
                </div>
              </div>

              <!-- Tracé (strokes) indicatif -->
              <div class="flex items-center gap-2 mb-2">
                <span class="text-xs text-japon-gris font-sans">Traits :</span>
                <div class="flex gap-1">
                  <div v-for="n in kanji.traits" :key="n"
                       class="w-5 h-5 bg-gray-200 rounded-sm text-xs flex items-center justify-center font-sans text-gray-600">
                    {{ n }}
                  </div>
                </div>
              </div>

              <!-- Exemples développés -->
              <Transition name="slide">
                <div v-if="kanjiActif === kanji.kanji" class="mt-3 pt-3 border-t border-gray-100">
                  <p class="text-xs text-japon-gris font-sans uppercase tracking-wide mb-2">Exemples de mots</p>
                  <div class="space-y-1.5">
                    <div v-for="ex in kanji.exemples" :key="ex.mot"
                         class="flex items-center justify-between text-sm font-sans">
                      <span class="font-serif text-lg text-japon-noir">{{ ex.mot }}</span>
                      <span class="text-japon-gris">{{ ex.lecture }}</span>
                      <span class="text-gray-600 italic">{{ ex.sens }}</span>
                    </div>
                  </div>
                </div>
              </Transition>
            </div>
          </div>
        </div>

        <!-- ═══════════════════════════════════════════════════════
             MINI QUIZ
             ═══════════════════════════════════════════════════════ -->
        <div v-else-if="ongletActif === 'quiz'" key="quiz">
          <div class="max-w-2xl mx-auto">

            <!-- Quiz terminé -->
            <div v-if="quizTermine" class="text-center bg-white rounded-sm shadow-md p-10">
              <p class="text-6xl mb-4">{{ scoreEmoji }}</p>
              <h2 class="font-serif text-3xl text-japon-noir mb-2">
                {{ store.scoreQuiz }} / {{ quizQuestions.length }}
              </h2>
              <p class="text-gray-600 font-sans mb-6">{{ scoreMessage }}</p>
              <button @click="recommencerQuiz" class="btn-japon">
                Recommencer le quiz
              </button>
            </div>

            <!-- Question en cours -->
            <div v-else class="bg-white rounded-sm shadow-md p-8">

              <!-- Progress bar -->
              <div class="mb-6">
                <div class="flex justify-between text-sm font-sans text-gray-500 mb-2">
                  <span>Question {{ questionIndex + 1 }} / {{ quizQuestions.length }}</span>
                  <span class="text-japon-rouge font-medium">Score : {{ store.scoreQuiz }}</span>
                </div>
                <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div class="h-full bg-japon-rouge rounded-full transition-all duration-300"
                       :style="{ width: `${((questionIndex) / quizQuestions.length) * 100}%` }"></div>
                </div>
              </div>

              <!-- Question -->
              <div class="text-center mb-8">
                <p class="text-sm text-japon-gris font-sans mb-4">Quel est ce caractère ?</p>
                <span class="font-serif text-9xl text-japon-rouge block mb-4 leading-none">
                  {{ questionActuelle.kana }}
                </span>
                <p v-if="questionActuelle.systeme" class="text-xs text-japon-gris font-sans">
                  ({{ questionActuelle.systeme }})
                </p>
              </div>

              <!-- Réponses -->
              <div class="grid grid-cols-2 gap-3">
                <button
                  v-for="reponse in questionActuelle.choix"
                  :key="reponse"
                  @click="repondre(reponse)"
                  :disabled="reponseChoisie !== null"
                  class="py-4 px-6 rounded-sm font-sans font-medium text-lg border-2 transition-all duration-200"
                  :class="getClasseReponse(reponse)"
                >
                  {{ reponse }}
                </button>
              </div>

              <!-- Feedback -->
              <Transition name="fade">
                <div v-if="reponseChoisie" class="mt-6 p-4 rounded-sm text-center"
                     :class="estCorrecte ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'">
                  <p class="font-sans font-medium" :class="estCorrecte ? 'text-green-700' : 'text-red-700'">
                    {{ estCorrecte ? '✓ Correct !' : `✗ C'était « ${questionActuelle.romaji} »` }}
                  </p>
                </div>
              </Transition>

              <!-- Bouton suivant -->
              <Transition name="fade">
                <button
                  v-if="reponseChoisie"
                  @click="questionSuivante"
                  class="mt-6 w-full btn-japon text-center"
                >
                  {{ questionIndex < quizQuestions.length - 1 ? 'Question suivante →' : 'Voir mon score →' }}
                </button>
              </Transition>

            </div>
          </div>
        </div>
      </Transition>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAppStore } from '@/stores/appStore.js'

const store = useAppStore()

const ongletActif    = ref('hiragana')
const kanaSelectionnee = ref(null)
const kanaActif      = ref(null)
const kanjiActif     = ref(null)

// État du quiz
const questionIndex  = ref(0)
const reponseChoisie = ref(null)
const estCorrecte    = ref(false)
const quizTermine    = ref(false)

// Onglets de navigation
const onglets = [
  { id: 'hiragana', nom: 'Hiragana', emoji: 'あ' },
  { id: 'katakana', nom: 'Katakana', emoji: 'ア' },
  { id: 'kanji',    nom: 'Kanji',    emoji: '漢' },
  { id: 'quiz',     nom: 'Mini Quiz', emoji: '🎯' },
]

// ─── Tableau complet des Hiragana ─────────────────────────────────────────────
const hiragana = [
  { kana: 'あ', romaji: 'a',   exemple: 'あおい (aoi) = bleu' },
  { kana: 'い', romaji: 'i',   exemple: 'いぬ (inu) = chien' },
  { kana: 'う', romaji: 'u',   exemple: 'うみ (umi) = mer' },
  { kana: 'え', romaji: 'e',   exemple: 'えき (eki) = gare' },
  { kana: 'お', romaji: 'o',   exemple: 'おかあさん (okāsan) = mère' },
  { kana: 'か', romaji: 'ka',  exemple: 'かわ (kawa) = rivière' },
  { kana: 'き', romaji: 'ki',  exemple: 'きれい (kirei) = beau' },
  { kana: 'く', romaji: 'ku',  exemple: 'くも (kumo) = nuage' },
  { kana: 'け', romaji: 'ke',  exemple: 'けさ (kesa) = ce matin' },
  { kana: 'こ', romaji: 'ko',  exemple: 'こころ (kokoro) = cœur' },
  { kana: 'さ', romaji: 'sa',  exemple: 'さくら (sakura) = cerisier' },
  { kana: 'し', romaji: 'shi', exemple: 'しろ (shiro) = château/blanc' },
  { kana: 'す', romaji: 'su',  exemple: 'すし (sushi) = sushi' },
  { kana: 'せ', romaji: 'se',  exemple: 'せかい (sekai) = monde' },
  { kana: 'そ', romaji: 'so',  exemple: 'そら (sora) = ciel' },
  { kana: 'た', romaji: 'ta',  exemple: 'たけ (take) = bambou' },
  { kana: 'ち', romaji: 'chi', exemple: 'ちゃ (cha) = thé' },
  { kana: 'つ', romaji: 'tsu', exemple: 'つき (tsuki) = lune' },
  { kana: 'て', romaji: 'te',  exemple: 'てら (tera) = temple' },
  { kana: 'と', romaji: 'to',  exemple: 'とり (tori) = oiseau' },
  { kana: 'な', romaji: 'na',  exemple: 'なつ (natsu) = été' },
  { kana: 'に', romaji: 'ni',  exemple: 'にほん (nihon) = Japon' },
  { kana: 'ぬ', romaji: 'nu',  exemple: 'ぬの (nuno) = tissu' },
  { kana: 'ね', romaji: 'ne',  exemple: 'ねこ (neko) = chat' },
  { kana: 'の', romaji: 'no',  exemple: 'のり (nori) = algue séchée' },
  { kana: 'は', romaji: 'ha',  exemple: 'はな (hana) = fleur' },
  { kana: 'ひ', romaji: 'hi',  exemple: 'ひと (hito) = personne' },
  { kana: 'ふ', romaji: 'fu',  exemple: 'ふじ (fuji) = Fuji' },
  { kana: 'へ', romaji: 'he',  exemple: 'へや (heya) = chambre' },
  { kana: 'ほ', romaji: 'ho',  exemple: 'ほし (hoshi) = étoile' },
  { kana: 'ま', romaji: 'ma',  exemple: 'まち (machi) = ville' },
  { kana: 'み', romaji: 'mi',  exemple: 'みず (mizu) = eau' },
  { kana: 'む', romaji: 'mu',  exemple: 'むら (mura) = village' },
  { kana: 'め', romaji: 'me',  exemple: 'めがね (megane) = lunettes' },
  { kana: 'も', romaji: 'mo',  exemple: 'もり (mori) = forêt' },
  { kana: 'や', romaji: 'ya',  exemple: 'やま (yama) = montagne' },
  { kana: 'ゆ', romaji: 'yu',  exemple: 'ゆき (yuki) = neige' },
  { kana: 'よ', romaji: 'yo',  exemple: 'よる (yoru) = nuit' },
  { kana: 'ら', romaji: 'ra',  exemple: 'らーめん (rāmen) = ramen' },
  { kana: 'り', romaji: 'ri',  exemple: 'りゅう (ryū) = dragon' },
  { kana: 'る', romaji: 'ru',  exemple: 'るすばん (rusuban) = gardien' },
  { kana: 'れ', romaji: 're',  exemple: 'れきし (rekishi) = histoire' },
  { kana: 'ろ', romaji: 'ro',  exemple: 'ろうか (rōka) = couloir' },
  { kana: 'わ', romaji: 'wa',  exemple: 'わたし (watashi) = je/moi' },
  { kana: 'を', romaji: 'wo',  exemple: 'Particule accusatif' },
  { kana: 'ん', romaji: 'n',   exemple: 'にほん (nihon) = Japon' },
]

// ─── Tableau complet des Katakana ──────────────────────────────────────────────
const katakana = [
  { kana: 'ア', romaji: 'a',   exemple: 'アジア (Ajia) = Asie' },
  { kana: 'イ', romaji: 'i',   exemple: 'インターネット = Internet' },
  { kana: 'ウ', romaji: 'u',   exemple: 'ウイルス = virus' },
  { kana: 'エ', romaji: 'e',   exemple: 'エネルギー = énergie' },
  { kana: 'オ', romaji: 'o',   exemple: 'オペラ = opéra' },
  { kana: 'カ', romaji: 'ka',  exemple: 'カフェ = café' },
  { kana: 'キ', romaji: 'ki',  exemple: 'キーボード = clavier' },
  { kana: 'ク', romaji: 'ku',  exemple: 'クラス = classe' },
  { kana: 'ケ', romaji: 'ke',  exemple: 'ケーキ = gâteau' },
  { kana: 'コ', romaji: 'ko',  exemple: 'コーヒー = café (boisson)' },
  { kana: 'サ', romaji: 'sa',  exemple: 'サービス = service' },
  { kana: 'シ', romaji: 'shi', exemple: 'シャツ = chemise' },
  { kana: 'ス', romaji: 'su',  exemple: 'スポーツ = sport' },
  { kana: 'セ', romaji: 'se',  exemple: 'セーター = pull' },
  { kana: 'ソ', romaji: 'so',  exemple: 'ソファ = canapé' },
  { kana: 'タ', romaji: 'ta',  exemple: 'タクシー = taxi' },
  { kana: 'チ', romaji: 'chi', exemple: 'チョコレート = chocolat' },
  { kana: 'ツ', romaji: 'tsu', exemple: 'ツアー = tour' },
  { kana: 'テ', romaji: 'te',  exemple: 'テレビ = télévision' },
  { kana: 'ト', romaji: 'to',  exemple: 'トイレ = toilettes' },
  { kana: 'ナ', romaji: 'na',  exemple: 'ナイフ = couteau' },
  { kana: 'ニ', romaji: 'ni',  exemple: 'ニュース = news' },
  { kana: 'ヌ', romaji: 'nu',  exemple: 'ヌードル = noodle' },
  { kana: 'ネ', romaji: 'ne',  exemple: 'ネクタイ = cravate' },
  { kana: 'ノ', romaji: 'no',  exemple: 'ノート = cahier' },
  { kana: 'ハ', romaji: 'ha',  exemple: 'ハンバーガー = hamburger' },
  { kana: 'ヒ', romaji: 'hi',  exemple: 'ヒーロー = héros' },
  { kana: 'フ', romaji: 'fu',  exemple: 'フランス = France' },
  { kana: 'ヘ', romaji: 'he',  exemple: 'ヘルメット = casque' },
  { kana: 'ホ', romaji: 'ho',  exemple: 'ホテル = hôtel' },
  { kana: 'マ', romaji: 'ma',  exemple: 'マンガ = manga' },
  { kana: 'ミ', romaji: 'mi',  exemple: 'ミュージック = musique' },
  { kana: 'ム', romaji: 'mu',  exemple: 'ムード = ambiance' },
  { kana: 'メ', romaji: 'me',  exemple: 'メニュー = menu' },
  { kana: 'モ', romaji: 'mo',  exemple: 'モデル = modèle' },
  { kana: 'ヤ', romaji: 'ya',  exemple: 'ヤクルト = Yakult' },
  { kana: 'ユ', romaji: 'yu',  exemple: 'ユーモア = humour' },
  { kana: 'ヨ', romaji: 'yo',  exemple: 'ヨーグルト = yaourt' },
  { kana: 'ラ', romaji: 'ra',  exemple: 'ラーメン = ramen' },
  { kana: 'リ', romaji: 'ri',  exemple: 'リズム = rythme' },
  { kana: 'ル', romaji: 'ru',  exemple: 'ルール = règle' },
  { kana: 'レ', romaji: 're',  exemple: 'レストラン = restaurant' },
  { kana: 'ロ', romaji: 'ro',  exemple: 'ロボット = robot' },
  { kana: 'ワ', romaji: 'wa',  exemple: 'ワイン = vin' },
  { kana: 'ヲ', romaji: 'wo',  exemple: 'Particule (rare)' },
  { kana: 'ン', romaji: 'n',   exemple: 'ランチ (ranchi) = lunch' },
]

// ─── Kanji essentiels ──────────────────────────────────────────────────────────
const kanjisEssentiels = [
  {
    kanji: '日',
    signification: 'Soleil / Jour',
    on: 'nichi, jitsu',
    kun: 'hi, ka',
    traits: [1, 2, 3, 4],
    exemples: [
      { mot: '日本', lecture: 'nihon', sens: 'Japon' },
      { mot: '日曜日', lecture: 'nichiyōbi', sens: 'dimanche' },
      { mot: '毎日', lecture: 'mainichi', sens: 'chaque jour' },
    ]
  },
  {
    kanji: '山',
    signification: 'Montagne',
    on: 'san',
    kun: 'yama',
    traits: [1, 2, 3],
    exemples: [
      { mot: '富士山', lecture: 'fujisan', sens: 'Mont Fuji' },
      { mot: '山道', lecture: 'yamamichi', sens: 'chemin de montagne' },
      { mot: '火山', lecture: 'kazan', sens: 'volcan' },
    ]
  },
  {
    kanji: '水',
    signification: 'Eau',
    on: 'sui',
    kun: 'mizu',
    traits: [1, 2, 3, 4],
    exemples: [
      { mot: '水曜日', lecture: 'suiyōbi', sens: 'mercredi' },
      { mot: '水道', lecture: 'suidō', sens: 'eau courante' },
      { mot: '洪水', lecture: 'kōzui', sens: 'inondation' },
    ]
  },
  {
    kanji: '人',
    signification: 'Personne',
    on: 'jin, nin',
    kun: 'hito',
    traits: [1, 2],
    exemples: [
      { mot: '日本人', lecture: 'nihonjin', sens: 'Japonais' },
      { mot: '人口', lecture: 'jinkō', sens: 'population' },
      { mot: '外国人', lecture: 'gaikokujin', sens: 'étranger' },
    ]
  },
  {
    kanji: '木',
    signification: 'Arbre / Bois',
    on: 'moku, boku',
    kun: 'ki, ko',
    traits: [1, 2, 3, 4],
    exemples: [
      { mot: '木曜日', lecture: 'mokuyōbi', sens: 'jeudi' },
      { mot: '木造', lecture: 'mokuzō', sens: 'construction en bois' },
      { mot: '植木', lecture: 'ueki', sens: 'arbre planté' },
    ]
  },
  {
    kanji: '花',
    signification: 'Fleur',
    on: 'ka',
    kun: 'hana',
    traits: [1, 2, 3, 4, 5, 6, 7],
    exemples: [
      { mot: '花見', lecture: 'hanami', sens: 'contemplation cerisiers' },
      { mot: '花火', lecture: 'hanabi', sens: 'feux d\'artifice' },
      { mot: '花屋', lecture: 'hanaya', sens: 'fleuriste' },
    ]
  },
  {
    kanji: '愛',
    signification: 'Amour',
    on: 'ai',
    kun: 'ito(shii)',
    traits: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    exemples: [
      { mot: '愛情', lecture: 'aijō', sens: 'affection' },
      { mot: '愛国心', lecture: 'aikokushin', sens: 'patriotisme' },
      { mot: '恋愛', lecture: 'ren\'ai', sens: 'amour romantique' },
    ]
  },
  {
    kanji: '心',
    signification: 'Cœur / Esprit',
    on: 'shin',
    kun: 'kokoro',
    traits: [1, 2, 3, 4],
    exemples: [
      { mot: '心配', lecture: 'shinpai', sens: 'inquiétude' },
      { mot: '安心', lecture: 'anshin', sens: 'tranquillité d\'esprit' },
      { mot: '熱心', lecture: 'nesshin', sens: 'enthousiasme' },
    ]
  },
  {
    kanji: '道',
    signification: 'Chemin / Voie',
    on: 'dō, tō',
    kun: 'michi',
    traits: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    exemples: [
      { mot: '北海道', lecture: 'hokkaidō', sens: 'Hokkaido' },
      { mot: '柔道', lecture: 'jūdō', sens: 'judo' },
      { mot: '道路', lecture: 'dōro', sens: 'route' },
    ]
  },
]

// ─── Quiz ─────────────────────────────────────────────────────────────────────

// Questions du quiz mélangées aléatoirement
const quizQuestions = [
  { kana: 'あ', romaji: 'a',   choix: ['a', 'i', 'u', 'ka'],  systeme: 'Hiragana' },
  { kana: 'き', romaji: 'ki',  choix: ['ke', 'ki', 'ko', 'ka'], systeme: 'Hiragana' },
  { kana: 'ア', romaji: 'a',   choix: ['a', 'i', 'u', 'e'],   systeme: 'Katakana' },
  { kana: 'さ', romaji: 'sa',  choix: ['sa', 'shi', 'su', 'se'], systeme: 'Hiragana' },
  { kana: 'ナ', romaji: 'na',  choix: ['ne', 'no', 'na', 'ni'], systeme: 'Katakana' },
  { kana: 'て', romaji: 'te',  choix: ['to', 'ta', 'te', 'chi'], systeme: 'Hiragana' },
  { kana: 'ラ', romaji: 'ra',  choix: ['ri', 'ra', 'ru', 're'], systeme: 'Katakana' },
  { kana: 'は', romaji: 'ha',  choix: ['ha', 'hi', 'fu', 'he'], systeme: 'Hiragana' },
  { kana: 'ソ', romaji: 'so',  choix: ['so', 'su', 'sa', 'shi'], systeme: 'Katakana' },
  { kana: 'み', romaji: 'mi',  choix: ['ma', 'mi', 'mu', 'me'], systeme: 'Hiragana' },
]

const questionActuelle = computed(() => quizQuestions[questionIndex.value])

function selectionnerKana(kana, systeme) {
  kanaSelectionnee.value = kana.kana
  kanaActif.value = kana
  // Réinitialiser si on change d'onglet
  if (ongletActif.value !== systeme) {
    kanaActif.value = kana
  }
}

function repondre(reponse) {
  if (reponseChoisie.value !== null) return
  reponseChoisie.value = reponse
  estCorrecte.value = reponse === questionActuelle.value.romaji

  if (estCorrecte.value) {
    store.scoreQuiz++
  }
  store.totalQuiz++
}

function getClasseReponse(reponse) {
  if (!reponseChoisie.value) {
    return 'border-gray-200 text-japon-noir hover:border-japon-rouge hover:bg-red-50'
  }
  if (reponse === questionActuelle.value.romaji) {
    return 'border-green-500 bg-green-50 text-green-700'
  }
  if (reponse === reponseChoisie.value) {
    return 'border-red-400 bg-red-50 text-red-600'
  }
  return 'border-gray-200 text-gray-400 opacity-60'
}

function questionSuivante() {
  if (questionIndex.value < quizQuestions.length - 1) {
    questionIndex.value++
    reponseChoisie.value = null
    estCorrecte.value    = false
  } else {
    quizTermine.value = true
  }
}

function recommencerQuiz() {
  questionIndex.value  = 0
  reponseChoisie.value = null
  estCorrecte.value    = false
  quizTermine.value    = false
  store.resetQuiz()
}

const scoreEmoji = computed(() => {
  const s = store.scoreQuiz / quizQuestions.length
  if (s >= 0.9) return '🏆'
  if (s >= 0.7) return '⭐'
  if (s >= 0.5) return '📚'
  return '💪'
})

const scoreMessage = computed(() => {
  const s = store.scoreQuiz / quizQuestions.length
  if (s >= 0.9) return 'Excellent ! Vous maîtrisez les kana !'
  if (s >= 0.7) return 'Très bien ! Continuez à pratiquer.'
  if (s >= 0.5) return 'Pas mal ! Un peu de révision s\'impose.'
  return 'Continuez à pratiquer — l\'apprentissage prend du temps !'
})
</script>
