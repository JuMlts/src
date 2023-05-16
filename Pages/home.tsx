import React, { useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { getMovie, getMovieDetails } from "../Service/Omdb";
import { Movie } from "../Types/Movie";
import { makeStyles } from '@material-ui/core/styles';
import Logo from "../Assets/Images/fontbolt.png";
import './home.css';
import { AiOutlineSearch } from "react-icons/Ai"
import classnames from 'classnames';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { useDispatch, useSelector } from 'react-redux';
import { setMovies, selectMovies, resetMovies, removeMovie } from "../Redux/moviesSlice";
import { setOpen, selectOpen } from '../Redux/openSlice';
import { selectActiveMovie, setActiveMovie } from '../Redux/activeMovieSlice';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import AlphaList from '../Components/list';
import { MoviePicker } from '../MoviePicker/MoviePicker';
import { Modal, Button } from '@mantine/core';
import { LoadingOverlay } from '@mantine/core';
import { MemoryMoviePickRepoLocalStorage } from "../MoviePicker/MemoryMoviePickRepo";
import { getFirstLetterWithoutCommonWords } from '../Helpers/helper';
import { selectLoading, setLoading } from '../Redux/loaderSlice';
import { MovieDetailsTable } from '../Components/movieDetails';
import MovieDetails from '../Types/MovieDetails';

const useStyles = makeStyles({

    searchContainer: {
        margin: '0 auto',
        color: "#FFFFFF",
        marginLeft: "6%",
        position: 'relative',
        marginTop: "1.5%",
        width: 0,
        height: '40%',
        overflow: 'hidden',
        boxSizing: "border-box",
        border: `0px solid #000000`,
        borderRadius: "4px",
        transition: 'all 0.2s ease-in-out',
        '&.active': {
            width: '20%',
            border: `1px solid #FFFFFF`,
        },
    },

    active: {
        width: '20%',
        transition: 'all 0.2s ease-in-out',
        border: `1px solid #FFFFFF`,
    },

    textField: {
        width: "100%",
        height: '100%',
        color: '#FFFFFF',
        '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
                borderColor: 'transparent !important',
                boxShadow: 'none !important',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'transparent !important',
                boxShadow: 'none !important',
            },
        },
        paddingLeft: '15px',

    },
});

