export default function ItemsInBuild({
  setShowItems,
  value,
  keyHero,
  setChampKey,
  setIndexItem,
}: Readonly<{
  setShowItems: any;
  value: any;
  keyHero: string;
  setChampKey: any;
  setIndexItem: any;
}>) {
  const renderButtons = () => {
    const buttons = [];

    for (let i = 0; i < 6; i++) {
      buttons.push(
        <button
          key={i}
          onMouseDown={(e) => {
            e.preventDefault();
            setIndexItem(i);
            setChampKey(keyHero);
            setShowItems((prev: boolean) => !prev);
          }}
          className="h-20 w-20 mx-2 shadow-gray-500 shadow-md transition-shadow duration-200 hover:shadow-xl hover:shadow-gray-600 max-md:w-12 max-md:h-12"
          style={{ background: "#040D0A" }}
        >
          {value.build.length > 0 && value.build[i] && (
            <img
              src={`./img/item/${value.build[i].image.full}`}
              alt={value.build[i].name}
              className="w-full h-full p-2 rounded-xl"
            ></img>
          )}
        </button>
      );
    }

    return buttons;
  };
  return <>{renderButtons()}</>;
}
