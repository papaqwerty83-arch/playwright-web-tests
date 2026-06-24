# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: login.spec.ts >> Login functionality — SauceDemo >> TC-01 | Valid login redirects to inventory page
- Location: tests\login.spec.ts:16:7

# Error details

```
Test timeout of 60000ms exceeded while running "beforeEach" hook.
```

```
Error: page.waitForLoadState: Test timeout of 60000ms exceeded.
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
  1  | import { Page, Locator } from '@playwright/test';
  2  | import logger from '../utils/logger';
  3  | 
  4  | /**
  5  |  * BasePage — абстрактный базовый класс для всех Page Objects.
  6  |  * Паттерн Page Object Model (Martin Fowler, 2013).
  7  |  * Инкапсулирует ссылку на page и общие методы навигации.
  8  |  * ВАЖНО: не содержит assertions — только действия и ожидания.
  9  |  */
  10 | export abstract class BasePage {
  11 |   protected readonly page: Page;
  12 | 
  13 |   constructor(page: Page) {
  14 |     this.page = page;
  15 |   }
  16 | 
  17 |   /** Переход по пути относительно baseURL из playwright.config.ts */
  18 |   async navigate(path: string = '/'): Promise<void> {
  19 |     logger.info(`Navigating to: ${path}`);
  20 |     await this.page.goto(path);
  21 |   }
  22 | 
  23 |   /** Ожидание завершения всех сетевых запросов */
  24 |   async waitForLoad(): Promise<void> {
> 25 |     await this.page.waitForLoadState('networkidle');
     |                     ^ Error: page.waitForLoadState: Test timeout of 60000ms exceeded.
  26 |     logger.info('Page fully loaded (networkidle)');
  27 |   }
  28 | 
  29 |   getCurrentUrl(): string {
  30 |     return this.page.url();
  31 |   }
  32 | 
  33 |   async waitForElement(locator: Locator, timeout = 5000): Promise<void> {
  34 |     await locator.waitFor({ state: 'visible', timeout });
  35 |   }
  36 | 
  37 |   async takeScreenshot(name: string): Promise<Buffer> {
  38 |     const buffer = await this.page.screenshot({ fullPage: false });
  39 |     logger.info(`Screenshot taken: ${name}`);
  40 |     return buffer;
  41 |   }
  42 | }
  43 | 
```