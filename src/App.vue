<template>
	<div class="container mx-auto mt-4">
		<div class="flex gap-4 mb-4 mx-auto justify-center">
			<div class="w-64">
				<div class="bg-blue-300 p-0.5 pl-1">
					Main genre
				</div>

				<select v-model.number="genre" class="w-full border border-black">
					<option :value="-1" />
					<option v-for="gen of genres" :value="gen.ID">{{gen['NAME EN']}}</option>
				</select>
			</div>
			<div class="w-64">
				<div class="bg-blue-300 p-0.5 pl-1">
					Subgenre
				</div>

				<select v-model.number="subGenre" class="w-full border border-black">
					<option :value="-1">Nothing</option>
					<option v-for="gen of subGenres" :value="genres[gen].ID">{{genres[gen]['NAME EN']}}</option>
				</select>
			</div>
		</div>
		<div class="flex gap-4 mx-auto justify-center">
			<div class="w-64">
				<div class="bg-blue-300 p-0.5 pl-1">
					Main topic
				</div>

				<select v-model.number="topic" class="w-full border border-black">
					<option v-for="topic of mainTopic" :value="topic.key">{{topic.value}}</option>
				</select>
			</div>
			<div class="w-64">
				<div class="bg-blue-300 p-0.5 pl-1">
					Subtopic
				</div>

				<select v-model.number="subTopic" class="w-full border border-black">
					<option :value="-1">Nothing</option>
					<option v-for="topic of mainTopic" :value="topic.key">{{topic.value}}</option>
				</select>
			</div>
		</div>

		<div class="w-1/2 mx-auto mt-4" v-if="genre !== -1">
			<div class="flex gap-4">
				<div class="bg-gray-500 text-white p-2 w-1/2">{{genres[genre]['NAME EN']}}</div>
				<div v-if="subGenre !== -1" class="bg-gray-500 text-white p-2 w-1/2">{{genres[subGenre]['NAME EN']}}</div>
			</div>

			<div class="bg-blue-300 p-0.5 pl-1 mt-2">
				Possible Target Group
			</div>
			<div class="flex gap-2">
				<div class="bg-gray-500 p-2 text-white" v-for="value of genres[genre].TGROUP">{{value.substr(0,1) + value.substr(1).toLowerCase()}}</div>
			</div>
		</div>

		<div class="w-1/2 mx-auto mt-4" v-if="focus">
			<div class="bg-blue-300 p-0.5 pl-1">
				Design Focus
			</div>
			<div class="bg-gray-400 flex flex-col gap-y-2 p-2">
				<div class="flex gap-2">
					<div class="rounded-lg bg-white w-10 text-center">{{focus[0]}}</div>
					<div>Game Length</div>
				</div>
				<div class="flex gap-2">
					<div class="rounded-lg bg-white w-10 text-center">{{focus[1]}}</div>
					<div>Game Depth</div>
				</div>
				<div class="flex gap-2">
					<div class="rounded-lg bg-white w-10 text-center">{{focus[2]}}</div>
					<div>Beginner Friendliness</div>
				</div>
				<div class="flex gap-2">
					<div class="rounded-lg bg-white w-10 text-center">{{focus[3]}}</div>
					<div>Innovation</div>
				</div>

				<div class="flex gap-2 mt-4">
					<div class="rounded-lg bg-white w-10 text-center">{{focus[4]}}</div>
					<div>Story</div>
				</div>
				<div class="flex gap-2">
					<div class="rounded-lg bg-white w-10 text-center">{{focus[5]}}</div>
					<div>Character Design</div>
				</div>
				<div class="flex gap-2">
					<div class="rounded-lg bg-white w-10 text-center">{{focus[6]}}</div>
					<div>Level Design</div>
				</div>
				<div class="flex gap-2">
					<div class="rounded-lg bg-white w-10 text-center">{{focus[7]}}</div>
					<div>Mission Design</div>
				</div>
			</div>
			<div class="bg-blue-300 p-0.5 pl-1">
				Design direction
			</div>
			<div class="bg-gray-400 flex flex-col gap-y-2 p-2">
				<div class="flex gap-2">
					<div class="rounded-lg bg-white w-10 text-center">{{align[0]}}</div>
					<div>Core Games / Casual Gamers</div>
				</div>
				<div class="flex gap-2">
					<div class="rounded-lg bg-white w-10 text-center">{{align[1]}}</div>
					<div>Nonviolent / Explicit Content</div>
				</div>
				<div class="flex gap-2">
					<div class="rounded-lg bg-white w-10 text-center">{{align[2]}}</div>
					<div>Easy / Hard</div>
				</div>
			</div>

			<div class="bg-blue-300 p-0.5 pl-1">
				Design Priority
			</div>
			<div class="bg-gray-400 flex flex-col gap-y-2 p-2">
				<div class="flex gap-2">
					<div class="rounded-lg bg-white w-10 text-center">{{priority[0]}}%</div>
					<div>Gameplay</div>
				</div>
				<div class="flex gap-2">
					<div class="rounded-lg bg-white w-10 text-center">{{priority[1]}}%</div>
					<div>Graphics</div>
				</div>
				<div class="flex gap-2">
					<div class="rounded-lg bg-white w-10 text-center">{{priority[2]}}%</div>
					<div>Sound</div>
				</div>
				<div class="flex gap-2">
					<div class="rounded-lg bg-white w-10 text-center">{{priority[3]}}%</div>
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
		return {
			genres,
			topics,
			genre: -1,
			subGenre: -1,
			topic: 0,
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
					value: this.topics[topic],
				});
			}

			topics.sort((a, b) => {
				return a.value > b.value ? 1 : -1;
			});

			return topics;
		},
	},
	methods: {
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