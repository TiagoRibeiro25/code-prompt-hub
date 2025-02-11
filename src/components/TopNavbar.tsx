"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { FaRegUserCircle, FaSignInAlt } from "react-icons/fa";

const TopNavbar: React.FC = (): React.JSX.Element => {
  const { status, data } = useSession();

  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = (): void => setMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full text-white p-4 flex flex-row">
      <Link href={status === "authenticated" ? "/dashboard" : "/"}>
        <h2 className="flex flex-row items-center">
          <Image src="/assets/logo.svg" alt="logo" width={40} height={40} />
          <span className="ml-2 text-red-500 monolisa-font text-xl sm:block hidden">
            Code Prompt Hub
          </span>
        </h2>
      </Link>

      <div className="ml-auto">
        {status === "unauthenticated" ? (
          <Link
            href={"/auth/login"}
            className="flex flex-row items-center gap-2 text-red-500 text-lg"
          >
            <FaSignInAlt />
            Sign In
          </Link>
        ) : (
          <div className="flex flex-row items-center h-full">
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 "
                id="user-menu-button"
                aria-expanded={isMenuOpen}
                onClick={toggleMenu}
              >
                <span className="sr-only">Open user menu</span>
                {data?.user?.image ? (
                  <Image
                    src={data?.user?.image}
                    alt="user"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                ) : (
                  <FaRegUserCircle className="text-4xl cursor-pointer text-red-500" />
                )}
              </button>
              {isMenuOpen && (
                <div
                  className="absolute right-0 z-50 w-48 mt-2 text-base list-none bg-black divide-y divide-red-900 rounded-lg shadow bg-opacity-70 backdrop-filter backdrop-blur-lg border border-red-900"
                  id="user-dropdown"
                >
                  <div className="px-4 py-3">
                    <span className="block text-sm text-white">
                      {data?.user?.name}
                    </span>
                    <div className="block text-sm text-gray-400 truncate">
                      {data?.user?.email}
                    </div>
                  </div>
                  <ul className="py-2" aria-labelledby="user-menu-button">
                    <li>
                      <Link
                        href="/dashboard"
                        className="block px-4 py-2 text-sm text-white hover:text-red-500"
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/leaderboard"
                        className="block px-4 py-2 text-sm text-white hover:text-red-500"
                      >
                        Leaderboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-white hover:text-red-500"
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/review"
                        className="block px-4 py-2 text-sm text-white hover:text-red-500"
                      >
                        Feedback
                      </Link>
                    </li>
                  </ul>
                  <ul className="py-2" aria-labelledby="user-menu-button">
                    <li>
                      <button
                        className="block px-4 py-2 text-sm text-white hover:text-red-500 w-full text-left"
                        onClick={() => signOut({ callbackUrl: "/auth/login" })}
                      >
                        Sign Out
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default TopNavbar;
