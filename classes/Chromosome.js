export class Chromosome {
  genes;
  fitness;

  constructor(genes, fitness = 0) {
    this.genes = genes;
    this.fitness = fitness;
  }

  set fitness(fitness) {
    this.fitness = fitness;
  }

  get fitness() {
    return this.fitness;
  }
}
