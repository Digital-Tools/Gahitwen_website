import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

const Terms = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service | The Gahitwen LLC</title>
        <meta name="description" content="The Gahitwen LLC's terms of service outline the rules, guidelines, and legal agreements between you and our company." />
      </Helmet>
      
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-brown-900 mb-8 text-center">Terms of Service</h1>
            
            <div className="bg-white rounded-lg shadow-md p-6 md:p-8 prose prose-lg max-w-none">
              <p className="text-gray-600 mb-6">
                Last Updated: June 15, 2025
              </p>
              
              <h2 className="text-2xl font-bold text-brown-900 mb-4">Agreement to Terms</h2>
              <p>
                These Terms of Service constitute a legally binding agreement made between you and The Gahitwen LLC ("we," "us," or "our"), concerning your access to and use of our website and services. You agree that by accessing the website and/or services, you have read, understood, and agree to be bound by all of these Terms of Service.
              </p>
              
              <h2 className="text-2xl font-bold text-brown-900 mb-4 mt-8">Intellectual Property Rights</h2>
              <p>
                Unless otherwise indicated, the website and services are our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the website and the trademarks, service marks, and logos contained therein are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights.
              </p>
              
              <h2 className="text-2xl font-bold text-brown-900 mb-4 mt-8">User Representations</h2>
              <p>
                By using the website and services, you represent and warrant that:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>All registration information you submit will be true, accurate, current, and complete.</li>
                <li>You will maintain the accuracy of such information and promptly update such registration information as necessary.</li>
                <li>You have the legal capacity and you agree to comply with these Terms of Service.</li>
                <li>You are not a minor in the jurisdiction in which you reside.</li>
                <li>You will not access the website or services through automated or non-human means, whether through a bot, script, or otherwise.</li>
                <li>You will not use the website or services for any illegal or unauthorized purpose.</li>
                <li>Your use of the website or services will not violate any applicable law or regulation.</li>
              </ul>
              
              <h2 className="text-2xl font-bold text-brown-900 mb-4 mt-8">Products and Services</h2>
              <p>
                We make every effort to display as accurately as possible the descriptions, pricing, and images of our products and services available on our website. However, we cannot guarantee that all information is accurate, complete, reliable, current, or error-free.
              </p>
              
              <h2 className="text-2xl font-bold text-brown-900 mb-4 mt-8">Purchases and Payment</h2>
              <p>
                We accept the following forms of payment:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>Visa</li>
                <li>Mastercard</li>
                <li>American Express</li>
                <li>PayPal</li>
              </ul>
              <p>
                You agree to provide current, complete, and accurate purchase and account information for all purchases made via the website. You further agree to promptly update account and payment information, including email address, payment method, and payment card expiration date, so that we can complete your transactions and contact you as needed.
              </p>
              
              <h2 className="text-2xl font-bold text-brown-900 mb-4 mt-8">Term and Termination</h2>
              <p>
                These Terms of Service shall remain in full force and effect while you use the website or services. WITHOUT LIMITING ANY OTHER PROVISION OF THESE TERMS OF SERVICE, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE WEBSITE AND SERVICES, TO ANY PERSON FOR ANY REASON OR FOR NO REASON, INCLUDING WITHOUT LIMITATION FOR BREACH OF ANY REPRESENTATION, WARRANTY, OR COVENANT CONTAINED IN THESE TERMS OF SERVICE OR OF ANY APPLICABLE LAW OR REGULATION.
              </p>
              
              <h2 className="text-2xl font-bold text-brown-900 mb-4 mt-8">Modifications and Interruptions</h2>
              <p>
                We reserve the right to change, modify, or remove the contents of the website at any time or for any reason at our sole discretion without notice. We also reserve the right to modify or discontinue all or part of the services without notice at any time.
              </p>
              
              <h2 className="text-2xl font-bold text-brown-900 mb-4 mt-8">Contact Us</h2>
              <p>
                If you have questions or comments about these Terms of Service, please contact us at:
              </p>
              <p>
                The Gahitwen LLC<br />
                131 Continental Dr Ste 305<br />
                Newark, DE 19713, USA<br />
                Email: compliance@gahitwen.com<br />
                Phone: +1 (302) 607-5297
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Terms;