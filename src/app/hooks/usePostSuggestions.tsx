import { useRef, useState } from "react";
import { CircularHeap, type PlainHeap } from "@/lib";

interface UsePostSuggestionsProps {
  posts: PlainHeap;
  totalPostTypes: number;
}

const usePostSuggestions = ({
  posts,
  totalPostTypes,
}: UsePostSuggestionsProps) => {
  const postsHeap = useRef<CircularHeap>();
  if (postsHeap.current === undefined) {
    postsHeap.current = new CircularHeap({
      priorityQueue: posts,
      priorityLevels: totalPostTypes,
    });
  }

  const [suggestions, setSuggestions] = useState(() =>
    postsHeap.current?.nextBatch()
  );

  const loadMoreSuggestions = () => {
    setSuggestions(postsHeap.current?.nextBatch());
  };

  return {
    suggestions: suggestions ?? [],
    loadMoreSuggestions,
  };
};

export { usePostSuggestions };
