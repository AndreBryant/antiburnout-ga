import { Chromosome } from "./Chromosome.js";
import { todo, consoleAnimateGA } from "./utils.js";

export class GeneticAlgorithm {
  populationSize;
  geneCount;
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
    generations,
    fitnessFunction,
    crossoverFunction,
    mutationFunction,
    fitnessThreshold,
  ) {
    this.populationSize = populationSize;
    this.geneCount = geneCount;
    this.generations = generations;
    this.fitnessFunction = fitnessFunction;
    this.crossoverFunction = crossoverFunction;
    this.mutationFunction = mutationFunction;
    this.fitnessThreshold = fitnessThreshold;
  }

  async start() {
    this.initializePopulation();

    while (this.currentGeneration < this.generations) {
      // i think generation 0 is the initial population so it makes sense that we increment at the start of the loop
      this.currentGeneration++;
      await consoleAnimateGA(this.population, 100, {
        Generation: this.currentGeneration,
        "Best Solution (P) found so far": this.bestSolution.genes.join(""),
        "Fitness of P": this.bestSolution.fitness.toFixed(4),
        "We will stop at fitness": this.fitnessThreshold.toFixed(4),
      });

      if (
        this.bestSolution &&
        this.bestSolution.fitness >= this.fitnessThreshold
      ) {
        this.reportResults();
        break;
      }

      const newGeneration = [];
      while (newGeneration.length < this.populationSize) {
        const [p1, p2] = [this.selectParent(), this.selectParent()];
        const offspring = this.crossover(p1, p2);
        this.mutate(offspring);
        newGeneration.push(offspring);
      }
      this.population = newGeneration;
      this.evaluateFitness();
    }

    this.reportResults();
  }

  initializePopulation() {
    this.population = [];
    for (let i = 0; i < this.populationSize; i++) {
      const genes = this.randomGenes();
      const fitness = this.fitnessFunction(genes);
      const chromosome = new Chromosome(genes, fitness);
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

  crossover(parent1, parent2) {
    return this.crossoverFunction(parent1, parent2);
  }

  mutate(chromosome) {
    return this.mutationFunction(chromosome);
  }

  reportResults() {
    console.log("Best solution found:", this.bestSolution.genes.join(""));
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
