import { Route, Routes } from "react-router-dom";
import { Layout } from "../../components/Layout/Layout.tsx";
import { CatsPage } from "../CatsPage/CatsPage.tsx";
import { FavoritePage } from "../FavoritePage/FavoritePage.tsx";

export const RoutPage = () => {
  return (
    <div>
      <Routes>
        <Route path={"/"} element={<Layout />}>
          <Route index element={<CatsPage />} />
          <Route path={"like"} element={<FavoritePage />} />
        </Route>
      </Routes>
    </div>
  );
};
