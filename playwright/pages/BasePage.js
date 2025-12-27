export class BasePage {
    constructor(page) {
      this.page = page;
    }
  
    /**
     * Get the base URL from page context or return default
     * @returns {string} The base URL
     */
    getBaseURL() {
      return this.page.context().options.baseURL || 'https://stage-dutyfree.odoo.com/';
    }
  
    /**
     * Navigate to a specific path
     * @param {string} path - The path to navigate to (relative to baseURL)
     */
    async visit(path = '') {
      await this.page.goto(path);
    }
  }
  