import { getGlobalContent } from '@/lib/content';
import { getSiteSettings } from '@/lib/data';
import SiteChrome from '@/components/layout/SiteChrome';
import AppProviders from '@/components/providers/AppProviders';
import DeferredAnalytics from '@/components/DeferredAnalytics';

export default async function SiteChromeShell({ children }: { children: React.ReactNode }) {
  let globalContent = {};
  let googleAnalyticsId: string | null = null;
  let facebookPixelId: string | null = null;

  try {
    globalContent = await getGlobalContent();
  } catch (error) {
    console.warn('[SiteChromeShell] getGlobalContent failed:', error);
  }

  try {
    const siteSettings = await getSiteSettings();
    googleAnalyticsId = siteSettings?.googleAnalyticsId ?? null;
    facebookPixelId = siteSettings?.facebookPixelId ?? null;
  } catch (error) {
    console.warn('[SiteChromeShell] getSiteSettings failed:', error);
  }

  return (
    <>
      <DeferredAnalytics
        googleAnalyticsId={googleAnalyticsId}
        facebookPixelId={facebookPixelId}
      />
      <AppProviders>
        <SiteChrome globalContent={globalContent}>{children}</SiteChrome>
      </AppProviders>
    </>
  );
}
