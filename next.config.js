const STUDIO_REWRITE = {
  source: "/admin/:path*",
  destination:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3333/admin /:path*"
      : "/admin/index.html",
};

module.exports = {
  reactStrictMode: true,
  rewrites: () => [STUDIO_REWRITE],
}
