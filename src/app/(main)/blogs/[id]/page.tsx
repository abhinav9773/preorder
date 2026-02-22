import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { BlogData } from "@/types/blog";
import Newsletter from "@/components/Newsletter/Newsletter";
import Companies from "@/components/Companies/Companies";
import { ArrowLeft } from "lucide-react";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const awaitedParams = await params;

  const baseUrl =
    process.env.API_URL ||
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

  const res = await fetch(`${baseUrl}/api/blog/${awaitedParams.id}`);
  if (!res.ok) return notFound();

  const data = await res.json();
  const blog: BlogData = data.blogData;

  return (
    <div className="w-full max-w-[85vw] mx-auto min-h-screen">
      {/* Floating back button */}
      <Link href="/blogs">
        <button className="fixed bottom-8 right-8 z-40 bg-primary hover:bg-orange-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center">
          <ArrowLeft className="w-6 h-6" />
        </button>
      </Link>

      {/* Hero section with background */}
      <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-3xl mt-10 md:mt-15">
        <Image
          src={blog.backgroundImage}
          alt="Blog Background"
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />

        {/* Content overlay */}
        <div className="absolute inset-0 flex flex-col justify-end text-left p-4 md:p-8 rounded-3xl bg-gradient-to-t from-black/60 to-transparent">
          <h1 className="text-white text-3xl md:text-6xl font-borela font-semibold mb-4">
            {blog.title}
          </h1>
          <p className="text-white/90 font-montserrat text-lg md:text-xl mb-2">
            By {blog.author}
          </p>
          <p className="text-white/80 font-montserrat text-md md:text-lg">
            {blog.authorPosition}
          </p>
        </div>
      </div>

      {/* Content container */}
      <div className="relative flex flex-col bg-white rounded-3xl shadow-md p-6 md:p-12 mt-8 mb-16">
        {/* Content sections */}
        {blog.content.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-8">
            {section.map((block, blockIndex) => {
              switch (block.type) {
                case "heading":
                  return (
                    <h2
                      key={blockIndex}
                      className="text-3xl md:text-4xl font-borela text-gray-800 mb-6 mt-8 first:mt-0"
                    >
                      {block.text}
                    </h2>
                  );
                case "paragraph":
                  return (
                    <p
                      key={blockIndex}
                      className="text-lg md:text-xl font-montserrat text-gray-700 mb-6 leading-relaxed"
                    >
                      {block.text}
                    </p>
                  );
                case "image":
                  return (
                    <div
                      key={blockIndex}
                      className="flex justify-center w-full my-8 rounded-2xl overflow-hidden"
                    >
                      <Image
                        src={block.src}
                        alt={block.alt || "Blog image"}
                        width={800}
                        height={500}
                        className="w-full h-auto object-contain max-w-2xl"
                      />
                    </div>
                  );
                case "image-caption":
                  return (
                    <p
                      key={blockIndex}
                      className="text-center text-md md:text-lg font-montserrat text-gray-600 italic mb-6"
                    >
                      {block.text}
                    </p>
                  );
                case "note":
                  return (
                    <div
                      key={blockIndex}
                      className="bg-primary/10 border-l-4 border-primary p-6 my-6 rounded-lg"
                    >
                      <p className="text-md md:text-lg font-montserrat text-gray-700">
                        {block.text}
                      </p>
                    </div>
                  );
                default:
                  return null;
              }
            })}
          </div>
        ))}
      </div>

      <Newsletter />
      <Companies />
    </div>
  );
}
