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
  TOURNAMENT_SIZE = 5;

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
        this.bestSolution.fitness >= this.fitnessThreshold
      ) {
        this.reportResults();
        break;
      }

      const [p1, p2] = [this.selectParent(), this.selectParent()];
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
      this.isBestSolution(chromosome);
    }
  }

  evaluateFitness() {
    for (const chromosome of this.population) {
      chromosome.fitness = this.fitnessFunction(chromosome.genes);
      this.isBestSolution(chromosome);
    }
  }

  // Tournament selection
  selectParent() {
    const tournament = [];

    while (tournament.length < this.TOURNAMENT_SIZE) {
      const i = Math.floor(Math.random() * this.populationSize);
      if (
        tournament.indexOf(i) === -1 &&
        Math.random() < 1 / this.populationSize
      ) {
        tournament.push(i);
      }
    }

    return Array.from(new Set(tournament))
      .map((index) => this.population[index])
      .sort((a, b) => b.fitness - a.fitness)[0];
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
    console.log("Fitness:", this.bestSolution.fitness);
    console.log("Generations:", this.currentGeneration);
  }

  randomGenes() {
    return Array.from({ length: this.geneCount }, () =>
      Math.floor(Math.random() * 2),
    );
  }

  isBestSolution(chromosome) {
    // just automatically updates the best solution
    if (!this.bestSolution || chromosome.fitness > this.bestSolution.fitness) {
      this.bestSolution = chromosome;
    }
  }
}
