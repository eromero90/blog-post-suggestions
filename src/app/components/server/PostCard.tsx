import Image from "next/image";
import { getPost } from "@/data/posts";
import { Badge } from "./Badge";

interface BlogCardProps {
  postId: number;
  Badge?: Badge;
}

async function PostCard({ postId, Badge }: BlogCardProps) {
  console.count(`BlogCard Id: ${postId}`);
  const post = await getPost(postId);
  return (
    <article className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80">
      <Image
        src={post.imageUrl}
        fill={true}
        alt=""
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
      <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

      {/* liskov substitution principle. Instead of a prop to select the badge to show, among different variants using an if/else or ternary */}
      {/* The post could accept a Badge as prop, it is optional, and it will follow the return type of the badge factory making easier to replace the badge */}
      {Badge ? <Badge className="absolute top-4 right-4" /> : null}
      <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
        <time dateTime={post.datetime} className="mr-8">
          {post.date}
        </time>
        <div className="-ml-4 flex items-center gap-x-4">
          <svg
            viewBox="0 0 2 2"
            className="-ml-0.5 h-0.5 w-0.5 flex-none fill-white/50"
          >
            <circle cx={1} cy={1} r={1} />
          </svg>
          <div className="flex gap-x-2.5">
            <div className="relative h-6 w-6">
              <Image
                src={post.author.imageUrl}
                fill={true}
                alt=""
                className="flex-none rounded-full bg-white/10"
              />
            </div>
            {post.author.name}
          </div>
        </div>
      </div>
      <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
        <a href={post.href}>
          <span className="absolute inset-0" />
          {post.title}
        </a>
      </h3>
    </article>
  );
}

async function PostCardPlaceHolder() {
  console.count("PostCardPlaceHolder");
  return (
    <article className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80">
      <div className="animate-pulse flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
        <div className="-ml-4 flex items-center gap-x-4">
          <div className="h-2 w-24 bg-slate-700 rounded" />
          <svg
            viewBox="0 0 2 2"
            className="-ml-0.5 h-0.5 w-0.5 flex-none fill-white/50"
          >
            <circle cx={1} cy={1} r={1} />
          </svg>
          <div className="flex gap-x-2.5">
            <div className="relative h-6 w-6 flex-none rounded-full bg-white/10" />
          </div>
          <div className="relative h-2 w-24 bg-slate-700 rounded" />
        </div>
      </div>
      <h3 className="animate-pulse mt-3 text-lg font-semibold leading-6 text-white">
        <div className="h-4 bg-slate-700 rounded" />
      </h3>
    </article>
  );
}

export { PostCard, PostCardPlaceHolder };
