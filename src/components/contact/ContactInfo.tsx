import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const ContactInfo = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h3 className="text-2xl font-bold text-brown-900 mb-6">Contact Information</h3>
      
      <div className="space-y-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 mt-1">
            <MapPin className="w-6 h-6 text-yellow-500" />
          </div>
          <div className="ml-4">
            <h4 className="text-base font-medium text-brown-900">Address</h4>
            <address className="mt-1 not-italic text-gray-600">
              The Gahitwen LLC<br />
              131 Continental Dr Ste 305<br />
              Newark, DE 19713, USA
            </address>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="flex-shrink-0 mt-1">
            <Phone className="w-6 h-6 text-yellow-500" />
          </div>
          <div className="ml-4">
            <h4 className="text-base font-medium text-brown-900">Phone</h4>
            <p className="mt-1 text-gray-600">
              <a href="tel:+1-302-607-5297" className="hover:text-brown-800">+1 (302) 607-5297</a>
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="flex-shrink-0 mt-1">
            <Mail className="w-6 h-6 text-yellow-500" />
          </div>
          <div className="ml-4">
            <h4 className="text-base font-medium text-brown-900">Email</h4>
            <p className="mt-1 text-gray-600">
              <a href="mailto:info@gahitwen.com" className="hover:text-brown-800">info@gahitwen.com</a>
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="flex-shrink-0 mt-1">
            <Clock className="w-6 h-6 text-yellow-500" />
          </div>
          <div className="ml-4">
            <h4 className="text-base font-medium text-brown-900">Business Hours</h4>
            <p className="mt-1 text-gray-600">
              Monday - Friday: 9:00 AM - 5:00 PM EST<br />
              Weekends: Closed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;