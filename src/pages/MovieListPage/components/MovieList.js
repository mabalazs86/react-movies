import React from "react";
import PropTypes from "prop-types";
import { CircularProgress, Grid, Typography } from "@material-ui/core";
import MovieItem from "./MovieItem";

const MovieList = (props) => {
  const {
    movies,
    isLoading,
    isCalled,
    relatedMovie,
    searchRelatedMovies,
  } = props;

  return (
    <>
      {relatedMovie && (
        <Typography variant="h5">
          {`Movies related to "${relatedMovie.name}":`}
        </Typography>
      )}
      <Grid container direction="row" justify="center">
        {isLoading && <CircularProgress />}
        {!isLoading && isCalled && !movies.length && (
          <Typography variant="h5">No results found.</Typography>
        )}
        {!isLoading &&
          !!movies.length &&
          movies.map((movie) => (
            <MovieItem
              movie={movie}
              key={movie.id}
              searchRelatedMovies={searchRelatedMovies}
            />
          ))}
      </Grid>
    </>
  );
};

MovieList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape(MovieItem.propTypes.movie)),
  isLoading: PropTypes.bool,
  isCalled: PropTypes.bool,
  relatedMovie: PropTypes.shape(MovieItem.propTypes.movie),
  searchRelatedMovies: PropTypes.func,
};

export default MovieList;
