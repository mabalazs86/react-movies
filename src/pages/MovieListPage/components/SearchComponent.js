import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, TextField } from "@material-ui/core";

const SearchComponent = (props) => {
  const { search, loading } = props;

  const [searchText, setSearchText] = useState("");

  const submit = async (event) => {
    event.preventDefault();
    await search(searchText.trim());
  };

  const SubmitButton = () => (
    <Button
      variant="contained"
      color="primary"
      type="submit"
      disabled={loading || !searchText.trim()}
    >
      Search
    </Button>
  );

  return (
    <Box m={4}>
      <form noValidate autoComplete="off" onSubmit={submit}>
        <TextField
          fullWidth
          variant="outlined"
          color="primary"
          label="Movie search"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          InputProps={{
            endAdornment: <SubmitButton />,
          }}
        />
      </form>
    </Box>
  );
};

SearchComponent.propTypes = {
  search: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default SearchComponent;
