import ClientComponent from "~/app/search/client-component";

export default function Page() {
  // http://localhost:3000/about 접근

  // Search Bar -> (with-searchbar)/layout.tsx 노출됨.
  // About

  return (
    <div>
      About
      {/* 구성 요소 */}
      {/* 1. RSC Payload(= Server Component): http://localhost:3000/about?_rsc=rxx9e -> page.tsx*/}
      {/* 2. JS Bundle(=Client Component): http://localhost:3000/_next/static/chunks/app/(with-searchbar)/about/page.js -> <ClientComponent/> */}
      <ClientComponent />
    </div>
  );
}
