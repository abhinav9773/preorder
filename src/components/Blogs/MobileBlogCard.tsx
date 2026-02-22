import React from "react";
import Image, { StaticImageData } from "next/image";
import { MoveUpRight } from "lucide-react";
import Link from "next/link";
interface MobileBlogCardProps {
  image: string | StaticImageData;
  title: string;
  description: string;
  blogId: string;
}

const MobileBlogCard: React.FC<MobileBlogCardProps> = ({
  image,
  title,
  description,
  blogId,
}) => {
  return (
    <div className="overflow-hidden bg-white rounded-3xl p-6">
      <div className="relative h-[14rem]">
        <Image
          src={image}
          alt={title}
          className="object-cover rounded-3xl"
          fill
        />
      </div>
      <div className="p-4 font-montserrat text-left">
        <h2 className="text-xl text-black font-semibold mb-3">{title}</h2>
        <p className="text-gray-600 text-sm  mb-4 line-clamp-3">
          {description}
        </p>
        <div className="relative">
          <Link href={`/blogs/${blogId}`}>
            <button
              type="submit"
              className="font-montserrat font-semibold text-sm w-fit px-8 py-2 bg-primary text-white rounded-full transition-colors flex flex-row justify-between pl-4 gap-x-5 pr-2 items-center gap-2"
            >
              READ FULL BLOG
              <MoveUpRight
                color="white"
                className="w-6 text-background h-6 bg-[#A05514] rounded-full p-1"
              />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileBlogCard;
