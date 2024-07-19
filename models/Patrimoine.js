export default class Patrimoine {
  constructor(possesseur, date, possessions) {
    this.possesseur = possesseur;
    this.date = date;
    this.possessions = [...possessions]; // [Possession, Possession, ...]
  }
  getValeur(date) {
    let result = 0;
    for (const possession of this.possessions) {
      result += possession.valeur;
    }
    return result;
  }
  addPossession(possession) {
    if (possession.possesseur != this.possesseur) {
      console.log(
        `${possession.libelle} n'appartient pas à ${this.possesseur}`,
      );
    } else {
      this.possessions.push(possession);
    }
  }
  removePossession(possession) {
    this.possessions = this.possessions.filter(
      (p) => p.libelle !== possession.libelle,
    );
  }
}
