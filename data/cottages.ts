import type { PlankRow } from './banyas';

export type Cottage = {
  slug: string;
  title: string;
  shortTitle: string;
  capacity: number;
  capacityLabel: string;
  tag: string;
  tagPrice: string;
  card: string;
  cardImage: string;
  features: string[];
  heroDescription: string;
  heroImage: string;
  heroEyebrow: string;
  galleryAlt: string;
  plankRows: PlankRow[];
  priceNote: string;
  dateFieldLabel: string;
  dateFieldPlaceholder: string;
  submitLabel: string;
  intro: string;
  hasTitle: string;
  hasItems: string[];
  detailFeats: string[];
  extraServicesText: string;
  seoTitle: string;
  seoDescription: string;
};

export const cottages: Cottage[] = [
  {
    slug: 'tsarskie-khoromy',
    title: 'Коттедж «Царские хоромы»',
    shortTitle: 'Царские хоромы',
    capacity: 20,
    capacityLabel: 'до 20 человек',
    tag: 'банкеты · свадьбы',
    tagPrice: 'до 20 человек',
    card: 'Всегда открыт для гостей — отмечайте корпоративы, свадьбы, юбилеи и вечеринки.',
    cardImage: '/images/cottages/tsarskie-khoromy.jpg',
    features: ['Банкетный зал', 'Бильярд', 'Бассейн', 'Камин', '4 комнаты'],
    heroDescription: 'Просторный коттедж на территории комплекса для корпоративов, свадеб, юбилеев и вечеринок — банкетный зал, бильярд, бассейн и 4 комнаты отдыха.',
    heroImage: '/images/cottages/tsarskie-khoromy.jpg',
    heroEyebrow: 'Коттедж · до 20 человек',
    galleryAlt: 'Коттедж Царские хоромы',
    plankRows: [
      { label: 'Вместимость', value: 'до 20 человек' },
      { label: 'Площадь', value: '350 м²' },
      { label: 'Подходит для', value: 'банкетов, свадеб' },
    ],
    priceNote: 'Стоимость аренды коттеджа — по запросу. Подберём пакет услуг под ваше мероприятие.',
    dateFieldLabel: 'Дата и повод',
    dateFieldPlaceholder: 'Например: свадьба, 12 июня',
    submitLabel: 'Узнать цену',
    intro: 'Коттедж «Царские хоромы», расположенный на территории комплекса «Лысая горка», всегда открыт для гостей! Здесь отмечают корпоративы, свадьбы, юбилеи и проводят вечеринки.',
    hasTitle: 'В коттедже есть',
    hasItems: [
      'Банкетный зал на 30–35 человек с камином.',
      'Бильярд и настольный теннис.',
      'Бассейн и русская парная.',
      'Барная стойка и кухня.',
      'ТВ, караоке.',
      '4 комнаты отдыха на втором этаже.',
      'Беседка с мангальной зоной.',
    ],
    detailFeats: ['Банкетный зал', 'Бильярд', 'Бассейн', 'Парная', 'Камин', 'Караоке', 'Бар', '4 комнаты', 'Мангал'],
    extraServicesText: 'кафе с русской и кавказской кухней, услуги парильщика, массажист и мини-гостиница для гостей.',
    seoTitle: 'Аренда коттеджа «Царские хоромы» в Екатеринбурге | Лысая горка',
    seoDescription: 'Коттедж Царские хоромы на территории комплекса Лысая горка. Банкеты, свадьбы, юбилеи, корпоративы. Банкетный зал, бильярд, бассейн, 4 комнаты.',
  },
  {
    slug: 'russkiy-domik',
    title: 'Коттедж «Русский домик»',
    shortTitle: 'Русский домик',
    capacity: 10,
    capacityLabel: 'до 10 человек',
    tag: 'корпоративы · ДР',
    tagPrice: 'до 10 человек',
    card: 'Готов принять как большие компании, так и отдельных гостей — для небольших праздников.',
    cardImage: '/images/cottages/russkiy-domik.jpg',
    features: ['Парилка', 'Купель', 'Камин', 'Караоке', 'Веранда'],
    heroDescription: 'Уютный коттедж для больших и небольших компаний — отличный вариант для корпоративных праздников, дней рождения и юбилеев.',
    heroImage: '/images/cottages/russkiy-domik.jpg',
    heroEyebrow: 'Коттедж · до 10 человек',
    galleryAlt: 'Коттедж Русский домик',
    plankRows: [
      { label: 'Вместимость', value: 'до 10 человек' },
      { label: 'Площадь', value: '2 этажа' },
      { label: 'Подходит для', value: 'ДР, юбилеев' },
    ],
    priceNote: 'Стоимость аренды коттеджа — по запросу. Подберём пакет услуг под ваш праздник.',
    dateFieldLabel: 'Дата и повод',
    dateFieldPlaceholder: 'Например: день рождения, 12 июня',
    submitLabel: 'Узнать цену',
    intro: 'Коттедж «Русский домик» готов принять как большие компании, так и отдельных гостей. Это отличный вариант для проведения небольших корпоративных праздников, дней рождения, юбилеев.',
    hasTitle: 'В коттедже есть',
    hasItems: [
      'Гостиная с камином и ТВ.',
      'Парилка и купель.',
      'Караоке, НТВ+.',
      'Комната отдыха на втором этаже.',
      'Веранда и беседка с мангальной зоной.',
      'Сейф для хранения ценных вещей.',
    ],
    detailFeats: ['Парилка', 'Купель', 'Камин', 'Караоке', 'Веранда', 'Мангал', '2 этажа'],
    extraServicesText: 'кафе с домашней едой от поваров, услуги парильщика и массажист. Можно заказать веники и арендовать банкетный зал.',
    seoTitle: 'Аренда коттеджа «Русский домик» в Екатеринбурге | Лысая горка',
    seoDescription: 'Коттедж Русский домик на территории комплекса Лысая горка. Для небольших корпоративов, дней рождения, юбилеев. Парилка, купель, камин, караоке.',
  },
];

export const cottageSlugs = cottages.map((c) => c.slug);
