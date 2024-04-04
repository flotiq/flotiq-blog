import React from 'react';

// :: Components
import Accordion from 'react-bootstrap/Accordion';

// :: Images
import arrowDownIcon from '../../assets/arrow-down.svg';

function Faq({ faqs}) {
  if (!faqs || faqs.length === 0) {
    return null
  }
  return (
    <div className="mt-5">
      <h2 className="text-center">Frequently Asked Questions</h2>
      <div className="faqs mt-4">
        <Accordion className="faq">
          {faqs?.map(faq => (
            <Accordion.Item className="border-bottom py-2 my-2" key={faq.question} eventKey={faq.question}>
              <Accordion.Header as='h3' className="text-left font-bold faq__question">
                {faq.question}
                <img src={arrowDownIcon} alt="arrow icon" className="ml-5" />
              </Accordion.Header>
              <Accordion.Body className="faq__answer">
                {faq.answer}
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
export default Faq;
