#!/usr/bin/env bash

set -e

BRANCH=main

if [[ $BUILD_BRANCH != "main" ]];
then
    BRANCH=develop
fi

if [ ! -d SellStuff ]; then
    (git clone https://github.com/WebJamApps/SellStuff)
fi

(
cd SellStuff || exit;
git stash;
git checkout $BRANCH;
git pull;
cd ..;
)

if [ -f .env ];
then
  (cp .env SellStuff/;
  )
fi

(
cd SellStuff;
npm install;
)
