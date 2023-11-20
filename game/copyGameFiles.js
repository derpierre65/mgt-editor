const {createInterface} = require('node:readline');
const fs = require('fs');
const path = require('path');

function readlineSync(question) {
    return new Promise((resolve) => {
        const readline = createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readline.question(question + ': ', input => {
            readline.close();
            resolve(input);
        });
    })
}


(async () => {
    let gamePath = (await readlineSync('Game Path')).toString().trim();
    if (!gamePath) {
        console.error('No game path passed.');
        return;
    }

    gamePath = gamePath.replaceAll("\\", '/').replaceAll('//', '/');

    if (!gamePath.endsWith('/')) {
        gamePath += '/';
    }

    if (!gamePath.includes('Extern/Text')) {
        gamePath += 'Extern/Text';
    }

    const files = fs.readdirSync(gamePath).filter(file => !file.endsWith('.meta') && file !== 'DATA');
    for (const file of files) {
        const fileName = `Themes_${file}.txt`;
        const themePath = path.resolve(gamePath, file, `Themes_${file}.txt`);
        fs.copyFileSync(themePath, path.resolve(__dirname, 'data', fileName));
        console.log(`copied ${fileName}`);
    }
})();