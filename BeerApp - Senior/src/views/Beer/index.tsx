import { useEffect, useState } from "react";
import { useFavourites } from "../../contexts/FavouritesContext";
import { Beer as IBeer } from "../../types";
import { fetchData } from "./utils";
import { useParams } from "react-router-dom";
import PhoneIcon from "@mui/icons-material/Phone";

import "./beer.css";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";

const Beer = () => {
  const { id } = useParams();
  const [beer, setBeer] = useState<IBeer>();
  const { favouritesList, toggleFavourite } = useFavourites();
  // check favouritesList for beer.name and set isInFavourites to true if it exists
  const [isInFavourites, setIsInFavourites] = useState(false);


console.log(favouritesList)
  useEffect(() => {
    fetchData(setBeer, id);
  }, [id]);
 
  const handleFavourites = () => {
    setIsInFavourites((prev) => !prev);
    if (beer) {
      console.log((beer.id))
      toggleFavourite({ ...beer, id: beer.id });
    }
  };
  useEffect(() => {
    beer &&
      setIsInFavourites(
        favouritesList.some((item) => item.id === beer?.id)
      );
  }, [favouritesList, beer]);

  
  return (
    <article className="beer-container">
      <section>
        <header>
          <h1>{beer?.name}</h1>
        </header>
        <section className="brewery-info">
          <div>
            <span>
              <b>Brewery Type: </b> {beer?.brewery_type}
            </span>
            <br />
            <span>{beer?.address_1}</span>
            <br />
            {beer?.address_2 && (
              <>
                {" "}
                <span>{beer?.address_2}</span> <br />
              </>
            )}
            {beer?.address_3 && (
              <>
                {" "}
                <span>{beer?.address_3}</span> <br />
              </>
            )}
            <span>
              {beer?.city}, {beer?.state_province}
            </span>
            <span> {beer?.postal_code}</span>
            <br />
            <span>{beer?.country}</span>
            <br />
            <br></br>
            <span>
              <PhoneIcon /> {beer?.phone}
            </span>
            <br />

            <span>
              <a href={beer?.website_url}>{beer?.website_url}</a>
            </span>
            <button onClick={handleFavourites}>
              <StarBorderRoundedIcon />
              {isInFavourites ? "Remove from Favourites" : "Add to Favourites"}
            </button>
          </div>
        </section>
      </section>
    </article>
  );
};

export default Beer;
