#!/usr/bin/env bash

set -e

BRANCH=main

if [[ $BUILD_BRANCH != "main" ]];
then
    BRANCH=develop
fi

if [ ! -d breakpointministries ]; then
    (git clone https://github.com/WebJamApps/breakpointministries)
fi

(
cd breakpointministries || exit;
git stash;
git checkout $BRANCH;
git pull;
cd ..;
)

if [ -f .env ];
then
  (cp .env breakpointministries/;
  )
fi

(
cd breakpointministries;
npm install;
)
