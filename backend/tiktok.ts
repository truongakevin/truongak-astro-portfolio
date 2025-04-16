const fs = require('fs');
const puppeteer = require('puppeteer');

async function scrapeLikedVideos(username: string) {
  const browser = await puppeteer.launch({ headless: false }); // show browser so you can log in
  const page = await browser.newPage();
  const profileUrl = `https://www.tiktok.com/@${username}`;

  await page.goto(profileUrl, { waitUntil: 'networkidle2' });

  // Wait for the liked tab and click it
  await page.waitForSelector('[data-e2e="liked-tab"]');
  await page.click('[data-e2e="liked-tab"]');

  // Import Links
  let initialLinks: string[] = [];
  if (fs.existsSync('liked_tiktoks.json')) {
    initialLinks = JSON.parse(fs.readFileSync('liked_tiktoks.json', 'utf-8'));
  }
  const videoLinks = new Set<string>(initialLinks);

  // Scroll and collect links
  let previousHeight = 0;

  while (true) {
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Extract video links currently loaded
    const newLinks = await page.$$eval('a.css-1mdo0pl-AVideoContainer', (anchors: Element[]) =>
      anchors.map((a: Element) => (a as HTMLAnchorElement).href)
    );

    newLinks.forEach((link: string) => videoLinks.add(link));
    fs.writeFileSync('liked_tiktoks.json', JSON.stringify([...videoLinks], null, 2));

    // Scroll down
    previousHeight = await page.evaluate('document.body.scrollHeight');
    await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
    await page.waitForFunction(
      `document.body.scrollHeight > ${previousHeight}`,
      { timeout: 500000 }
    );
  }

  await browser.close();

  console.log('Liked Video URLs:');
  console.log([...videoLinks]);
}

scrapeLikedVideos('kevinoli').catch(console.error);