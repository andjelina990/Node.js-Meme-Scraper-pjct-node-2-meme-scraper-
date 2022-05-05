import fetch from 'node-fetch';
import { load } from 'cheerio';
import https from 'https';
import axios from 'axios';

// import DownloaderHelper

import * as fs from 'fs';

let url = 'https://memegen-link-examples-upleveled.netlify.app/';

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

console.log(urls.slice(0, 10));

const path = './memes';
fs.access(path, (error) => {
  // To check if the given directory
  // already exists or not
  if (error) {
    // If current directory does not exist
    // then create it
    fs.mkdir(path, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log('New Directory created successfully !!');
      }
    });
  } else {
    console.log('Given Directory already exists !!');
  }
});

const meme = async () => {
  const html = await axios.get(
    'https://memegen-link-examples-upleveled.netlify.app/',
  );
  const $ = await load(html.data);
  let data = [];
  $('div').each((i, elem) => {
    data.push($(elem).find('img').attr('src'));
  });
  const images = data.slice(3, 13);
  console.log(images);

  for (let i = 0; i < images.length; i++) {
    fs.mkdir('./memes', { recursive: true }, function (err) {
      if (err) {
        console.log(err);
      }
    });
    let fileName = `memes/0${i + 1}.jpg`;
    console.log(fileName);
    let file = fs.createWriteStream(fileName);
    https.get(images[i], function (response) {
      response.pipe(file);
    });
  }
};
meme();
