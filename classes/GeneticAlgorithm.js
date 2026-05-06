import { Chromosome } from "./Chromosome.js";
import { todo } from "./utils.js";

export class GeneticAlgorithm {
  populationSize;
  geneCount;
  crossoverRate;
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
    crossoverRate,
    mutationRate,
    generations,
    fitnessFunction,
    crossoverFunction,
    mutationFunction,
    fitnessThreshold,
  ) {
    this.populationSize = populationSize;
    this.geneCount = geneCount;
    this.crossoverRate = crossoverRate;
    this.mutationRate = mutationRate;
    this.generations = generations;
    this.fitnessFunction = fitnessFunction;
    this.crossoverFunction = crossoverFunction;
    this.mutationFunction = mutationFunction;
    this.fitnessThreshold = fitnessThreshold;
  }

  start() {
    this.initializePopulation();

    while (this.currentGeneration <= this.generations) {
      // i think generation 0 is the initial population so it makes sense that we increment at the start of the loop
      this.currentGeneration++;

      if (
        this.bestSolution &&
        this.fitnessFunction(this.bestSolution) >= this.fitnessThreshold
      ) {
        this.reportResults();
        break;
      }

      this.selectParents();
      this.crossover();
      this.mutate();
      this.evaluateFitness();
    }
  }

  initializePopulation() {
    this.population = [];
    for (let i = 0; i < this.populationSize; i++) {
      const genes = this.randomGenes();
      const fitness = this.fitnessFunction(genes);
      const chromosome = new Chromosome(genes, 1 - 1 / fitness);
      this.population.push(chromosome);
    }

    console.log({ initialPopulation: this.population });
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
    console.log("Generations:", this.currentGeneration);
  }

  randomGenes() {
    return Array.from({ length: this.geneCount }, () =>
      Math.floor(Math.random() * 2),
    );
  }
}
