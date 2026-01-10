"use client";
import { Suspense } from "react";
import Builder from "./builder-component";
import { useSearchParams } from "next/navigation";

function BuilderWithParams() {
  const searchParams = useSearchParams();
  return <Builder searchParams={searchParams} />;
}

export default function BuilderWrapper() {
  return (
    <Suspense fallback={<div className="p-8">Loading resume builder...</div>}>
      <BuilderWithParams />
    </Suspense>
  );
}
