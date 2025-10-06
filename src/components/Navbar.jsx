import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar relative bg-gray-600 flex justify-between items-center px-7 py-4 w-full anton-regular">
      <div className="logo font-bold md:text-xl">
        &lt;Pass<span className="text-blue-300">Vault/&gt;</span>
      </div>
      <ul>
        <li className="flex text-[3vw] gap-2.5 md:text-[1.4vw] md:gap-6">
          <a
            className="hover:font-bold hover:text-blue-300 text-white font-semibold"
            href="/"
          >
            Home
          </a>
          <a
            className="hover:font-bold hover:text-blue-300 text-white font-semibold"
            href="#"
          >
            About
          </a>
          <a
            className="hover:font-bold hover:text-blue-300 text-white font-semibold"
            href="#"
          >
            Contact
          </a>
          <a
            className="hover:font-bold hover:text-blue-300 text-white font-semibold"
            href="#"
          >
            More
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
