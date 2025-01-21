import HtmlContent from "@/components/HtmlContent";
import "@/css/fonts.css";
import "@/css/globals.css";
import "@/css/tailwind.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Code Prompt Hub",
  description: "A new way to learn",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <HtmlContent>{children}</HtmlContent>
    </html>
  );
}
