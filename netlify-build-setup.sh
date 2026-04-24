#!/bin/bash

set -e

if [ "$CI" = "true" ]; then
  echo "Running in CI – setting up for Netlify"
  npm rebuild sharp --platform=linux --arch=x64 --ignore-scripts=false || npm install sharp --platform=linux --arch=x64 --ignore-scripts=false --no-save
else
  echo "Skipping Netlify setup – not in CI"
fi
