<template>
  <div class="relative container mx-auto mt-4">
    <div class="absolute top-0 right-0 text-white flex flex-col justify-items-end gap-2">
      <div v-for="language in locales" class="text-right">
        <img :src="`https://flagpedia.net/data/flags/h24/${language.realLocale}.webp`" class="ml-auto cursor-pointer" @click="locale = language.locale" :alt="language.realLocale" />
      </div>
    </div>

    <div class="flex justify-center gap-4">
      <div>
        <div class="flex gap-4 mb-4 mx-auto justify-center">
          <div class="w-64">
            <div class="bg-blue-300 p-0.5 pl-1">
              Main genre
            </div>

            <select v-model.number="genre" class="w-full border border-black">
              <option :value="-1">Select Genre</option>
              <option v-for="gen of genres" :value="gen.ID">{{ gen[genreNameKey] || gen[genreFallbackKey] }}</option>
            </select>
          </div>
          <div class="w-64">
            <div class="bg-blue-300 p-0.5 pl-1">
              Subgenre
            </div>

            <select v-model.number="subGenre" :disabled="genre === -1" class="w-full border border-black">
              <option :value="-1">Nothing</option>
              <option v-for="gen of subGenres" :value="genres[gen].ID">{{ genres[gen][genreNameKey] || genres[gen][genreFallbackKey] }}</option>
            </select>
          </div>
        </div>
        <div class="flex gap-4 mx-auto justify-center">
          <div class="w-64">
            <div class="bg-blue-300 p-0.5 pl-1">
              Main topic
            </div>

            <select v-model.number="topic" :disabled="genre === -1" class="w-full border border-black">
              <option :value="-1">Select Topic</option>
              <option v-for="topic of mainTopic" :value="topic.key">{{ topic.value }}</option>
            </select>
          </div>
          <div class="w-64">
            <div class="bg-blue-300 p-0.5 pl-1">
              Subtopic
            </div>

            <select v-model.number="subTopic" :disabled="genre === -1" class="w-full border border-black">
              <option :value="-1">Nothing</option>
              <option v-for="topic of mainTopic" :value="topic.key">{{ topic.value }}</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <button type="button" class="rounded bg-red-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600" @click="reset">Reset</button>
      </div>
    </div>

    <div class="w-1/2 mx-auto mt-4" v-if="genre !== -1">
      <div class="bg-blue-300 p-0.5 pl-1 mt-2">
        Possible Target Group
      </div>
      <div class="flex gap-2">
        <div class="bg-gray-500 p-2 text-white" v-for="value of genres[genre].TGROUP">
          {{ value.substr(0, 1) + value.substr(1).toLowerCase() }}
        </div>
      </div>
    </div>

    <div class="w-1/2 mx-auto mt-4" v-if="genre !== -1 && focus">
      <div class="bg-blue-300 p-0.5 pl-1">
        Design Focus
      </div>
      <div class="bg-gray-400 flex flex-col gap-y-2 p-2">
        <div class="flex gap-2">
          <div class="rounded-lg bg-white w-10 text-center">{{ focus[0] }}</div>
          <div>Game Length</div>
        </div>
        <div class="flex gap-2">
          <div class="rounded-lg bg-white w-10 text-center">{{ focus[1] }}</div>
          <div>Game Depth</div>
        </div>
        <div class="flex gap-2">
          <div class="rounded-lg bg-white w-10 text-center">{{ focus[2] }}</div>
          <div>Beginner Friendliness</div>
        </div>
        <div class="flex gap-2">
          <div class="rounded-lg bg-white w-10 text-center">{{ focus[3] }}</div>
          <div>Innovation</div>
        </div>

        <div class="flex gap-2 mt-4">
          <div class="rounded-lg bg-white w-10 text-center">{{ focus[4] }}</div>
          <div>Story</div>
        </div>
        <div class="flex gap-2">
          <div class="rounded-lg bg-white w-10 text-center">{{ focus[5] }}</div>
          <div>Character Design</div>
        </div>
        <div class="flex gap-2">
          <div class="rounded-lg bg-white w-10 text-center">{{ focus[6] }}</div>
          <div>Level Design</div>
        </div>
        <div class="flex gap-2">
          <div class="rounded-lg bg-white w-10 text-center">{{ focus[7] }}</div>
          <div>Mission Design</div>
        </div>
      </div>
      <div class="bg-blue-300 p-0.5 pl-1">
        Design direction
      </div>
      <div class="bg-gray-400 flex flex-col gap-y-2 p-2">
        <div class="flex gap-2">
          <div class="rounded-lg bg-white w-10 text-center">{{ align[0] }}</div>
          <div>Core Games / Casual Gamers</div>
        </div>
        <div class="flex gap-2">
          <div class="rounded-lg bg-white w-10 text-center">{{ align[1] }}</div>
          <div>Nonviolent / Explicit Content</div>
        </div>
        <div class="flex gap-2">
          <div class="rounded-lg bg-white w-10 text-center">{{ align[2] }}</div>
          <div>Easy / Hard</div>
        </div>
      </div>

      <div class="bg-blue-300 p-0.5 pl-1">
        Design Priority
      </div>
      <div class="bg-gray-400 flex flex-col gap-y-2 p-2">
        <div class="flex gap-2">
          <div class="rounded-lg bg-white w-10 text-center">{{ priority[0] }}%</div>
          <div>Gameplay</div>
        </div>
        <div class="flex gap-2">
          <div class="rounded-lg bg-white w-10 text-center">{{ priority[1] }}%</div>
          <div>Graphics</div>
        </div>
        <div class="flex gap-2">
          <div class="rounded-lg bg-white w-10 text-center">{{ priority[2] }}%</div>
          <div>Sound</div>
        </div>
        <div class="flex gap-2">
          <div class="rounded-lg bg-white w-10 text-center">{{ priority[3] }}%</div>
          <div>Technical</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import genres from './data/genres.json';
