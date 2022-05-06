import fetch from 'node-fetch';
import https from 'node:https';
import * as fs from 'node:fs';

// let url = 'https://memegen-link-examples-upleveled.netlify.app/';

const response = await fetch(
  'https://memegen-link-examples-upleveled.netlify.app/',
  { redirect: 'manual' },
);
const body = await response.text();

// console.log(body);

let i;
const urls = [];
const str = body;
const rex = /<img[^>]+src="?([^"\s]+)"?\s*\/>/g;

while ((i = rex.exec(str))) {
  urls.push(i[1]);
}

// const code = urls.slice(0, 10);

const path = './memes';
fs.access(path, (error) => {
  // To check if the given directory
  // already exists or not
  if (error) {
    // If current directory does not exist
    // then create it
    fs.mkdir(path, () => {
      console.log('New Directory created successfully !!');
    });
  } else {
    console.log('Given Directory already exists !!');
  }
});

// const meme = async () => {
//   const html = await axios.get(
//     'https://memegen-link-examples-upleveled.netlify.app/',
//   );
//   const $ = await load(html.data);
//   const data = [];
//   $('div').each((j, elem) => {
//     data.push($(elem).find('img').attr('src'));
//   });
//   const images = data.slice(3, 13);
//   console.log(images);

for (let j = 0; j < 10; j++) {
  if (j < 9) {
    fs.mkdir('./memes', { recursive: true }, function () {});
    const fileName = `memes/0${j + 1}.jpg`;
    console.log(fileName);
    const file = fs.createWriteStream(fileName);
    https.get(urls[j], function (answer) {
      answer.pipe(file);
    });
  } else {
    fs.mkdir('./memes', { recursive: true }, function () {});
    const fileName = `memes/${j + 1}.jpg`;
    console.log(fileName);
    const file = fs.createWriteStream(fileName);
    https.get(urls[j], function (answer) {
      answer.pipe(file);
    });
  }
}
