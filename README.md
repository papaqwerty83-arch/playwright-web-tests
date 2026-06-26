# 🎭 Playwright E2E Test Automation

Система автоматизированного тестирования веб-приложения [SauceDemo](https://www.saucedemo.com) на базе **Playwright + TypeScript**.

![CI](https://github.com/papaqwerty83-arch/playwright-web-tests/actions/workflows/playwright.yml/badge.svg)

---

## 📋 О проекте

Дипломная работа по теме «Выбор и внедрение фреймворка автоматизированного тестирования для повышения качества web-приложений».

По результатам сравнительного анализа и экспериментального исследования трёх фреймворков (Selenium, Cypress, Playwright) был выбран **Playwright** с итоговой балльной оценкой **4,95 / 5**.

---

## 🚀 Результаты

| Показатель | Значение |
|---|---|
| Тест-кейсов | 30 (10 сценариев × 3 браузера) |
| Прохождение | 100% |
| Браузеры | Chromium, Firefox, WebKit |
| Flaky rate | 0% |
| Скорость vs Selenium | в 3,2 раза быстрее |
| Авто vs ручное | в 5,4 раза быстрее |

---

## 🗂️ Структура проекта

```
playwright-web-tests/
├── pages/              # Page Object классы
│   ├── base.page.ts    # Базовый класс
│   ├── login.page.ts   # Страница авторизации
│   ├── inventory.page.ts # Каталог товаров
│   └── cart.page.ts    # Корзина
├── tests/              # Тестовые сценарии
│   ├── login.spec.ts   # TC-01 — TC-04
│   └── inventory.spec.ts # TC-05 — TC-10
├── fixtures/
│   └── users.json      # Тестовые данные
├── utils/
│   └── logger.ts       # Логирование Winston
├── .github/workflows/
│   └── playwright.yml  # CI/CD GitHub Actions
└── playwright.config.ts
```

---

## 🧪 Тест-кейсы

| ID | Описание | Браузеры |
|---|---|---|
| TC-01 | Авторизация (позитивный) | Chrome / FF / WebKit |
| TC-02 | Авторизация (негативный) | Chrome / FF / WebKit |
| TC-03 | Заблокированный пользователь | Chrome / FF / WebKit |
| TC-04 | Скриншот страницы входа | Chrome / FF / WebKit |
| TC-05 | 6 товаров в каталоге | Chrome / FF / WebKit |
| TC-06 | Сортировка A→Z | Chrome / FF / WebKit |
| TC-07 | Сортировка Z→A | Chrome / FF / WebKit |
| TC-08 | Добавление в корзину | Chrome / FF / WebKit |
| TC-09 | E2E оформление заказа | Chrome / FF / WebKit |
| TC-10 | Выход из системы | Chrome / FF / WebKit |

---

## ⚙️ Установка и запуск

### Требования
- Node.js 18+
- Git

### Установка
```bash
git clone https://github.com/papaqwerty83-arch/playwright-web-tests.git
cd playwright-web-tests
npm install
npx playwright install --with-deps
```

### Запуск тестов
```bash
# Все тесты, все браузеры
npm run test

# Chrome с видимым браузером
npm run test:chrome:headed

# Один конкретный тест
npx playwright test --grep "TC-09" --headed

# Пошаговый режим
npx playwright test --debug
```

### Отчёт Allure
```bash
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report
```

### Встроенный отчёт Playwright
```bash
npx playwright show-report
```

---

## 🏗️ Архитектура

Проект построен на паттерне **Page Object Model**:

```
BasePage
├── LoginPage     — login(), getErrorText()
├── InventoryPage — sortBy(), addItemToCartByIndex(), getCartCount()
└── CartPage      — getCartItemCount(), proceedToCheckout()
```

---

## 🔄 CI/CD

При каждом `push` в ветку `main` автоматически запускается пайплайн GitHub Actions:

1. Клонирование репозитория
2. Установка Node.js 18
3. `npm ci` — установка зависимостей
4. `npx playwright install` — установка браузеров
5. `npx playwright test` — запуск тестов
6. Сохранение Allure-результатов (артефакты, 30 дней)

---

## 📊 Сравнение фреймворков

| Критерий | Selenium | Cypress | Playwright |
|---|---|---|---|
| Скорость (5 тестов) | 22,8 с | 10,1 с | **7,2 с** |
| Flaky rate | 35% | 10% | **0%** |
| Браузеры | Chrome/FF/Safari | Chromium/FF | **Chromium/FF/WebKit** |
| Параллельность | Selenium Grid | Платный Cloud | **Встроено** |
| Балльная оценка | 2,35 | 3,65 | **4,95** |

---

## 👤 Автор

**Степанов Дмитрий Дмитриевич**
- Telegram: [@susquest](https://t.me/susquest)
- Email: dstep04@mail.ru
- БГТУ, 2026
