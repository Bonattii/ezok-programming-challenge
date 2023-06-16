import Game from '../types/Game';

const printTable = (data: Game[]) => {
  const columnLengths: Record<keyof Game, number> & Record<string, number> = {
    id: 0,
    title: 0,
    console: 0,
    lowPrice: 0,
    midPrice: 0,
    highPrice: 0
  };

  // Will run through the array and for each game in the array
  data.forEach(game => {
    // Will get every key of the object and run through each
    Object.keys(game).forEach(key => {
      const columnKey = key as keyof Game;

      // Will attribute the bigger number for each key to be the length needed
      columnLengths[columnKey] = Math.max(
        columnLengths[columnKey],
        String(game[columnKey]).length
      );
    });
  });

  // Create the horizontal separator
  const separator = Object.keys(columnLengths)
    .map(key => '-'.repeat(columnLengths[key])) // Will create a ----- with the columns length
    .join('-+-');

  // Print table headers
  console.log(separator);
  console.log(
    Object.keys(columnLengths)
      .map(key => String(key).padEnd(columnLengths[key])) // Will transform the key into a string and pad the end with the size of the column
      .join(' | ')
  );
  console.log(separator);

  // Print each Row
  data.forEach(game => {
    console.log(
      Object.keys(columnLengths)
        .map(key => String((game as any)[key]).padEnd(columnLengths[key]))
        .join(' | ')
    );
  });

  console.log(separator);
};

export default printTable;
