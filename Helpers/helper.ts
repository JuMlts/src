export function getFirstLetterWithoutCommonWords(title: string): string {
    const commonWords = ["the", "a", "an", "of", "in",]; 
    console.log(title)
    const words = title.toLowerCase().split(" ");
    const filteredWords = words.filter((word) => !commonWords.includes(word));
    
    if (filteredWords.length === 0) {
      return "";
    }
  
    const firstLetter = filteredWords[0].charAt(0).toUpperCase();
 
    return firstLetter;
  }