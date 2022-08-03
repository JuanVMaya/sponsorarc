import Link from "next/link";
import { useUser } from "../context/userContext";
import { AiFillHome } from "react-icons/ai";
import { FaSuitcase, FaCompass, FaUserAlt } from "react-icons/fa";
import { TbLayersLinked } from "react-icons/tb";

const Navbar = () => {
  const { user, signOut } = useUser();
  return (
    <div className="navbar bg-base-100 justify-between z-10">
      <div className="flex items-center gap-2 btn btn-ghost normal-case text-xl">
        <TbLayersLinked />
        <h1 className="font-bold text-2xl">SponsorArc</h1>
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
            <Link href="/" className="">
              <a className="flex flex-col items-center">
                <FaCompass />
                Discover
              </a>
            </Link>
          </li>
          <li>
            <a className="flex flex-col items-center">
              <FaSuitcase />
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
                <Link href="/brands">
                  <a>Brands</a>
                </Link>
              </li>
              <li>
                <Link href="/branddeals">
                  <a>Creators</a>
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <a className="flex flex-col items-center">
              <FaUserAlt />
              {user.loggedIn ? user.first_name : "Profile"}
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
                <Link href="/user/settings">
                  <a>Settings</a>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <a onClick={() => signOut(user)}>Sign Out</a>
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
