type StatListIconsProp = {
  categoryDisplay: string;
  setCategoryDisplay: React.Dispatch<React.SetStateAction<any>>;
};

export default function StatListIcons({
  setCategoryDisplay,
  categoryDisplay,
}: Readonly<StatListIconsProp>) {
  return (
    <div className="flex flex-row justify-evenly items-center border-b-2 border-gray-300 fixed w-1/2 py-2 bg-inherit rounded-xl z-50">
      <button
        onClick={() =>
          setCategoryDisplay((prev: string) =>
            prev === "Armor" ? "" : "Armor"
          )
        }
        className={`rounded-xl ${
          categoryDisplay === "Armor" ? " border-2 border-red-400" : ""
        }`}
      >
        <img src="./bigImg/perk-images/StatMods/ArmorResIcon.png" alt="armor" />
      </button>
      <button
        onClick={() =>
          setCategoryDisplay((prev: string) =>
            prev === "SpellBlock" ? "" : "SpellBlock"
          )
        }
        className={`rounded-xl ${
          categoryDisplay === "SpellBlock" ? " border-2 border-cyan-400" : ""
        }`}
      >
        <img
          src="./bigImg/perk-images/StatMods/MagicResIcon.png"
          alt="magic res"
        />
      </button>
      <button
        onClick={() =>
          setCategoryDisplay((prev: string) =>
            prev === "Health" ? "" : "Health"
          )
        }
        className={`rounded-xl ${
          categoryDisplay === "Health" ? " border-2 border-emerald-400" : ""
        }`}
      >
        <img src="./bigImg/perk-images/StatMods/HealthIcon.png" alt="health" />
      </button>
      <button
        onClick={() =>
          setCategoryDisplay((prev: string) =>
            prev === "CooldownReduction" ? "" : "CooldownReduction"
          )
        }
        className={`rounded-xl ${
          categoryDisplay === "CooldownReduction"
            ? " border-2 border-gray-200"
            : ""
        }`}
      >
        <img
          src="./bigImg/perk-images/StatMods/CooldownIcon.png"
          alt="cooldown"
        />
      </button>

      <button
        onClick={() =>
          setCategoryDisplay((prev: string) =>
            prev === "SpellDamage" ? "" : "SpellDamage"
          )
        }
        className={`rounded-xl ${
          categoryDisplay === "SpellDamage" ? " border-2 border-violet-500" : ""
        }`}
      >
        <img src="./bigImg/perk-images/StatMods/PowerIcon.png" alt="power" />
      </button>
      <button
        onClick={() =>
          setCategoryDisplay((prev: string) =>
            prev === "AttackSpeed" ? "" : "AttackSpeed"
          )
        }
        className={`rounded-xl ${
          categoryDisplay === "AttackSpeed" ? " border-2 border-yellow-300" : ""
        }`}
      >
        <img
          src="./bigImg/perk-images/StatMods/AttackSpeedIcon.png"
          alt="attack speed"
        />
      </button>

      <button
        onClick={() =>
          setCategoryDisplay((prev: string) =>
            prev === "Damage" ? "" : "Damage"
          )
        }
        className={`rounded-xl ${
          categoryDisplay === "Damage" ? " border-2 border-yellow-600" : ""
        }`}
      >
        <img src="./bigImg/perk-images/StatMods/ForceIcon.png" alt="force" />
      </button>
    </div>
  );
}
