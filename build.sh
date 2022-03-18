#!/usr/bin/env bash

echo "... Creating opena11y-evalaution-library.js ..."
npx eslint -c eslint.json src/*.js
rollup -c rollup.js
