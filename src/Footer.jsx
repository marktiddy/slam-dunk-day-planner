import React from "react";

const Footer = () => {
  return (
    <div className="w-full bg-yellow-400 p-4 text-center sticky bottom-0">
      <p className="text-black font-extrabold text-base">Found this helpful?</p>
      <p className="text-xs">
        This site was made as a hobby project. If you'd like to do one of the
        following I'd be super grateful
      </p>
      <div className="grid grid-cols-2 mt-2 gap-2">
        <a
          href="https://www.buymeacoffee.com/marktiddy"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded bg-black text-yellow-400 p-2 font-extrabold uppercase text-sm cursor-pointer transition-all hover:opacity-75"
        >
          Buy me a Beer
        </a>
        <a
          href="https://open.spotify.com/album/264XBsnQOBv1DXA75CXIQE"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded bg-black text-yellow-400 p-2 font-extrabold uppercase text-sm cursor-pointer transition-all hover:opacity-75"
        >
          Listen to my band
        </a>
      </div>
    </div>
  );
};

export default Footer;
