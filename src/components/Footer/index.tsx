import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Instagram, Linkedin, Twitter, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-background rounded-t-3xl mt-10">
      {/* Desktop Footer */}
      <div className="hidden md:flex relative justify-end py-16 lg:mt-[20vh] xl:mt-[35vh]">
        <Image
          src="/footer-dog.svg"
          alt="footer"
          width={1000}
          height={1000}
          className="absolute hidden lg:block left-0 bottom-0 w-1/3 lg:w-[40%] "
        />
        <div className="w-full lg:w-[60%] h-auto p-6 md:p-10 ml-auto">
          <div className="grid grid-cols-3 gap-4 font-montserrat mb-10">
            <Image
              src="/myperro-logo.png"
              alt="logo"
              width={1000}
              height={1000}
              className="h-20 w-auto object-contain col-span-2"
            />
            <div className="h-full w-auto flex items-center">
              <ul className="flex h-fit gap-4">
                <li className="rounded-full overflow-hidden">
                  <a
                    href="https://www.instagram.com/myperro.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Instagram className="h-10 md:h-12 w-10 md:w-12 p-2 bg-primary text-white" />
                  </a>
                </li>
                <li className="rounded-full overflow-hidden">
                  <a
                    href="https://www.linkedin.com/company/myperroindia?trk=profile-position"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="h-10 md:h-12 w-10 md:w-12 p-2 bg-primary text-white" />
                  </a>
                </li>
                <li className="rounded-full overflow-hidden">
                  <a
                    href="https://x.com/MyPerro_"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Twitter className="h-10 md:h-12 w-10 md:w-12 p-2 bg-primary text-white" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 text-white">
            <div>
              <h3 className="text-xl md:text-2xl uppercase font-bold">
                Company
              </h3>
              <ul className="text-lg lg:text-xl space-y-4 mt-4">
                <li className="cursor-pointer hover:text-primary transition-colors">
                  <Link href="/about">About Us</Link>
                </li>
                <li className="cursor-pointer hover:text-primary transition-colors">
                  <Link href="/about#mission">Our Mission</Link>
                </li>
                <li className="cursor-pointer hover:text-primary transition-colors">
                  <Link href="/about">Careers</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl uppercase font-bold">
                Quick Links
              </h3>
              <ul className="text-lg lg:text-xl space-y-4 mt-4">
                <li className="cursor-pointer hover:text-primary transition-colors">
                  <Link href="/">Smart Collar</Link>
                </li>
                <li className="cursor-pointer hover:text-primary transition-colors">
                  <Link href="/blogs">Blogs</Link>
                </li>
                <li className="cursor-pointer hover:text-primary transition-colors">
                  <Link href="/">Home</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl uppercase font-bold">
                Support
              </h3>
              <ul className="text-lg lg:text-xl space-y-4 mt-4">
                <li className="cursor-pointer hover:text-primary transition-colors">
                  <Link href="/contact">Contact Us</Link>
                </li>
                <li className="cursor-pointer hover:text-primary transition-colors">
                  <Link href="/services#FAQs">FAQs</Link>
                </li>
                <li className="cursor-pointer hover:text-primary transition-colors">
                  <Link href="/about">Privacy Policy</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-white text-sm mt-10 pt-6 border-t border-white/20">
            © {new Date().getFullYear()} MyPerro. All rights reserved.
          </div>
        </div>
      </div>

      {/* Mobile Footer */}
      <div className="md:hidden py-8 px-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Image
              src="/myperro-logo.png"
              alt="logo"
              width={150}
              height={40}
              className="h-14 w-auto object-contain"
            />
          </div>

          <div className="flex gap-1">
            <a
              href="https://www.instagram.com/myperro.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full overflow-hidden bg-primary p-1.5 flex items-center justify-center"
            >
              <Instagram className="h-5 w-5 text-white" />
            </a>
            <a
              href="https://www.linkedin.com/company/myperroindia?trk=profile-position"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full overflow-hidden bg-primary p-1.5 flex items-center justify-center"
            >
              <Linkedin className="h-5 w-5 text-white" />
            </a>
            <a
              href="https://x.com/MyPerro_"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full overflow-hidden bg-primary p-1.5 flex items-center justify-center"
            >
              <Twitter className="h-5 w-5 text-white" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-10 gap-y-3 text-white">
          <div>
            <Link href="/about" className="uppercase text-sm font-semibold">
              About us
            </Link>
          </div>
          <div>
            <Link href="/blogs" className="uppercase text-sm font-semibold">
              Blogs
            </Link>
          </div>
          <div>
            <Link href="/about" className="uppercase text-sm font-semibold">
              Careers
            </Link>
          </div>
          <div>
            <Link href="/contact" className="uppercase text-sm font-semibold">
              Contact us
            </Link>
          </div>
          <div>
            <Link href="/" className="uppercase text-sm font-semibold">
              Smart collar
            </Link>
          </div>
          <div>
            <Link href="/" className="uppercase text-sm font-semibold">
              FAQs
            </Link>
          </div>
          <div>
            <Link href="/services" className="uppercase text-sm font-semibold">
              Services
            </Link>
          </div>
          <div>
            <Link href="/about" className="uppercase text-sm font-semibold">
              Privacy policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
