import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is ZeroGuru?",
    answer:
      "ZeroGuru is an AI-powered code analysis tool that helps developers, educators, and learners understand code logic through detailed explanations and visual execution flow diagrams. It uses Google's Gemini AI to break down complex code into understandable steps.",
  },
  {
    question: "How does ZeroGuru work?",
    answer:
      "Simply select a programming language, enter your code in the Monaco editor, and click 'Analyze Code'. ZeroGuru sends your code to Google's Gemini AI, which generates a comprehensive explanation and step-by-step execution breakdown. The results are then displayed with an interactive flow visualization.",
  },
  {
    question: "What programming languages are supported?",
    answer:
      "ZeroGuru supports multiple programming languages including JavaScript, Python, Java, C++, and many others. The language selection dropdown shows all available options.",
  },
  {
    question: "Is there a limit on code length?",
    answer:
      "While there's no strict character limit, very large code snippets may take longer to process or could exceed API limits. For best results, focus on specific functions or code blocks rather than entire large files.",
  },
  {
    question: "How accurate is the AI analysis?",
    answer:
      "ZeroGuru uses Google's Gemini AI model, which provides high-quality analysis. However, like any AI tool, it may occasionally make minor errors. The analysis is designed to be educational and should be used as a learning aid rather than definitive technical documentation.",
  },
  {
    question: "Is my code stored or shared?",
    answer:
      "Your code is processed temporarily for analysis and is not stored permanently on our servers. We prioritize user privacy and do not share or sell user data. Code is only used for the analysis request and discarded afterward.",
  },
  {
    question: "Can I use ZeroGuru for learning programming?",
    answer:
      "Absolutely! ZeroGuru is designed to help learners understand code logic, execution flow, and programming concepts. It's particularly useful for breaking down complex algorithms, understanding control flow, and learning how different programming constructs work.",
  },
  {
    question: "What are the rate limits?",
    answer:
      "To ensure fair usage for all users, ZeroGuru implements rate limiting of 2 requests per minute per IP address. If you exceed this limit, you'll receive a 429 status code and need to wait before making another request.",
  },
  {
    question: "Is ZeroGuru free to use?",
    answer:
      "Yes, ZeroGuru is currently free to use. However, usage may be subject to change in the future, and the rate limiting helps ensure the service remains available for all users.",
  },
  {
    question: "How can I report issues or provide feedback?",
    answer:
      "You can report issues or provide feedback by visiting the repository. Feel free to open issues for bugs, feature requests, or general feedback.",
  },
  {
    question: "Can I contribute to ZeroGuru?",
    answer:
      "Yes! ZeroGuru is an open-source project. Contributions are welcome through our GitHub repository. You can help improve the codebase, add new features, fix bugs, or improve documentation.",
  },
  {
    question: "What technologies power ZeroGuru?",
    answer:
      "ZeroGuru is built with Next.js 16 and React 19, uses Google's Gemini AI for analysis, Monaco Editor for code input, React Flow for visualizations, and Tailwind CSS with Shadcn UI components for the interface.",
  },
];

export default function FAQ() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Everything you need to know about ZeroGuru and how to make the
              most of it.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg font-semibold text-left cursor-pointer">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="text-center mt-12">
            <p className="text-muted-foreground">
              Still have questions?{" "}
              <a
                href="https://github.com/zeropse/zeroguru"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Contact us on GitHub
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
