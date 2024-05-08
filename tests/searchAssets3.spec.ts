import { test, expect } from '@playwright/test';
import { Home } from "../pageObjects/commonHome"

const searchMusicString : string = 'Drum';
const searchSFXString : string = 'Ping';

test.describe(`@YT-1 GIVEN I'm an @anonymous user`, () => {
  test.beforeEach(async ({ page }) => {
    await page.context().clearCookies();
  });

  test('@SEARCH WHEN I go to PremiumBeat site THEN I should be a able to search a music asset from the search bar', async ({
    page,isMobile
  }) => {
   const home = new Home(page,isMobile);

  // Go to premiumbeat homepage
  await home.navigateToPage();

  // Select search type as Music
  await home.selectSearchType('Music');
  await home.performSearch(searchMusicString);

  // Verify URL to have Music asset
  expect(await page.url()).toContain(`/royalty-free-music?q=${searchMusicString}`);

  // Verify user can see correct title on Music search result page
  await expect(page.getByRole('main')).toContainText(`${searchMusicString} Royalty Free Music`);
  });

  test('@SEARCH WHEN I go to PremiumBeat site THEN I should be a able to search a SFX asset from the search bar', async ({
    page,isMobile
  }) => {
  const home = new Home(page,isMobile);

  // Go to premiumbeat homepage
  await home.navigateToPage();

  // Select search type as SFX
  await home.selectSearchType('SFX');
  await home.performSearch(searchSFXString);

  // Verify URL to have sfx asset
  expect(await page.url()).toContain(`/royalty-free-sfx?q=${searchSFXString}`);

  // Verify user can see correct title on SFX search result page
  await expect(page.getByRole('main')).toContainText(`${searchSFXString} Sound effects for videos, apps, games and more`);
  });

});

