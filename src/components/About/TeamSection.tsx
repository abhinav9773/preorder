/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Linkedin } from "lucide-react";

// Define the team member type
interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  LinkedinURL: string;
  founderMessage?: string;
  tags: string[];
}

// Define the tag type
interface Tag {
  id: string;
  label: string;
}

// Sample team data
const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "SAIPRASAD PANDILWAR",
    role: "Founder",
    image: "/team/SaiPrasad.png",
    LinkedinURL: "https://www.linkedin.com/in/saiprasadpandilwar",
    founderMessage:
      'Muffin, the chief morale officer, and inspiration for MyPerro, isn\'t just a dog. He\'s like a little kid with fluffy fur, a wet nose, and a wagging tail full of boundless love. But that all changed one day. He returned from a boarding facility covered in ticks and fleas, with fear in his eyes and his tail tucked between his legs, pleading for help. It was clear he had been mistreated, and we almost lost him. From that moment, MyPerro was born. Here, your "perro" is treated just like it is "MyPerro" with love, care, and all the attention it deserves.',
    tags: ["founders"],
  },
  {
    id: "2",
    name: "MANAN VYAS",
    role: "Co-Founder",
    image: "/team/manan.png",
    LinkedinURL: "https://www.linkedin.com/in/manan-vyas-b13667252",
    founderMessage:
      "Growing up in a household where dogs are treated as members of the family, I absorbed the deep-seated passion my parents had for caring for dogs. What propels me forward is the recognition of a persistent problem that has plagued pet owners for years, including my own family: the need for effective solutions in pet care that truly address the challenges faced by both pets and their owners. It is this realization that serves as the driving force behind MyPerro.",
    tags: ["founders"],
  },
  {
    id: "3",
    name: "Shruti Jha",
    role: "IoT Developer",
    image: "/team/sruti.jpg",
    LinkedinURL: "https://www.linkedin.com/in/shruti-jha-4b0976228",
    tags: ["iot developers"],
  },
  {
    id: "4",
    name: "Dhanesh Baheti",
    role: "IOT Developer",
    image: "/team/dhaneshbaheti.jpeg",
    LinkedinURL: "https://www.linkedin.com/in/dhaneshbaheti",
    tags: ["iot developers"],
  },
    {
    id: "5",
    name: "Rushikesh Patil",
    role: "Web Developer",
    image: "/team/Rushi.jpg",
    LinkedinURL: "https://www.linkedin.com/in/rushikesh1503/",
    tags: ["web developers"],
  },
  {
    id: "6",
    name: "Harsh Dalmia",
    role: "Web Developer",
    image: "/team/harsh.jpg",
    LinkedinURL: "https://www.linkedin.com/in/harsh-dalmia-605995221",
    tags: ["web developers"],
  },

  {
    id: "7",
    name: "Nageshwar Kumar ",
    role: "IoT Developer",
    image: "/team/nageshwar.jpeg",
    LinkedinURL: "https://www.linkedin.com/in/nageshwar-kumar-mehta",
    tags: ["iot developers"],
  },
  {
    id: "8",
    name: "Dhriti Garg",
    role: "Marketing Head",
    image: "/team/Dhriti.jpg",
    LinkedinURL: "https://www.linkedin.com/in/dhriti-garg-a092a2353",
    tags: ["marketing"]
  },
  {
    id: "9",
    name: "Devi Abhirami S",
    role: "UI UX & Graphic Designer",
    image: "/team/DeviAbhirami.jpg",
    LinkedinURL: "https://www.linkedin.com/in/devi-abhirami-088605303",
    tags: ["uiux designers"]
  },
  {
    id: "10",
    name: "Bhargav Mahanta",
    role: "Social Media Intern",
    image: "/team/bhargav.jpg",
    LinkedinURL: "https://www.linkedin.com/in/bhargav-mahanta-44583a243",
    tags: ["marketing"]
  },
  {
    id: "11",
    name: "Kunwar Shaurya Pratap Singh",
    role: "UI UX & Graphic Designer",
    image: "/team/Kunvar.jpg",
    LinkedinURL: "https://www.linkedin.com/in/kunwar-shaurya-24581529b",
    tags: ["uiux designers"]
  },
  {
    id: "12",
    name: "Dhileebha B",
    role: "UI UX & Graphic Designer",
    image: "/team/dhileebha.jpg",
    LinkedinURL: "https://www.linkedin.com/in/dhileebha",
    tags: ["uiux designers"]
  },
  {
    id: "13",
    name: "Padmasravya Konchada",
    role: "IoT Intern",
    image: "/team/padmasravya.jpg",
    LinkedinURL: "https://www.linkedin.com/in/padmasravya-konchada-11103828b",
    tags: ["iot developers"]
  },
  {
    id: "14",
    name: "Manasvi Tyagi",
    role: "IoT Intern",
    image: "/team/manasvi.jpg",
    LinkedinURL: "https://www.linkedin.com/in/manasvi-tyagi-412634294",
    tags: ["iot developers"]
  },
  {
    id: "15",
    name: "Anoushka P.A",
    role: "Social Media Intern",
    image: "/team/anoushka.jpg",
    LinkedinURL: "https://www.linkedin.com/in/anoushka-p-a-b00a4730a",
    tags: ["marketing"]
  },
  {
    id: "16",
    name: "Riddhi L",
    role: "Social Media Intern",
    image: "/team/Riddhi.jpg",
    LinkedinURL: "https://www.linkedin.com/in/riddhi-l-374826319",
    tags: ["marketing"]
  },
  {
    id: "17",
    name: "Jeevitesh Singh",
    role: "Social Media Intern",
    image: "/team/jeevitesh.jpg",
    LinkedinURL: "https://www.linkedin.com/in/jeevitesh-singh-9685982b7",
    tags: ["marketing"]
  },
  {
    id: "18",
    name: "KAARMUKILAN A G",
    role: "IoT Intern",
    image: "/team/kaarmukilan.jpg",
    LinkedinURL: "https://www.linkedin.com/in/kaarmukilan-a-g-809a71304",
    tags: ["iot developers"]
  },
  {
    id: "19",
    name: "Aman Singh",
    role: "Backend Intern",
    image: "/team/aman.jpg",
    LinkedinURL: "https://www.linkedin.com/in/amansingh2112",
    tags: ["web developers"]
  }
];


