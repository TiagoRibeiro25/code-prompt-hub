import Link from "next/link";
import React from "react";

const Footer: React.FC = (): React.JSX.Element => {
  return (
    <footer className="py-8 border-t border-gray-700">
      <div className="text-center text-gray-500">
        <p>
          &copy; {new Date().getFullYear()} Code Prompt Hub. All rights
          reserved.
        </p>
        <div className="mt-4">
          <Link href="/about" className="mx-2 hover:text-white">
            About
          </Link>
          <Link href="/privacy" className="mx-2 hover:text-white">
            Privacy Policy
          </Link>
          <Link href="/terms" className="mx-2 hover:text-white">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
