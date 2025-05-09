import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

const Privacy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | The Gahitwen LLC</title>
        <meta name="description" content="The Gahitwen LLC's privacy policy outlines how we collect, use, and protect your personal information." />
      </Helmet>
      
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-brown-900 mb-8 text-center">Privacy Policy</h1>
            
            <div className="bg-white rounded-lg shadow-md p-6 md:p-8 prose prose-lg max-w-none">
              <p className="text-gray-600 mb-6">
                Last Updated: June 15, 2025
              </p>
              
              <h2 className="text-2xl font-bold text-brown-900 mb-4">Introduction</h2>
              <p>
                The Gahitwen LLC ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
              </p>
              
              <h2 className="text-2xl font-bold text-brown-900 mb-4 mt-8">Information We Collect</h2>
              <p>
                We may collect information about you in a variety of ways. The information we may collect includes:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>Personal Data: Personally identifiable information, such as your name, email address, and telephone number, that you voluntarily give to us when you register or when you choose to participate in various activities related to our services.</li>
                <li>Derivative Data: Information our servers automatically collect when you access our website, such as your IP address, browser type, operating system, access times, and the pages you have viewed.</li>
                <li>Financial Data: Financial information, such as data related to your payment method (e.g., valid credit card number, card brand, expiration date) that we may collect when you purchase our services.</li>
              </ul>
              
              <h2 className="text-2xl font-bold text-brown-900 mb-4 mt-8">Use of Your Information</h2>
              <p>
                Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the website to:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>Create and manage your account.</li>
                <li>Process payments and refunds.</li>
                <li>Send you marketing and promotional communications.</li>
                <li>Respond to your inquiries and provide customer support.</li>
                <li>Fulfill and manage purchases, orders, payments, and other transactions related to our services.</li>
                <li>Monitor and analyze usage and trends to improve your experience with our services.</li>
              </ul>
              
              <h2 className="text-2xl font-bold text-brown-900 mb-4 mt-8">Disclosure of Your Information</h2>
              <p>
                We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>By Law or to Protect Rights: If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.</li>
                <li>Third-Party Service Providers: We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.</li>
                <li>Business Transfers: We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
              </ul>
              
              <h2 className="text-2xl font-bold text-brown-900 mb-4 mt-8">Security of Your Information</h2>
              <p>
                We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
              </p>
              
              <h2 className="text-2xl font-bold text-brown-900 mb-4 mt-8">Contact Us</h2>
              <p>
                If you have questions or comments about this Privacy Policy, please contact us at:
              </p>
              <p>
                The Gahitwen LLC<br />
                131 Continental Dr Ste 305<br />
                Newark, DE 19713, USA<br />
                Email: privacy@gahitwen.com<br />
                Phone: +1 (555) 123-4567
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Privacy;