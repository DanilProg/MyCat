import { Cats } from "../../components/Cats/Cats.tsx";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hook/redux.ts";
import {
  deleteFavoriteCats,
  favoriteActions,
  getFavoriteCats,
} from "../../features/catsSlice/favoriteSlice.ts";
import { catsActions } from "../../features/catsSlice/catsSlice.ts";

export const FavoritePage = () => {
  const dispatch = useAppDispatch();
  const favorite = useAppSelector((state) => state.favorite);
  const allCats = useAppSelector((state) => state.allCats);
  const handleSubmitLike = (
    like: boolean,
    id: string,
    favoriteId: number | undefined,
  ) => {
    if (allCats.cats !== null) {
      dispatch(catsActions.changeLike({ like, id }));
    }
    dispatch(deleteFavoriteCats(favoriteId));
    dispatch(favoriteActions.deleteCat(id));
  };
  useEffect(() => {
    const fetchFavorite = () => {
      dispatch(getFavoriteCats());
    };
    if (favorite.favoriteCats === null) {
      fetchFavorite();
    }
  }, [dispatch]);
  return (
    <div className={"container"}>
      {favorite.loading && <h1>Загрузка</h1>}

      <div className={"cats__content"}>
        {!favorite.loading &&
          favorite.favoriteCats!.map((cat) => (
            <Cats
              colorLike={"red"}
              url={cat.image.url}
              favoriteId={cat.id}
              like={!!cat.id}
              id={cat.image.id}
              key={cat.image.id}
              handleSubmitLike={handleSubmitLike}
            />
          ))}
      </div>
    </div>
  );
};
