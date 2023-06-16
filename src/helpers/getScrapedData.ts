import cheerio from 'cheerio';

import Game from '../types/Game';
import { api } from '../lib/api';
import printTable from './printTable';

// Async function which scrapes the data
const getScrapedData = async (videoGameName: string) => {
  try {
    // Fetch HTML of the page we want to scrape
    const { data } = await api.get(videoGameName);

    // Load HTML we fetched in the previous line using cheerio
    const $ = cheerio.load(data);

    // Select all the table rows in games_table
    const listItems = $('#games_table tbody tr');

    const games: Game[] = [];

    // Use .each method to loop through the table rows we selected
    listItems.each((index, element) => {
      const game: Game = {
        id: 0,
        title: '',
        console: '',
        lowPrice: '',
        midPrice: '',
        highPrice: ''
      };

      // Get the game info and store into the object
      game.id = index + 1;

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

      games.push(game);
    });

    printTable(games);
    console.log(
      '\nUse the --detail option to see details about a specific game above'
    );
  } catch (err) {
    console.error(err);
  }
};

export default getScrapedData;
