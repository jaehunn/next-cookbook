export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div>Setting Header</div>
      {children}
    </div>
  );
}
