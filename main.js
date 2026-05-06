// Knapsack problem genetic algorithm implementation in JavaScript

import { Chromosome } from "./classes/Chromosome.js";
import { GeneticAlgorithm as GA } from "./classes/GeneticAlgorithm.js";

// Knapsack parameters
const NUMBER_OF_ITEMS = 10;
const MAX_WEIGHT = 20;
const MAX_VALUE = 100;
const KNAPSACK_CAPACITY = 150;
const ITEMS = Array.from({ length: NUMBER_OF_ITEMS }, () => ({
  weight: Math.floor(Math.random() * MAX_WEIGHT) + 1,
  value: Math.floor(Math.random() * MAX_VALUE) + 1,
}));

// GA parameters
const POPULATION_SIZE = 5;
const FITNESS_THRESHOLD = 0.999;
const GENERATIONS = 2;
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

  return totalValue;
};

const CROSSOVER_FUNCTION = (parent1, parent2) => {};
const MUTATION_FUNCTION = (chromosome) => {};

const ga = new GA(
  POPULATION_SIZE,
  NUMBER_OF_ITEMS,
  CROSSOVER_RATE,
  MUTATION_RATE,
  GENERATIONS,
  FITNESS_FUNCTION,
  CROSSOVER_FUNCTION,
  MUTATION_FUNCTION,
  FITNESS_THRESHOLD,
);

ga.start();
