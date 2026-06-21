import { getGlobalContent } from '@/lib/content';
import SiteChrome from '@/components/layout/SiteChrome';
import AppProviders from '@/components/providers/AppProviders';
import DeferredAnalytics from '@/components/DeferredAnalytics';

export default async function SiteChromeShell({ children }: { children: React.ReactNode }) {
  let globalContent = {};
  try {
    globalContent = await getGlobalContent();
  } catch (error) {
    console.warn('[SiteChromeShell] getGlobalContent failed:', error);
  }

  return (
    <>
      <DeferredAnalytics />
      <AppProviders>
        <SiteChrome globalContent={globalContent}>{children}</SiteChrome>
      </AppProviders>
    </>
  );
}
