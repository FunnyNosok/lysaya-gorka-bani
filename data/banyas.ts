export type PriceRow = { label: string; value: string };
export type PlankRow = { label: string; value: string };

export type Banya = {
  slug: string;
  title: string;
  shortTitle: string;
  capacity: number;
  capacityLabel: string;
  priceFrom: number;
  priceFromLabel: string;
  area: string;
  tag: string;
  card: string;
  shortDescription: string;
  heroDescription: string;
  heroImage: string;
  cardImage: string;
  features: string[];
  detailFeats: string[];
  gallery: string[];
  galleryAlt: string;
  plankRows: PlankRow[];
  priceTable: PriceRow[];
  priceNote: string;
  intro: string;
  actualTitle: string;
  actualItems: string[];
  extraServicesText: string;
  seoTitle: string;
  seoDescription: string;
};

export const banyas: Banya[] = [
  {
    slug: 'russkiy-domik',
    title: 'Баня «Русский домик»',
    shortTitle: 'Русский домик',
    capacity: 10,
    capacityLabel: '10 человек',
    priceFrom: 1850,
    priceFromLabel: '1 850 ₽/час',
    area: '2 этажа',
    tag: '10 человек',
    card: 'Атмосфера русской избы · 2 этажа',
    shortDescription: 'Атмосфера русской избы · гостиная и 2 этаж · парилка, купель, караоке, камин, веранда',
    heroDescription: 'Атмосфера настоящей русской избы: уютная гостиная с камином, жаркая парилка, прохладная купель и комната отдыха на втором этаже.',
    heroImage: '/images/ban/russkiy-domik.jpg',
    cardImage: '/images/ban/russkiy-domik.jpg',
    features: ['Парилка', 'Купель', 'Караоке', 'Камин', 'Веранда'],
    detailFeats: ['Парилка', 'Купель', 'Караоке', 'ТВ · НТВ+', 'Камин', 'Веранда', 'Мангал', 'Сейф', '2 этажа'],
    gallery: [
      '/images/ban/russkiy/IMG_7075.jpg',
      '/images/ban/russkiy/IMG_7088.jpg',
      '/images/ban/russkiy/IMG_7096.jpg',
      '/images/ban/russkiy/IMG_7217.jpg',
      '/images/ban/russkiy/IMG_7238.jpg',
      '/images/ban/russkiy/IMG_7251.jpg',
      '/images/ban/russkiy-domik.jpg',
    ],
    galleryAlt: 'Баня Русский домик — интерьер',
    plankRows: [
      { label: 'Вместимость', value: '10 человек' },
      { label: 'Доп. гость', value: '200 ₽/час' },
      { label: 'Площадь', value: '2 этажа' },
    ],
    priceTable: [
      { label: 'Будни пн–чт · 08:00–15:00', value: '1 850 ₽/час' },
      { label: 'Будни пн–чт · 15:00–08:00', value: '2 700 ₽/час' },
      { label: 'Выходные · круглосуточно', value: '2 700 ₽/час' },
    ],
    priceNote: 'Минимальное время аренды: будни — от 2 часов, выходные и праздники — от 3 часов.',
    intro: 'При входе вы попадаете в уютную гостиную с камином. Удобно устроившись в кресле-качалке, можно посмотреть ТВ, спеть с друзьями караоке, включить любимую программу НТВ+. Вы насладитесь по старому русскому обычаю парилкой и окунётесь в купель. Прекрасная комната отдыха на втором этаже создаст особое настроение вашей души.',
    actualTitle: 'Актуально',
    actualItems: [
      'Беседка с мангальной зоной.',
      'Веники, услуги парильщиков и массажистов.',
      'Домашняя еда от первоклассных поваров.',
      'Сейф для хранения ценных вещей.',
    ],
    extraServicesText: 'аренда коттеджа на 20 человек, услуги парильщика (более 10 видов парения), массажист, кафе с русской кухней, аренда банкетного зала. Приходите к нам дружной компанией и насладитесь хорошим отдыхом!',
    seoTitle: 'Баня «Русский домик» — аренда на 10 человек от 1850 ₽/час | Лысая горка',
    seoDescription: 'Баня Русский домик в Екатеринбурге: вместимость 10 человек, парилка, купель, караоке, камин, веранда. Аренда от 1850 руб/час.',
  },
  {
    slug: 'lesnoy-domik',
    title: 'Баня «Лесной домик»',
    shortTitle: 'Лесной домик',
    capacity: 5,
    capacityLabel: '5 человек',
    priceFrom: 1100,
    priceFromLabel: '1 100 ₽/час',
    area: 'гостиная и 2 этаж',
    tag: '5 человек',
    card: 'Уютный лесной стиль · камин',
    shortDescription: 'Уютный лесной стиль · гостиная и 2 этаж · парилка, камин, кальян, караоке, веранда',
    heroDescription: 'Уютный лесной домик для небольшой компании: парилка на дровах, камин, кальян и караоке в гостиной.',
    heroImage: '/images/ban/lesnoy-domik.jpg',
    cardImage: '/images/ban/lesnoy-domik.jpg',
    features: ['Парилка', 'Караоке', 'Камин', 'Кальян', 'Веранда'],
    detailFeats: ['Парилка', 'Камин', 'Кальян', 'Караоке', 'Веранда', 'Мангал', '2 этажа'],
    gallery: [
      '/images/ban/lesnoy/IMG_7205.jpg',
      '/images/ban/lesnoy/IMG_7106.jpg',
      '/images/ban/lesnoy/IMG_7110.jpg',
      '/images/ban/lesnoy/IMG_7116.jpg',
      '/images/ban/lesnoy/IMG_7179.jpg',
      '/images/ban/lesnoy/IMG_7185.jpg',
      '/images/ban/lesnoy-domik.jpg',
    ],
    galleryAlt: 'Баня Лесной домик — интерьер',
    plankRows: [
      { label: 'Вместимость', value: '5 человек' },
      { label: 'Доп. гость', value: '100 ₽/час' },
      { label: 'Площадь', value: '2 этажа' },
    ],
    priceTable: [
      { label: 'Будни пн–чт · 08:00–15:00', value: '1 100 ₽/час' },
      { label: 'Будни пн–чт · 15:00–08:00', value: '1 600 ₽/час' },
      { label: 'Выходные · круглосуточно', value: '1 600 ₽/час' },
    ],
    priceNote: 'Минимальное время аренды: будни — от 2 часов, выходные и праздники — от 3 часов.',
    intro: 'Уютный лесной домик для небольшой компании. После жаркой парилки — камин, кальян и караоке в гостиной. Идеален для камерного отдыха на 5 человек.',
    actualTitle: 'Актуально',
    actualItems: [
      'Беседка с мангальной зоной.',
      'Веники, услуги парильщиков и массажистов.',
      'Домашняя еда от первоклассных поваров.',
    ],
    extraServicesText: 'аренду коттеджа на 20 человек, услуги парильщика (более 10 видов парения), массажиста, кафе с обширным меню, аренду банкетного зала. Приходите к нам дружной компанией и насладитесь хорошим отдыхом!',
    seoTitle: 'Баня «Лесной домик» — аренда на 5 человек от 1100 ₽/час | Лысая горка',
    seoDescription: 'Баня Лесной домик в Екатеринбурге: вместимость 5 человек, парилка, камин, кальян, караоке, веранда. Аренда от 1100 руб/час.',
  },
  {
    slug: 'morskoy-domik',
    title: 'Баня «Морской домик»',
    shortTitle: 'Морской домик',
    capacity: 6,
    capacityLabel: '6 человек',
    priceFrom: 1400,
    priceFromLabel: '1 400 ₽/час',
    area: 'гостиная и 2 этаж',
    tag: '6 человек',
    card: 'Морская стихия · купель',
    shortDescription: 'Морская стихия · гостиная и 2 этаж · парилка, купель, бассейн, караоке, веранда',
    heroDescription: 'Морская стихия в каждом уголке: парилка, купель и бассейн для контраста, уютная веранда для отдыха.',
    heroImage: '/images/ban/morskoy-domik.jpg',
    cardImage: '/images/ban/morskoy-domik.jpg',
    features: ['Парилка', 'Купель', 'Бассейн', 'Караоке', 'Веранда'],
    detailFeats: ['Парилка', 'Купель', 'Бассейн', 'Караоке', 'Веранда', 'Мангал', '2 этажа'],
    gallery: [
      '/images/ban/morskoy/IMG_7167.jpg',
      '/images/ban/morskoy/IMG_7173.jpg',
      '/images/ban/morskoy/IMG_7128.jpg',
      '/images/ban/morskoy/IMG_7132.jpg',
      '/images/ban/morskoy/IMG_7153.jpg',
      '/images/ban/morskoy/IMG_7143.jpg',
      '/images/ban/morskoy-domik.jpg',
    ],
    galleryAlt: 'Баня Морской домик — интерьер',
    plankRows: [
      { label: 'Вместимость', value: '6 человек' },
      { label: 'Доп. гость', value: '100 ₽/час' },
      { label: 'Площадь', value: '2 этажа' },
    ],
    priceTable: [
      { label: 'Будни пн–чт · 08:00–15:00', value: '1 400 ₽/час' },
      { label: 'Будни пн–чт · 15:00–08:00', value: '2 000 ₽/час' },
      { label: 'Выходные · круглосуточно', value: '2 000 ₽/час' },
    ],
    priceNote: 'Минимальное время аренды: будни — от 2 часов, выходные и праздники — от 3 часов.',
    intro: 'Морской домик — небольшой, но уютный. Парилка, купель и бассейн для контраста, караоке и веранда для отдыха.',
    actualTitle: 'Актуально',
    actualItems: [
      'Беседка с мангальной зоной.',
      'Веники, услуги парильщиков и массажистов.',
      'Домашняя еда от первоклассных поваров.',
    ],
    extraServicesText: 'аренду коттеджа на 20 человек, услуги парильщика (более 10 видов парения), массажиста, кафе с обширным меню, аренду банкетного зала. Приходите к нам дружной компанией и насладитесь хорошим отдыхом!',
    seoTitle: 'Баня «Морской домик» — аренда на 6 человек от 1400 ₽/час | Лысая горка',
    seoDescription: 'Баня Морской домик в Екатеринбурге: вместимость 6 человек, парилка, купель, бассейн, караоке, веранда. Аренда от 1400 руб/час.',
  },
  {
    slug: 'tsarskie-khoromy',
    title: 'Баня «Царские хоромы»',
    shortTitle: 'Царские хоромы',
    capacity: 20,
    capacityLabel: '20 человек',
    priceFrom: 4500,
    priceFromLabel: '4 500 ₽/час',
    area: '350 м²',
    tag: '20 человек',
    card: '350 м² · банкетный зал · 4 комнаты',
    shortDescription: '350 м² · банкетный зал и 4 комнаты · бильярд, бассейн, бар, камин, теннис',
    heroDescription: 'Поистине царский отдых для большой компании: банкетный зал на 30–35 человек, бильярд, бассейн, барная стойка, камин и 4 комнаты отдыха на втором этаже.',
    heroImage: '/images/ban/tsarskie-khoromy.jpg',
    cardImage: '/images/ban/tsarskie-khoromy.jpg',
    features: ['Бильярд', 'Бассейн', 'Камин', 'Бар', 'Теннис'],
    detailFeats: ['Банкетный зал', 'Бильярд', 'Бассейн', 'Парная', 'Камин', 'Караоке', 'Бар', 'Кухня', 'Теннис', '4 комнаты', 'Мангал', '350 м²'],
    gallery: [
      '/images/ban/tsarskie/IMG_6722-2.jpg',
      '/images/ban/tsarskie/IMG_6827.jpg',
      '/images/ban/tsarskie/IMG_6841.jpg',
      '/images/ban/tsarskie/IMG_6890.jpg',
      '/images/ban/tsarskie/IMG_6915.jpg',
      '/images/ban/tsarskie/IMG_6933.jpg',
      '/images/ban/tsarskie/IMG_6976.jpg',
      '/images/ban/tsarskie/IMG_7006.jpg',
      '/images/ban/tsarskie/IMG_7038.jpg',
    ],
    galleryAlt: 'Баня Царские хоромы — интерьер',
    plankRows: [
      { label: 'Вместимость', value: '20 человек' },
      { label: 'Доп. гость', value: '200 ₽/час' },
      { label: 'Площадь', value: '350 м²' },
    ],
    priceTable: [
      { label: 'Любой день · круглосуточно', value: '4 500 ₽/час' },
    ],
    priceNote: 'Минимальное время аренды — от 4 часов. Банкетный зал на 30–35 человек.',
    intro: 'Царские хоромы — лучшее место для отдыха большой компанией! Много места: площадь 350 м². Здесь отмечают корпоративы, свадьбы, юбилеи и проводят вечеринки.',
    actualTitle: 'Есть всё необходимое',
    actualItems: [
      'Банкетный зал на 30–35 человек с камином.',
      'ТВ, караоке.',
      'Настольный теннис, бильярд.',
      'Барная стойка, кухня.',
      'Бассейн.',
      'Русская парная.',
      '4 комнаты отдыха на втором этаже, зона отдыха.',
      'Беседка с мангальной зоной.',
    ],
    extraServicesText: 'аренду коттеджа на 20 человек, услуги парильщика (более 10 видов парения), массажиста, кафе с обширным меню, аренду банкетного зала. Приходите к нам дружной компанией и насладитесь хорошим отдыхом!',
    seoTitle: 'Баня «Царские хоромы» — аренда на 20 человек от 4500 ₽/час | Лысая горка',
    seoDescription: 'Баня Царские хоромы в Екатеринбурге: 350 м², вместимость 20 человек, банкетный зал, бильярд, бассейн, бар, 4 комнаты. Аренда от 4500 руб/час.',
  },
];

export const banyaSlugs = banyas.map((b) => b.slug);
