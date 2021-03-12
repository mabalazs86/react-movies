import React, { useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import { Container } from "@material-ui/core";
import SearchComponent from "./components/SearchComponent";
import MovieList from "./components/MovieList";

const MovieFragment = gql`
  fragment MovieFragment on Movie {
    id
    name
    releaseDate
    score
    genres {
      id
      name
    }
  }
`;

const SearchMovieQuery = gql`
  query SearchMovieQuery($query: String!) {
    searchMovies(query: $query) {
      ...MovieFragment
    }
  }
  ${MovieFragment}
`;

const SearchRelatedMovieQuery = gql`
  query SearchRelatedMovieQuery($id: ID!) {
    movie(id: $id) {
      id
      similar {
        ...MovieFragment
      }
    }
  }
  ${MovieFragment}
`;

const MovieListPage = () => {
  const [
    searchMoviesQuery,
    { loading: loadingSearchMoviesQuery, data: dataSearchedMovies },
  ] = useLazyQuery(SearchMovieQuery);

  const [
    searchRelatedMoviesQuery,
    { loading: loadingSearchRelatedMoviesQuery, data: dataRelatedMovies },
  ] = useLazyQuery(SearchRelatedMovieQuery);
  const [relatedMovie, setRelatedMovie] = useState(null);

  const search = async (searchText) => {
    setRelatedMovie(null);
    await searchMoviesQuery({
      variables: { query: searchText },
    });
  };

  const searchRelatedMovies = async (movie) => {
    setRelatedMovie(movie);
    await searchRelatedMoviesQuery({
      variables: {
        id: movie.id,
      },
    });
  };

  const getMovies = () => {
    return relatedMovie
      ? dataRelatedMovies?.movie.similar || []
      : dataSearchedMovies?.searchMovies || [];
  };

  const isLoading = loadingSearchRelatedMoviesQuery || loadingSearchMoviesQuery;

  return (
    <>
      <Container maxWidth="lg">
        <SearchComponent search={search} loading={isLoading} />
        <MovieList
          movies={getMovies()}
          isLoading={isLoading}
          relatedMovie={relatedMovie}
          searchRelatedMovies={searchRelatedMovies}
        />
      </Container>
    </>
  );
};

export default MovieListPage;