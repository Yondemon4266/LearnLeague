import ChampionsList from "../components/ChampionsList";
import { useEffect, useState } from "react";

let firstRender = true;
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
    <div
      className="animate-fadeanim"
      onAnimationEnd={() => (firstRender = false)}
    >
      <div
        className="absolute top-0 left-0 -z-10 w-screen h-screen"
        style={{
          background: "url('./img/bg.jpg') center/cover",
          transition: "background 0.5s ease-in",
          opacity: loading ? 0 : 1,
        }}
      />
      <div>
        <ChampionsList />
      </div>
    </div>
  );
}
