"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

/**
 * build 를 해보면,
 *
 * ⨯ useSearchParams() should be wrapped in a suspense boundary at page "/".
 * Read more: https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
 *
 * 에러가 발생한다. Client Component 는 Pre-render 대상으로 서버에서도 실행될 수 있다.
 * Client Hook useSearchParams() 은 업데이트 되는 query string 에 접근하는 동적 훅으로 빌드 시점에 실행될 수 없다.
 * 따라서 Suspense fallback 으로 <Footer/> 를 서버 사이드 환경에서 대체해야한다.
 */

export default function Footer() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <FooterContent />
    </Suspense>
  );
}

export function FooterContent() {
  const searchParams = useSearchParams();

  const id = searchParams.get("id");

  return <p>{id}</p>;
}
