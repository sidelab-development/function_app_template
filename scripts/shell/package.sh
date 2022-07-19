#!/bin/bash

# Colors
BLACK_BOLD="\033[1;30m";
WHITE="\033[0;37m";
WHITE_BOLD="\033[1;37m";
GREEN="\033[0;32m";
GREEN_BOLD="\033[1;32m";
RESET="\033[0m";

# ====== Zip directory to organize files before packing ======
ZIP_DIRECTORY=.zip

# ====== Generate bundle files ======
yarn webpack;

# ====== Move files and organize folders to zip ======
node ./scripts/javascript/package.js;

# ====== Install necessary dependencies, then remove package.json and yarn.lock ======
yarn --cwd ${ZIP_DIRECTORY};

# ====== If the project use prisma, uncomment the lines below ======
# cp "./schema.prisma" "${ZIP_DIRECTORY}/schema.prisma";

# echo \
# "DATABASE_URL=''
# SHADOW_DATABASE_URL=''" >> "${ZIP_DIRECTORY}/.env";

# yarn --cwd ${ZIP_DIRECTORY} add -D prisma@^3.15.2
# yarn --cwd ${ZIP_DIRECTORY} prisma generate

# ====== Generate zip file ======
cd ${ZIP_DIRECTORY};
echo -e "${WHITE_BOLD}Packing...${RESET}"
zip -q -r ../api.zip .;

# ====== Delete zip folder ======
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
echo -e "${BLACK_BOLD}File:${WHITE} api.zip${RESET}";
