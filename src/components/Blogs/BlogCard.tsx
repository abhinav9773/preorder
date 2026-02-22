import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
interface BlogCardProps {
  blogId: string;
  image: string | StaticImageData;
  title: string;
  description: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  blogId,
  image,
  title,
  description,
}) => {
  return (
    <div className="overflow-hidden">
      <div className="relative h-[16rem]">
        <Image
          src={image}
          alt={title}
          className="object-cover rounded-3xl"
          fill
        />
      </div>
      <div className="p-6 font-montserrat text-left">
        <h2 className="text-2xl text-black font-semibold mb-3">{title}</h2>
        <p className="text-gray-600 text-sm  mb-4 line-clamp-3">
          {description}
        </p>
        <Link href={`/blogs/${blogId}`}>
          <button className="text-black  font-medium underline">
            Read Article
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
