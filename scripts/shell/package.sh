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
echo -e "${GREEN_BOLD}> Building with webpack${RESET}";
if ! yarn webpack; then
  rm -rf ${ZIP_DIRECTORY}; exit 1;
fi

# ====== Move files and organize folders to zip ======
echo -e "${GREEN_BOLD}> Organizing build directory${RESET}";
if ! node ./scripts/javascript/package.js; then
  rm -rf ${ZIP_DIRECTORY}; exit 1;
fi

# ====== Install necessary dependencies, then remove package.json and yarn.lock ======
echo -e "${GREEN_BOLD}> Installing build dependencies${RESET}";
if ! yarn --cwd ${ZIP_DIRECTORY}; then
  rm -rf ${ZIP_DIRECTORY}; exit 1;
fi

# ====== If the project use prisma, uncomment the lines below ======
# echo -e "${GREEN_BOLD}> Configuring prisma${RESET}";

# if ! cp "./schema.prisma" "${ZIP_DIRECTORY}/schema.prisma"; then
#   rm -rf ${ZIP_DIRECTORY}; exit 1;
# fi

# echo \
# "DATABASE_URL=''
# SHADOW_DATABASE_URL=''" >> "${ZIP_DIRECTORY}/.env";

# if ! yarn --cwd ${ZIP_DIRECTORY} add -D prisma@^3.15.2; then
#   rm -rf ${ZIP_DIRECTORY}; exit 1;
# fi

# if ! yarn --cwd ${ZIP_DIRECTORY} prisma generate; then
#   rm -rf ${ZIP_DIRECTORY}; exit 1;
# fi

# ====== Output ======
echo -e "${GREEN_BOLD}> Done!${RESET}";

echo -e "\n${GREEN}⠀⠀⠀⠀⣀⣤⡶⠞⠳⢶⣤⣀⠀⠀⠀⠀⠀
⣀⣤⡶⠟⠛${WHITE_BOLD}⠻⢦⣄⣀${GREEN}⠀⠈⠙⠳⢦⣤⣀⠀
⡟⠷⣤⣄⡀⠀⠀${WHITE_BOLD}⠈⠙⠻⢶⣤${GREEN}⣠⣤⠾⢻⡇
⡇⠀⠀⠉⠛⠷⣦⣄⣠⡴⠾${WHITE_BOLD}⢻⡏${GREEN}⠀⠀⢸⡇
⡇⠀⠀⠀⠀⠀⠀⢸⡇⠀⠀${WHITE_BOLD}⢸⠇${GREEN}⠀⠀⢸⡇
⡇⠀⠀⠀⠀⠀⠀⢸⡇⠀⠀⠀⠀⠀⠀⢸⡇
⣇⡀${WHITE_BOLD}⠷⣦⣄${GREEN}⠀⠀⢸⡇⠀⠀⠀⠀⠀⢀⣸⡇
⠉⠛⠷⣦⣄⡀⠀⢸⡇⠀⢀⣠⡴⠞⠛⠉⠀
⠀⠀⠀⠀⠉⠛⠳⢾⡷⠞⠛⠉⠀⠀⠀⠀⠀${RESET}\n"

echo -e "${GREEN_BOLD}Build complete!${RESET}";
echo -e "${BLACK_BOLD}Folder:${WHITE} .zip${RESET}";
