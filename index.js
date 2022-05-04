import fetch from 'node-fetch';

import * as fs from 'fs';

const url = 'https://memegen-link-examples-upleveled.netlify.app/';

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

// const fs = require('fs');

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
