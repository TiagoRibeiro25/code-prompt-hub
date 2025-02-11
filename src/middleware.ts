export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/dashboard/:path*", // everything that starts with /dashboard will be protected
    "/profile",
    "/review",
  ],
};
