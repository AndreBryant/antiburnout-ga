import { Chromosome } from "./Chromosome.js";
import { todo } from "./utils.js";

export class GeneticAlgorithm {
  populationSize;
  geneCount;
  mutationRate;
  generations;
  currentGeneration = 0;
  fitnessFunction;
  crossoverFunction;
  mutationFunction;
  fitnessThreshold;
  bestSolution;

  constructor(
    populationSize,
    geneCount,
    mutationRate,
    generations,
    fitnessFunction,
    crossoverFunction,
    mutationFunction,
    fitnessThreshold,
  ) {
    this.populationSize = populationSize;
    this.geneCount = geneCount;
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

    while (this.currentGeneration < this.generations) {
      if (
        this.bestSolution &&
        this.fitnessFunction(this.bestSolution) >= this.fitnessThreshold
      ) {
        this.reportResults();
        break;
      }

      this.evaluateFitness();
      this.selectParents();
      this.crossover();
      this.mutate();

      this.currentGeneration++;
    }
  }

  initializePopulation() {
    // Create an initial population of random chromosomes
    this.population = [];
    for (let i = 0; i < this.populationSize; i++) {
      const genes = this.randomGenes();
      const fitness = this.fitnessFunction(genes);
      const chromosome = new Chromosome(genes, fitness);
      this.population.push(chromosome);
    }
  }

  evaluateFitness() {
    for (const chromosome of this.population) {
      chromosome.fitness = this.fitnessFunction(chromosome.genes);
    }
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

  reportResults() {
    console.log("Best solution found:", this.bestSolution);
    console.log("Fitness:", this.fitnessFunction(this.bestSolution));
  }

  randomGenes() {
    return Array.from({ length: this.geneCount }, () =>
      Math.floor(Math.random() * 2),
    );
  }
}
