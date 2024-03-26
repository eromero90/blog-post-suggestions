import {
  getFeaturedPostIds,
  getTrendingPostIds,
  getNewestPostIds,
} from "@/data/posts";
import { PostCard, PostCardPlaceHolder } from "@/app/components/server";
import { Carousel } from "@/app/components/client";
import { Heap, type HeapNode } from "@/lib";
import { Suspense } from "react";
import { FeaturedBadge } from "./FeaturedBadge";
import { LatestBadge } from "./LatestBadge";
import { TrendyBadge } from "./TrendyBadge";
import { Badge } from "./Badge";

const Badges: Badge[] = [FeaturedBadge, TrendyBadge, LatestBadge];

async function FromTheBlog() {
  const posts = await Promise.all([
    getFeaturedPostIds(),
    getTrendingPostIds(),
    getNewestPostIds(),
  ]);

  const postsHeap = new Heap();
  posts.forEach((postArray, idx) => {
    postArray.forEach((postId) => {
      const postNode: HeapNode = {
        priority: idx + 1,
        featured: idx === 0,
        component: (
          <Suspense
            fallback={<PostCardPlaceHolder />}
          >
            <PostCard postId={postId} Badge={Badges[idx]} />
          </Suspense>
        ),
      };
      postsHeap.insert(postNode);
    });
  });

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            From the blog
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Learn how to grow your business with our expert advice.
          </p>
        </div>
        <Carousel posts={postsHeap.getAsPlainObject()} totalPostTypes={3} />
      </div>
    </div>
  );
}

export { FromTheBlog };
