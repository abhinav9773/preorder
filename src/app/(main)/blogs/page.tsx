import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselItem,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import BlogCard from "@/components/Blogs/BlogCard";
import MobileBlogCard from "@/components/Blogs/MobileBlogCard";
import { MoveUpRight } from "lucide-react";
import Newsletter from "@/components/Newsletter/Newsletter";
import { BlogData } from "@/types/blog";
import Hero from "@/components/Blogs/Hero";
export const metadata = {
  title: "Blogs",
  description:
    "Stay informed with pet care tips, product updates, and innovations in smart pet tech from MyPerro.",
};

const Blogs = async () => {
  const blogs: BlogData[] = [];
  try {
    const baseUrl =
      process.env.API_URL ||
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000");

    const res = await fetch(`${baseUrl}/api/blog`);

    if (!res.ok) {
      throw new Error(`Failed to fetch blogs: ${res.status}`);
    }

    const rawBlogs = await res.json();

    const processedBlogs: BlogData[] = rawBlogs.map((entry: any) => {
      const data = entry.blogData || entry;

      return {
        id: data.id || entry.id,
        metadata: data.metadata,
        title: data.title,
        author: data.author,
        authorPosition: data.authorPosition,
        backgroundImage: data.backgroundImage,
        content: data.content,
      };
    });

    blogs.push(...processedBlogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
  }

  if (blogs.length === 0) {
    return (
      <div className="text-black p-8 min-h-screen flex items-center justify-center">
        <p className="text-xl">No blogs found. Please check back later.</p>
      </div>
    );
  }

  const [featured, ...otherBlogs] = blogs;

  return (
    <div className="bg-foreground max-w-[85vw] min-h-screen text-center flex flex-col items-center mt-4">
      <Hero />

      <h1 className="font-borela text-4xl sm:text-5xl md:text-7xl text-center md:text-left text-background md:self-start mt-12 md:mt-0">
        <p className="md:block hidden">
          RECENT ARTICLES
          <br />
          TO READ
        </p>
        <p className="md:hidden block">RECENTLY ADDED</p>
      </h1>

      {/* FEATURED BLOG SECTION */}
      <div className="relative w-full mt-12 rounded-3xl overflow-hidden">
        <Image
          src={featured.backgroundImage}
          height={10000}
          width={10000}
          alt="Blog's Background Image"
          className="h-[14rem] md:h-[40rem] w-full object-cover filter blur-sm brightness-75"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black opacity-40 rounded-3xl"></div>

        <div className="absolute inset-0 flex flex-col justify-end text-left p-4 md:p-8 md:py-14 rounded-3xl bg-gradient-to-t from-black/50 to-transparent">
          <div className="flex flex-row w-full justify-between items-center mb-3 md:mb-8">
            <h2 className="text-white text-xl md:text-6xl font-montserrat font-semibold ">
              {featured.title}
            </h2>
            <MoveUpRight
              color="white"
              className="w-10 md:hidden block text-background h-10 bg-primary rounded-full p-2"
            />
          </div>

          <p className="text-white/90 font-montserrat text-sm md:text-xl hidden md:inline font-medium mb-4 md:mb-12 w-1/2">
            {featured.content[0]?.[0]?.type === "paragraph"
              ? featured.content[0][0].text.slice(0, 180) + "..."
              : ""}
          </p>

          <div className="hidden md:block relative">
            <Link href={`/blogs/${featured.id}`}>
              <button
                type="button"
                className="font-montserrat font-semibold text-md w-fit px-12 py-3 bg-background text-white rounded-full hover:bg-gray-700 transition-colors flex flex-row justify-between pl-4 gap-x-5 pr-2 items-center gap-2"
              >
                READ ARTICLE
                <MoveUpRight className="w-6 text-background h-6 bg-primary rounded-full p-1" />
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* DESKTOP GRID FOR OTHER BLOGS */}
      <div className="md:grid grid-cols-1 md:grid-cols-2 gap-32 mt-12 hidden">
        {otherBlogs.map((blog, index) => (
          <BlogCard
            key={index}
            blogId={blog.id}
            image={blog.backgroundImage}
            title={blog.title}
            description={
              blog.content[0]?.[0]?.type === "paragraph"
                ? blog.content[0][0].text.slice(0, 160) + "..."
                : ""
            }
          />
        ))}
      </div>

      {/* MOBILE CAROUSEL FOR OTHER BLOGS */}
      <div className="md:hidden w-full mt-12">
        <Carousel className="w-full">
          <CarouselNext />
          <CarouselPrevious />
          <CarouselContent>
            {otherBlogs.map((blog, index) => (
              <CarouselItem key={index}>
                <MobileBlogCard
                  blogId={blog.id}
                  image={blog.backgroundImage}
                  title={blog.title}
                  description={
                    blog.content[0]?.[0]?.type === "paragraph"
                      ? blog.content[0][0].text.slice(0, 160) + "..."
                      : ""
                  }
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <Newsletter />
    </div>
  );
};

export default Blogs;
