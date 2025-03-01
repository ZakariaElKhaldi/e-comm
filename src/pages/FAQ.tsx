import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface FAQCategory {
  id: string;
  title: string;
  questions: {
    id: string;
    question: string;
    answer: string;
  }[];
}

const FAQ = () => {
  const [openQuestions, setOpenQuestions] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState('shipping');

  const faqCategories: FAQCategory[] = [
    {
      id: 'shipping',
      title: 'Shipping & Delivery',
      questions: [
        {
          id: 'shipping-1',
          question: 'How long does shipping take?',
          answer: 'Standard shipping typically takes 3-5 business days within the continental US. Express shipping options are available for faster delivery.'
        },
        {
          id: 'shipping-2',
          question: 'Do you ship internationally?',
          answer: 'Yes, we ship to most countries worldwide. International shipping times vary by location and typically take 7-14 business days.'
        },
        {
          id: 'shipping-3',
          question: 'How much does shipping cost?',
          answer: 'Shipping is free for orders over $100 within the US. For orders under $100, shipping costs start at $7.99. International shipping rates vary by location.'
        }
      ]
    },
    {
      id: 'returns',
      title: 'Returns & Refunds',
      questions: [
        {
          id: 'returns-1',
          question: 'What is your return policy?',
          answer: 'We offer a 30-day return policy for unused items in original packaging. Some restrictions apply to safety gear.'
        },
        {
          id: 'returns-2',
          question: 'How do I initiate a return?',
          answer: 'Log into your account and visit the Orders section to initiate a return. You\'ll receive a return shipping label via email.'
        }
      ]
    },
    {
      id: 'products',
      title: 'Products & Sizing',
      questions: [
        {
          id: 'products-1',
          question: 'How do I find my correct size?',
          answer: 'Check our size guide for detailed measurements. Each product page includes specific sizing information.'
        },
        {
          id: 'products-2',
          question: 'Are your products authentic?',
          answer: 'Yes, we only sell genuine products sourced directly from manufacturers or authorized distributors.'
        }
      ]
    },
    {
      id: 'orders',
      title: 'Orders & Payment',
      questions: [
        {
          id: 'orders-1',
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards, PayPal, and Apple Pay. Payment information is securely processed.'
        },
        {
          id: 'orders-2',
          question: 'Can I modify my order?',
          answer: 'Orders can be modified within 1 hour of placement. Contact customer service for assistance.'
        }
      ]
    }
  ];

  const toggleQuestion = (questionId: string) => {
    setOpenQuestions(prev =>
      prev.includes(questionId)
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our products, shipping, returns, and more.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <nav className="space-y-1">
              {faqCategories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    activeCategory === category.id
                      ? 'bg-primary text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {category.title}
                </button>
              ))}
            </nav>
          </div>

          {/* FAQ Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm">
              {faqCategories
                .find(cat => cat.id === activeCategory)
                ?.questions.map(item => (
                  <div key={item.id} className="border-b last:border-b-0">
                    <button
                      onClick={() => toggleQuestion(item.id)}
                      className="w-full text-left px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-lg font-medium text-gray-900">
                        {item.question}
                      </span>
                      <ChevronDownIcon
                        className={`w-5 h-5 text-gray-500 transition-transform ${
                          openQuestions.includes(item.id) ? 'transform rotate-180' : ''
                        }`}
                      />
                    </button>
                    {openQuestions.includes(item.id) && (
                      <div className="px-6 pb-4">
                        <p className="text-gray-600">{item.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
            </div>

            {/* Contact Support */}
            <div className="mt-8 bg-gray-100 rounded-lg p-6 text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Still have questions?
              </h3>
              <p className="text-gray-600 mb-4">
                Our support team is here to help.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ; 