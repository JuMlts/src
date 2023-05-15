
/**
 *
 */
export interface MoviePickRepo {
  getByFirstLetter: (firstLetter: string) => Promise<string | null>;
  getAll: () => Promise<string[]>;
  put: (title: string) => Promise<void>;
}
export class MemoryMoviePickRepo implements MoviePickRepo {
  private readonly byFirstLetter = new Map<string, string>();

  async getByFirstLetter(firstLetter: string): Promise<string | null> {
    return this.byFirstLetter.get(firstLetter.toUpperCase()) ?? null;
  }

  async getAll(): Promise<string[]> {
    return [...this.byFirstLetter.values()];
  }

  async put(title: string): Promise<void> {
    if (title.length) {
      this.byFirstLetter.set([...title][0].toUpperCase(), title);
    }
  }
}
MemoryMoviePickRepo