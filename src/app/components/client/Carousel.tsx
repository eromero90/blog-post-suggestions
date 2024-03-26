import { Fragment } from "react";
import { type PlainHeap } from "@/lib";
import { usePostSuggestions } from "@/app/hooks";

interface CarouselProps {
  posts: PlainHeap;
  totalPostTypes: number;
}

function Carousel(props: CarouselProps) {
  console.count("Carousel render");

  const { suggestions, loadMoreSuggestions } = usePostSuggestions(props);

  return (
    <div>
      <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {suggestions.map((post, idx) => (
          <Fragment key={idx}>{post.component}</Fragment>
        ))}
      </div>

      <button
        onClick={loadMoreSuggestions}
        className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Next Suggestions
      </button>
    </div>
  );
}

export { Carousel };
