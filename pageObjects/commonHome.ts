// Page Object: Home
import { type Locator, type Page, expect } from '@playwright/test';

export class Home {
  page: Page;
  isMobile: boolean;
  private mobileMenuBtn: Locator;
  private mobileMenuAccountBtn : Locator;
  private mobileMenuLogoutBtn: Locator;
  private searchBarAssetType: Locator;
  private searchBar: Locator;
  private searchBarSubmitBtn: Locator;

  constructor(page: Page, isMobile: boolean) {
    this.page = page;
    this.isMobile = isMobile;
    this.mobileMenuBtn = page.locator('button[title="Menu"]');
    this.mobileMenuAccountBtn = page.getByRole('button' ,{name : 'Your Account'});
    this.mobileMenuLogoutBtn = page.getByRole('button' ,{name : 'Log Out'});
    this.searchBarAssetType = page.locator('[data-e2e="assetTypeButton"]');
    this.searchBar = page.locator('[data-e2e="searchInput"]');
    this.searchBarSubmitBtn = page.getByRole('button' ,{name : 'Search'});
  }

  async navigateToPage() {
    await this.page.goto('/');
  }

  async logoutUser() {
    if(this.isMobile){
        await this.mobileMenuBtn.click();
        await this.mobileMenuAccountBtn.click();
        await this.mobileMenuLogoutBtn.click();
    }else{
        await this.page.locator('[data-e2e="headerAccount"]').click();
        await this.page.locator('[id="E2E_LogOut"]').click();
    }
  }

  async navigateToPageWithQueryString(queryString: string) {
    await this.page.goto(`/?${queryString}`);
  }

  async selectSearchType(searchType :string) {
    await expect(this.searchBarAssetType).toBeVisible();
    await this.searchBarAssetType.click();
    if (searchType == 'Music'){
    await this.page.locator('div').filter({ hasText: /^Music$/ }).nth(1).click();
    }else if (searchType == 'SFX'){
    await this.page.locator('div').filter({ hasText: /^SFX$/ }).click();
    }else{
      throw new Error(`Unsupported Search Type: ${searchType}`);
    }
  }

  async performSearch(searchString: string) {
   await this.searchBar.fill(searchString);
   await this.searchBarSubmitBtn.click();
  }

  async verifyPerformedSearch(searchString: string) {
    await this.searchBar.fill(searchString);
    await this.searchBarSubmitBtn.click();
   }

}
