import Seo from '../components/ui/Seo';
import { motion } from 'framer-motion';

const Privacy = () => {
  return (
    <>
      <Seo
        title="Privacy Policy"
        description="The Gahitwen LLC's privacy policy outlines how we collect, use, and protect your personal information."
        path="/privacy"
      />
      
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-brown-900 mb-8 text-center">Privacy Policy</h1>
            
            <div className="bg-white rounded-lg shadow-md p-6 md:p-8 max-w-none">
              <p className="text-gray-600 mb-6">
                Last Updated: May 13, 2026
              </p>
              
              <h2 className="text-2xl font-bold text-brown-900 mb-4">Introduction</h2>
              <p>
                The Gahitwen LLC ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our mobile applications, or engage with our services. As a provider of diverse software solutions, including logistics and operational management tools, we are committed to being transparent about the data we collect to provide and improve our services.
              </p>
              
              <h2 className="text-2xl font-bold text-brown-900 mb-4 mt-8">Information We Collect</h2>
              <p>
                We may collect information about you in a variety of ways. The information we may collect includes:
              </p>
              <h3 className="text-xl font-semibold text-brown-800 mt-4 mb-2">1. Personal Data</h3>
              <p>
                Personally identifiable information, such as your name, shipping/billing address, email address, and telephone number, and demographic information, such as your age, gender, hometown, and interests, that you voluntarily give to us when you register for an account, subscribe to our newsletters, or contact us.
              </p>
              
              <h3 className="text-xl font-semibold text-brown-800 mt-4 mb-2">2. Precise Location Information</h3>
              <p>
                To provide specific services, particularly within our logistics and transportation applications, we may collect and process precise location data. This includes:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li><strong>Real-time Location:</strong> We may collect your device's precise geographic location via GPS, Wi-Fi, or cell tower signals.</li>
                <li><strong>Background Location:</strong> For logistics tracking, delivery management, and safety purposes, some of our applications may require access to your location even when the app is closed or not in use. This allows for accurate route tracking, estimated time of arrival (ETA) updates, and automated geofencing notifications.</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-brown-800 mt-4 mb-2">3. Device and Usage Data</h3>
              <p>
                Information our servers automatically collect when you access our services, including:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li><strong>Device Information:</strong> Hardware model, operating system version, unique device identifiers, serial numbers, device motion information, and mobile network information.</li>
                <li><strong>Log Data:</strong> IP address, browser type, access times, pages viewed, and the pages you visited before and after navigating to our website or app.</li>
                <li><strong>Interaction Data:</strong> Information about how you interact with our services, such as button clicks, feature usage, and performance logs.</li>
              </ul>

              <h3 className="text-xl font-semibold text-brown-800 mt-4 mb-2">4. Logistics and Operational Data</h3>
              <p>
                When using our logistics platforms, we may collect:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Route and navigation history.</li>
                <li>Shipment details, delivery status, and photographic evidence of delivery/pickup.</li>
                <li>Driver performance data and vehicle telematics.</li>
              </ul>

              <h3 className="text-xl font-semibold text-brown-800 mt-4 mb-2">5. Financial and Transaction Data</h3>
              <p>
                Financial information, such as data related to your payment method (e.g., valid credit card number, card brand, expiration date) that we may collect when you purchase our services. Most financial data is processed by our third-party payment processors.
              </p>
              
              <h2 className="text-2xl font-bold text-brown-900 mb-4 mt-8">Use of Your Information</h2>
              <p>
                Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you to:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li><strong>Provide and Manage Services:</strong> Create and manage your account, process transactions, and provide the core functionality of our software, including logistics tracking and routing.</li>
                <li><strong>Improve Logistics Efficiency:</strong> Use location and route data to optimize delivery paths, calculate ETAs, and improve overall supply chain operations.</li>
                <li><strong>Enhance Safety and Security:</strong> Verify user identity, prevent fraud, monitor for suspicious activity, and ensure the safety of drivers and cargo.</li>
                <li><strong>Customer Support:</strong> Respond to your inquiries, troubleshoot technical issues, and provide assistance.</li>
                <li><strong>Personalization:</strong> Tailor your experience with our applications and website based on your usage patterns and preferences.</li>
                <li><strong>Communication:</strong> Send you administrative information, service updates, and marketing communications (where permitted).</li>
                <li><strong>Research and Development:</strong> Analyze usage trends to develop new features, products, and services.</li>
                <li><strong>Legal Compliance:</strong> Comply with applicable laws, regulations, and legal processes.</li>
              </ul>
              
              <h2 className="text-2xl font-bold text-brown-900 mb-4 mt-8">Disclosure of Your Information</h2>
              <p>
                We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li><strong>By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.</li>
                <li><strong>Third-Party Service Providers:</strong> We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.</li>
                <li><strong>With Other Users:</strong> When you use our logistics or transportation services, we may share certain information with other participants to facilitate the service. For example, a driver's name, vehicle details, and real-time location may be shared with the customer receiving a delivery.</li>
                <li><strong>Business Transfers:</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
              </ul>

              <h2 className="text-2xl font-bold text-brown-900 mb-4 mt-8">Your Privacy Rights</h2>
              <p>
                Depending on your location, you may have certain rights regarding your personal information, including:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li><strong>Access and Portability:</strong> The right to request copies of your personal data and to ask for that data to be transferred to another provider.</li>
                <li><strong>Correction:</strong> The right to request that we correct any information you believe is inaccurate or incomplete.</li>
                <li><strong>Deletion:</strong> The right to request that we erase your personal data under certain conditions.</li>
                <li><strong>Object or Restrict Processing:</strong> The right to object to our processing of your personal data or request that we restrict the processing.</li>
                <li><strong>Location Services:</strong> You can opt-out of location collection at any time through your device settings; however, please note that disabling location services may limit the functionality of certain logistics features.</li>
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
                Phone: +1 (302) 607-5297
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Privacy;