const Home = () => {

    const dispatch = useDispatch();
    const [movieName, setMovieName] = useState('');
    const movies = useSelector(selectMovies);
    const [isSearching, setIsSearching] = useState(false);
    const activeMovie = useSelector(selectActiveMovie);
    const classes = useStyles();
    const header = document.getElementById("header");
    const open = useSelector(selectOpen);
    const [openList, setOpenList] = useState(false);
    const repo = new MemoryMoviePickRepoLocalStorage();
    const [openModal, setOpenModal] = useState(false);
    const moviePicker = new MoviePicker(repo);
    const [alertMessage, setAlertMessage] = useState("");
    const [openModalOver, setOpenModalOver] = useState(false);
    const loading = useSelector(selectLoading);

    window.addEventListener("scroll", function () {
        if (header) {
            if (window.scrollY > 0) {
                header.style.backgroundColor = "rgba(0, 0, 0, 1)";

            } else {
                header.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
            }
        }
    });

    useEffect(() => {
        if (loading === true) {
            dispatch(setLoading(false));
        }
    }, [movies, activeMovie])

    const handleSearch = async () => {
        dispatch(setOpen(false));
        dispatch(setLoading(true));
        const moviesTmp = await getMovie(movieName);
        if (movies) {
            if (moviesTmp !== undefined) {
                resetMovies();
                dispatch(setMovies(moviesTmp as Movie[]));
            } else {
                console.error("Search results not found");
                setOpenModal(true);
                setAlertMessage("Aucun résultat n'a été trouvé")
                dispatch(setLoading(false));
            }
        }
        else {
            if (moviesTmp !== undefined) {
                dispatch(setMovies(moviesTmp as Movie[]));
            } else {
                setOpenModal(true);
                setAlertMessage("Aucun résultat n'a été trouvé")
                dispatch(setLoading(false));
            }
        }

    }

    const handleClickActiveMoive = async (movieId: number) => {
        dispatch(setLoading(true));
        const movie = await getMovieDetails(movieId) as MovieDetails;
        dispatch(setActiveMovie(movie))
        dispatch(setOpen(true));
    }

    const handleSearchBlur = () => {
        setIsSearching(false);
    };

    const handleSearchClick = () => {
        if (isSearching === false) {
            setIsSearching(true);
        }
        else {
            handleSearch();
        }
    }

    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter') {
            handleSearch();
            setIsSearching(false);
        }
    };

    const handleOverwrite = (title: any) => {
        setOpenModalOver(false);
        repo.put(title);
    }

    return (
        <div className='container'>
            <div id='header'>
                <div className='logo-container'>
                    <img className='logo' src={Logo} />
                </div>
                <div
                    className='search-icon'
                    onClick={handleSearchClick}

                >
                    <AiOutlineSearch
                        size={25}
                        color="#FFFFFF"
                    />
                </div>

                <div className={classnames(classes.searchContainer, { [classes.active]: isSearching })}>

                    <div>
                        <TextField
                            color="primary"
                            disabled={false}
                            value={movieName}
                            className={classes.textField}
                            onBlur={handleSearchBlur}
                            InputProps={{
                                inputProps: {
                                    style: {
                                        color: '#FFFFFF',
                                        paddingLeft: '10%',
                                        paddingTop: "2.5%",
                                        width: "100%",
                                        height: "30%",
                                    },
                                    placeholder: "Search",
                                },
                            }}

                            onChange={(e: any) => {
                                setMovieName(e.target.value)
                            }}
                            onKeyDown={(event: any) => {
                                handleKeyDown(event);
                            }}
                        />
                    </div>
                </div>
                <div className='menu' onClick={() => { setOpenList(!openList) }}>
                    <p className='menu-text'> Mes alphabest </p>
                    <MdOutlineKeyboardArrowDown size={30} className='menu-arrow ' />
                </div>
                <div className='list-container'>
                    {openList &&
                        <AlphaList openList={openList} moviePickerRepo={repo} />
                    }
                </div>
            </div>

            <div>
                {loading &&
                    <LoadingOverlay
                        loaderProps={{ size: 'sm', color: 'red' }}
                        overlayOpacity={0.6}
                        overlayColor="#000000"
                        visible
                    />
                }
                <Modal
                    opened={openModal}
                    centered
                    onClose={() => setOpenModal(false)}
                    title="Oups..."
                    transitionProps={{ transition: 'fade', duration: 200 }}
                >
                    {alertMessage}
                </Modal>
                <Modal
                    opened={openModalOver}
                    centered
                    onClose={() => setOpenModalOver(false)}
                    title="Oups..."
                    transitionProps={{ transition: 'fade', duration: 200 }}
                >
                    Un élément à déja été enregistré pour cette lettre, voulez vous quand même enregistrer cet élément ?
                    <div>
                        <Button className='btn-modal' onClick={() => handleOverwrite(activeMovie?.title)}>
                            Oui
                        </Button>
                        <Button className='btn-modal' onClick={() => setOpenModalOver(false)}>
                            Non
                        </Button>
                    </div>
                </Modal>
                {movies && !open &&
                    <TableContainer className='table-container' component={Paper}>
                        <Table className='table' sx={{ minWidth: 650, position: 'relative' }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell align="left"> Titre </TableCell>
                                    <TableCell align="left"> Genre </TableCell>
                                    <TableCell align="left"> Date de sortie </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {movies && movies.map((movie) => (
                                    <TableRow key={movie.imdbID}>
                                        <TableCell component="th" scope="row">
                                            <img className="poster" src={movie.poster ? movie.poster : ""} onClick={() => handleClickActiveMoive(movie.imdbID)} />
                                        </TableCell>
                                        <TableCell align="left"> {movie.title} </TableCell>
                                        <TableCell align="left"> {movie.type} </TableCell>
                                        <TableCell align="left"> {movie.year} </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                };

                {!movies && !open &&
                    <div className='empty-container'>
                        <p className='empty-text'>
                            Rerchez un film ou une série...
                        </p>
                    </div>
                }
                {activeMovie && open &&
                    <MovieDetailsTable 
                        activeMovie={activeMovie}
                        repo={repo}
                        moviePicker={moviePicker}
                        setAlertMessage={setAlertMessage}
                        setOpenModalOver={setOpenModalOver}
                        setOpen={setOpen}
                    />
                }

            </div>
        </div>
    );
};

export default Home;