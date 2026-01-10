"use client";
import { Suspense } from "react";
import Interview from "./interview-component";
import { useSearchParams } from "next/navigation";

function InterviewWithParams() {
  const searchParams = useSearchParams();
  return <Interview searchParams={searchParams} />;
}

export default function InterviewWrapper() {
  return (
    <Suspense fallback={<div className="p-8">Loading interview...</div>}>
      <InterviewWithParams />
    </Suspense>
  );
}
