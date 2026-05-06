import { Chromosome } from "./classes/Chromosome.js";
import { GeneticAlgorithm as GA } from "./classes/GeneticAlgorithm.js";

const ga = new GA(
  10,
  50,
  0.01,
  100,
  () => {},
  () => {},
  () => {},
  0.999,
);

ga.initializePopulation();
