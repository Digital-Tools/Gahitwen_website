import Button from '../ui/Button';

type ProductDetailProps = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  isWebApp?: boolean;
  ctaLabel?: string;
  ctaUrl?: string;
  playStoreUrl?: string;
  appStoreUrl?: string;
};

const ProductDetail = ({
  title,
  tagline,
  description,
  features,
  isWebApp,
  ctaUrl,
  playStoreUrl,
  appStoreUrl,
}: ProductDetailProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-full flex flex-col">
      <h3 className="text-xl font-bold text-brown-900 mb-2">{title}</h3>
      <p className="text-yellow-600 font-medium mb-3">{tagline}</p>
      <p className="text-gray-600 mb-4 flex-grow">{description}</p>
      
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-brown-800 mb-2">Key Features:</h4>
        <ul className="space-y-1">
          {features.map((feature, index) => (
            <li key={index} className="text-sm text-gray-600 flex items-start">
              <span className="text-yellow-500 mr-2">•</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>
      
      <div className="mt-auto">
        {isWebApp ? (
          <Button href={ctaUrl} variant="primary" className="w-full">
            Visit Website
          </Button>
        ) : (
          <div className="space-y-2">
            {playStoreUrl && (
              <a href={playStoreUrl} className="block" target="_blank" rel="noopener noreferrer">
                <img 
                  src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" 
                  alt="Get it on Google Play" 
                  className="h-12"
                />
              </a>
            )}
            {appStoreUrl && (
              <a href={appStoreUrl} className="block" target="_blank" rel="noopener noreferrer">
                <img 
                  src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83" 
                  alt="Download on the App Store" 
                  className="h-10"
                />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;