import { test, expect } from '@playwright/test';
import { step, attachment } from 'allure-js-commons';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import users from '../fixtures/users.json';

test.describe('Login functionality — SauceDemo', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  // ── Тест 1: Позитивный сценарий авторизации ──────────────────────────
  test('TC-01 | Valid login redirects to inventory page', async ({ page }) => {
    await step('Открыть страницу авторизации', async () => {
      await expect(page).toHaveURL('/');
    });

    await step('Ввести корректные учётные данные и нажать "Login"', async () => {
      await loginPage.login(users.validUser.username, users.validUser.password);
    });

    await step('Проверить переход на страницу каталога', async () => {
      await expect(page).toHaveURL('/inventory.html');
    });

    await step('Проверить заголовок страницы каталога', async () => {
      const inventoryPage = new InventoryPage(page);
      await inventoryPage.waitForInventory();
      const title = await inventoryPage.getPageTitle();
      expect(title).toBe('Products');
    });

    // Прикрепить скриншот к Allure-отчёту
    const screenshot = await page.screenshot({ fullPage: false });
    await attachment('Страница каталога после входа', screenshot, 'image/png');
  });

  // ── Тест 2: Негативный сценарий — неверные данные ────────────────────
  test('TC-02 | Invalid credentials show error message', async ({ page }) => {
    await step('Ввести некорректные учётные данные', async () => {
      await loginPage.login(users.invalidUser.username, users.invalidUser.password);
    });

    await step('Проверить, что появилось сообщение об ошибке', async () => {
      const errorVisible = await loginPage.isErrorVisible();
      expect(errorVisible).toBe(true);
    });

    await step('Проверить текст сообщения об ошибке', async () => {
      const errorText = await loginPage.getErrorText();
      expect(errorText).toContain('Username and password do not match');
    });

    await step('Проверить, что URL не изменился', async () => {
      await expect(page).toHaveURL('/');
    });

    const screenshot = await page.screenshot();
    await attachment('Ошибка авторизации', screenshot, 'image/png');
  });

  // ── Тест 3: Заблокированный пользователь ─────────────────────────────
  test('TC-03 | Locked out user sees specific error', async ({ page }) => {
    await step('Попытка входа заблокированным пользователем', async () => {
      await loginPage.login(users.lockedUser.username, users.lockedUser.password);
    });

    await step('Проверить текст ошибки о блокировке', async () => {
      const errorText = await loginPage.getErrorText();
      expect(errorText).toContain('Sorry, this user has been locked out');
    });
  });

  // ── Тест 4: Скриншот-фиксация начального состояния ───────────────────
  test('TC-04 | Login page screenshot baseline', async ({ page }) => {
    await step('Зафиксировать начальное состояние страницы авторизации', async () => {
      const screenshot = await loginPage.takeScreenshot('login-page-baseline');
      await attachment('Страница авторизации (baseline)', screenshot, 'image/png');
    });

    await step('Проверить наличие ключевых элементов формы', async () => {
      await expect(page.locator('#user-name')).toBeVisible();
      await expect(page.locator('#password')).toBeVisible();
      await expect(page.locator('#login-button')).toBeVisible();
    });
  });
  // ── Тест визуальной регрессии ────────────────────────────────────
test('TC-05 | Visual regression: login page screenshot', async ({ page }) => {
  await step('Открыть страницу входа', async () => {
    await loginPage.goto();
  });

  await step('Сравнить скриншот с эталоном', async () => {
    await expect(page).toHaveScreenshot('login-page.png', {
      maxDiffPixels: 100
    });
  });
});
});
