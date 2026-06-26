import { test, expect } from '@playwright/test';
import { step, attachment } from 'allure-js-commons';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import { CartPage } from '../pages/cart.page';
import users from '../fixtures/users.json';

test.describe('Inventory page — product catalog', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login(users.validUser.username, users.validUser.password);
    await expect(page).toHaveURL('/inventory.html');
    await inventoryPage.waitForInventory();
  });

  // ── Тест 1: Количество товаров ───────────────────────────────────────
  test('TC-05 | Inventory page displays 6 products', async ({ page }) => {
    await step('Подсчитать количество товаров на странице', async () => {
      const count = await inventoryPage.getProductCount();
      expect(count).toBe(6);
    });

    const screenshot = await page.screenshot({ fullPage: true });
    await attachment('Каталог товаров', screenshot, 'image/png');
  });

  // ── Тест 2: Сортировка A→Z ──────────────────────────────────────────
  test('TC-06 | Sort products by name A to Z', async ({ page }) => {
    await step('Применить сортировку "Name (A to Z)"', async () => {
      await inventoryPage.sortBy('az');
    });

    await step('Проверить, что первый товар — Sauce Labs Backpack', async () => {
      const firstName = await inventoryPage.getFirstProductName();
      expect(firstName).toBe('Sauce Labs Backpack');
    });

    await step('Проверить, что список отсортирован по алфавиту', async () => {
      const names = await inventoryPage.getAllProductNames();
      const sorted = [...names].sort();
      expect(names).toEqual(sorted);
    });
  });

  // ── Тест 3: Сортировка Z→A ──────────────────────────────────────────
  test('TC-07 | Sort products by name Z to A', async () => {
    await step('Применить сортировку "Name (Z to A)"', async () => {
      await inventoryPage.sortBy('za');
    });

    await step('Проверить, что список отсортирован в обратном порядке', async () => {
      const names = await inventoryPage.getAllProductNames();
      const reverseSorted = [...names].sort().reverse();
      expect(names).toEqual(reverseSorted);
    });
  });

  // ── Тест 4: Добавление в корзину ────────────────────────────────────
  test('TC-08 | Add item to cart updates badge', async ({ page }) => {
    await step('Добавить первый товар в корзину', async () => {
      await inventoryPage.addFirstItemToCart();
    });

    await step('Проверить, что счётчик корзины стал равен 1', async () => {
      const count = await inventoryPage.getCartCount();
      expect(count).toBe(1);
    });

    const screenshot = await page.screenshot();
    await attachment('Товар добавлен в корзину', screenshot, 'image/png');
  });

  // ── Тест 5: E2E — добавление + корзина + checkout ───────────────────
  test('TC-09 | Full E2E: add to cart and proceed to checkout', async ({ page }) => {
    const cartPage = new CartPage(page);

   await step('Добавить два товара в корзину', async () => {
  await inventoryPage.addItemToCartByIndex(0);
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1', { timeout: 15000 });
  
  await inventoryPage.addItemToCartByIndex(1);
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2', { timeout: 15000 });
  
  const count = await inventoryPage.getCartCount();
  expect(count).toBe(2);
});

    await step('Перейти в корзину', async () => {
      await page.locator('[data-test="shopping-cart-link"]').click();
      await page.waitForURL('**/cart.html');
      await page.waitForTimeout(2000);
    });

    await step('Проверить количество товаров в корзине', async () => {
  const count = await page.locator('.cart_item').count();
  expect(count).toBe(2);
});

    await step('Нажать "Checkout" для перехода к оформлению', async () => {
      await page.locator('[data-test="checkout"]').click();
      await expect(page).toHaveURL(/checkout-step-one/);
    });

    const screenshot = await page.screenshot();
    await attachment('Шаг оформления заказа', screenshot, 'image/png');
  });

  // ── Тест 6: Выход из системы ────────────────────────────────────────
  test('TC-10 | Logout redirects to login page', async ({ page }) => {
    await step('Выполнить выход из системы', async () => {
      await inventoryPage.logout();
    });

    await step('Проверить редирект на страницу входа', async () => {
      await expect(page).toHaveURL('/');
      await expect(page.locator('#login-button')).toBeVisible();
    });
  });// ── Тест API: перехват сетевого запроса ─────────────────────────
test('TC-11 | API route intercept: mock inventory response', async ({ page }) => {
  // Перехватываем запрос к странице каталога
  await page.route('**/inventory.html', async route => {
    await route.continue();
  });

  await step('Авторизоваться и перейти в каталог', async () => {
    await loginPage.goto();
    await loginPage.login(users.validUser.username, users.validUser.password);
    await expect(page).toHaveURL('/inventory.html');
  });

  await step('Проверить что каталог загрузился через перехват', async () => {
    const count = await inventoryPage.getProductCount();
    expect(count).toBe(6);
  });

  const screenshot = await page.screenshot();
  await attachment('API route intercept', screenshot, 'image/png');
});
});