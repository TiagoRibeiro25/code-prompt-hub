"use client";

import { SessionProvider } from "next-auth/react";
import React, { PropsWithChildren } from "react";
import { ToastContainer } from "react-toastify";
import Footer from "./Footer";
import TopNavbar from "./TopNavbar";

const HtmlContent: React.FC<PropsWithChildren> = ({
  children,
}): React.JSX.Element => {
  return (
    <SessionProvider>
      <body>
        <header>
          <TopNavbar />
        </header>

        <main>{children}</main>

        <Footer />
        <ToastContainer />
      </body>
    </SessionProvider>
  );
};

export default HtmlContent;
