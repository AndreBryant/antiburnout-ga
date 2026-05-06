import { GeneticAlgorithm as GA } from "./classes/GeneticAlgorithm.js";

const ga = new GA(
  10,
  0.01,
  100,
  () => {},
  () => {},
  () => {},
  0.999,
);

ga.start();
