# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: inventory.spec.ts >> Inventory page — product catalog >> TC-09 | Full E2E: add to cart and proceed to checkout
- Location: tests\inventory.spec.ts:80:7

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: page.waitForFunction: Test timeout of 60000ms exceeded.
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
      - generic [ref=e15]:
        - generic [ref=e16]: Products
        - generic [ref=e18] [cursor=pointer]:
          - generic [ref=e19]: Name (A to Z)
          - combobox [ref=e20]:
            - option "Name (A to Z)" [selected]
            - option "Name (Z to A)"
            - option "Price (low to high)"
            - option "Price (high to low)"
    - generic [ref=e24]:
      - generic [ref=e25]:
        - link "Sauce Labs Backpack" [ref=e27] [cursor=pointer]:
          - /url: "#"
          - img "Sauce Labs Backpack" [ref=e28]
        - generic [ref=e29]:
          - generic [ref=e30]:
            - link "Sauce Labs Backpack" [ref=e31] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e32]: Sauce Labs Backpack
            - generic [ref=e33]: carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.
          - generic [ref=e34]:
            - generic [ref=e35]: $29.99
            - button "Remove" [ref=e36] [cursor=pointer]
      - generic [ref=e37]:
        - link "Sauce Labs Bike Light" [ref=e39] [cursor=pointer]:
          - /url: "#"
          - img "Sauce Labs Bike Light" [ref=e40]
        - generic [ref=e41]:
          - generic [ref=e42]:
            - link "Sauce Labs Bike Light" [ref=e43] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e44]: Sauce Labs Bike Light
            - generic [ref=e45]: A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.
          - generic [ref=e46]:
            - generic [ref=e47]: $9.99
            - button "Remove" [ref=e48] [cursor=pointer]
      - generic [ref=e49]:
        - link "Sauce Labs Bolt T-Shirt" [ref=e51] [cursor=pointer]:
          - /url: "#"
          - img "Sauce Labs Bolt T-Shirt" [ref=e52]
        - generic [ref=e53]:
          - generic [ref=e54]:
            - link "Sauce Labs Bolt T-Shirt" [ref=e55] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e56]: Sauce Labs Bolt T-Shirt
            - generic [ref=e57]: Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.
          - generic [ref=e58]:
            - generic [ref=e59]: $15.99
            - button "Add to cart" [ref=e60] [cursor=pointer]
      - generic [ref=e61]:
        - link "Sauce Labs Fleece Jacket" [ref=e63] [cursor=pointer]:
          - /url: "#"
          - img "Sauce Labs Fleece Jacket" [ref=e64]
        - generic [ref=e65]:
          - generic [ref=e66]:
            - link "Sauce Labs Fleece Jacket" [ref=e67] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e68]: Sauce Labs Fleece Jacket
            - generic [ref=e69]: It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.
          - generic [ref=e70]:
            - generic [ref=e71]: $49.99
            - button "Add to cart" [ref=e72] [cursor=pointer]
      - generic [ref=e73]:
        - link "Sauce Labs Onesie" [ref=e75] [cursor=pointer]:
          - /url: "#"
          - img "Sauce Labs Onesie" [ref=e76]
        - generic [ref=e77]:
          - generic [ref=e78]:
            - link "Sauce Labs Onesie" [ref=e79] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e80]: Sauce Labs Onesie
            - generic [ref=e81]: Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel.
          - generic [ref=e82]:
            - generic [ref=e83]: $7.99
            - button "Add to cart" [ref=e84] [cursor=pointer]
      - generic [ref=e85]:
        - link "Test.allTheThings() T-Shirt (Red)" [ref=e87] [cursor=pointer]:
          - /url: "#"
          - img "Test.allTheThings() T-Shirt (Red)" [ref=e88]
        - generic [ref=e89]:
          - generic [ref=e90]:
            - link "Test.allTheThings() T-Shirt (Red)" [ref=e91] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e92]: Test.allTheThings() T-Shirt (Red)
            - generic [ref=e93]: This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.
          - generic [ref=e94]:
            - generic [ref=e95]: $15.99
            - button "Add to cart" [ref=e96] [cursor=pointer]
  - contentinfo [ref=e97]:
    - list [ref=e98]:
      - listitem [ref=e99]:
        - link "Twitter" [ref=e100] [cursor=pointer]:
          - /url: https://twitter.com/saucelabs
      - listitem [ref=e101]:
        - link "Facebook" [ref=e102] [cursor=pointer]:
          - /url: https://www.facebook.com/saucelabs
      - listitem [ref=e103]:
        - link "LinkedIn" [ref=e104] [cursor=pointer]:
          - /url: https://www.linkedin.com/company/sauce-labs/
    - generic [ref=e105]: © 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy
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
  12  |   test.beforeEach(async ({ page }) => {
  13  |     loginPage = new LoginPage(page);
  14  |     inventoryPage = new InventoryPage(page);
  15  | 
  16  |     await loginPage.goto();
  17  |     await loginPage.login(users.validUser.username, users.validUser.password);
  18  |     await expect(page).toHaveURL('/inventory.html');
  19  |     await inventoryPage.waitForInventory();
  20  |   });
  21  | 
  22  |   // ── Тест 1: Количество товаров ───────────────────────────────────────
  23  |   test('TC-05 | Inventory page displays 6 products', async ({ page }) => {
  24  |     await step('Подсчитать количество товаров на странице', async () => {
  25  |       const count = await inventoryPage.getProductCount();
  26  |       expect(count).toBe(6);
  27  |     });
  28  | 
  29  |     const screenshot = await page.screenshot({ fullPage: true });
  30  |     await attachment('Каталог товаров', screenshot, 'image/png');
  31  |   });
  32  | 
  33  |   // ── Тест 2: Сортировка A→Z ──────────────────────────────────────────
  34  |   test('TC-06 | Sort products by name A to Z', async ({ page }) => {
  35  |     await step('Применить сортировку "Name (A to Z)"', async () => {
  36  |       await inventoryPage.sortBy('az');
  37  |     });
  38  | 
  39  |     await step('Проверить, что первый товар — Sauce Labs Backpack', async () => {
  40  |       const firstName = await inventoryPage.getFirstProductName();
  41  |       expect(firstName).toBe('Sauce Labs Backpack');
  42  |     });
  43  | 
  44  |     await step('Проверить, что список отсортирован по алфавиту', async () => {
  45  |       const names = await inventoryPage.getAllProductNames();
  46  |       const sorted = [...names].sort();
  47  |       expect(names).toEqual(sorted);
  48  |     });
  49  |   });
  50  | 
  51  |   // ── Тест 3: Сортировка Z→A ──────────────────────────────────────────
  52  |   test('TC-07 | Sort products by name Z to A', async () => {
  53  |     await step('Применить сортировку "Name (Z to A)"', async () => {
  54  |       await inventoryPage.sortBy('za');
  55  |     });
  56  | 
  57  |     await step('Проверить, что список отсортирован в обратном порядке', async () => {
  58  |       const names = await inventoryPage.getAllProductNames();
  59  |       const reverseSorted = [...names].sort().reverse();
  60  |       expect(names).toEqual(reverseSorted);
  61  |     });
  62  |   });
  63  | 
  64  |   // ── Тест 4: Добавление в корзину ────────────────────────────────────
  65  |   test('TC-08 | Add item to cart updates badge', async ({ page }) => {
  66  |     await step('Добавить первый товар в корзину', async () => {
  67  |       await inventoryPage.addFirstItemToCart();
  68  |     });
  69  | 
  70  |     await step('Проверить, что счётчик корзины стал равен 1', async () => {
  71  |       const count = await inventoryPage.getCartCount();
  72  |       expect(count).toBe(1);
  73  |     });
  74  | 
  75  |     const screenshot = await page.screenshot();
  76  |     await attachment('Товар добавлен в корзину', screenshot, 'image/png');
  77  |   });
  78  | 
  79  |   // ── Тест 5: E2E — добавление + корзина + checkout ───────────────────
  80  |   test('TC-09 | Full E2E: add to cart and proceed to checkout', async ({ page }) => {
  81  |     const cartPage = new CartPage(page);
  82  | 
  83  |     await step('Добавить два товара в корзину', async () => {
  84  |       await inventoryPage.addItemToCartByIndex(0);
  85  |       await page.waitForFunction(() => {
  86  |         const badge = document.querySelector('[data-test="shopping-cart-badge"]');
  87  |         return badge && badge.textContent === '1';
  88  |       });
  89  |       await inventoryPage.addItemToCartByIndex(1);
> 90  |       await page.waitForFunction(() => {
      |                  ^ Error: page.waitForFunction: Test timeout of 60000ms exceeded.
  91  |         const badge = document.querySelector('[data-test="shopping-cart-badge"]');
  92  |         return badge && badge.textContent === '2';
  93  |       });
  94  |       const count = await inventoryPage.getCartCount();
  95  |       expect(count).toBe(2);
  96  |     });
  97  | 
  98  |     await step('Перейти в корзину', async () => {
  99  |       await page.locator('[data-test="shopping-cart-link"]').click();
  100 |       await page.waitForURL('**/cart.html');
  101 |       await page.waitForTimeout(2000);
  102 |     });
  103 | 
  104 |     await step('Проверить количество товаров в корзине', async () => {
  105 |   const count = await page.locator('.cart_item').count();
  106 |   expect(count).toBe(2);
  107 | });
  108 | 
  109 |     await step('Нажать "Checkout" для перехода к оформлению', async () => {
  110 |       await page.locator('[data-test="checkout"]').click();
  111 |       await expect(page).toHaveURL(/checkout-step-one/);
  112 |     });
  113 | 
  114 |     const screenshot = await page.screenshot();
  115 |     await attachment('Шаг оформления заказа', screenshot, 'image/png');
  116 |   });
  117 | 
  118 |   // ── Тест 6: Выход из системы ────────────────────────────────────────
  119 |   test('TC-10 | Logout redirects to login page', async ({ page }) => {
  120 |     await step('Выполнить выход из системы', async () => {
  121 |       await inventoryPage.logout();
  122 |     });
  123 | 
  124 |     await step('Проверить редирект на страницу входа', async () => {
  125 |       await expect(page).toHaveURL('/');
  126 |       await expect(page.locator('#login-button')).toBeVisible();
  127 |     });
  128 |   });
  129 | });
```