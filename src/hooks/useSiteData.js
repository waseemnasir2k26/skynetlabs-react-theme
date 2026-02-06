import { useSite } from '../context/SiteContext';

export function useSiteData() {
  const site = useSite();
  return {
    siteData: site,
    nonce: site.nonce,
    ajaxUrl: site.ajaxUrl,
    restUrl: site.restUrl,
    restNonce: site.restNonce,
  };
}

export default useSiteData;
