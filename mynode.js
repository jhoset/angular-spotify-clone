const fs = require('fs');
const path = require('path');
const successColor = '\x1b[32m%s\x1b[0m';
const checkSign = '\u{2705}';
const dotenv = require('dotenv').config({path: 'src/.env'}); ;

const envFile = `export const environment = {
    SERVER_URL: '${process.env.SERVER_URL}',
    SPOTIFY_API_URL: '${process.env.SPOTIFY_API_URL}',
};
`;
const targetPath = path.join(__dirname, './src/environments/environment.development.ts');
fs.writeFile(targetPath, envFile, (err) => {
  if (err) {
    console.error(err);
    throw err;
  } else {
    console.log(successColor, `${checkSign} Successfully generated environment.development.ts`);
  }
});
