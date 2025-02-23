"use client";

// next/router 의 useRouter() 는 더 이상 사용되지 않는다.
import { useRouter } from "next/navigation";

import { useState } from "react";

// @see https://nextjs.org/docs/app/getting-started/project-structure#colocation

export default function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.push(`/search?q=${query}`);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={query} onChange={handleChange} />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}
