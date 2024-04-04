import React from 'react';
import Helmet from 'react-helmet';
import Accordion from 'react-bootstrap/Accordion';
import arrowDownIcon from '../../assets/arrow-down.svg';

function Faq({ faqs }) {
  if (!faqs || faqs.length === 0) {
    return null;
  }

  // Structured data object
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  return (
    <div className="mt-5">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      <h2 className="text-center">Frequently Asked Questions</h2>
      <div className="faqs mt-4">
        <Accordion className="faq">
          {faqs?.map((faq, index) => (
            <Accordion.Item
              className="border-bottom py-2 my-2"
              key={index}
              eventKey={index.toString()}
            >
              <Accordion.Header as="h3" className="text-left font-bold faq__question">
                {faq.question}
                <img src={arrowDownIcon} alt="arrow icon" className="ml-5" />
              </Accordion.Header>
              <Accordion.Body className="faq__answer">{faq.answer}</Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    </div>
  );
}

export default Faq;
