const fs = require('fs');

const genreLines = fs.readFileSync(__dirname + '/data/Genres.txt').toString().split("\n");
const themeLinesGE = fs.readFileSync(__dirname + '/data/Themes_GE.txt').toString().split("\n");
const themeLinesEN = fs.readFileSync(__dirname + '/data/Themes_EN.txt').toString().split("\n");
const genres = {};
const themes = [];

function getList(list) {
	const array = [];
	for ( let genre of list.split('<') ) {
		genre = genre.replace('>', '').trim();
		if ( genre.length ) {
			array.push(genre);
		}
	}

	return array;
}

// get the genres
let genre = {};
for ( const line of genreLines ) {
	if ( line.startsWith('[ID]') || line.startsWith('[EOF]') ) {
		if ( genre.ID ) {
			genres[genre.ID] = genre;
		}

		genre = {
			themes: [],
		};
	}

	const match = line.match(/\[([a-zA-Z0-9 ]+)](.+)/);
	if ( !match ) {
		continue;
	}
	if ( match.length === 3 ) {
		if ( match[1] === 'GENRE COMB' ) {
			match[2] = getList(match[2]);
		}
		genre[match[1]] = match[2];
	}
}


for ( const [key, line] of themeLinesGE.entries() ) {
	const match = line.match(/([a-zA-Zäöüß\- ]+)(.+)/);
	const themeIndex = themes.push({
		'NAME GE': match[1],
		'NAME EN': themeLinesEN[key],
	}) - 1;

	for ( let genre of getList(match[2]) ) {
		if ( !genres[genre] ) {
			console.log(genre);
			continue;
		}

		if ( !genres[genre].themes) {
			genres[genre].themes = [];
		}

		genres[genre].themes.push(themeIndex);
	}
}

fs.writeFileSync(__dirname + '/../src/data/genres.json', JSON.stringify(genres));
fs.writeFileSync(__dirname + '/../src/data/themes.json', JSON.stringify(themes));