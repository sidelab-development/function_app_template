#!/bin/bash

# Colors
BLACK_BOLD="\033[1;30m";
WHITE="\033[0;37m";
WHITE_BOLD="\033[1;37m";
GREEN="\033[0;32m";
GREEN_BOLD="\033[1;32m";
RESET="\033[0m";

# Zip directory to organize files before packing
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
PROJECT_NAME=$(node -p "require('../package.json').name");

echo -e "${WHITE_BOLD}Packing...${RESET}"
zip -q -r ../${PROJECT_NAME}.zip .;

# Delete zip folder
cd ..;
rm -rf ${ZIP_DIRECTORY};



echo -e "\n${GREEN}⠀⠀⠀⠀⣀⣤⡶⠞⠳⢶⣤⣀⠀⠀⠀⠀⠀
⣀⣤⡶⠟⠛${WHITE_BOLD}⠻⢦⣄⣀${GREEN}⠀⠈⠙⠳⢦⣤⣀⠀
⡟⠷⣤⣄⡀⠀⠀${WHITE_BOLD}⠈⠙⠻⢶⣤${GREEN}⣠⣤⠾⢻⡇
⡇⠀⠀⠉⠛⠷⣦⣄⣠⡴⠾${WHITE_BOLD}⢻⡏${GREEN}⠀⠀⢸⡇
⡇⠀⠀⠀⠀⠀⠀⢸⡇⠀⠀${WHITE_BOLD}⢸⠇${GREEN}⠀⠀⢸⡇
⡇⠀⠀⠀⠀⠀⠀⢸⡇⠀⠀⠀⠀⠀⠀⢸⡇
⣇⡀${WHITE_BOLD}⠷⣦⣄${GREEN}⠀⠀⢸⡇⠀⠀⠀⠀⠀⢀⣸⡇
⠉⠛⠷⣦⣄⡀⠀⢸⡇⠀⢀⣠⡴⠞⠛⠉⠀
⠀⠀⠀⠀⠉⠛⠳⢾⡷⠞⠛⠉⠀⠀⠀⠀⠀${RESET}\n"

echo -e "${GREEN_BOLD}Package complete!${RESET}";
echo -e "${BLACK_BOLD}File:${WHITE} ${PROJECT_NAME}.zip${RESET}";
