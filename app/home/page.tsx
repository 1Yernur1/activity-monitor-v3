import { Suspense } from "react";
import Loading from "./loading";

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <div>
        <h1>This is home page</h1>
      </div>
    </Suspense>
  );
}
