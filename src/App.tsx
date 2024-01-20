import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ChampionDetails from "./components/ChampionDetails";
import { ContextProvider } from "./context/Context";

export default function App() {
  return (
    <ContextProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path=":championId" element={<ChampionDetails />} />
      </Routes>
    </ContextProvider>
  );
}
