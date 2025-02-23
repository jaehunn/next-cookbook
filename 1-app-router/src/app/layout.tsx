// layout.tsx 를 지우면 Next.js 는 다시 만들어낸다.

import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header>
          <Link href="/">Home</Link>

          {/*
           * RSC Payload: http://localhost:3000/about?_rsc=rxx9e
           *
           * RSC Payload 만 전달받는다면, RSC 로만 구성되어있다로 파악할 수 있다.
           */}
          <Link href="/about">About</Link>

          {/*
           * Production Build 로 Pre-fetching 파일들을 살펴보면, blog/1 은 RSC Payload 만 받아온 것을 확인할 수 있다.
           *
           * Static Page 는 JS Bundle 까지 받아오지만.
           * Dynamic Page 는 일단 JS Bundle 은 받아오지 않는다.
           *
           * SSG = Static Page
           * SSR = Dynamic Page
           *
           * Build Time 에 수행되면 어색한 페이지는 Dynamic Page 로 분류된다.
           * 예를 들어, Query String 에 접근하는 페이지는 요청 이후 알 수 있는 것이기 때문에 미리 JS Bundle(= page.tsx) 을 로드해올 수 없는 것.
           */}
          <Link href="/blog/1">Blog 1</Link>
        </header>
        {children}
      </body>
    </html>
  );
}
