#!/bin/bash
set -e

echo Download dependencies
yarn

echo Prove out quality
yarn lint
yarn affected:test
yarn affected:e2e --headless

echo Build our library
yarn build ng-transition --prod

echo Copy over README material
cp ./README.md ./dist/libs/ng-transition
cp ./README-ssr-browser-api-errors.jpg ./dist/libs/ng-transition
