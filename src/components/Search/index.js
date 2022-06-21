import React, { useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  connectHits,
  connectSearchBox,
} from "react-instantsearch-dom";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Input from "@mui/material/Input";

const HitsContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  top: 13.5%;
  width: 25rem;
  padding: 16px;
  border-radius: var(--p-border-radius);
  box-shadow: 0px 6px 20px rgb(0 0 0 / 20%) !important;
  z-index: 10;
  background-color: white;
`;

const {
  REACT_APP_ALGOLIA_APP_ID,
  REACT_APP_ALGOLIA_API_KEY,
  REACT_APP_ALGOLIA_SEARCH_INDEX,
} = process.env;

const SearchBar = () => {
  const searchInputRef = useRef(null);
  const history = useHistory();

  useEffect(() => {
    searchInputRef.current.focus();
  }, []);

  const Hits = ({ hits }) => {
    return (
      <>
        {hits.length > 0 ? (
          <HitsContainer>
            {hits.map((hit) => (
              // <Link key={hit.objectID} to={`/${hit.objectID}`}>
              <div style={{ backgroundColor: "red", minWidth: "20rem" }}>
                {hit.post_title}
              </div>
              // </Link>
            ))}
          </HitsContainer>
        ) : undefined}
      </>
    );
  };

  const CustomHits = connectHits(Hits);

  const SearchBox = ({ currentRefinement, refine }) => (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Input
        className="ais-SearchBox-input"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        maxLength={512}
        type="search"
        value={currentRefinement}
        onChange={(event) => refine(event.currentTarget.value)}
        id="input-with-icon-adornment"
        variant="filled"
        startAdornment={
          <InputAdornment
            sx={{
              backgroundColor: "var(--p-color)",
              height: "100%",
              borderRadius: 1.1,
              padding: 1,
              marginRight: 1,
            }}
          >
            <SearchIcon style={{ fontSize: 18, color: "white" }} />
          </InputAdornment>
        }
        placeholder="Search for a collection"
        ref={searchInputRef}
        sx={{
          backgroundColor: "white",
          // boxShadow:
          //   "0px 1px 2px rgb(0 0 0 / 8%), 0px 4px 12px rgb(0 0 0 / 5%) !important",
          borderRadius: "var(--p-border-radius)",
          p: 0.75,
          minWidth: 300,
          width: "95%",
          border: "var(--p-border)",
          fontFamily: "F-Medium",
          fontSize: 14,
          transition: "0.2s ease !important",
          "&:hover": {
            boxShadow:
              "0px 1px 10px rgb(0 0 0 / 10%), 0px 4px 12px rgb(0 0 0 / 5%) !important",
          },
        }}
        disableUnderline={true}
      />
    </Box>
  );

  const CustomSearchBox = connectSearchBox(SearchBox);

  const algoliaClient = algoliasearch(
    REACT_APP_ALGOLIA_APP_ID,
    REACT_APP_ALGOLIA_API_KEY
  );

  const searchClient = {
    search(requests) {
      if (requests[0].params.query === "") {
        return [];
      }
      return algoliaClient.search(requests);
    },
  };

  return (
    <InstantSearch
      indexName={REACT_APP_ALGOLIA_SEARCH_INDEX}
      searchClient={searchClient}
    >
      <CustomSearchBox />
      <CustomHits />
    </InstantSearch>
  );
};

export default SearchBar;
