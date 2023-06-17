import cheerio from 'cheerio';

import api from '../lib/api';
import Game from '../types/Game';
import SpecificGamePrices from '../types/SpecificGamePrices';
import printGamePrices from './printGamePrices';

const getGameDetailScrapedData = async (game: Game) => {
  // Get the correct format of the string to make the request
  const normalizedGameTitle = game.title
    // Replace any special character for nothing excpet '&+ and keep the already existent -
    .replace(/[^a-zA-Z0-9\s`'&+`-]/g, '')
    // Replace spaces by -
    .replace(/\s+/g, '-')
    // Replace ' by %27
    .replace(/'/g, '%27')
    .toLowerCase();

  const normalizedGameConsole = game.console.replace(/\s+/g, '-');

  try {
    // Fetch HTML of the page we want to scrape
    const { data } = await api.get(
      `/game/${normalizedGameConsole}/${normalizedGameTitle}`
    );

    // Load HTML we fetched in the previous line using cheerio
    const $ = cheerio.load(data);

    // Just get the first tbody on the table since it has 2
    const gamePricesHTML = $('#price_data tbody tr').first();

    const specificGamePrices: SpecificGamePrices = {
      loosePrice: '',
      completePrice: '',
      newPrice: '',
      gradedPrice: '',
      boxOnlyPrice: '',
      manualOnlyPrice: ''
    };

    specificGamePrices.loosePrice = $(gamePricesHTML)
      .children('#used_price')
      .children('.price')
      .text()
      .replace(/\r?\n|\r/g, '')
      .trim();

    specificGamePrices.completePrice = $(gamePricesHTML)
      .children('#complete_price')
      .children('.price')
      .text()
      .replace(/\r?\n|\r/g, '')
      .trim();

    specificGamePrices.newPrice = $(gamePricesHTML)
      .children('#new_price')
      .children('.price')
      .text()
      .replace(/\r?\n|\r/g, '')
      .trim();

    specificGamePrices.gradedPrice = $(gamePricesHTML)
      .children('#graded_price')
      .children('.price')
      .text()
      .replace(/\r?\n|\r/g, '')
      .trim();

    specificGamePrices.boxOnlyPrice = $(gamePricesHTML)
      .children('#box_only_price')
      .children('.price')
      .text()
      .replace(/\r?\n|\r/g, '')
      .trim();

    specificGamePrices.manualOnlyPrice = $(gamePricesHTML)
      .children('#manual_only_price')
      .children('.price')
      .text()
      .replace(/\r?\n|\r/g, '')
      .trim();

    printGamePrices(specificGamePrices);

    console.log(
      '\n\nUse the --detail option to see details about a specific game above'
    );
    console.log('\nOr use the --search option to make a new seach\n\n');
  } catch (error) {}
};

export default getGameDetailScrapedData;
