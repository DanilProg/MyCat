import { Like } from "../../Page/CatsPage/Like.tsx";
import "./Cats.css";
interface ICats {
  url: string;
  id: string;
  favoriteId: number | undefined;
  handleSubmitLike: (
    like: boolean,
    id: string,
    favoriteId: number | undefined,
  ) => void;
  colorLike: "white" | "red";
  like: boolean;
}
export const Cats = ({
  url,
  id,
  handleSubmitLike,
  colorLike,
  favoriteId,
  like,
}: ICats) => {
  return (
    <div className={"cats"}>
      <img src={url} alt={"Котик"} className={"cats__img"} />
      <span
        className={"cats__like"}
        onClick={() => handleSubmitLike(like, id, favoriteId)}
      >
        <Like fill={colorLike} />
      </span>
    </div>
  );
};
