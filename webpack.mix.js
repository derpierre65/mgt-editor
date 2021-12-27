const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const tailwind = require('tailwindcss');
const mix = require('laravel-mix');

// global settings
mix
	.disableNotifications()
	.setResourceRoot('src')
	.setPublicPath('dist');

// render js file
mix.js('src/main.js', 'dist/assets/js').vue();

// render css
mix.sass('src/style.scss', 'dist/assets/css', {}, [ tailwind ]);

// move statics
if (fs.existsSync('src/static')) {
	mix.copyDirectory('src/static', 'dist');
}

// prepare index.html
mix.override((config) => {
	config.plugins.push(
		new HtmlWebpackPlugin({
			template: 'src/index.html',
			inject: 'body',
		}),
	);
});

// generate a version filename
if (mix.inProduction()) {
	mix.version();
}

// do stuff if watching mode
mix.before((mixHelpers) => {
	if (mixHelpers.isWatching()) {
		return;
	}

	mix.after(() => {
		let manifest = JSON.parse(
			fs.readFileSync('./dist/mix-manifest.json').toString(),
		);
		let html = fs.readFileSync('./dist/index.html').toString();
		for (let path of Object.keys(manifest)) {
			html = html.replace(path, manifest[path].replace(/^\//, ''));
		}

		html = html.replace(/\/\//i, '/');

		fs.unlinkSync('./dist/mix-manifest.json');
		fs.writeFileSync('./dist/index.html', html);
	});
});