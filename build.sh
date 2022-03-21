#!/usr/bin/env bash

echo "... Creating evalaution-library.js ..."
npx eslint -c eslint.json src/*.js
rollup -c rollup.js
