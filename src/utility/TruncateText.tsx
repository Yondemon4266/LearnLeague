const largeurEcran = window.innerWidth;

export function TruncateText(text: string) {
  console.log(largeurEcran);
  if (largeurEcran > 1000) {
    if (text.length > 22) {
      return text.substring(0, 22) + "...";
    } else {
      return text;
    }
  } else {
    if (text.length > 12) {
      return text.substring(0, 12) + "...";
    } else {
      return text;
    }
  }
}
