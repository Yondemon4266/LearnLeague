export function TruncateText(text: string) {
  if (text.length > 22) {
    return text.substring(0, 22) + "...";
  } else {
    return text;
  }
}
