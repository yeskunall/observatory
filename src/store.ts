import { atom } from "nanostores";

export const selectedTag = atom("NONE");
export function setSelectedTag(value: string) {
  selectedTag.set(value);
}
