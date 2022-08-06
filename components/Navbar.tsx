import Link from "next/link";
import { useUser } from "../context/userContext";
import { AiFillHome } from "react-icons/ai";
import { FaSuitcase, FaCompass, FaUserAlt } from "react-icons/fa";
import { TbLayersLinked } from "react-icons/tb";

const Navbar = () => {
  const { user, signOut, logIn } = useUser();
  return (
    <div className="navbar bg-base-100 justify-between z-10">
      <div className="flex items-center gap-2 btn btn-ghost normal-case text-xl">
        <TbLayersLinked />
        <Link href="/">
          <a>
            <h1 className="font-bold text-2xl">SponsorArc</h1>
          </a>
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal p-0">
          <li>
            <Link href="/" className="">
              <a className="flex flex-col items-center">
                <AiFillHome />
                Home
              </a>
            </Link>
          </li>

          <li>
            <a className="flex flex-col items-center">
              <FaCompass />
              Browse
              <svg
                className="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
              </svg>
            </a>
            <ul className="p-2 bg-base-100">
              <li>
                <Link href="/brand-deals/">
                  <a>Brand Deals</a>
                </Link>
              </li>
              <li>
                <Link href="/creators">
                  <a>Creators</a>
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link href="/my-brand-deals">
              <a className="flex flex-col items-center">
                <FaSuitcase />
                My Deals
              </a>
            </Link>
          </li>
          {user.loggedIn ? (
            <li>
              <Link href="/profile">
                <a className="flex flex-col items-center">
                  <FaUserAlt />
                  {user.first_name}

                  <svg
                    className="fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                  </svg>
                </a>
              </Link>
              <ul className="p-2 bg-base-100">
                <li>
                  <Link href="/user/settings">
                    <a>Settings</a>
                  </Link>
                </li>
                <li>
                  <button onClick={() => signOut(user)}>Sign Out</button>
                </li>
              </ul>
            </li>
          ) : (
            <li>
              <button
                className="flex flex-col items-center"
                onClick={() => logIn(user)}
              >
                <FaUserAlt />
                Sign In
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
