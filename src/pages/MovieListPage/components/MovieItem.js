import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import moment from "moment";
import MovieDetailsDialog from "./MovieDetailsDialog";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    maxWidth: 500,
    margin: theme.spacing(2),
    transition: "0.3s",
    boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
    "&:hover": {
      boxShadow: "0 3px 6px rgba(0,0,0,0.16)",
    },
  },
  title: {
    marginBottom: theme.spacing(1),
    "&:hover": {
      color: theme.palette.secondary.main,
    },
    cursor: "pointer",
  },
  chip: {
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  footer: {
    margin: theme.spacing(1),
  },
}));

const MovieItem = (props) => {
  const { movie, searchRelatedMovies } = props;

  const classes = useStyles();
  const [isOpenDetailsDialog, setIsOpenDetailsDialog] = useState(false);

  const openDetailsPopup = () => setIsOpenDetailsDialog(true);
  const closeDetailsPopup = () => setIsOpenDetailsDialog(false);

  return (
    <>
      <Grid item>
        <Card className={classes.root}>
          <CardContent>
            <Typography
              variant="h5"
              className={classes.title}
              onClick={() => openDetailsPopup()}
            >
              {movie.name}
            </Typography>
            <Grid container direction="row" justify="space-between">
              <Grid>
                <Typography variant="h5">
                  <StarBorderIcon color="secondary" fontSize="inherit" />
                  {movie.score}
                </Typography>
              </Grid>
              <Grid>
                <Typography variant="subtitle1">
                  {moment(movie.releaseDate).format("YYYY")}
                </Typography>
              </Grid>
            </Grid>
            {movie.genres.map((genre) => (
              <Chip
                key={genre.id}
                variant="outlined"
                label={genre.name}
                className={classes.chip}
              />
            ))}
          </CardContent>
          <CardActions className={classes.footer}>
            <Button
              size="small"
              variant="outlined"
              color="secondary"
              onClick={() => openDetailsPopup()}
            >
              Get details
            </Button>
            <Button
              size="small"
              variant="outlined"
              color="primary"
              onClick={() => searchRelatedMovies(movie)}
            >
              Get related Movies
            </Button>
          </CardActions>
        </Card>
      </Grid>
      <MovieDetailsDialog
        title={movie.name}
        isOpen={isOpenDetailsDialog}
        closeDialog={() => closeDetailsPopup()}
      />
    </>
  );
};

MovieItem.propTypes = {
  movie: PropTypes.shape({
    name: PropTypes.string,
    score: PropTypes.number,
    releaseDate: PropTypes.string,
    genres: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
      })
    ),
  }).isRequired,
  searchRelatedMovies: PropTypes.func,
};

export default MovieItem;
