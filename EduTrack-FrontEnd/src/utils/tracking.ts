import { trackingApi } from '../services/api';

// Generate unique session ID
export const generateSessionId = (): string => {
  const existingId = sessionStorage.getItem('edutrack_session_id');
  if (existingId) {
    return existingId;
  }
  
  const newId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  sessionStorage.setItem('edutrack_session_id', newId);
  return newId;
};

// Get user's IP address (simplified)
export const getClientIP = (): Promise<string> => {
  return fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => data.ip)
    .catch(() => 'unknown');
};

// Track page view
export const trackPageView = async (page: string): Promise<void> => {
  try {
    const sessionId = generateSessionId();
    const referrer = document.referrer || 'direct';
    const userAgent = navigator.userAgent;
    const ipAddress = await getClientIP();

    await trackingApi.track({
      sessionId,
      referrer,
      page,
      userAgent,
      ipAddress,
    });
  } catch (error) {
    console.warn('Failed to track page view:', error);
  }
};

// Track custom events
export const trackEvent = async (eventData: {
  page: string;
  referrer?: string;
}): Promise<void> => {
  try {
    const sessionId = generateSessionId();
    const userAgent = navigator.userAgent;
    const ipAddress = await getClientIP();

    await trackingApi.track({
      sessionId,
      referrer: eventData.referrer || document.referrer || 'direct',
      page: eventData.page,
      userAgent,
      ipAddress,
    });
  } catch (error) {
    console.warn('Failed to track event:', error);
  }
};

// Initialize tracking for the app
export const initializeTracking = (): void => {
  // Track initial page load
  trackPageView(window.location.pathname);
  
  // Track navigation changes (for SPAs)
  window.addEventListener('popstate', () => {
    trackPageView(window.location.pathname);
  });
};

// Get referrer source type
export const getReferrerSource = (referrer: string): string => {
  if (!referrer || referrer === '') return 'direct';
  
  const url = new URL(referrer);
  const hostname = url.hostname.toLowerCase();
  
  if (hostname.includes('google')) return 'google';
  if (hostname.includes('facebook')) return 'facebook';
  if (hostname.includes('youtube')) return 'youtube';
  if (hostname.includes('linkedin')) return 'linkedin';
  if (hostname.includes('instagram')) return 'instagram';
  if (hostname.includes('tiktok')) return 'tiktok';
  
  return 'referral';
};
