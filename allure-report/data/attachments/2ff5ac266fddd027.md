# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: inventory.spec.ts >> Inventory page — product catalog >> TC-09 | Full E2E: add to cart and proceed to checkout
- Location: tests\inventory.spec.ts:80:7

# Error details

```
Error: expect(received).toBeGreaterThan(expected)

Expected: > 0
Received:   0
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
  90  |       await page.waitForFunction(() => {
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
  105 |       const count = await page.locator('[data-test="cart-item"]').count();
  106 |       console.log('Товаров в корзине:', count);
  107 |       console.log('URL:', page.url());
> 108 |       expect(count).toBeGreaterThan(0);
      |                     ^ Error: expect(received).toBeGreaterThan(expected)
  109 |     });
  110 | 
  111 |     await step('Нажать "Checkout" для перехода к оформлению', async () => {
  112 |       await page.locator('[data-test="checkout"]').click();
  113 |       await expect(page).toHaveURL(/checkout-step-one/);
  114 |     });
  115 | 
  116 |     const screenshot = await page.screenshot();
  117 |     await attachment('Шаг оформления заказа', screenshot, 'image/png');
  118 |   });
  119 | 
  120 |   // ── Тест 6: Выход из системы ────────────────────────────────────────
  121 |   test('TC-10 | Logout redirects to login page', async ({ page }) => {
  122 |     await step('Выполнить выход из системы', async () => {
  123 |       await inventoryPage.logout();
  124 |     });
  125 | 
  126 |     await step('Проверить редирект на страницу входа', async () => {
  127 |       await expect(page).toHaveURL('/');
  128 |       await expect(page.locator('#login-button')).toBeVisible();
  129 |     });
  130 |   });
  131 | });
```