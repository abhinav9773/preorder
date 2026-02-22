import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Preorder",
  description: "Reserve your MyPerro smart collar today.",
};

export default function PreorderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#080808] text-white min-h-screen overflow-x-hidden">
      {children}
    </div>
  );
}
