import { todo } from "./utils.js";

export class GeneticAlgorithm {
  populationSize;
  mutationRate;
  generations;
  fitnessFunction;
  crossoverFunction;
  mutationFunction;
  fitnessThreshold;
  bestSolution;

  constructor(
    populationSize,
    mutationRate,
    generations,
    fitnessFunction,
    crossoverFunction,
    mutationFunction,
    fitnessThreshold,
  ) {
    this.populationSize = populationSize;
    this.mutationRate = mutationRate;
    this.generations = generations;
    this.fitnessFunction = fitnessFunction;
    this.crossoverFunction = crossoverFunction;
    this.mutationFunction = mutationFunction;
    this.fitnessThreshold = fitnessThreshold;
  }

  start() {
    this.initializePopulation();

    /**
     * Algorithm steps:
     *  1. Evaluate fitness of each individual in the population
     *  2. Select parents for the next generation
     *  3. Crossover parents to create offspring
     *  4. Mutate offspring
     *  5. Replace the old population with the new one
     *  6. Repeat for a specified number of generations or until a satisfactory solution is found
     */

    for (let generation = 0; generation < this.generations; generation++) {
      if (
        this.bestSolution &&
        this.fitnessFunction(this.bestSolution) >= this.fitnessThreshold
      ) {
        console.log(
          `Solution found in generation ${generation}:`,
          this.bestSolution,
        );
        break;
      }

      this.evaluateFitness();
      this.selectParents();
      this.crossover();
      this.mutate();
    }
  }

  initializePopulation() {
    todo(
      "initializePopulation",
      "Initialize the population with random individuals",
      "GeneticAlgorithm.js",
    );
  }

  evaluateFitness() {
    todo(
      "evaluateFitness",
      "Evaluate the fitness of each individual in the population",
      "GeneticAlgorithm.js",
    );
  }

  selectParents() {
    todo(
      "selectParents",
      "Select parents for the next generation",
      "GeneticAlgorithm.js",
    );
  }

  crossover() {
    todo(
      "crossover",
      "Crossover parents to create offspring",
      "GeneticAlgorithm.js",
    );
  }

  mutate() {
    todo("mutate", "Mutate offspring", "GeneticAlgorithm.js");
  }
}
