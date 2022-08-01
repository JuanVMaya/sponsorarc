import * as React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <header>
      <h1 className="font-sans p-4">SponsorArc</h1>
      <nav>
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/browse">
              <a>Browse</a>
            </Link>
          </li>
          <li>
            <Link href="/blog/hello-world">
              <a>Blog Post</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
