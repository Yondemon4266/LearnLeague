import { Route, Routes, useLocation } from "react-router-dom";
import Home from "../pages/Home";
import ChampionDetails from "./ChampionDetails";
import { AnimatePresence } from "framer-motion";
export default function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path=":championId" element={<ChampionDetails />} />
      </Routes>
    </AnimatePresence>
  );
}
