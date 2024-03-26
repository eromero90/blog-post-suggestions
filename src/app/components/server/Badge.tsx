interface BadgeProps {
  className?: string;
  children: React.ReactNode;
}

function Badge({ className = "", children }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${className}`}
    >
      {children}
    </span>
  );
}

// open-closed principle. The badge is closed for modification but open for extension!
// if we want to add a new badge variant, we are not going to modify the badge source code
// we are going to extend it. In this case, using a factory to compose the new badge.
const badgeFactory = (name: string, props: BadgeProps) => {
  function NewBadge({ className = "" }: { className?: string }) {
    return (
      <Badge className={`${props.className} ${className}`}>
        {props.children}
      </Badge>
    );
  }
  NewBadge.displayName = `${name}Badge`;
  return NewBadge;
};

// Using this type to apply the Lisk Substitution. Components created with the factory can replace their parent (badge).
// Take a look at `PostCard.tsx`
type Badge = ReturnType<typeof badgeFactory>;

export { badgeFactory, Badge };
