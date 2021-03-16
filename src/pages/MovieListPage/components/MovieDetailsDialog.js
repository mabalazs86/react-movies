import React, { useState } from "react";
import PropTypes from "prop-types";
import htmlParser from "html-react-parser";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
} from "@material-ui/core";
import { getWikiInfo, getWikiParagraph } from "../../../utils/wiki";
import { getImdbUrlByTitle } from "../../../utils/imdb";

const MovieDetailsDialog = (props) => {
  const { title, isOpen, closeDialog } = props;

  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const getMovieDetails = async () => {
    setLoading(true);
    const [wikiinfo, imdbUrl] = await Promise.all([
      getWikiInfo(title),
      getImdbUrlByTitle(title),
    ]);
    const paragraph = await getWikiParagraph(wikiinfo.pageid);
    setDetails({ wikiinfo, imdbUrl, paragraph });
    setLoading(false);
  };

  const openNewTab = (url) => window.open(url, "_blank");

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={closeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        onEntered={() => !details && getMovieDetails()}
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          {loading && <CircularProgress />}
          {!loading && (
            <DialogContentText id="alert-dialog-description">
              {htmlParser(details?.paragraph || "")}
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary" autoFocus>
            Close
          </Button>
          <Button
            variant="outlined"
            onClick={() => openNewTab(details?.wikiinfo?.url)}
            color="primary"
            disabled={loading}
          >
            Open Wiki
          </Button>
          <Button
            variant="outlined"
            onClick={() => openNewTab(details?.imdbUrl)}
            color="secondary"
            disabled={loading}
          >
            Open IMDB
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

MovieDetailsDialog.propTypes = {
  title: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  closeDialog: PropTypes.func.isRequired,
};

export default MovieDetailsDialog;
