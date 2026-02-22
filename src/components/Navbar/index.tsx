"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import WaitlistForm from "../WaitlistForm";
import { MoveUpRight } from "lucide-react";

const NavBar = () => {
  const navLinks = [
    { name: "PRODUCT", href: "/#product" },
    // { name: "SERVICES", href: "/services" },
    { name: "ABOUT US", href: "/about" },
    { name: "BLOGS", href: "/blogs" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [prevScrollpos, setPrevScrollpos] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    if (href === "/#product") {
      return pathname === "/";
    }
    if (href !== "/") {
      return pathname.startsWith(href);
    }
    return false;
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const navbar = document.getElementById("navbar");

      if (navbar) {
        // Show navbar when scrolling up, hide when scrolling down
        // Only apply this behavior after scrolling past a certain threshold (e.g., 100px)
        if (currentScrollPos > 100) {
          if (prevScrollpos > currentScrollPos) {
            // Scrolling up - show navbar
            navbar.style.top = "0";
            setIsOpen(false); // Close mobile menu when scrolling
          } else {
            // Scrolling down - hide navbar
            navbar.style.top = "-100px";
            setIsOpen(false); // Close mobile menu when scrolling
          }
        } else {
          // Always show navbar when near the top
          navbar.style.top = "0";
        }
      }

      setPrevScrollpos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollpos]);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex justify-center w-full py-1.5 md:py-3 h-[9vh] bg-foreground shadow-lg"
      id="navbar"
      style={{ transition: "top 0.5s ease-in-out" }}
    >
      <div className="flex justify-between items-center w-[95%] md:w-[90%] lg:min-w-[85%] text-background">
        <div className="h-9 sm:h-10 md:h-14">
          <Link href="/">
            <Image
              src="/logo-black.svg"
              alt="logo"
              width={1000}
              height={1000}
              className="h-full w-auto object-contain"
              priority
            />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center text-base xl:text-xl font-montserrat font-medium">
          <ul className="flex gap-5 xl:gap-8 items-center">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={
                    isActive(link.href)
                      ? "text-primary font-semibold transition-all duration-150"
                      : "hover:text-primary transition-all duration-150"
                  }
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li className="flex gap-5 xl:gap-8 items-center">
              <Link href="/preorder" target="_blank">
                <button className="px-4 py-2 bg-[#FF6600] text-white rounded-full font-montserrat font-semibold text-sm hover:bg-primary transition-all flex items-center gap-2">
                  <span>PREORDER NOW</span>
                  <MoveUpRight className="w-4 h-4 text-white bg-black rounded-full p-0.5" />
                </button>
              </Link>
            </li>
          </ul>
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            {" "}
            <SheetTrigger className="p-1 md:p-2">
              <Image
                src="/ham.svg"
                alt="menu"
                width={1000}
                height={1000}
                className="h-6 w-6 sm:h-7 sm:w-7"
              />
            </SheetTrigger>
            <SheetContent side="right" className="w-[80vw] max-w-[300px]">
              <div className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={
                      isActive(link.href)
                        ? "text-lg font-montserrat font-semibold text-primary"
                        : "text-lg font-montserrat font-medium hover:text-primary transition-all duration-150"
                    }
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="mt-4 pt-4 border-t">
                  <Link href="/preorder" target="_blank">
                    <button className="px-4 py-2 bg-[#FF6600] text-white rounded-full font-montserrat font-semibold text-sm hover:bg-primary transition-all flex items-center gap-2">
                      <span>PREORDER NOW</span>
                      <MoveUpRight className="w-4 h-4 text-white bg-black rounded-full p-0.5" />
                    </button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Contact Button (Desktop) */}
        <Link href="/contact" className="hidden lg:block">
          <button className="bg-background text-white px-2 py-1.5 lg:px-4 lg:py-2 rounded-lg text-sm lg:text-base font-montserrat font-medium whitespace-nowrap">
            CONTACT US
          </button>
        </Link>
      </div>

      <WaitlistForm isOpen={showForm} onClose={() => setShowForm(false)} />
    </nav>
  );
};

export default NavBar;
