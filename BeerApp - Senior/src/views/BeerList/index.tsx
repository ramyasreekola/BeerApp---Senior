import React, { useEffect, useState } from "react";
import { Beer } from "../../types";
import { fetchData } from "./utils";
import {
  Avatar,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  Pagination,
  Button,
} from "@mui/material";
import SportsBar from "@mui/icons-material/SportsBar";
import { useNavigate } from "react-router-dom";
import "./beerList.css";
import { TextField, Box } from "@mui/material";

const BeerList = () => {
  const navigate = useNavigate();
  const [beerList, setBeerList] = useState<Array<Beer>>([]);
  const [filteredBeerList, setFilteredBeerList] = useState<Beer[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortCriteria, setSortCriteria] = useState<"name" | "type" | null>(null);
  const itemsPerPage = 5; 

  useEffect(() => {
    fetchData({ setData: setBeerList, sort: sortCriteria });

  }, [sortCriteria]);

  useEffect(() => {
    // Filter beers based on search term
    const filteredBeers = beerList.filter((beer) =>
      beer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBeerList(filteredBeers);
    setCurrentPage(1); // Reset to the first page when search term changes
  }, [beerList, searchTerm]);

  const onBeerClick = (id: string) => navigate(`/beer/${id}`);

  const indexOfLastBeer = currentPage * itemsPerPage;
  const indexOfFirstBeer = indexOfLastBeer - itemsPerPage;
  const currentBeers = filteredBeerList.slice(indexOfFirstBeer, indexOfLastBeer);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const handleSort = (criteria: "name" | "type" | null) => {
    setSortCriteria(criteria);
  };

  return (
    <article>
      <section>
        <header>
          <h1>BeerList page</h1>
        </header>
        <main>
          <TextField
            label="Filter By Name.."
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <Box marginTop={2} marginBottom={2}>
            <Button onClick={() => handleSort("name")}>Sort by Name</Button>
            <Button onClick={() => handleSort("type")}>Sort by Type</Button>
            <Button onClick={() => handleSort(null)}>Clear Sorting</Button>
          </Box>

          <List>
            {currentBeers.map((beer) => (
              <ListItemButton
                key={beer.id}
                onClick={() => onBeerClick(beer.id)}
              >
                <ListItemAvatar>
                  <Avatar>
                    <SportsBar />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={beer.name}
                  secondary={beer.brewery_type}
                />
              </ListItemButton>
            ))}
          </List>

          {/* Pagination */}
          <Stack spacing={2} direction="row" justifyContent="center">
            <Pagination
              count={Math.ceil(filteredBeerList.length / itemsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
            />
          </Stack>
        </main>
      </section>
    </article>
  );
};

export default BeerList;
