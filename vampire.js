class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let count = 0;
    let hasCreator = this.creator;
    if (hasCreator) {
      count += 1 + hasCreator.numberOfVampiresFromOriginal;
    }
    return count;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    let foundName = null;
    // Base case: vampire is the root
    if (this.name === name) {
      foundName = this;
      // Recursive case: search the vampire's offspring
    } else {
      for (const offspring of this.offspring) {
        foundName = offspring.vampireWithName(name);
        if (foundName) break;
      }
    }
    return foundName;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let count = 0;
    if (this.numberOfOffspring > 0) {
      for (const offspring of this.offspring) {
        count += 1 + offspring.totalDescendents;
      }
    }
    return count;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let millenials = [];
    if (this.yearConverted > 1980) {
      millenials.push(this);
    }
    for (const offspring of this.offspring) {
      millenials = millenials.concat(offspring.allMillennialVampires);
    }
    return millenials;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common ancestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common ancestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common ancestor.
  closestCommonAncestor(vampire) {
    let closestAncestor;
    if (this === vampire) {
      closestAncestor = this;
    } else if (this.isMoreSeniorThan(vampire)) {
      closestAncestor = this.closestCommonAncestor(vampire.creator);
    } else {
      closestAncestor = this.creator.closestCommonAncestor(vampire);
    }
    return closestAncestor;
  }
}

module.exports = Vampire;