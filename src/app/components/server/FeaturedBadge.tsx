import { badgeFactory } from "./Badge";

const FeaturedBadge = badgeFactory("Featured", {
  className: "bg-yellow-50 text-yellow-800 ring-yellow-600/20",
  children: "Featured",
});

export { FeaturedBadge };
