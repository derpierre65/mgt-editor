const fs = require('fs');

const genreLines = fs.readFileSync(__dirname + '/data/Genres.txt').toString().split('\n');
const themeLinesGE = fs.readFileSync(__dirname + '/data/Themes_GE.txt').toString().split('\n');
const themeLinesEN = fs.readFileSync(__dirname + '/data/Themes_EN.txt').toString().split('\n');
const combinationLines = fs.readFileSync(__dirname + '/genreCombination.txt').toString().split('\n');
const genres = {};
const themes = [];
const combinations = {};

function getList(list) {
	const array = [];
	for (let genre of list.split('<')) {
		genre = genre.replace('>', '').trim();
		if (genre.length) {
			array.push(genre);
		}
	}

	return array;
}

// get the genres
let genre = {};
for (const line of genreLines) {
	if ( line.startsWith('//') ) {
		continue;
	}
	if (line.startsWith('[ID]') || line.startsWith('[EOF]')) {
		if (genre.ID) {
			genres[genre.ID] = genre;
		}

		genre = {
			themes: [],
		};
	}

	const match = line.match(/\[([a-zA-Z0-9 ]+)](.+)/);
	if (!match) {
		continue;
	}

	if (match.length === 3) {
		if (match[1] === 'GENRE COMB' || match[1] === 'TGROUP') {
			match[2] = getList(match[2]);
		}
		if (match[1].startsWith('FOCUS') || match[1].startsWith('ALIGN')) {
			match[2] = parseInt(match[2]);
		}

		genre[match[1]] = match[2];
	}
}

for (const [key, line] of themeLinesGE.entries()) {
	const match = line.match(/([a-zA-Zäöüß\- ]+)(.+)/);
	const themeIndex = themes.push({
		'NAME GE': match[1],
		'NAME EN': themeLinesEN[key],
	}) - 1;

	for (let genre of getList(match[2])) {
		if (!genres[genre]) {
			continue;
		}

		if (!genres[genre].themes) {
			genres[genre].themes = [];
		}

		genres[genre].themes.push(themeIndex);
	}
}

for ( const line of combinationLines ) {
	const [[genre, subgenre], [type, ...values]] = line.split('=').map((value) => value.split(','));

	if ( typeof combinations[genre] === 'undefined') {
		combinations[genre] = {};
	}
	if ( typeof combinations[genre][subgenre] === 'undefined') {
		combinations[genre][subgenre] = {};
	}

	combinations[genre][subgenre][type] = values;
}

let dataDirectory = __dirname + '/../src/data/';
if (!fs.existsSync(dataDirectory)) {
	fs.mkdirSync(dataDirectory);
}

fs.writeFileSync(__dirname + '/../src/data/genres.json', JSON.stringify(genres));
fs.writeFileSync(__dirname + '/../src/data/themes.json', JSON.stringify(themes));
fs.writeFileSync(__dirname + '/../src/data/combinations.json', JSON.stringify(combinations));