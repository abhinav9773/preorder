import React from "react";
import AccordionItem from "@/components/ui/accordion-custom";

export default function FAQ() {
  const faqs = [
    {
      title: "What is a smart collar?",
      description:
        "A smart collar is a collar that is designed to help you keep track of your pet. It is equipped with GPS technology that allows you to track your pet's location in real-time. Some smart collars also come with additional features such as activity tracking, health monitoring, and more.",
    },
    {
      title: "How does a smart collar work?",
      description:
        "A smart collar works by using GPS technology to track your pet's location. The collar is equipped with a GPS chip that communicates with satellites to determine your pet's location. The collar then sends this information to your smartphone, allowing you to track your pet in real-time.",
    },
    {
      title: "What are the benefits of using a smart collar?",
      description:
        "There are many benefits to using a smart collar. Some of the key benefits include: - Real-time location tracking: You can track your pet's location in real-time, giving you peace of mind knowing that your pet is safe. - Activity tracking: Some smart collars come with activity tracking features that allow you to monitor your pet's activity levels. - Health monitoring: Some smart collars also come with health monitoring features that allow you to monitor your pet's health and well-being.",
    },
    {
      title: "How do I choose the right smart collar for my pet?",
      description:
        "When choosing a smart collar for your pet, there are a few key factors to consider. These include: - Size: Make sure to choose a collar that fits your pet comfortably. - Features: Consider what features are important to you, such as real-time location tracking, activity tracking, and health monitoring. - Battery life: Make sure to choose a collar with a battery life that meets your needs. - Durability: Choose a collar that is durable and able to withstand your pet's activities.",
    },
    {
      title: "How do I set up my smart collar?",
      description:
        "Setting up your smart collar is easy. Simply follow the instructions that come with your collar to pair it with your smartphone. Once paired, you can customize the settings to meet your needs.",
    },
    {
      title: "How do I charge my smart collar?",
      description:
        "To charge your smart collar, simply connect it to the charging cable that comes with the collar. Plug the cable into a power source, and your collar will begin charging. Make sure to charge your collar regularly to ensure that it is always ready to use.",
    },
  ];

  return (
    <div id="FAQs" className="w-full py-12 md:py-16 lg:py-24">
      <div className="flex flex-col items-center text-center px-4">
        <h1 className="uppercase text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-borela text-secondary">
          <span className="text-background">everything</span> you
        </h1>
        <h1 className="uppercase text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-borela text-secondary">
          need to know
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl my-3 md:my-5 font-montserrat text-secondary max-w-3xl">
          Find answers to the frequently asked questions about our smart collar
          and what makes it the perfect choice.
        </p>
      </div>
      <div className="space-y-3 md:space-y-5 mt-8 md:mt-12 px-4 sm:px-6 md:px-8">
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            title={faq.title}
            description={faq.description}
          />
        ))}
      </div>
    </div>
  );
}