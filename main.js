// Knapsack problem GA Implementation
import { Chromosome } from "./classes/Chromosome.js";
import { GeneticAlgorithm as GA } from "./classes/GeneticAlgorithm.js";

// Knapsack parameters
const NUMBER_OF_ITEMS = 100;
const MAX_WEIGHT = 20;
const MAX_VALUE = 10;
const ITEMS = Array.from({ length: NUMBER_OF_ITEMS }, () => ({
  weight: Math.floor(Math.random() * MAX_WEIGHT) + 1,
  value: Math.floor(Math.random() * MAX_VALUE) + 1,
}));
const KNAPSACK_CAPACITY = ITEMS.reduce((a, b) => a + b.weight, 0) * 0.34; // % of total weight

// GA parameters
const POPULATION_SIZE = 1000;
const FITNESS_THRESHOLD = 0.999;
const GENERATIONS = 100;
const MUTATION_RATE = 0.01;
const CROSSOVER_RATE = 0.7;

// GA core functions
const FITNESS_FUNCTION = (chromosome) => {
  let totalWeight = 0;
  let totalValue = 0;

  for (let i = 0; i < chromosome.length; i++) {
    if (chromosome[i] === 1) {
      const item = ITEMS[i];
      totalWeight += item.weight;
      totalValue += item.value;

      if (totalWeight > KNAPSACK_CAPACITY) {
        return 0;
      }
    }
  }

  return 1 - 1 / totalValue;
};

const CROSSOVER_FUNCTION = (parent1, parent2) => {
  // swap per bit with crossover rate
  const offspringGenes = parent1.genes.map((gene, index) => {
    if (Math.random() < CROSSOVER_RATE) {
      return parent2.genes[index];
    }

    return gene;
  });

  return new Chromosome(offspringGenes);
};

const MUTATION_FUNCTION = (chromosome) => {
  //  mutation per bit with mutation rate
  chromosome.genes = chromosome.genes.map((gene) => {
    if (Math.random() < MUTATION_RATE) {
      return gene === 1 ? 0 : 1;
    }

    return gene;
  });
};

const ga = new GA(
  POPULATION_SIZE,
  NUMBER_OF_ITEMS,
  GENERATIONS,
  FITNESS_FUNCTION,
  CROSSOVER_FUNCTION,
  MUTATION_FUNCTION,
  FITNESS_THRESHOLD,
);

await ga.start();
