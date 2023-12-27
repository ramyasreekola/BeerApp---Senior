import { useEffect, useState } from "react";
import { useFavourites } from "../../contexts/FavouritesContext";
import { fetchData } from "./utils";
import { Beer } from "../../types";
import { Link as RouterLink } from "react-router-dom";
import { Button, Checkbox, Paper, TextField, Link } from "@mui/material";
import styles from "./Home.module.css";
import GradeIcon from "@mui/icons-material/Grade";

const Home = () => {
  const [beerList, setBeerList] = useState<Array<Beer>>([]);
  const { favouritesList } = useFavourites();
// eslint-disable-next-line
  useEffect(fetchData.bind(this, setBeerList), []);
  console.log(beerList)
  return (
    <article>
      <section>
        <main>
        <Paper>
            <div className={styles.listContainer}>
              <div className={styles.listHeader}>
                <h3>Favourite items</h3>
              </div>
              <ul className={styles.list}>
                {favouritesList.map((beer, index) => (
                  <li key={index.toString()}>
                    <GradeIcon />
                    <Link component={RouterLink} to={`/beer/${beer.id}`}>
                      {beer.name}
                    </Link>
                  </li>
                ))}
                {!favouritesList.length && <p>No Favourite items</p>}
              </ul>
            </div>
          </Paper>
        </main>
      </section>
    </article>
  );
};

export default Home;
