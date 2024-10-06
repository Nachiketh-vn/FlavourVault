import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is the QR Menu App?",
    answer:
      "The QR Menu App allows restaurants to convert their physical menus into digital QR codes, enabling customers to access the menu by scanning the code with their smartphones.",
  },
  {
    question: "How does the QR code work?",
    answer:
      "Each restaurant uploads their menu, which is then converted into a unique QR code. When scanned, the code directs users to the restaurant's online menu.",
  },
  {
    question: "How do I create a QR code for my menu?",
    answer:
      "Simply register on the app, upload a photo of your menu, and follow the prompts to generate your unique QR code.",
  },
  {
    question: "Is there a limit to the number of menus I can create?",
    answer:
      "No, you can create as many menus as you need for your restaurant. Each menu will generate a separate QR code.",
  },
  {
    question: "Can I update my menu after generating a QR code?",
    answer:
      "Yes, you can update your menu anytime, and the changes will reflect in the QR code link without needing to create a new code.",
  },
  {
    question: "Is the QR Menu App user-friendly?",
    answer:
      "Absolutely! The app is designed with a clean, intuitive interface for easy navigation and menu management.",
  },
  {
    question: "What devices can scan the QR codes?",
    answer:
      "Any smartphone with a camera and QR code scanning capability can scan the codes and access the digital menu.",
  },
  {
    question: "Is there an analytics feature in the app?",
    answer:
      "Yes, the app provides analytics on menu views and customer interactions, helping you understand your menu's performance.",
  },
  {
    question: "How secure is my data?",
    answer:
      "We take data security seriously. Your restaurant data is stored securely, and we adhere to industry standards for data protection.",
  },
  {
    question: "Is it accessible?",
    answer: "Yes. It adheres to the WAI-ARIA design pattern.",
  },
];

function Page() {
  return (
    <div>
      <Navbar />
      <div className="p-4 md:p-8 lg:p-12">
        {" "}
        {/* Responsive padding */}
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-white">
          Frequently Asked Questions
        </h1>
        <Accordion type="single" collapsible>
          {faqs.map((faq, index) => (
            <AccordionItem key={`faq-${index}`} value={`item-${index}`}>
              <AccordionTrigger className="text-white text-lg md:text-xl">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-300 text-base md:text-lg">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <Footer />
    </div>
  );
}

export default Page;
