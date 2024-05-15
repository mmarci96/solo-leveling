import { useEffect, useState } from "react";
import Details from "../../../components/contextDetail/Details"
import { useGlobalContext } from "../../../context/global"

const AnimeItem = async () => {
  const {data} = await useGlobalContext();
  const [animeItem, setAnimeItem] = useState(null);

  useEffect(() => {
    setAnimeItem(data);
    if (animeItem){
      console.log(animeItem)
    }   
  }, [data])

  return (
    <div>
      <p>hi</p>
    </div>
  )
}
export default AnimeItem