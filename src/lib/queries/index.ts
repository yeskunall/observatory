import { client, gql } from "@/lib/urql";

import type { Bookmark, Tag } from "@/lib/shared/types";

export async function getAllBookmarks() {
  const { data, error } = await client
    .query<{ bookmarks: Bookmark[] }>(
      gql`
        {
          bookmarks {
            name
            url
            description
          }
        }
      `,
      {},
    )
    .toPromise();

  return { data, error };
}

export async function getAllTags() {
  const { data, error } = await client
    .query<{ tags: Tag[] }>(
      gql`
        {
          tags {
            comment
            value
          }
        }
      `,
      {},
    )
    .toPromise();

  return { data, error };
}

// NOTE(yeskunall): for now, the user can only filter by one tag
export async function getBookmarksByTags(tags: Tag["value"][]) {
  const { data, error } = await client
    .query<{ bookmarks: Bookmark[] }>(
      gql`
        query GetBookmarksByTag($tags: [tags_enum!]) @cached {
          bookmarks(where: { tags: { _in: $tags } }) {
            description
            name
            url
          }
        }
      `,
      { tags },
    )
    .toPromise();

  return { data, error };
}
