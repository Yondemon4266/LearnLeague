import { ColorFunction } from "../utility/ColorFunction";

type TagProp = {
  tag: string;
};

export default function Tag({ tag }: TagProp) {
  return (
    <li className={`${ColorFunction(tag)} h-min w-min p-1 rounded-md`}>
      {tag}
    </li>
  );
}
