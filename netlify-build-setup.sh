#!/bin/bash

if [ "$CI" = "true" ]; then
  echo "Running in CI – setting up for Netlify"
  rm -rf node_modules yarn.lock
  yarn install --ignore-scripts
  yarn add sharp --platform=linux --arch=x64
else
  echo "Skipping Netlify setup – not in CI"
fi
