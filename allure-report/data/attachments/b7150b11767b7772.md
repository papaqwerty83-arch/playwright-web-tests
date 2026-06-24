# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: login.spec.ts >> Login functionality — SauceDemo >> TC-04 | Login page screenshot baseline
- Location: tests\login.spec.ts:78:7

# Error details

```
Test timeout of 30000ms exceeded while running "beforeEach" hook.
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]: Swag Labs
  - generic [ref=e5]:
    - generic [ref=e9]:
      - textbox "Username" [ref=e11]
      - textbox "Password" [ref=e13]
      - button "Login" [ref=e15] [cursor=pointer]
    - generic [ref=e17]:
      - generic [ref=e18]:
        - heading "Accepted usernames are:" [level=4] [ref=e19]
        - text: standard_user
        - text: locked_out_user
        - text: problem_user
        - text: performance_glitch_user
        - text: error_user
        - text: visual_user
      - generic [ref=e20]:
        - heading "Password for all users:" [level=4] [ref=e21]
        - text: secret_sauce
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { step, attachment } from 'allure-js-commons';
  3  | import { LoginPage } from '../pages/login.page';
  4  | import { InventoryPage } from '../pages/inventory.page';
  5  | import users from '../fixtures/users.json';
  6  | 
  7  | test.describe('Login functionality — SauceDemo', () => {
  8  |   let loginPage: LoginPage;
  9  | 
> 10 |   test.beforeEach(async ({ page }) => {
     |        ^ Test timeout of 30000ms exceeded while running "beforeEach" hook.
  11 |     loginPage = new LoginPage(page);
  12 |     await loginPage.goto();
  13 |   });
  14 | 
  15 |   // ── Тест 1: Позитивный сценарий авторизации ──────────────────────────
  16 |   test('TC-01 | Valid login redirects to inventory page', async ({ page }) => {
  17 |     await step('Открыть страницу авторизации', async () => {
  18 |       await expect(page).toHaveURL('/');
  19 |     });
  20 | 
  21 |     await step('Ввести корректные учётные данные и нажать "Login"', async () => {
  22 |       await loginPage.login(users.validUser.username, users.validUser.password);
  23 |     });
  24 | 
  25 |     await step('Проверить переход на страницу каталога', async () => {
  26 |       await expect(page).toHaveURL('/inventory.html');
  27 |     });
  28 | 
  29 |     await step('Проверить заголовок страницы каталога', async () => {
  30 |       const inventoryPage = new InventoryPage(page);
  31 |       await inventoryPage.waitForInventory();
  32 |       const title = await inventoryPage.getPageTitle();
  33 |       expect(title).toBe('Products');
  34 |     });
  35 | 
  36 |     // Прикрепить скриншот к Allure-отчёту
  37 |     const screenshot = await page.screenshot({ fullPage: false });
  38 |     await attachment('Страница каталога после входа', screenshot, 'image/png');
  39 |   });
  40 | 
  41 |   // ── Тест 2: Негативный сценарий — неверные данные ────────────────────
  42 |   test('TC-02 | Invalid credentials show error message', async ({ page }) => {
  43 |     await step('Ввести некорректные учётные данные', async () => {
  44 |       await loginPage.login(users.invalidUser.username, users.invalidUser.password);
  45 |     });
  46 | 
  47 |     await step('Проверить, что появилось сообщение об ошибке', async () => {
  48 |       const errorVisible = await loginPage.isErrorVisible();
  49 |       expect(errorVisible).toBe(true);
  50 |     });
  51 | 
  52 |     await step('Проверить текст сообщения об ошибке', async () => {
  53 |       const errorText = await loginPage.getErrorText();
  54 |       expect(errorText).toContain('Username and password do not match');
  55 |     });
  56 | 
  57 |     await step('Проверить, что URL не изменился', async () => {
  58 |       await expect(page).toHaveURL('/');
  59 |     });
  60 | 
  61 |     const screenshot = await page.screenshot();
  62 |     await attachment('Ошибка авторизации', screenshot, 'image/png');
  63 |   });
  64 | 
  65 |   // ── Тест 3: Заблокированный пользователь ─────────────────────────────
  66 |   test('TC-03 | Locked out user sees specific error', async ({ page }) => {
  67 |     await step('Попытка входа заблокированным пользователем', async () => {
  68 |       await loginPage.login(users.lockedUser.username, users.lockedUser.password);
  69 |     });
  70 | 
  71 |     await step('Проверить текст ошибки о блокировке', async () => {
  72 |       const errorText = await loginPage.getErrorText();
  73 |       expect(errorText).toContain('Sorry, this user has been locked out');
  74 |     });
  75 |   });
  76 | 
  77 |   // ── Тест 4: Скриншот-фиксация начального состояния ───────────────────
  78 |   test('TC-04 | Login page screenshot baseline', async ({ page }) => {
  79 |     await step('Зафиксировать начальное состояние страницы авторизации', async () => {
  80 |       const screenshot = await loginPage.takeScreenshot('login-page-baseline');
  81 |       await attachment('Страница авторизации (baseline)', screenshot, 'image/png');
  82 |     });
  83 | 
  84 |     await step('Проверить наличие ключевых элементов формы', async () => {
  85 |       await expect(page.locator('#user-name')).toBeVisible();
  86 |       await expect(page.locator('#password')).toBeVisible();
  87 |       await expect(page.locator('#login-button')).toBeVisible();
  88 |     });
  89 |   });
  90 | });
  91 | 
```