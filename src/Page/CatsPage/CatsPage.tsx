import { Cats } from "../../components/Cats/Cats.tsx";
import "./CatsPage.css";
import { useAppDispatch, useAppSelector } from "../../hook/redux.ts";
import { CSSProperties, useEffect } from "react";
import { catsActions, getAllCats } from "../../features/catsSlice/catsSlice.ts";
import {
  addCatsFavorite,
  deleteFavoriteCats,
  favoriteActions,
} from "../../features/catsSlice/favoriteSlice.ts";
import { PropagateLoader } from "react-spinners";
const override: CSSProperties = {
  display: "block",
  margin: "35px auto",
  borderColor: "red",
};
export const CatsPage = () => {
  const dispatch = useAppDispatch();
  const allCats = useAppSelector((state) => state.allCats);
  const favorite = useAppSelector((state) => state.favorite);
  const handleSubmitLike = (
    like: boolean,
    id: string,
    favoriteId: number | undefined,
  ) => {
    dispatch(catsActions.changeLike({ like, id }));
    if (favorite.favoriteCats === null) {
      if (like) {
        dispatch(deleteFavoriteCats(favoriteId));
      } else {
        dispatch(addCatsFavorite(id)).then((data) =>
          dispatch(
            catsActions.addFavoriteID({ id: id, favoriteId: data.payload.id }),
          ),
        );
      }
    }
    if (favorite.favoriteCats !== null) {
      if (like) {
        dispatch(deleteFavoriteCats(favoriteId));
        dispatch(favoriteActions.deleteCat(id));
      } else {
        const catFind = allCats.cats.find((cat) => cat.id === id);
        if (!catFind) return;
        dispatch(addCatsFavorite(id))
          .then((data) =>
            dispatch(
              favoriteActions.addCat({
                id: data.payload.id,
                image: { id: catFind.id, url: catFind.url },
              }),
            ),
          )
          .then((data) =>
            dispatch(
              catsActions.addFavoriteID({
                id: catFind.id,
                favoriteId: data.payload.id,
              }),
            ),
          );
      }
    }
  };

  useEffect(() => {
    const fetchCats = async () => {
      await dispatch(getAllCats());
    };
    if (allCats.initialLoading) {
      fetchCats();
    }
  }, []);
  return (
    <div className={"container"}>
      <div className={"cats__content"}>
        {allCats.cats!.map((cat) => (
          <Cats
            key={cat.id}
            url={cat.url}
            id={cat.id}
            favoriteId={cat.favourite.id}
            like={cat.like}
            handleSubmitLike={handleSubmitLike}
            colorLike={cat.like ? "red" : "white"}
          />
        ))}
      </div>
      <div className={"cats__show"}>
        {allCats.loading ? (
          <PropagateLoader
            color={"navy"}
            loading={allCats.loading}
            cssOverride={override}
            size={20}
            aria-label="Loading BeatLoader"
            data-testid="loader"
          />
        ) : (
          <button
            className={"button cats__button-show"}
            onClick={() => {
              dispatch(getAllCats());
            }}
          >
            Показать больше котиков
          </button>
        )}
      </div>
    </div>
  );
};
