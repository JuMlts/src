import React, { useEffect } from 'react';
import MovieDetails from '../Types/MovieDetails';
import { RiAddCircleLine } from "react-icons/ri";
import { BsArrowLeftSquare } from "react-icons/bs";
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

type MovieDetailsProps = {
    activeMovie: MovieDetails;
    setOpen: ActionCreatorWithPayload<boolean, "open/setOpen">;
    addToFavorites:(title: string) => void;
};

export const MovieDetailsTable: React.FC<MovieDetailsProps> = ({
    activeMovie, setOpen, addToFavorites
}) => {
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(setOpen(false));
    };
    return (
        <div className='movie-details'>
            <BsArrowLeftSquare className='back-icon' size={30} onClick={handleClose} />
            <div className="details-container">
                <img className='poster-in-card ' src={activeMovie.poster} />
                <div className='text-container'>
                    {activeMovie.title !== "N/A" &&
                        <div>
                            <p className='movie-details-title'> Titre : </p>
                            <p className='movie-details-text'> {activeMovie.title} </p>
                        </div>
                    }
                    {activeMovie.plot !== "N/A" &&
                        <div>
                            <p className='movie-details-title'> Synopsis : </p>
                            <p className='movie-details-text'> {activeMovie.plot} </p>
                        </div>
                    }
                    {activeMovie.actors !== "N/A" &&
                        <div>
                            <p className='movie-details-title'> Acteurs : </p>
                            <p className='movie-details-text'> {activeMovie.actors} </p>
                        </div>
                    }
                    {activeMovie.year !== "N/A" &&
                        <div>
                            <p className='movie-details-title'> {activeMovie.type !== "series" ? "Année de sortie : " : "Année de diffusion : "}</p>
                            <p className='movie-details-text'> {activeMovie.year} </p>
                        </div>
                    }
                    {activeMovie.type !== "N/A" &&
                        <div>
                            <p className='movie-details-title'> Type : </p>
                            <p className='movie-details-text'> {activeMovie.type} </p>
                        </div>
                    }
                    <div className='add-icon-container'>
                        <p className='movie-details-title '>
                            Ajouter ce film à mes favoris
                        </p>
                        <div className='add-icon' onClick={() => addToFavorites(activeMovie.title)}>
                            <RiAddCircleLine
                                size={30}
                            />
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

