import { Blurhash } from "react-blurhash";
import ChampionsList from "../components/ChampionsList";
import { useEffect, useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const image = new Image();
    image.src = "./img/bg.jpg";

    image.onload = () => {
      setLoading(false);
    };
  }, []);

  return (
    <div className="animate-fadeanim">
      {/* BLUR IMAGE BEFORE LOADING */}
      <div
        className={`${
          loading ? "absolute w-screen h-screen top-0 left-0" : "hidden"
        }`}
      >
        <Blurhash
          hash="L7A,|wzV00TeGR#X-WK19DO:,}s?"
          className="w-screen h-screen"
          height={"100%"}
          width={"100%"}
          resolutionX={32}
          resolutionY={32}
          punch={1}
        />
      </div>
      {/* END BLUR IMAGE */}
      {/* IMAGE AFTER LOADING */}
      <div
        className="absolute top-0 left-0 -z-10 w-screen h-screen"
        style={{
          background: "url('./img/bg.jpg') center/cover",
          transition: "background 0.5s ease-in",
          display: loading ? "none" : "",
        }}
      />
      {/* END IMAGE */}
      <div>
        <ChampionsList />
      </div>
    </div>
  );
}
