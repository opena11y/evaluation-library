#!/usr/bin/env bash

echo "... Creating evaluation-library.js ..."
npx eslint src/*.js
rollup -c
