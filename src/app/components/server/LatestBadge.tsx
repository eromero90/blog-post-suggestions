import { badgeFactory } from "./Badge";

const LatestBadge = badgeFactory("Latest", {
  className: "bg-green-50 text-green-700 ring-green-600/20",
  children: "Latest",
});

export { LatestBadge };
