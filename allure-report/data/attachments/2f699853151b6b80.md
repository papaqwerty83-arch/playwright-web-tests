# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: inventory.spec.ts >> Inventory page — product catalog >> TC-09 | Full E2E: add to cart and proceed to checkout
- Location: tests\inventory.spec.ts:80:5

# Error details

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('[data-test="cart-item"]')
Expected: 2
Received: 0
Timeout:  5000ms

Call log:
  - Expect "toHaveCount" with timeout 5000ms
  - waiting for locator('[data-test="cart-item"]')
    14 × locator resolved to 0 elements
       - unexpected value "0"

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
  79  |   //тест 5
  80  | test('TC-09 | Full E2E: add to cart and proceed to checkout', async ({ page }) => {
  81  |   const cartPage = new CartPage(page);
  82  | 
  83  |   await step('Добавить два товара в корзину', async () => {
  84  |     await inventoryPage.addItemToCartByIndex(0);
  85  |     await page.waitForFunction(() => {
  86  |       const badge = document.querySelector('[data-test="shopping-cart-badge"]');
  87  |       return badge && badge.textContent === '1';
  88  |     });
  89  |     await inventoryPage.addItemToCartByIndex(1);
  90  |     await page.waitForFunction(() => {
  91  |       const badge = document.querySelector('[data-test="shopping-cart-badge"]');
  92  |       return badge && badge.textContent === '2';
  93  |     });
  94  |     const count = await inventoryPage.getCartCount();
  95  |     expect(count).toBe(2);
  96  |   });
  97  | 
  98  |   await step('Перейти в корзину', async () => {
  99  |     await page.locator('[data-test="shopping-cart-link"]').click();
  100 |     await page.waitForURL('**/cart.html');
  101 |     await page.waitForLoadState('networkidle');
  102 |   });
  103 | 
  104 |   await step('Проверить количество товаров в корзине', async () => {
  105 |     const items = page.locator('[data-test="cart-item"]');
> 106 |     await expect(items).toHaveCount(2);
      |                         ^ Error: expect(locator).toHaveCount(expected) failed
  107 |   });
  108 | 
  109 |   await step('Нажать "Checkout" для перехода к оформлению', async () => {
  110 |     await page.locator('[data-test="checkout"]').click();
  111 |     await expect(page).toHaveURL(/checkout-step-one/);
  112 |   });
  113 | 
  114 |   const screenshot = await page.screenshot();
  115 |   await attachment('Шаг оформления заказа', screenshot, 'image/png');
  116 | });
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
  130 | 
```