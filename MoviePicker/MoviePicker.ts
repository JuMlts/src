import { MemoryMoviePickRepoLocalStorage } from "./MemoryMoviePickRepo";
import { getFirstLetterWithoutCommonWords } from '../Helpers/helper';
export class MoviePicker  {
    private myMoviePickRepo: MemoryMoviePickRepoLocalStorage; 

    constructor(private moviePickRepo: MemoryMoviePickRepoLocalStorage) {
        this.myMoviePickRepo = moviePickRepo; 
    }
    
    async pick(title: string): Promise<void> {
        if (!title) {
          throw new EmptyMovieTitleError("Movie title cannot be empty");
        }
   
        let firstLetter = getFirstLetterWithoutCommonWords(title);
        let isInPicks = await this.moviePickRepo.getByFirstLetter(firstLetter);

        if (title && isInPicks) {
            throw new MoviePickAlreadyExistError("this letter is already used");
        }
        if (title && !isInPicks) {
          this.myMoviePickRepo.put(title);
        }
      }

}

export class EmptyMovieTitleError extends Error {
    constructor(message: string) {
      super(message);
      this.name = "EmptyMovieTitleError";
    }
}

export class MoviePickAlreadyExistError extends Error {
    constructor(message: string) {
      super(message);
      this.name = "EmptyMovieTitleError";
    }
}
