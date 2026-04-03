export async function getEntriLinks(id?: string) {
  try {
    // Check if we're in a Netlify environment
    const isNetlify = window.location.hostname.includes('netlify.app') || 
                      document.referrer.includes('netlify.app') ||
                      localStorage.getItem('netlify_deploy');
    
    if (!isNetlify) {
      return null;
    }
    
    // Try to get deploy info from localStorage first (to avoid unnecessary API calls)
    const cachedInfo = localStorage.getItem('netlify_deploy_info');
    if (cachedInfo) {
      try {
        const parsedInfo = JSON.parse(cachedInfo);
        // Only use cache if it's less than 1 hour old
        if (parsedInfo.timestamp && (Date.now() - parsedInfo.timestamp < 3600000)) {
          return parsedInfo;
        }
      } catch (e) {
        // Invalid cache, continue to fetch
        localStorage.removeItem('netlify_deploy_info');
      }
    }
    
    // Fetch from Netlify API
    const response = await fetch('/.netlify/functions/get-deploy-info');
    if (!response.ok) {
      throw new Error('Failed to fetch deploy info');
    }
    
    const data = await response.json();
    
    // Cache the result with timestamp
    localStorage.setItem('netlify_deploy_info', JSON.stringify({
      ...data,
      timestamp: Date.now()
    }));
    
    return data;
  } catch (error) {
    console.error('Error fetching deploy info:', error);
    return null;
  }
}