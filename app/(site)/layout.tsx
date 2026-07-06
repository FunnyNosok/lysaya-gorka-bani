import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ClientScripts } from '@/components/ClientScripts';
import { defaultSettings } from '@/data/settings';
import { getSettings } from '@/lib/content';

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings().catch(() => defaultSettings);

  return (
    <>
      <Header settings={settings} />
      {children}
      <Footer settings={settings} />
      <ClientScripts />
    </>
  );
}
