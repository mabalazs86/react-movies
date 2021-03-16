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
    {
      loading: loadingSearchMoviesQuery,
      called: calledSearchMoviesQuery,
      data: dataSearchedMovies,
    },
  ] = useLazyQuery(SearchMovieQuery);

  const [
    searchRelatedMoviesQuery,
    {
      loading: loadingSearchRelatedMoviesQuery,
      called: calledSearchRelatedMoviesQuery,
      data: dataRelatedMovies,
    },
  ] = useLazyQuery(SearchRelatedMovieQuery);
  const [relatedMovie, setRelatedMovie] = useState(null);

  const search = (searchText) => {
    setRelatedMovie(null);
    searchMoviesQuery({
      variables: { query: searchText },
    });
  };

  const searchRelatedMovies = (movie) => {
    setRelatedMovie(movie);
    searchRelatedMoviesQuery({
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
  const isCalled = calledSearchMoviesQuery || calledSearchRelatedMoviesQuery;

  return (
    <>
      <Container maxWidth="lg">
        <SearchComponent search={search} loading={isLoading} />
        <MovieList
          movies={getMovies()}
          isLoading={isLoading}
          isCalled={isCalled}
          relatedMovie={relatedMovie}
          searchRelatedMovies={searchRelatedMovies}
        />
      </Container>
    </>
  );
};

export default MovieListPage;
