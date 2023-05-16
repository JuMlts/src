import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { MoviePickRepo } from '../MoviePicker/MoviePickRepo';

type AlphaListProps = {
  openList: boolean;
  moviePickerRepo: MoviePickRepo;

};

const AlphaList: React.FC<AlphaListProps> = ({ openList, moviePickerRepo }) => {
  const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
  const [allPicks, setAllPicks] = useState<string[]>([]);
  const [moviePicksByLetter, setMoviePicksByLetter] = useState<Record<string, string[]>>({});

  useEffect(() => {
    const getAllPicks = async () => {
      const updatedMoviePicksByLetter: Record<string, string[]> = {};

      for (const letter of alphabet) {
        const moviePick = await moviePickerRepo.getByFirstLetter(letter);
        if (moviePick) {
          if (!updatedMoviePicksByLetter[letter]) {
            updatedMoviePicksByLetter[letter] = [];
          }
          updatedMoviePicksByLetter[letter].push(moviePick);
        }
      }

      setMoviePicksByLetter(updatedMoviePicksByLetter);
    };

    if (moviePickerRepo) {
      getAllPicks();
    }
  }, [moviePickerRepo]);

  return (
    <div style={{ position: 'relative' }}>
      {openList && (
        <List className='list' sx={{ position: 'absolute', top: 0, right: '100%', zIndex: 1 }}>
          {alphabet.map((letter) => (
            <ListItem key={letter}>
              <ListItemIcon className='list-icon'>
                <span>{letter}</span>
              </ListItemIcon>
              <ListItemText>
                <Typography variant="body1">
                  {moviePicksByLetter[letter]?.map((pick) => (
                    <div key={pick}>{pick}</div>
                  ))}
                </Typography>
              </ListItemText>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default AlphaList;
