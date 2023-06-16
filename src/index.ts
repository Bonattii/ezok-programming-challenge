#!/usr/bin/env node

import clear from 'clear';
import figlet from 'figlet';
import { Command } from 'commander';

import getScrapedData from './helpers/getScrapedData';
import getSpecificRow from './helpers/getSpecificRow';

clear();

// Set program to an instance of Command
const program = new Command();

console.log(figlet.textSync('price-search', { horizontalLayout: 'full' }));

// Configure the CLI with the options required
program
  .version('1.0.0')
  .description('A CLI to do video games price search')
  .option(
    '--search <query>',
    'Search for a game price, giving the name as a query'
  )
  .option('--detail <value>', 'See the details of a game after searched')
  .parse(process.argv);

const options = program.opts();

// Get the arguments that the user has passed and get the index where it is the --search flag
const args = process.argv.slice(2);
const searchIndex = args.findIndex(arg => arg === '--search');

// Check if the searchIndex exists && that it is not the last index of args (that have something after)
if (searchIndex !== -1 && searchIndex < args.length - 1) {
  // Get all the words after --search and join into a single string when spaces happens and change for +
  const searchQuery = args
    .slice(searchIndex + 1)
    .join(' ')
    .replace(/ /g, '+');

  getScrapedData(searchQuery);
}

// Check if the user typed the detail command
if (options.detail) {
  getSpecificRow(Number(options.detail));
}

// If the user don't pass any options, will show the help page
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