import topics from './data/themes.json';
import combinations from './data/combinations.json';

export default {
  name: 'App',
  data() {
    const locales = Object.keys(topics).map((locale) => {
      let realLocale = locale;
      if (locale === 'GE') realLocale = 'DE';
      if (locale === 'EN') realLocale = 'US';
      if (locale === 'TU') realLocale = 'TR';
      if (locale === 'PB') realLocale = 'PT';
      if (locale === 'CT') realLocale = 'ZH'; // chinese traditional
      if (locale === 'CH') realLocale = 'ZH'; // chinese simplified

      return {
        locale,
        realLocale: realLocale.toLowerCase(),
      };
    });

    return {
      genres,
      topics,
      locales,
      genreFallbackKey: 'NAME EN',
      locale: 'ES',
      genre: -1,
      subGenre: -1,
      topic: -1,
      subTopic: -1,
      focus: null,
      align: {},
      priority: [],
    };
  },
  watch: {
    genre() {
      this.generateGame();
    },
    subGenre() {
      this.generateGame();
    },
  },
  computed: {
    genreNameKey() {
      return `NAME ${this.locale}`;
    },
    subGenres() {
      if (this.genre === -1) {
        return [];
      }

      return genres[this.genre]['GENRE COMB'];
    },
    mainTopic() {
      if (this.genre === -1) {
        return [];
      }

      const topics = [];
      for (const topic of genres[this.genre].themes) {
        topics.push({
          key: topic,
          value: this.topics[this.locale][topic],
        });
      }

      topics.sort((a, b) => {
        return a.value > b.value ? 1 : -1;
      });

      return topics;
    },
  },
  methods: {
    reset() {
      this.genre = -1;
      this.subGenre = -1;
      this.topic = -1;
      this.subTopic = -1;
    },
    generateGame() {
      this.focus = this.getFocus(this.genre, this.subGenre);
      this.align = this.getAlign(this.genre, this.subGenre);
      this.priority = [
        genres[this.genre].GAMEPLAY,
        genres[this.genre].GRAPHIC,
        genres[this.genre].SOUND,
        genres[this.genre].CONTROL,
      ];
    },
    getAlign(mainGenre, subGenre) {
      return combinations[mainGenre][subGenre].align;
    },
    getFocus(mainGenre, subGenre) {
      return combinations[mainGenre][subGenre].focus;
    },
  },
};
</script>