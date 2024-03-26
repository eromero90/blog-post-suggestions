# Blog Post Suggestions

This project shows how composition is key to working with React Server Components (RSC).

Bonus 1: The app is using a Heap to prioritize the post to show. If you like data structures, here is a great example of how you can use them to make your app more dynamic.

Bonus 2: Would you like to apply SOLID principles to React? Here you can find two of them applied. Open-Closed and Liskov Substitution principles.

## Server Components
Server components are great when you want to fetch data, and access backend resources directly, like querying a database, opening files, writing files, etc. And one of the coolest features is: Reduce client-side javascript.

I have created 5 server components. Let's focus on 2 of them. The first one is `PostCard.tsx`, which can load data from a backend resource, in this case, we are referring to `data/posts`. One of the misconceptions about RSC is they are pages. And that is not true, NextJS uses a server component as the entry point for each page entry point but you can create components like `PostCard` to fetch data, and return a new react component rendered on the server.

The second one `FromTheBlog.tsx` is where things are getting more interesting. As you can see there, we are creating the post suggestions. `FromTheBlog` is getting the post IDs for each category we want to suggest in the carousel but each `PostCard` component is in charge of accessing the post data from the database and creating the component. This allows us to take advantage of another great web feature: `STREAMING` with react suspense, we can wrap the component and now `PostCard` will be streamed and this helps improve the perceived loading performance by showing a non-interactive page to the user as soon as possible.

The root page will be rendered almost immediately and the post suggestions are going to be suspended. Here is the code.

```
<Suspense
  fallback={<PostCardPlaceHolder />}
>
  <PostCard postId={postId} Badge={Badges[idx]} />
</Suspense>
```

As you may notice, we are creating this component in the backend, in another server component, and passing it in as a prop into the carousel.

```
<Carousel posts={postsHeap.getAsPlainObject()} totalPostTypes={3} />
```

And that is the importance of composition, you can create RSC, use suspense, and pass them to a client component as a prop or children and those components will be serialized to be used on the frontend, even when you are using suspense and streaming but they are not going to be re-rendered, reducing the JS bundle, and improving performance.

Composition is the easier way to combine server components and client components.


## Client Components

If you have to use event listeners, hooks, custom hooks, or interact with browser-only APIs, client components are the answer. You just need to add `"use client";` at the top of the component and that's it!.

I have created one client component `Carousel.tsx` to show 3 post suggestions each time. We are using `useState` to make it dynamic on frontend side. BTW, if you notice, I am not adding the `use client` directive, because I am importing the component using the barrel `indext.tsx` and that component uses the directive to make all the exported components client components. It is an interesting way to understand how `use client` works.

What is the coolest part of `Carousel`? It can display 3 post suggestions but those are rendered in the backend, they are RSC.

```
{suggestions.map((post, idx) => (
  <Fragment key={idx}>{post.component}</Fragment>
))}

```

Again, composition is your best friend. When you load the page, you will be able to see each post suggestion suspended. Composition maintains separate server/client boundaries.

RSC is a powerful tool in React that will help us to improve the performance of our apps. It is not complicated, RSC just needs time to be learned. One day, there will be RSC libraries to make our lives easier to integrate 3rd-party services.


## (Bonus 1) Heap to create a circular priority queue
As a bonus, I have created a Heap where we can show suggestions more dynamically. This project works with 3 levels of priority. We can add as much as we want but always take into account how many levels to create a carousel.
As priority 1, we are going to have the feature posts. Priority 2, trending posts, and for priority 3, we have the latest posts.
The idea is to show the featured posts with a different priority, inserted once all the next elements and priorities have been shown.

For example, you have 9 suggestions, 2 featured posts, 4 trendy posts, and 3 latest posts. You will show 3 posts in the initial load, 2 featured ones and 1 trendy one. Next, you want to show all the trendy posts, then show the featured ones again. Then, show all the latest posts, and again the featured posts.

I have accomplished this nice algorithm using a heap. Data structures are interesting to have a dynamic UI. It is just to take the time to play with them.

