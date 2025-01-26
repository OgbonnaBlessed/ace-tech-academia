import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion";

const FAQ = () => {
    const faqSections = [
        {
        sectionId: "getting-started",
        sectionTitle: "Getting Started",
        questions: [
            {
            question: "How do I create an account?",
            answer:
                "To create an account, click on the 'Sign Up' button at the top right corner of the page. Fill in your details, verify your email, and you're good to go.",
            },
            {
            question: "Can I try the platform for free?",
            answer:
                "Yes, we offer a free trial for 14 days. During this period, you can explore all features of the platform without any commitment.",
            },
        ],
        },
        {
        sectionId: "courses",
        sectionTitle: "Courses and Learning Materials",
        questions: [
            {
            question: "How can I access the courses I enrolled in?",
            answer:
                "Once you enroll in a course, you can access it by navigating to the 'My Courses' section in your dashboard.",
            },
            {
            question: "Are the courses self-paced?",
            answer:
                "Yes, all courses are self-paced, allowing you to learn at your convenience.",
            },
        ],
        },
        {
        sectionId: "payments",
        sectionTitle: "Payments and Subscriptions",
        questions: [
            {
            question: "What payment methods do you accept?",
            answer:
                "We accept major credit cards, PayPal, and bank transfers. For detailed information, visit the 'Payments' page.",
            },
            {
            question: "Can I cancel my subscription?",
            answer:
                "Yes, you can cancel your subscription at any time in the 'Billing' section of your account settings.",
            },
        ],
        },
        {
        sectionId: "technical-support",
        sectionTitle: "Technical Support",
        questions: [
            {
            question: "What should I do if I encounter technical issues?",
            answer:
                "If you encounter any technical issues, contact our support team through the 'Help Center' or email support@example.com.",
            },
            {
            question: "Which browsers are supported?",
            answer:
                "Our platform works best on the latest versions of Chrome, Firefox, Safari, and Edge.",
            },
        ],
        },
        {
        sectionId: "certifications",
        sectionTitle: "Certifications",
        questions: [
            {
            question: "Will I receive a certificate after completing a course?",
            answer:
                "Yes, you will receive a certificate of completion for every course you finish successfully.",
            },
            {
            question: "Can I add my certificate to LinkedIn?",
            answer:
                "Absolutely! You can download your certificate and upload it to your LinkedIn profile under 'Licenses and Certifications'.",
            },
        ],
        },
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold text-center mb-6">Frequently Asked Questions</h2>
            <Accordion type="multiple">
                {faqSections.map((section) => (
                    <AccordionItem 
                        key={section.sectionId} 
                        value={section.sectionId}
                        className="border-b border-customgreys-secondarybg"
                    >
                        <AccordionTrigger>{section.sectionTitle}</AccordionTrigger>
                        <AccordionContent>
                            <ul>
                                {section.questions.map((q, index) => (
                                    <li key={index} className="mb-4">
                                        <h4 className="font-semibold">{q.question}</h4>
                                        <p className="text-sm text-muted-foreground">{q.answer}</p>
                                    </li>
                                ))}
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
};

export default FAQ;