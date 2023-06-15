import cheerio from 'cheerio';

import Game from './types/Game';
import { api } from './lib/api';

const videoGameName = 'Zelda';

// Async function which scrapes the data
const scrapeData = async (videoGameName: string) => {
  try {
    // Fetch HTML of the page we want to scrape
    const { data } = await api.get(videoGameName);
    // Load HTML we fetched in the previous line using cheerio
    const $ = cheerio.load(data);

    // Select all the table rows in games_table
    const listItems = $('#games_table tbody tr');
    // Stores data for all games
    const games: Game[] = [];
    // Use .each method to loop through the li we selected
    listItems.each((index, element) => {
      // Object holding data for each game
      const game: Game = {
        id: '',
        title: '',
        console: '',
        lowPrice: '',
        midPrice: '',
        highPrice: ''
      };

      // Get the game info and store into the object
      game.id = $(element).attr('id')!;

      // Take out the space on the beginning and the extra lines
      game.title = $(element)
        .children('.title')
        .children('a')
        .text()
        .replace(/\r?\n|\r/g, '')
        .trimStart();

      // Take out the space on the end and on the beginning and the extra lines
      game.console = $(element)
        .children('.console')
        .text()
        .replace(/\r?\n|\r/g, '')
        .trimEnd()
        .trimStart();

      // Get the prices
      game.lowPrice = $(element)
        .children('.used_price')
        .children('span')
        .text();
      game.midPrice = $(element).children('.cib_price').children('span').text();
      game.highPrice = $(element)
        .children('.new_price')
        .children('span')
        .text();

      // Populate games array with country data
      games.push(game);
    });
    // Logs countries array to the console
    console.dir(games);
  } catch (err) {
    console.error(err);
  }
};

// Invoke the above function
scrapeData(videoGameName);
