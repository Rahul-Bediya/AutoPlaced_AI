"use client";
import { Suspense } from "react";
import ReviewPage from "./review-component";
import { useSearchParams } from "next/navigation";

function ReviewWithParams() {
  const searchParams = useSearchParams();
  return <ReviewPage searchParams={searchParams} />;
}

export default function ReviewWrapper() {
  return (
    <Suspense fallback={<div className="p-8">Loading review...</div>}>
      <ReviewWithParams />
    </Suspense>
  );
}
