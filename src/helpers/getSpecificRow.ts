import fs from 'fs';
import Game from '../types/Game';
import getGameDetailScrapedData from './getGameDetailScrapedData';

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

    // Scrape the data for the specific game
    getGameDetailScrapedData(specificGame[0]);
  } else {
    console.log(
      '\n\nYou need to use the search option before using the detail option\n\n'
    );
  }
};

export default getSpecificRow;