## (Bonus 1) Heap to create a circular priority queue
As a bonus, I have created a Heap where we can show suggestions more dynamically. This project works with 3 levels of priority. We can add as much as we want but always take into account how many levels to create a carousel.
As priority 1, we are going to have the feature posts. Priority 2, trending posts, and for priority 3, we have the latest posts.
The idea is to show the featured posts with a different priority, inserted once all the next elements and priorities have been shown.

For example, you have 9 suggestions, 2 featured posts, 4 trendy posts, and 3 latest posts. You will show 3 posts in the initial load, 2 featured ones and 1 trendy one. Next, you want to show all the trendy posts, then show the featured ones again. Then, show all the latest posts, and again the featured posts.

I have accomplished this nice algorithm using a heap. Data structures are interesting to have a dynamic UI. It is just to take the time to play with them.

## (Bonus 2) S.O.L.I.D principles
We know what SOLID stands for, don't we?

```
S: Single Responsibility Principle
O: Open-Closed Principle
L: Liskov Substitution Principle
I: Interface Segregation Principle
D: Dependency Inversion Principle
```

Single Responsibility is easier to get, for example, you can create small components focused on one thing, also, that can be applied to Hooks. But what about `Open-Closed` and `Liskov Substitution` principles?

One of the best use cases for those principles is when you have a component with multiple variants. It could be a Button with 3 variants such as primary, secondary, and destructive. The source code of the button is to have a children, maybe some text with an icon, sometimes without it. And a click callback. The functionality is simple but now you want to add variants. We start adding more props, like `variant="primary"` and we add an if statement to get the right colors and styling but we are modifying the source code, and, if we want to add more logic to the variants, we have to make sure the children logic and the onClick logic are still working. If we are modifying the source code, we can have a mess. Following the `Open-Closed` principle, the button should be closed for modification, so adding those variants shouldn't be allowed in its source code. But it should be open for extension, so we should make the button as flexible as possible to allow us to extend the button without worrying about messing with the source code.

But now, how can we do that? Let's take a look at `Badge.tsx`. I needed a badge to show if the post was `Featured`, `Trendy`, or `Latest` but each variant has a different styling and I must not modify the badge source code to add logic to handle variants.

So, let's apply a factory pattern

```
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
```

As you can see there, we are composing a new component that contains the Badge, adding the new styling. We are extending the badge component without modifying the source code.

If we want to create a new Badge is as simple as calling the factory method

```
const FeaturedBadge = badgeFactory("Featured", {
  className: "bg-yellow-50 text-yellow-800 ring-yellow-600/20",
  children: "Featured",
});
```

And now we have applied the `Open-Closed` principle to our React components. No more if/else, ternary operators or complex logic to handle variants.

Now, what about `Liskov Substitution` principle? great question. Let's think about how to use the Badges we created. We have 3 of them and depending on the post, it will display one of them.

What we can do? sometimes, the first solution that comes to our minds is flag props like: `isFeatured` or `isTrendy` and have the code like this:

```
{isFeatured ? <FeaturedBadge className="absolute top-4 right-4" /> : null}
{isTrendy ? <TrendyBadge className="absolute top-4 right-4" /> : null}
```

But the same issue we are trying to fix with the `Open-Closed` principle. If we are going to add 10 more badges, we do have to add 10 more ternary operators.

The solution? the `PostCard` components expect a possible badge component, if it is present, display it!
Applying the `Liskov Substitution`, we define the prop interface like this:

```
interface BlogCardProps {
  postId: number;
  Badge?: Badge;
}
```
Where the Badge is a kind of superclass for each new badge. And then, we can have different options of badges to pass into the post. The post is just responsible for rendering the badge if present. `FromTheBlog` component is responsible for selecting the right badge.

```
...
const Badges: Badge[] = [FeaturedBadge, TrendyBadge, LatestBadge];
...
<PostCard postId={postId} Badge={Badges[idx]} />
...
```
PostCard is simple and open for extension
```
{Badge ? <Badge className="absolute top-4 right-4" /> : null}
```

With those components, we have applied 2 SOLID principles and our code is easier to read and less pruned to bugs
