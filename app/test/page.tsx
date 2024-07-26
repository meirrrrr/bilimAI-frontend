import { Suspense } from "react";
import Home from "./test";

export default function TestPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Home />
    </Suspense>
  );
}
