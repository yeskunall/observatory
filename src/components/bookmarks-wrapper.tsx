import { useStore } from "@nanostores/react";
import useSWR from "swr";

import Favicon from "@/components/favicon";

import { cn } from "@/lib/cn";
import { selectedTag } from "src/store";

import type { Bookmark } from "@/lib/shared/types";
import type { CombinedError } from "@urql/core";

// @ts-ignore
const fetcher = (...args) => fetch(...args).then(response => response.json());

export default function BookmarksWrapper() {
  const tag = useStore(selectedTag);
  const { data, error, isLoading } = useSWR<
    { data: { bookmarks: Bookmark[] } },
    CombinedError
  >(`/api/tag/${tag}`, fetcher);

  if (!error && isLoading) {
    return <Skeleton />;
  }

  return (
    <ul
      role="list"
      className="mt-6 grid grid-cols-1 justify-normal gap-12 py-6 sm:grid-cols-3"
    >
      {data?.data.bookmarks &&
        data.data.bookmarks.map(bookmark => (
          <li key={bookmark.name} className="select-none">
            <Bookmark bookmark={bookmark} />
          </li>
        ))}
    </ul>
  );
}

function Bookmark({ bookmark }: { bookmark: Bookmark }) {
  const { description, name, url } = bookmark;

  return (
    <a className="focus:outline-none" href={url}>
      <div className="-m-2 flex items-center space-x-3 rounded-xl p-3 transition-colors focus-within:ring-2 focus-within:ring-indigo-500 hover:bg-slate-800">
        <div>
          <Favicon alt={url} favicon={url} />
        </div>
        <div>
          <h3 className="line-clamp-2 text-sm font-medium text-sky-50/90">
            {name}
          </h3>
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        </div>
      </div>
    </a>
  );
}

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-slate-900", className)}
      {...props}
    />
  );
}
