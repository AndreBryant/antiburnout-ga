export const todo = (functionName, description, file) =>
  console.log(
    `[TODO]: ${functionName}, ${description}, ${file}: \n${description}\n\n`,
  );

export const consoleAnimateGA = async (population, cols = 100, otherData) => {
  const gradient = "_▁▂▃▄▅▆▇█";
  //   const gradient =
  //     " .'`^\",:;Il!i~+_-?][}{1)(|\\/*tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";
  let totalFitness = 0;
  console.clear();

  for (let i = 0; i < population.length; i += cols) {
    let row = "";

    for (let j = 0; j < cols && i + j < population.length; j++) {
      const chromosome = population[i + j];
      const fitness = chromosome.fitness.toFixed(2);
      const gradientIndex = Math.floor(
        ((fitness - 0) / (1 - 0)) * (gradient.length - 1),
      );
      const gradientChar = gradient[gradientIndex];
      row += gradientChar;
      totalFitness += chromosome.fitness;
    }

    console.log(row);
  }

  console.log("\nAverage Fitness:", totalFitness / population.length);
  console.log(
    Object.entries(otherData || {})
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n\n"),
  );

  await new Promise((resolve) => setTimeout(resolve, 50));
};
