#!/bin/bash

ZIP_DIRECTORY=.zip

# Generate bundle files
yarn webpack;

# Move files and organize folders to zip
node ./scripts/javascript/gen-folder-to-zip.js;

# Install necessary dependencies, then remove package.json and yarn.lock
yarn --cwd ${ZIP_DIRECTORY};
rm ${ZIP_DIRECTORY}/package.json ${ZIP_DIRECTORY}/yarn.lock;

# Generate zip file
cd ${ZIP_DIRECTORY};
PROJECT_NAME=$(node -p "require('../package.json').name")
zip -r ../${PROJECT_NAME}.zip .;

# Delete zip folder
cd ..;
rm -rf ${ZIP_DIRECTORY}