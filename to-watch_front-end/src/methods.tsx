import { MovieEntry } from "./interfaces";

export function changeListOrder(
  list: MovieEntry[],
  index: number,
  operation: string
): MovieEntry[] {
  let newList = [...list];

  if (operation === "up") {
    const aux = list[index - 1];
    newList[index - 1] = list[index];
    newList[index] = aux;
  } else if (operation === "down") {
    const aux = list[index + 1];
    newList[index + 1] = list[index];
    newList[index] = aux;
  } else if (operation === "first") {
    newList = [list[index]].concat(
      list.filter((_, listIndex) => listIndex !== index)
    );
  } else if (operation === "last") {
    newList = list
      .filter((_, listIndex) => listIndex !== index)
      .concat(list[index]);
  }

  return newList;
}
