import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initGoogleAnalytics, trackPageView } from '../../lib/analytics';

/** GA4 page views for SPA route changes. Loads only when VITE_GA_MEASUREMENT_ID is set. */
const GoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    initGoogleAnalytics();
  }, []);

  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);

  return null;
};

export default GoogleAnalytics;
