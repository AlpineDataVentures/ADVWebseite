#!/bin/bash

if [ "$CI" = "true" ]; then
  echo "Running in CI – setting up for Netlify"
  rm -rf node_modules yarn.lock
  npm install sharp --platform=linux --arch=x64 --ignore-scripts=false
else
  echo "Skipping Netlify setup – not in CI"
fi
