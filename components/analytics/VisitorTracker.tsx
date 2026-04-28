"use client";

import { useEffect } from 'react';

export function VisitorTracker() {
  useEffect(() => {
    const trackVisit = async () => {
      try {
        const today = new Date().toISOString().split('T')[0];
        const lastTracked = localStorage.getItem('last_tracked_visit');

        if (lastTracked !== today) {
          // Send request to tracking API
          const response = await fetch('/api/track', { 
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          
          if (response.ok) {
            localStorage.setItem('last_tracked_visit', today);
          }
        }
      } catch (error) {
        console.error('Visitor tracking failed:', error);
      }
    };

    // Track on initial mount
    trackVisit();
  }, []);

  return null;
}
