import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { ColorFunction } from "../utility/ColorFunction";
import Tag from "./Tag";
import { TruncateText } from "../utility/TruncateText";
import { useApp, useAppUpdateFavoriteChampions } from "../context/Context";

export default function ChampionDetails() {
  const state = useLocation();
  const champId: string = state.state;

  const [championData, setChampionData] = useState<any>(null);
  const [currentSkin, setCurrentSkin] = useState<number>(0);
  const [spell, setSpell] = useState("passive");

  const favorites = useApp();
  const addRemoveChampions = useAppUpdateFavoriteChampions();
  const navigation = useNavigate();

  useEffect(() => {
    const fetchChampionData = async () => {
      try {
        const champion = await import(
          `../assets/fr_FR/champion/${champId}.json`
        );
        setChampionData(champion.data[champId]);
      } catch (error) {
        console.error(
          "Erreur lors de l'import du fichier champion :",
          champId,
          error
        );
      }
    };

    fetchChampionData();
  }, [champId]);

  const handleSkinClick = (skinNumber: any) => {
    setCurrentSkin(skinNumber);
  };

  const handleSpell = (spellId: string) => {
    setSpell(spellId);
  };

  if (!championData) {
    return <div>loading</div>;
  } else {
    return (
      <div
        className=" text-white w-screen h-screen bg-fixed overflow-x-hidden caret-transparent transition-fade"
        style={{
          background: `url(./bigImg/champion/splash/${champId}_${currentSkin}.jpg) center/cover`,
        }}
      >
        {/* Image */}
        <BiArrowBack
          size={36}
          className="fixed top-10 left-10 cursor-pointer bg-black/50 rounded-full"
          onClick={() => navigation("..")}
          style={{ zIndex: 1000 }}
        />
        <button
          type="button"
          className={`absolute top-10 right-16 cursor-pointer z-30 max-md:p-3 max-md:text-xs max-md:right-4 ${
            Object.keys(favorites).includes(championData.id)
              ? "bg-red-600/[.50]"
              : " bg-red-600/[.90]"
          } outline-none p-3 rounded-xl font-semibold font-mono transition-all duration-300 hover:text-gray-400
          `}
          onClick={() => addRemoveChampions(championData.id, championData)}
        >
          {Object.keys(favorites).includes(championData.id)
            ? "Ajouté !"
            : "Ajouter aux favoris"}
        </button>
        <div className="relative w-screen h-screen flex flex-row items-center justify-between max-md:flex-col champdetails">
          {/* Start Carousel */}
          <div className="px-12 my-5 items-center max-md:px-1 max-md:self-start max-md:mt-24 carousel">
            <ul
              className=" flex flex-col gap-y-2 items-center overflow-y-auto p-3"
              style={{ maxHeight: "600px" }}
            >
              {championData.skins.map((skin: any) => (
                <li
                  key={skin.id}
                  onClick={() => handleSkinClick(skin.num)}
                  className="cursor-pointer bg-zinc-800 rounded-lg"
                >
                  <img
                    src={`./bigImg/champion/splash/${champId}_${skin.num}.jpg`}
                    alt={skin.name}
                    className={` max-w-48 max-h-28 max-md:max-h-16 max-md:max-w-24 rounded-lg ${
                      currentSkin === skin.num
                        ? `shadow-2xl border-2 border-indigo-500 ${ColorFunction(
                            championData.tags
                          )} `
                        : ""
                    }`}
                  />
                  <h3 className="text-center max-md:text-xs px-2">
                    {skin.name === "default"
                      ? championData.name
                      : TruncateText(skin.name)}
                  </h3>
                </li>
              ))}
            </ul>
          </div>
          {/* Champion Details */}
          <div className=" ml-28 max-w-lg bg-zinc-900/[.40] rounded-lg p-5 max-md:ml-0 max-md:max-w-md max-sm:max-w-xs">
            <div className="flex flex-col gap-y-3">
              <h3 className="text-3xl font-semibold max-lg:text-2xl">
                {championData.name}
              </h3>
              <h4 className="text-md font-semibold">{championData.title}</h4>
              <ul className="flex flex-row gap-x-2 text-sm">
                {championData.tags.map((tag: string, index: number) => (
                  <Tag key={index} tag={tag} />
                ))}
              </ul>
              <p
                className="overflow-y-auto max-h-36 p-2 break-words font-light max-md:max-h-20 max-md:text-sm"
                style={{ wordSpacing: "1px" }}
              >
                {championData.lore}
              </p>
              {/* spells start */}
              <div>
                <div className="flex items-center py-4 justify-evenly max-md:py-2">
                  <div className="relative">
                    <img
                      src={`./img/passive/${championData.passive.image.full}`}
                      alt=""
                      className={`w-14 h-14 rounded-md cursor-pointer max-md:w-10 max-md:h-10 ${
                        spell === "passive"
                          ? "border-2 border-violet-600 shadow-xl shadow-violet-600"
                          : ""
                      }`}
                      onClick={() => handleSpell("passive")}
                    />
                    <p className="font-light text-sm absolute -bottom-5 left-1/2 -translate-x-1/2">
                      Passif
                    </p>
                  </div>
                  <ul className="flex flex-row gap-x-2">
                    {championData.spells.map((s: any, index: number) => (
                      <li
                        key={s.id}
                        className={`cursor-pointer relative  ${
                          spell === s.id
                            ? "border-2 border-violet-600 shadow-xl shadow-violet-600"
                            : ""
                        }`}
                        onClick={() => handleSpell(s.id)}
                      >
                        <img
                          src={`./img/spell/${s.id}.png`}
                          alt={s.id + "" + s.name}
                          className="w-14 h-14 rounded-md max-md:w-10 max-md:h-10"
                        />
                        <p className="font-light text-sm absolute -bottom-5 left-1/2 -translate-x-1/2 max-md:text-xs max-md:-bottom-4">
                          {(() => {
                            switch (index) {
                              case 0:
                                return "Q";
                              case 1:
                                return "Z";
                              case 2:
                                return "E";
                              default:
                                return "R";
                            }
                          })()}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col gap-1 justify-center items-center p-2 font-light max-md:text-sm">
                  {spell &&
                    championData.spells.map((s: any) => {
                      if (s.id === spell) {
                        return (
                          <span key={s.id} className="flex flex-col gap-y-2">
                            <h4 className="font-semibold text-center">
                              {s.name}
                            </h4>
                            <p className="px-2">{s.description}</p>
                          </span>
                        );
                      }
                    })}
                  {spell === "passive" && (
                    <>
                      <h4 className="font-semibold">
                        {championData.passive.name}
                      </h4>
                      <p className="">{championData.passive.description}</p>
                    </>
                  )}
                </div>
              </div>

              {/* spells end */}
            </div>
            {/* End Champion Details */}
          </div>
          {/* tips start */}
          <div className="my-10 p-4 bg-zinc-800/75 rounded-lg flex flex-col gap-3 max-w-3xl mx-auto text-justify max-md:max-w-screen-sm max-md:text-xs max-md:mt-10 max-md:border-zinc-800/[.60] max-md:m-4">
            <div className="">
              <h4 className="font-semibold text-lg text-green-500">
                Conseils joueur
              </h4>
              <ul className="flex flex-col gap-y-2">
                {championData.allytips.length > 0 ? (
                  championData.allytips.map((tip: string, index: number) => (
                    <li key={index}>- {tip}</li>
                  ))
                ) : (
                  <li className="leading-10">
                    - Il n'y a pas encore de conseils pour ce champion
                  </li>
                )}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg text-red-500">
                Conseils ennemi
              </h4>
              <ul className="flex flex-col gap-y-2">
                {championData.enemytips.length > 0 ? (
                  championData.enemytips.map((etip: string, index: number) => (
                    <li key={index}>- {etip}</li>
                  ))
                ) : (
                  <li className="leading-10">
                    - Il n'y a pas encore de conseils contre ce champion
                  </li>
                )}
              </ul>
            </div>
          </div>
          {/* tips end */}
          {/* End Carousel */}
        </div>
      </div>
    );
  }
}
