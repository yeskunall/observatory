import { getAllBookmarks, getAllTags, getBookmarksByTags } from "@/lib/queries";

import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ params }) => {
  // FIXME(yeskunall): not correct, should throw instead if no `selectedTag`
  // is passed
  const { selectedTag = "NONE" } = params;

  if (selectedTag === "NONE") {
    const { data, error } = await getAllBookmarks();

    return new Response(JSON.stringify({ data, error }));
  }

  const { data, error } = await getBookmarksByTags([selectedTag]);

  return new Response(JSON.stringify({ data, error }));
};

export async function getStaticPaths() {
  const { data, error } = await getAllTags();

  if (!error && data) {
    const { tags } = data;

    return tags.map(({ value }) => ({
      params: {
        selectedTag: value,
      },
    }));
  }
}
