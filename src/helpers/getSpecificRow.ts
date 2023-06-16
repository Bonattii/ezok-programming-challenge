import fs from 'fs';
import Game from '../types/Game';
import printTable from './printTable';

const getSpecificRow = (id: number) => {
  if (fs.existsSync('scraped-data.json')) {
    // Read the file with the scraped data
    const rawData = fs.readFileSync('scraped-data.json', 'utf8');
    const games = JSON.parse(rawData);

    // Verify that the user put a valid id on the parameter
    if (id < 1 || id > games.length) {
      console.log(
        "\n\nYou tried to search for a game that doesn't exists, please try again\n\n"
      );

      return;
    }

    // Filter to get the specific game desired by the user
    const specificGame = games.filter((game: Game) => {
      return game.id === id;
    });

    printTable(specificGame);

    console.log(
      '\n\nUse the --detail option to see details about a specific game above'
    );
    console.log('\nOr use the --search option to make a new seach\n\n');
  } else {
    console.log(
      '\n\nYou need to use the search option before using the detail option\n\n'
    );
  }
};

export default getSpecificRow;
