import * as Avatar from "@radix-ui/react-avatar";

type Props = {
  alt: string;
  favicon: string;
};

const hostnameFromUrl = (url: string) => new URL(url).hostname;
const avatarFallback = (url: string) => {
  const hostname = hostnameFromUrl(url);

  if (hostname.startsWith("www")) {
    return hostname.split(".")[1].charAt(0).toUpperCase();
  }

  return hostname.charAt(0).toUpperCase();
};

export default function Favicon({ alt, favicon }: Props) {
  return (
    <Avatar.Root className="inline-flex h-10 w-10 select-none items-center justify-center overflow-hidden align-middle">
      <Avatar.Image
        alt={alt}
        src={`https://logo.clearbit.com/${hostnameFromUrl(favicon)}`}
        height={40}
        width={40}
        className="rounded-md"
      />
      <Avatar.Fallback className="leading-1 flex h-full w-full items-center justify-center rounded-full bg-sky-50/95 text-[18px] font-medium text-purple-700">
        {avatarFallback(favicon)}
      </Avatar.Fallback>
    </Avatar.Root>
  );
}
