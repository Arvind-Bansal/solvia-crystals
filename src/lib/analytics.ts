type EventName = 
  | 'add_to_cart'
  | 'remove_from_cart'
  | 'begin_checkout'
  | 'purchase'
  | 'view_item'
  | 'add_to_wishlist'
  | 'newsletter_signup';

interface AnalyticsEvent {
  name: EventName;
  properties?: Record<string, any>;
}

class AnalyticsProvider {
  private isInitialized = false;

  init() {
    if (typeof window === 'undefined') return;
    
    // Initialize external providers here (e.g., Google Analytics, Mixpanel, PostHog)
    // window.gtag('js', new Date());
    
    this.isInitialized = true;
    console.log('[Analytics] Initialized');
  }

  track({ name, properties }: AnalyticsEvent) {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[Analytics Track]: ${name}`, properties);
      return;
    }

    if (!this.isInitialized) {
      console.warn('[Analytics] Track called before initialization');
    }

    // Push to actual providers
    // if (typeof window !== 'undefined' && (window as any).gtag) {
    //   (window as any).gtag('event', name, properties);
    // }
  }
}

export const analytics = new AnalyticsProvider();
