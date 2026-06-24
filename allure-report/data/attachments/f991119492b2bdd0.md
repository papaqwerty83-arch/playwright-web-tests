# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: inventory.spec.ts >> Inventory page — product catalog >> TC-09 | Full E2E: add to cart and proceed to checkout
- Location: tests\inventory.spec.ts:79:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 2
Received: 0
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]:
    - generic [ref=e5]:
      - generic [ref=e6]:
        - generic [ref=e7]:
          - button "Open Menu" [ref=e8] [cursor=pointer]
          - img "Open Menu" [ref=e9]
        - generic [ref=e11]: Swag Labs
        - generic [ref=e14]: "2"
      - generic [ref=e16]: Your Cart
    - generic [ref=e18]:
      - generic [ref=e19]:
        - generic [ref=e20]: QTY
        - generic [ref=e21]: Description
        - generic [ref=e22]:
          - generic [ref=e23]: "1"
          - generic [ref=e24]:
            - link "Sauce Labs Backpack" [ref=e25] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e26]: Sauce Labs Backpack
            - generic [ref=e27]: carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.
            - generic [ref=e28]:
              - generic [ref=e29]: $29.99
              - button "Remove" [ref=e30] [cursor=pointer]
        - generic [ref=e31]:
          - generic [ref=e32]: "1"
          - generic [ref=e33]:
            - link "Sauce Labs Bike Light" [ref=e34] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e35]: Sauce Labs Bike Light
            - generic [ref=e36]: A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.
            - generic [ref=e37]:
              - generic [ref=e38]: $9.99
              - button "Remove" [ref=e39] [cursor=pointer]
      - generic [ref=e40]:
        - button "Go back Continue Shopping" [ref=e41] [cursor=pointer]:
          - img "Go back" [ref=e42]
          - text: Continue Shopping
        - button "Checkout" [ref=e43] [cursor=pointer]
  - contentinfo [ref=e44]:
    - list [ref=e45]:
      - listitem [ref=e46]:
        - link "Twitter" [ref=e47] [cursor=pointer]:
          - /url: https://twitter.com/saucelabs
      - listitem [ref=e48]:
        - link "Facebook" [ref=e49] [cursor=pointer]:
          - /url: https://www.facebook.com/saucelabs
      - listitem [ref=e50]:
        - link "LinkedIn" [ref=e51] [cursor=pointer]:
          - /url: https://www.linkedin.com/company/sauce-labs/
    - generic [ref=e52]: © 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | import { step, attachment } from 'allure-js-commons';
  3   | import { LoginPage } from '../pages/login.page';
  4   | import { InventoryPage } from '../pages/inventory.page';
  5   | import { CartPage } from '../pages/cart.page';
  6   | import users from '../fixtures/users.json';
  7   | 
  8   | test.describe('Inventory page — product catalog', () => {
  9   |   let loginPage: LoginPage;
  10  |   let inventoryPage: InventoryPage;
  11  | 
  12  |   // Перед каждым тестом выполняем авторизацию
  13  |   test.beforeEach(async ({ page }) => {
  14  |     loginPage = new LoginPage(page);
  15  |     inventoryPage = new InventoryPage(page);
  16  | 
  17  |     await loginPage.goto();
  18  |     await loginPage.login(users.validUser.username, users.validUser.password);
  19  |     await expect(page).toHaveURL('/inventory.html');
  20  |     await inventoryPage.waitForInventory();
  21  |   });
  22  | 
  23  |   // ── Тест 1: Количество товаров ───────────────────────────────────────
  24  |   test('TC-05 | Inventory page displays 6 products', async ({ page }) => {
  25  |     await step('Подсчитать количество товаров на странице', async () => {
  26  |       const count = await inventoryPage.getProductCount();
  27  |       expect(count).toBe(6);
  28  |     });
  29  | 
  30  |     const screenshot = await page.screenshot({ fullPage: true });
  31  |     await attachment('Каталог товаров', screenshot, 'image/png');
  32  |   });
  33  | 
  34  |   // ── Тест 2: Сортировка A→Z ──────────────────────────────────────────
  35  |   test('TC-06 | Sort products by name A to Z', async ({ page }) => {
  36  |     await step('Применить сортировку "Name (A to Z)"', async () => {
  37  |       await inventoryPage.sortBy('az');
  38  |     });
  39  | 
  40  |     await step('Проверить, что первый товар — Sauce Labs Backpack', async () => {
  41  |       const firstName = await inventoryPage.getFirstProductName();
  42  |       expect(firstName).toBe('Sauce Labs Backpack');
  43  |     });
  44  | 
  45  |     await step('Проверить, что список отсортирован по алфавиту', async () => {
  46  |       const names = await inventoryPage.getAllProductNames();
  47  |       const sorted = [...names].sort();
  48  |       expect(names).toEqual(sorted);
  49  |     });
  50  |   });
  51  | 
  52  |   // ── Тест 3: Сортировка Z→A ──────────────────────────────────────────
  53  |   test('TC-07 | Sort products by name Z to A', async () => {
  54  |     await step('Применить сортировку "Name (Z to A)"', async () => {
  55  |       await inventoryPage.sortBy('za');
  56  |     });
  57  | 
  58  |     await step('Проверить, что список отсортирован в обратном порядке', async () => {
  59  |       const names = await inventoryPage.getAllProductNames();
  60  |       const reverseSorted = [...names].sort().reverse();
  61  |       expect(names).toEqual(reverseSorted);
  62  |     });
  63  |   });
  64  | 
  65  |   // ── Тест 4: Добавление в корзину ────────────────────────────────────
  66  |   test('TC-08 | Add item to cart updates badge', async ({ page }) => {
  67  |     await step('Добавить первый товар в корзину', async () => {
  68  |       await inventoryPage.addFirstItemToCart();
  69  |     });
  70  | 
  71  |     await step('Проверить, что счётчик корзины стал равен 1', async () => {
  72  |       const count = await inventoryPage.getCartCount();
  73  |       expect(count).toBe(1);
  74  |     });
  75  | 
  76  |     const screenshot = await page.screenshot();
  77  |     await attachment('Товар добавлен в корзину', screenshot, 'image/png');
  78  |   });
  79  | test('TC-09 | Full E2E: add to cart and proceed to checkout', async ({ page }) => {
  80  |   const cartPage = new CartPage(page);
  81  | 
  82  |   await step('Добавить два товара в корзину', async () => {
  83  |     await inventoryPage.addItemToCartByIndex(0);
  84  |     await page.waitForTimeout(500); // добавь эту строку
  85  |     await inventoryPage.addItemToCartByIndex(1);
  86  |     await page.waitForTimeout(500); // и эту
  87  |     const count = await inventoryPage.getCartCount();
  88  |     expect(count).toBe(2);
  89  |   });
  90  | 
  91  |     await step('Перейти в корзину', async () => {
  92  |     await inventoryPage.openCart();
  93  |     await expect(page).toHaveURL('/cart.html');
  94  |     await page.waitForLoadState('networkidle'); // добавь эту строку
  95  |   });
  96  | 
  97  |   await step('Проверить количество товаров в корзине', async () => {
  98  |     const itemCount = await cartPage.getCartItemCount();
> 99  |     expect(itemCount).toBe(2);
      |                       ^ Error: expect(received).toBe(expected) // Object.is equality
  100 |   });
  101 | 
  102 |     await step('Нажать "Checkout" для перехода к оформлению', async () => {
  103 |       await cartPage.proceedToCheckout();
  104 |       await expect(page).toHaveURL('/checkout-step-one.html');
  105 |     });
  106 | 
  107 |     const screenshot = await page.screenshot();
  108 |     await attachment('Шаг оформления заказа', screenshot, 'image/png');
  109 |   });
  110 | 
  111 |   // ── Тест 6: Выход из системы ────────────────────────────────────────
  112 |   test('TC-10 | Logout redirects to login page', async ({ page }) => {
  113 |     await step('Выполнить выход из системы', async () => {
  114 |       await inventoryPage.logout();
  115 |     });
  116 | 
  117 |     await step('Проверить редирект на страницу входа', async () => {
  118 |       await expect(page).toHaveURL('/');
  119 |       await expect(page.locator('#login-button')).toBeVisible();
  120 |     });
  121 |   });
  122 | });
  123 | 
```