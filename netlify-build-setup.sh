#!/bin/bash

if [ "$CI" = "true" ]; then
  echo "Running in CI – setting up for Netlify"
  rm -rf node_modules yarn.lock
  yarn add sharp
else
  echo "Skipping Netlify setup – not in CI"
fi
