
// Site information
export const SITE_CONSTANTS = {
  SITE_NAME: 'easyappz',
  SITE_DESCRIPTION: 'Создавайте приложения за секунды с ИИ',
  HERO_TITLE: 'Создайте что-то',
  HERO_SUBTITLE: 'От идеи до приложения за секунды, с вашим персональным full stack инженером',
  PROMPT_PLACEHOLDER: 'Попросите easyappz создать блог',
  COPYRIGHT_YEAR: new Date().getFullYear(),
};

// Navigation
export const NAVIGATION = {
  LOG_IN: 'Войти',
  GET_STARTED: 'Начать бесплатно',
};

// Project types
export const PROJECT_TYPES = [
  { id: 'ecommerce', label: 'Страница товара E-commerce' },
  { id: 'dashboard', label: 'Панель результатов' },
  { id: 'portfolio', label: 'Портфолио разработчика' },
  { id: 'feed', label: 'Лента соцсетей' },
];

// Community section
export const COMMUNITY_SECTION = {
  TITLE: 'От сообщества',
  VIEW_ALL: 'Смотреть все',
  SHOW_MORE: 'Показать больше',
};

// Footer sections
export const FOOTER_SECTIONS = {
  COMPANY: {
    TITLE: 'Компания',
    LINKS: [
      { label: 'Блог', href: '/blog' },
      { label: 'Карьера', href: '/careers' },
      { label: 'Статус', href: '/status' },
      { label: 'Изменения', href: '/changelog' },
      { label: 'Цены', href: '/pricing' },
      { label: 'Решения', href: '/solutions' },
      { label: 'Нанять партнера', href: '/partners/hire' },
      { label: 'Стать партнером', href: '/partners/become' },
    ],
  },
  PRODUCT: {
    TITLE: 'Продукт',
    LINKS: [
      { label: 'Импорт из Figma', href: '/import-figma' },
      { label: 'Дорожная карта', href: '/roadmap' },
      { label: 'Статус', href: '/status' },
      { label: 'Поддержка', href: '/support' },
      { label: 'Интеграции', href: '/integrations' },
      { label: 'Партнерская программа', href: '/affiliates' },
      { label: 'Правила бренда', href: '/brand' },
    ],
  },
  RESOURCES: {
    TITLE: 'Ресурсы',
    LINKS: [
      { label: 'Запущенные', href: '/launched' },
      { label: 'Для предприятий', href: '/enterprise' },
      { label: 'Обучение', href: '/learn' },
      { label: 'Поддержка', href: '/support' },
      { label: 'Интеграции', href: '/integrations' },
      { label: 'Партнерская программа', href: '/affiliates' },
      { label: 'Правила бренда', href: '/brand' },
    ],
  },
  LEGAL: {
    TITLE: 'Юридическое',
    LINKS: [
      { label: 'Политика конфиденциальности', href: '/privacy' },
      { label: 'Условия использования', href: '/terms' },
      { label: 'Сообщить о нарушении', href: '/report' },
    ],
  },
  SOCIALS: {
    TITLE: 'Соцсети',
    LINKS: [
      { label: 'X / Twitter', href: 'https://twitter.com' },
      { label: 'LinkedIn', href: 'https://linkedin.com' },
      { label: 'Discord', href: 'https://discord.com' },
      { label: 'Reddit', href: 'https://reddit.com' },
    ],
  },
};
