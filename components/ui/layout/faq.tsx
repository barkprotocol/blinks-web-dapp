import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
  
  const faqs = [
    {
      question: "What is BARK BLINK?",
      answer: "BARK BLINK is a cutting-edge development platform designed to streamline and accelerate Solana blockchain integration. Our innovative Blinks technology allows developers to create powerful, efficient, and secure decentralized applications with unprecedented ease."
    },
    {
      question: "How does BARK BLINK work with Solana?",
      answer: "BARK BLINK provides a set of tools and SDKs that seamlessly integrate with the Solana blockchain. Our Blinks technology optimizes transactions and smart contract interactions, allowing for faster and more efficient development of Solana-based applications."
    },
    {
      question: "Is BARK BLINK suitable for beginners?",
      answer: "Yes, BARK BLINK is designed to be user-friendly for developers of all skill levels. We provide comprehensive documentation, tutorials, and support to help beginners get started with Solana development quickly and easily."
    },
    {
      question: "How secure is BARK BLINK?",
      answer: "Security is our top priority. BARK BLINK undergoes regular security audits and implements best practices to ensure the safety of your applications and transactions. Our infrastructure is built with multiple layers of security to protect against potential threats."
    },
  ]
  
  export default function FAQSection() {
    return (
      <section className="container mx-auto px-4 py-20">
        <Card className="bg-background">
          <CardHeader className="text-center mb-12">
            <p className="text-sm font-semibold tracking-wide uppercase text-primary">FAQ</p>
            <CardTitle className="mt-2 text-3xl font-extrabold sm:text-4xl md:text-5xl">
              Frequently Asked Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-base sm:text-lg font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm sm:text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </section>
    )
  }