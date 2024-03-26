import { badgeFactory } from "./Badge";

const TrendyBadge = badgeFactory("Trendy", {
  className: "bg-pink-50 text-pink-700 ring-pink-700/10",
  children: "Trendy",
});

export { TrendyBadge };
