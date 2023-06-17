import SpecificGamePrices from '../types/SpecificGamePrices';

const printGamePrices = (game: SpecificGamePrices) => {
  const columnLengths: Record<keyof SpecificGamePrices, number> &
    Record<string, number> = {
    loosePrice: 0,
    completePrice: 0,
    newPrice: 0,
    gradedPrice: 0,
    boxOnlyPrice: 0,
    manualOnlyPrice: 0
  };

  // Will get every key of the object and run through each
  Object.keys(game).forEach(key => {
    const columnKey = key as keyof SpecificGamePrices;

    // Will attribute the bigger number for each key to be the length needed
    columnLengths[columnKey] = Math.max(
      columnLengths[columnKey],
      String(game[columnKey]).length
    );
  });

  // Create the horizontal separator
  const separator = Object.keys(columnLengths)
    .map(key => '-'.repeat(columnLengths[key])) // Will create a ----- with the columns length
    .join('-+-');

  // Print table headers
  console.log(separator);
  console.log(
    Object.keys(columnLengths)
      .map(key =>
        String(key)
          .split(/(?=[A-Z])/)
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
          .padEnd(columnLengths[key])
      ) // Will transform the key into a string and pad the end with the size of the column
      .join(' | ')
  );
  console.log(separator);

  console.log(
    Object.keys(columnLengths)
      .map(key => String((game as any)[key]).padEnd(columnLengths[key]))
      .join(' | ')
  );

  console.log(separator);
};

export default printGamePrices;
