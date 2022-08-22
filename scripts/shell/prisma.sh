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

# ====== If the project use prisma, uncomment the lines below ======
echo -e "${GREEN_BOLD}> Configuring prisma${RESET}";

if ! cp "./prisma/schema.prisma" "${ZIP_DIRECTORY}/schema.prisma"; then
  rm -rf ${ZIP_DIRECTORY}; exit 1;
fi

if ! yarn --cwd ${ZIP_DIRECTORY} add -D prisma; then
  rm -rf ${ZIP_DIRECTORY}; exit 1;
fi

if ! yarn --cwd ${ZIP_DIRECTORY} prisma generate; then
  rm -rf ${ZIP_DIRECTORY}; exit 1;
fi

echo -e "${GREEN_BOLD}> Done!${RESET}";

echo -e "\n${GREEN_BOLD}⠀⠀⠀⠀⠀⠀⢀⣾⣿⣆⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⢠⣾⣿⡏⢿⡆⠀⠀⠀⠀⠀
⠀⠀⠀⠀⣰⣿⣿⡿⠀⠈⢿⡆⠀⠀⠀⠀
⠀⠀⠀⣴⣿⣿⣿⡇⠀⠀⠈⢿⡆⠀⠀⠀
⠀⢀⣼⣿⣿⣿⣿⠁⠀⠀⠀⠘⢿⡄⠀⠀
⠀⣼⣿⣿⣿⣿⡟⠀⠀⠀⠀⠀⠸⣧⡀⠀
⣾⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠹⣧⠀
⠘⢿⣿⣿⣿⡿⠀⠀⠀⠀⠀⠀⠀⠀⢹⣧
⠀⠈⢻⣿⣿⡇⠀⠀⣀⣀⣠⣴⡶⠾⠟⠋
⠀⠀⠀⠹⣿⡷⠾⠟⠛⠉⠉⠀⠀⠀⠀⠀${RESET}\n"


echo -e "${GREEN_BOLD}Prisma configuration complete!${RESET}";
