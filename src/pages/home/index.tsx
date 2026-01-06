import { post } from "@/utils/request.ts";
import { useEffect } from "react";

export default function HomePage() {
  function aaa() {
    post("/sys/auth/logout").then(() => {});
  }

  useEffect(() => {});

  return (
    <>
      123123<button onClick={aaa}>开始</button>
    </>
  );
}
