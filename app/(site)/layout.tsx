import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ClientScripts } from '@/components/ClientScripts';
import { Metrika } from '@/components/Metrika';
import { JsonLd } from '@/components/JsonLd';
import { defaultSettings } from '@/data/settings';
import { getSettings, getAllBanyas, getAllCottages, getAllServices } from '@/lib/content';
import { banyas as seedBanyas } from '@/data/banyas';
import { cottages as seedCottages } from '@/data/cottages';
import { services as seedServices } from '@/data/services';

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings().catch(() => defaultSettings);
  const banyas = await getAllBanyas().catch(() => seedBanyas);
  const cottages = await getAllCottages().catch(() => seedCottages);
  const services = await getAllServices().catch(() => seedServices);

  return (
    <>
      <JsonLd />
      <Header settings={settings} banyas={banyas} cottages={cottages} services={services} />
      {children}
      <Footer settings={settings} />
      <ClientScripts />
      <Metrika />
    </>
  );
}
