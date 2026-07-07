export type SiteSettings = {
  phone: string;
  phoneHref: string;
  phone2: string;
  phone2Href: string;
  telegram: string;
  max: string;
  address: string;
  addressArea: string;
  email: string;
  vk: string;
  instagram: string;
  panorama: string;
  mapLat: number;
  mapLon: number;
  mapZoom: number;
  yearFrom: number;
};

export const defaultSettings: SiteSettings = {
  phone: '+7 (343) 213-75-77',
  phoneHref: '+73432137577',
  phone2: '+7 (953) 047-77-57',
  phone2Href: '+79530477757',
  // Ссылки на мессенджеры. Заполняются в админке (Настройки).
  // Telegram: https://t.me/username · MAX: https://max.ru/u/<хеш из приложения>
  telegram: '',
  max: 'https://web.max.ru/210310097',
  address: 'Екатеринбург, Предельная, 41',
  addressArea: 'район УНЦ',
  email: 'nagorke@list.ru',
  vk: 'https://vk.com/bani_nagorke',
  instagram: 'https://www.instagram.com/lysayagorka',
  panorama: 'http://www.panorama66.ru/banya/nagorke/',
  mapLat: 56.765752,
  mapLon: 60.561101,
  mapZoom: 15,
  yearFrom: 2015,
};
