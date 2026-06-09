# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: inventory.spec.ts >> Inventory page — product catalog >> TC-09 | Full E2E: add to cart and proceed to checkout
- Location: tests\inventory.spec.ts:79:5

# Error details

```
TimeoutError: locator.waitFor: Timeout 10000ms exceeded.
Call log:
  - waiting for locator('[data-test="cart-item"]').first() to be visible

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
  1  | import { Page } from '@playwright/test';
  2  | import { BasePage } from './base.page';
  3  | import logger from '../utils/logger';
  4  | 
  5  | export class CartPage extends BasePage {
  6  |   private readonly cartItems       = this.page.locator('[data-test="cart-item"]');
  7  |   private readonly cartItemNames   = this.page.locator('[data-test="inventory-item-name"]');
  8  |   private readonly checkoutButton  = this.page.locator('[data-test="checkout"]');
  9  |   private readonly continueButton  = this.page.locator('[data-test="continue-shopping"]');
  10 | 
  11 |   constructor(page: Page) {
  12 |     super(page);
  13 |   }
  14 | 
  15 |   async getCartItemCount(): Promise<number> {
  16 |     await this.page.waitForLoadState('networkidle');
> 17 |     await this.cartItems.first().waitFor({ state: 'visible', timeout: 10000 });
     |                                  ^ TimeoutError: locator.waitFor: Timeout 10000ms exceeded.
  18 |     return this.cartItems.count();
  19 |   }
  20 | 
  21 |   async getCartItemNames(): Promise<string[]> {
  22 |     return this.cartItemNames.allInnerTexts();
  23 |   }
  24 | 
  25 |   async proceedToCheckout(): Promise<void> {
  26 |     logger.info('Proceeding to checkout');
  27 |     await this.checkoutButton.click();
  28 |   }
  29 | 
  30 |   async continueShopping(): Promise<void> {
  31 |     await this.continueButton.click();
  32 |   }
  33 | }
```