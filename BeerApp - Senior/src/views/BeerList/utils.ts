import { Beer } from "../../types";
import handle from "../../utils/error";

export const fetchData = async ({
  setData,
  sort,
}: {
  setData: (data: Array<Beer>) => void;
  sort: string | null;
}) => {
  try {
    const response = await fetch(
      `https://api.openbrewerydb.org/v1/breweries?sort=${sort}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    setData(data);
  } catch (error) {
    handle(error);
  }
};
