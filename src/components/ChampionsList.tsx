import { Link } from "react-router-dom";
import Champions from "../assets/fr_FR/champion.json";
import { useMemo, useState } from "react";
import { useApp } from "../context/Context";
import ItemsList from "./ItemsList";
import ItemsInBuild from "./ItemsinBuild";

export default function ChampionsList() {
  const championsData = Champions.data;
  const favorites = useApp();

  const [search, setSearch] = useState("");
  const [displayChoice, setDisplayChoice] = useState("allchampions");
  const [showItems, setShowItems] = useState(false);
  const [champKey, setChampKey] = useState("");
  const [indexItem, setIndexItem] = useState<number>(0);

  const filteredChampions = useMemo(() => {
    if (displayChoice === "allchampions") {
      return Object.entries(championsData)
        .filter(([key]) => key.toLowerCase().includes(search.toLowerCase()))
        .map(([key, value]: any) => (
          <Link
            to={`/${key}`}
            key={value.key}
            state={key}
            className=" max-md:w-20 max-md:h-20"
          >
            <div className="flex flex-col  items-center bg-zinc-800 rounded-lg">
              <img
                src={`./img/champion/${value.image.full}`}
                alt={key}
                className="rounded-lg"
              />

              <h3 className="max-md:text-xs">{key}</h3>
            </div>
          </Link>
        ));
    } else {
      return Object.entries(favorites)
        .filter(([key]) => key.toLowerCase().includes(search.toLowerCase()))
        .map(([key, value]: any) => {
          return (
            <div
              key={value.champion.key}
              className="border-b-2 border-b-gray-400"
            >
              <div className="bg-zinc-800 rounded-lg flex flex-row">
                <Link to={`/${key}`} state={key} className="">
                  <div className="flex flex-col items-center w-full">
                    <img
                      src={`./img/champion/${value.champion.image.full}`}
                      alt={key}
                      className="rounded-lg max-md:h-12 max-md:w-12"
                    />
                    <h3 className="max-md:text-xs">{key}</h3>
                  </div>
                </Link>
                {/* BUILD START */}
                <div className="flex flex-row items-center flex-wrap max-md:flex-wrap max-md: gap-y-2 max-md:pb-2">
                  {/* ITERER A TRAVERS LE BUILD PERSO */}
                  <ItemsInBuild
                    keyHero={key}
                    setChampKey={setChampKey}
                    setShowItems={setShowItems}
                    value={value}
                    setIndexItem={setIndexItem}
                  />
                </div>
                {/* BUILD END */}
              </div>
            </div>
          );
        });
    }
  }, [displayChoice, search, championsData, favorites]);

  return (
    <div className="z-50 flex flex-col justify-end items-center w-screen h-screen text-gray-200 font-mono font-semibold caret-transparent">
      <img
        src="./img/logo.png"
        alt="logo"
        className="h-32 w-64 absolute top-10 max-md:h-14 max-md:w-32 max-md:top-6 logo"
      />
      <input
        type="search"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        className="outline-none bg-zinc-800 leading-8 rounded-lg p-3 caret-white w-64 text-center max-sm:text-xs max-md:text-sm"
        placeholder="Chercher un champion..."
      />
      <div className="flex gap-6 mt-3 bg-zinc-800 py-2 px-4 rounded-t-xl ">
        <button
          className={`cursor-pointer hover:text-gray-300 max-md:text-sm max-sm:text-xs ${
            displayChoice === "allchampions"
              ? "text-red-600 hover:text-red-800"
              : ""
          }`}
          onClick={() =>
            setDisplayChoice((prev) => {
              if (prev === "allchampions") return prev;
              return "allchampions";
            })
          }
        >
          Tous les champions
        </button>
        <button
          className={`cursor-pointer hover:text-gray-300  max-md:text-sm max-sm:text-xs ${
            displayChoice === "favoritechampions"
              ? "text-red-600 hover:text-red-800"
              : ""
          }`}
          onClick={() =>
            setDisplayChoice((prev) => {
              if (prev === "favoritechampions") return prev;
              return "favoritechampions";
            })
          }
        >
          Mes champions favoris
        </button>
      </div>
      <div
        className={`flex max-md:h-52 ${
          displayChoice === "allchampions"
            ? "flex-row  flex-wrap items-center justify-center gap-2 max-md:gap-y-5 championslist"
            : "flex-col"
        }  h-80 overflow-auto mb-4 `}
      >
        {filteredChampions}
      </div>
      {showItems && (
        <div
          className="absolute w-1/2 h-1/2 max-md:w-5/6 bottom-1/3 mb-20 flex flex-col  bg-zinc-800 z-20 rounded-xl overflow-y-scroll border-zinc-800 max-md:h-1/3"
          style={{ borderBottom: "20px solid rgb(39, 39, 42)" }}
        >
          <ItemsList
            setShowItems={setShowItems}
            champKey={champKey}
            indexItem={indexItem}
          />
        </div>
      )}
    </div>
  );
}
