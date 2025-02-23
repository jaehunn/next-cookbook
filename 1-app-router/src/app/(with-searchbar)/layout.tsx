// Route Groups
// @see https://nextjs.org/docs/app/building-your-application/routing/route-groups

// 경로에 상관없이 그룹핑된 페이지는 동일한 layout.tsx 을 적용할 수 있다.

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div>Search Bar</div>
      {children}
    </div>
  );
}