// Initial tags
const initialTags: Tag[] = [
  { id: "founders", label: "FOUNDERS" },
  { id: "web developers", label: "WEB DEVELOPERS" },
  { id: "iot developers", label: "IOT DEVELOPERS" },
  { id: "uiux designers", label: "UI/UX DESIGNERS" },
  { id: "marketing", label: "MARKETING" },
];

export default function TeamSection() {
  const [activeTag, setActiveTag] = useState<string>("founders");
  const [tags, setTags] = useState<Tag[]>(initialTags);

  const handleTagClick = (tagId: string) => {
    if (tagId === activeTag) return;

    const prevActiveTagIndex = tags.findIndex((tag) => tag.id === activeTag);
    const newTags = [...tags];

    if (prevActiveTagIndex !== -1) {
      const [prevActiveTag] = newTags.splice(prevActiveTagIndex, 1);
      newTags.push(prevActiveTag);
    }

    setActiveTag(tagId);
    setTags(newTags);
  };
  const filteredMembers = teamMembers.filter((member) =>
    member.tags.includes(activeTag)
  );

  return (
    <section className="py-16 px-4 mt-5 w-full min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-8xl font-borela font-bold text-center text-[#333333] mb-4">
          MEET OUR TEAM
        </h1>
        <p className="text-center text-gray-600 font-montserrat max-w-2xl text-2xl mx-auto mb-12">
          Meet our exceptional team at MyPerro! Comprising diverse talents and
          expertise, we are a dedicated group committed to deliver quality
          services.
        </p>

        <div className="flex flex-wrap justify-center gap-6 mb-12 font-borela ">
          <AnimatePresence initial={false}>
            {tags.map((tag) => (
              <motion.button
                key={tag.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, type: "spring" }}
                className={`font-medium text-3xl ${activeTag === tag.id ? "text-[#333333]" : "text-gray-400"
                  } hover:text-[#333333] transition-colors`}
                onClick={() => handleTagClick(tag.id)}
              >
                #{tag.label}
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {activeTag != "founders" &&
              filteredMembers.map((member) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-3xl p-4 shadow-sm"
                >
                  <div className="relative">
                    <div className="rounded-full overflow-hidden w-full aspect-square bg-gray-100 relative">
                      <Image
                        src={member.image || "/team/profilePhoto.jpg"}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <button
                      onClick={() => window.open(member.LinkedinURL, "_blank")}
                      className="absolute top-2 right-2 bg-[#e6a06e] text-white p-2 rounded-full"
                      aria-label="LinkedIn Profile"
                    >
                      <Linkedin size={20} />
                    </button>
                  </div>
                  <div className="text-center mt-4">
                    <h3 className="font-bold text-background text-lg">
                      {member.name}
                    </h3>
                    <p className="text-gray-600">{member.role}</p>
                  </div>
                </motion.div>
              ))}

            {activeTag === "founders" &&
              filteredMembers.map((member) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="col-span-1 sm:col-span-2 md:col-span-full bg-white rounded-3xl p-4 sm:p-6 shadow-sm"
                >
                  <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
                    <div className="w-full lg:w-1/4 flex flex-col items-center">
                      <div className="relative w-full max-w-[250px] mx-auto">
                        <div className="rounded-lg overflow-hidden w-full aspect-[3/4] bg-gray-100 relative">
                          <Image
                            src={member.image || "/team/profilePhoto.jpg"}
                            alt={member.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <button
                          onClick={() =>
                            window.open(member.LinkedinURL, "_blank")
                          }
                          className="absolute top-2 right-2 bg-[#e6a06e] text-white p-2 rounded-full"
                          aria-label="LinkedIn Profile"
                        >
                          <Linkedin size={20} />
                        </button>
                      </div>
                      <div className="text-center mt-3 lg:mt-4 w-full">
                        <h3 className="font-bold text-background text-xl">
                          {member.name}
                        </h3>
                        <p className="text-gray-600">{member.role}</p>
                      </div>
                    </div>

                    {member.founderMessage && (
                      <div className="w-full lg:w-3/4 mt-4 lg:mt-0">
                        {/* <div className="text-center mt-2 block lg:hidden">
                    <h3 className="font-bold text-background text-xl">
                    {member.name}
                    </h3>
                    <p className="text-gray-600">{member.role}</p>
                  </div> */}
                        <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border-l-4 border-[#e6a06e] flex items-center h-full mt-2 md:mt-4">
                          <p className="text-gray-700 italic font-montserrat text-left text-sm sm:text-base">
                            "{member.founderMessage}"
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
