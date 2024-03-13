#!/bin/bash

npm install npm-run-all --save-dev

npx npm-run-all --parallel start:back-end start:front-end

