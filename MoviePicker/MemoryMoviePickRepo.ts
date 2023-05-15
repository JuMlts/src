import { MoviePickRepo } from "./MoviePickRepo";

/**
 *
 */
export class MemoryMoviePickRepo implements MoviePickRepo {
  /**
   *
   */
  private readonly byFirstLetter = new Map<string, string>();

  /**
   *
   */
  constructor() {
    this.put = this.put.bind(this);
  }

  /**
   *
   */
  async getByFirstLetter(firstLetter: string) {
    return this.byFirstLetter.get(firstLetter.toUpperCase()) ?? null;
  }

  /**
   *
   */
  async getAll() {
    return [...this.byFirstLetter.values()];
  }

  /**
   *
   */
  async put(title: string) {
    if (title.length) {
      this.byFirstLetter.set([...title][0].toUpperCase(), title);
    }
  }
}

export class MemoryMoviePickRepoLocalStorage implements MoviePickRepo {
  private readonly byFirstLetter = new Map<string, string>();

  constructor() {
    this.put = this.put.bind(this);
    this.getAll = this.getAll.bind(this);

    this.loadDataFromLocalStorage();
  }

  async getByFirstLetter(firstLetter: string) {
    return this.byFirstLetter.get(firstLetter.toUpperCase()) ?? null;
  }

  async getAll() {
    return [...this.byFirstLetter.values()];
  }

  async put(title: string) {
    if (title.length) {
      this.byFirstLetter.set([...title][0].toUpperCase(), title);
      this.saveDataToLocalStorage(); 
    }
  }

  private loadDataFromLocalStorage() {
    const storedData = localStorage.getItem('moviePickData');
    if (storedData) {
      const parsedData = JSON.parse(storedData) as Record<string, string>;
      this.byFirstLetter.clear();
      for (const [key, value] of Object.entries(parsedData)) {
        this.byFirstLetter.set(key, value);
      }
    }
  }

  private saveDataToLocalStorage() {
    const dataToStore = Object.fromEntries(this.byFirstLetter);
    localStorage.setItem('moviePickData', JSON.stringify(dataToStore));
  }
}
