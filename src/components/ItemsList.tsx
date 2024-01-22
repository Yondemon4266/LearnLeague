import { useState } from "react";
import Items from "../assets/fr_FR/item.json";
import StatListIcons from "./StatListIcons";
import { useAppBuildsContext } from "../context/Context";

export default function ItemsList({
  setShowItems,
  champKey,
  indexItem,
}: {
  setShowItems: any;
  champKey: string;
  indexItem: number;
}) {
  const [categoryDisplay, setCategoryDisplay] = useState("");
  const addItemBuild = useAppBuildsContext();
  const itemsData = Object.entries(Items.data).filter(([key, value]: any) => {
    console.log(key);
    return (
      !value.into &&
      value.maps["11"] &&
      value.gold.purchasable &&
      !value.tags.includes("Consumable")
    );
  });

  function mappingItems() {
    const items = itemsData
      .filter(([key, value]: any) => {
        if (categoryDisplay) {
          if (value.tags.includes(categoryDisplay)) {
            return [key, value];
          }
        } else {
          return [key, value];
        }
      })
      .map(([key, value]: any) => {
        return (
          <button
            key={key}
            className={`relative z-30 border-2 border-transparent hover:border-solid hover:border-violet-400 group`}
            onClick={() => {
              addItemBuild(champKey, indexItem, value);
              setShowItems((prev: boolean) => !prev);
            }}
          >
            <img
              src={`./img/item/${value.image.full}`}
              alt={value.name}
              className="w-16 h-16"
            />
            <div
              className={`absolute hidden z-50 group-hover:absolute group-hover:top-0 group-hover:z-50 bg-black`}
            >
              <span>{value.name}</span>
              <span>{value.description}</span>
            </div>
          </button>
        );
      });

    return items;
  }

  return (
    <>
      <StatListIcons
        setCategoryDisplay={setCategoryDisplay}
        categoryDisplay={categoryDisplay}
        setShowItems={setShowItems}
      />
      <div className="flex flex-row flex-wrap justify-center items-center h-full gap-2 pt-16 pb-6">
        {mappingItems()}
      </div>
    </>
  );
}
