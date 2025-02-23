"use client";

// import ServerComponent from "./server-component";

export default function ClientComponent({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <div>
      Client Component
      {/* <ServerComponent/> 가 Client Component 화 된다. 브라우저에서도 실행된다. */}
      {/* <ServerComponent/> */}
      {/* Children 으로 서버 컴포넌트를 받아서 처리하면 RSC 를 유지한다. */}
      {children}
    </div>
  );
}
