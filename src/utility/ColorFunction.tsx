export function ColorFunction(tags: string[] | string): string {
  let str = "";
  if (typeof tags === "object") {
    switch (tags[0]) {
      case "Tank":
        str = "shadow-green-600";
        break;
      case "Fighter":
        str = "shadow-red-600";
        break;
      case "Marksman":
        str = "shadow-yellow-600";
        break;
      case "Mage":
        str = "shadow-violet-600";
        break;
      case "Support":
        str = "shadow-blue-600";
        break;
      case "Assassin":
        str = "shadow-black";
        break;
      default:
        str = "shadow-violet-600";
        break;
    }
  } else {
    switch (tags) {
      case "Tank":
        str = "bg-emerald-500/[.75]";
        break;
      case "Fighter":
        str = "bg-red-800/[.75]";
        break;
      case "Marksman":
        str = "bg-amber-500/[.75]";
        break;
      case "Mage":
        str = "bg-violet-600/[.75]";
        break;
      case "Support":
        str = "bg-cyan-500/[.75]";
        break;
      case "Assassin":
        str = "bg-black";
        break;
      default:
        str = "bg-zinc-900/[.50]";
        break;
    }
  }

  return str;
}
