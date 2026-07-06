async function main() {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;

  if (!url || !token) {
    console.error('Set KV_REST_API_URL and KV_REST_API_TOKEN in .env before running seed.');
    process.exit(1);
  }

  const { createClient } = await import('@vercel/kv');
  const kv = createClient({ url, token });

  const seedPosts = [
    {
      id: 'post_001', type: 'offer', status: 'published', slug: 'kalyan-v-podarok',
      title: 'Кальян в подарок',
      excerpt: 'При бронировании бани — кальян в подарок. Отличный повод собрать друзей и провести вечер в тёплой атмосфере Лысой горки.',
      content: 'При бронировании бани — кальян в подарок. Отличный повод собрать друзей и провести вечер в тёплой атмосфере Лысой горки.',
      image: '/images/news/kalyan.png', date: '2026-04-12', dateLabel: '12 апреля 2026', typeLabel: 'Акция',
      ctaText: 'Воспользоваться', ctaWhatsappText: 'Здравствуйте! Хочу забронировать баню с кальяном в подарок.',
      note: null, validTo: null, seoTitle: null, seoDescription: null,
      createdAt: '2026-04-12T00:00:00.000Z', updatedAt: '2026-04-12T00:00:00.000Z',
    },
    {
      id: 'post_002', type: 'offer', status: 'published', slug: 'akciya-na-den-rozhdeniya',
      title: 'Акция на день рождения',
      excerpt: 'Скидка 25% на банное время предоставляется имениннику в день рождения при бронировании бани не менее чем на 4 часа. Подтверждение — паспорт или водительское удостоверение.',
      content: 'Скидка 25% на банное время предоставляется имениннику в день рождения при бронировании бани не менее чем на 4 часа. Подтверждение — паспорт или водительское удостоверение.',
      image: '/images/news/skidka.jpeg', date: '2023-01-09', dateLabel: '9 января 2023', typeLabel: 'Акция',
      ctaText: 'Забронировать', ctaWhatsappText: 'Здравствуйте! Хочу забронировать баню по акции ко дню рождения.',
      note: 'На данное предложение скидка по дисконтным картам не распространяется. Доплата за дополнительного гостя — 100 ₽. Дополнительные услуги оплачиваются согласно прейскуранту.',
      validTo: null, seoTitle: null, seoDescription: null,
      createdAt: '2023-01-09T00:00:00.000Z', updatedAt: '2023-01-09T00:00:00.000Z',
    },
    {
      id: 'post_003', type: 'offer', status: 'published', slug: '1-chas-v-podarok',
      title: 'Банный день или полный релакс: 1 час в подарок',
      excerpt: '1 час русской бани (банное время) в подарок предоставляется при бронировании услуг не менее чем на 5 часов. Предложение распространяется на все бани.',
      content: '1 час русской бани (банное время) в подарок предоставляется при бронировании услуг не менее чем на 5 часов. Предложение распространяется на все бани.',
      image: '/images/news/derevyannye-bani.jpg', date: '2023-01-09', dateLabel: '9 января 2023', typeLabel: 'Акция',
      ctaText: 'Забронировать', ctaWhatsappText: 'Здравствуйте! Хочу забронировать баню — 1 час в подарок.',
      note: 'Действительно в выходные дни и в будни с 15:00 до 06:00. Скидка по дисконтным картам не распространяется. Доплата за дополнительного гостя — 100 ₽.',
      validTo: null, seoTitle: null, seoDescription: null,
      createdAt: '2023-01-09T00:00:00.000Z', updatedAt: '2023-01-09T00:00:00.000Z',
    },
    {
      id: 'post_004', type: 'article', status: 'published', slug: 'pro-chay',
      title: 'Про чай!',
      excerpt: 'Пить чай в бане — традиция, которой очень много лет. Чай обладает тонизирующими, целебными свойствами и отлично утоляет жажду. Какие чаи лучше всего подходят для распития в бане?',
      content: 'Пить чай в бане — традиция, которой очень много лет. Чай обладает тонизирующими, целебными свойствами и отлично утоляет жажду. Какие чаи лучше всего подходят для распития в бане?\n\nУ опытных парильщиков популярен чай с листьями брусники и ложкой мёда — для профилактики мочекаменной болезни. Задача любого чая в бане — усилить эффект от парения. Главное правило — не переусердствовать: нагружать организм не стоит, цель бани — расслабиться. После бани — не ограничивайте себя, восстановите баланс жидкости.',
      image: '/images/services/eda.png', date: '2018-05-16', dateLabel: '16 мая 2018', typeLabel: 'Статья',
      ctaText: null, ctaWhatsappText: null, note: null, validTo: null, seoTitle: null, seoDescription: null,
      createdAt: '2018-05-16T00:00:00.000Z', updatedAt: '2018-05-16T00:00:00.000Z',
    },
    {
      id: 'post_005', type: 'article', status: 'published', slug: 'parilshchik-ili-parimsya-sami',
      title: 'Парильщик, или паримся сами?',
      excerpt: 'Первый заход в парную не подразумевает, что надо сразу взять веник и хлестать себя. Важно сначала посидеть на полке и дать телу равномерно прогреться. Идеальный вариант — париться вдвоём по очереди: когда парят вас, вы отдыхаете.',
      content: 'Первый заход в парную не подразумевает, что надо сразу взять веник и хлестать себя. Важно сначала посидеть на полке и дать телу равномерно прогреться. Идеальный вариант — париться вдвоём по очереди: когда парят вас, вы отдыхаете.\n\nДвижения веником должны быть равномерными и плавными — это не розги. Весь смысл в том, чтобы тело получило максимум тепла. Веники почти не дотрагиваются до кожи, а по бокам используются как опахало. Опытный парильщик парит интенсивно, но интенсивность зависит от количества жара.',
      image: '/images/services/parilshchik.jpg', date: '2018-05-03', dateLabel: '3 мая 2018', typeLabel: 'Статья',
      ctaText: null, ctaWhatsappText: null, note: null, validTo: null, seoTitle: null, seoDescription: null,
      createdAt: '2018-05-03T00:00:00.000Z', updatedAt: '2018-05-03T00:00:00.000Z',
    },
    {
      id: 'post_006', type: 'article', status: 'published', slug: 'detskie-pareniya',
      title: 'Детские парения',
      excerpt: 'Мягкое и нежное парение для самых юных гостей. Прогревание берёзовыми и дубовыми веничками, эвкалиптовая ароматерапия и по желанию — контрастное обливание холодной водой. Для детей до 12 лет.',
      content: 'Мягкое и нежное парение для самых юных гостей. Прогревание берёзовыми и дубовыми веничками, эвкалиптовая ароматерапия и по желанию — контрастное обливание холодной водой. Для детей до 12 лет.',
      image: '/images/ban/lesnoy-domik.jpg', date: '2018-04-16', dateLabel: '16 апреля 2018', typeLabel: 'Статья',
      ctaText: 'Подробнее о парильщике', ctaWhatsappText: null, note: null, validTo: null, seoTitle: null, seoDescription: null,
      createdAt: '2018-04-16T00:00:00.000Z', updatedAt: '2018-04-16T00:00:00.000Z',
    },
  ];

  const defaultSettings = {
    phone: '+7 (343) 213-75-77', phoneHref: '+73432137577',
    phone2: '+7 (953) 047-77-57', phone2Href: '+79530477757',
    whatsapp: '79530477577', whatsappText: 'Здравствуйте! Хочу забронировать баню.',
    telegram: '', max: '',
    address: 'Екатеринбург, Предельная, 41', addressArea: 'район УНЦ',
    email: 'nagorke@list.ru',
    vk: 'https://vk.com/bani_nagorke', instagram: 'https://www.instagram.com/lysayagorka',
    panorama: 'http://www.panorama66.ru/banya/nagorke/',
    mapLat: 56.765752, mapLon: 60.561101, mapZoom: 15, yearFrom: 2015,
  };

  console.log('Seeding posts...');
  for (const post of seedPosts) {
    await kv.set(`post:${post.id}`, post);
    await kv.sadd('posts:list', post.id);
    console.log(`  ✓ ${post.id} — ${post.title}`);
  }

  console.log('Seeding settings...');
  await kv.set('site:settings', defaultSettings);
  console.log('  ✓ site:settings');

  console.log('\nDone! Seeded', seedPosts.length, 'posts and site settings.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
