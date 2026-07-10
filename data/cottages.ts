import type { PlankRow, PriceRow } from './banyas';

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
  priceTable?: PriceRow[];
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
    features: ['Банкетный зал', 'Бильярд', 'Бассейн', 'Камин', '12 спальных мест'],
    heroDescription: 'Просторный коттедж на территории комплекса для корпоративов, свадеб, юбилеев и вечеринок — банкетный зал, бильярд, бассейн и 12 спальных мест с возможностью размещения дополнительных гостей.',
    heroImage: '/images/cottages/tsarskie-khoromy.jpg',
    heroEyebrow: 'Коттедж · до 20 человек',
    galleryAlt: 'Коттедж Царские хоромы',
    plankRows: [
      { label: 'Вместимость', value: 'до 20 человек' },
      { label: 'Площадь', value: '350 м²' },
      { label: 'Подходит для', value: 'банкетов, свадеб' },
    ],
    priceTable: [
      { label: 'Будни', value: '18 900 ₽/сутки' },
      { label: 'Выходные и праздники', value: '28 900 ₽/сутки' },
      { label: 'Дополнительные гости', value: '1 000 ₽/сутки' },
    ],
    priceNote: '',
    dateFieldLabel: 'Дата и повод',
    dateFieldPlaceholder: 'Например: свадьба, 12 июня',
    submitLabel: 'Узнать цену',
    intro: 'Коттедж «Царские хоромы», расположенный на территории комплекса «Лысая Горка», всегда открыт для гостей! Здесь отмечают корпоративы, свадьбы, юбилеи и проводят вечеринки.',
    hasTitle: 'В коттедже есть',
    hasItems: [
      'Банкетный зал на 30–35 человек с камином.',
      'Бильярд и настольный теннис.',
      'Бассейн и русская парная.',
      'Барная стойка и кухня.',
      'ТВ, караоке.',
      '12 спальных мест с возможностью размещения дополнительных гостей.',
      'Беседка с мангальной зоной.',
    ],
    detailFeats: ['Банкетный зал', 'Бильярд', 'Бассейн', 'Парная', 'Камин', 'Караоке', 'Бар', '12 спальных мест', 'Мангал'],
    extraServicesText: 'русская кухня, услуги парильщика, массажист. Для гостей коттеджа.',
    seoTitle: 'Аренда коттеджа «Царские хоромы» в Екатеринбурге | Лысая Горка',
    seoDescription: 'Коттедж Царские хоромы на территории комплекса Русские бани Лысая Горка. Банкеты, свадьбы, юбилеи, корпоративы. Банкетный зал, бильярд, бассейн, 12 спальных мест.',
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
    features: ['Парилка', 'Купель', 'Камин', 'Веранда'],
    heroDescription: 'Уютный коттедж для больших и небольших компаний — отличный вариант для корпоративных праздников, дней рождения и юбилеев.',
    heroImage: '/images/cottages/russkiy-domik.jpg',
    heroEyebrow: 'Коттедж · до 10 человек',
    galleryAlt: 'Коттедж Русский домик',
    plankRows: [
      { label: 'Вместимость', value: 'до 10 человек' },
      { label: 'Площадь', value: '2 этажа' },
      { label: 'Подходит для', value: 'ДР, юбилеев' },
    ],
    priceTable: [
      { label: 'Будни', value: '13 900 ₽/сут' },
      { label: 'Выходные и праздники', value: '16 900 ₽/сут' },
    ],
    priceNote: 'Аренда коттеджа на сутки.',
    dateFieldLabel: 'Дата и повод',
    dateFieldPlaceholder: 'Например: день рождения, 12 июня',
    submitLabel: 'Узнать цену',
    intro: 'Коттедж «Русский домик» готов принять как большие компании, так и отдельных гостей. Это отличный вариант для проведения небольших корпоративных праздников, дней рождения, юбилеев.',
    hasTitle: 'В коттедже есть',
    hasItems: [
      'Гостиная с камином и ТВ.',
      'Парилка и купель.',
      'НТВ+.',
      'Комната отдыха на втором этаже.',
      'Веранда и беседка с мангальной зоной.',
      'Сейф для хранения ценных вещей.',
    ],
    detailFeats: ['Парилка', 'Купель', 'Камин', 'Веранда', 'Мангал', '2 этажа'],
    extraServicesText: 'домашняя еда от поваров, услуги парильщика и массажист. Можно заказать веники и арендовать банкетный зал.',
    seoTitle: 'Аренда коттеджа «Русский домик» в Екатеринбурге | Лысая Горка',
    seoDescription: 'Коттедж Русский домик на территории комплекса Лысая Горка. Для небольших корпоративов, дней рождения, юбилеев. Парилка, купель, камин, комната отдыха.',
  },
];

export const cottageSlugs = cottages.map((c) => c.slug);
