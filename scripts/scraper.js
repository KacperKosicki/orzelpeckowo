const puppeteer = require('puppeteer');

async function scrapeMatches() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Otwórz stronę z meczami
  await page.goto('https://www.laczynaspilka.pl/rozgrywki?season=4be7b40c-84ff-4e5a-96e5-875d7f13483a&leagueGroup=e978c8e5-d903-4a89-b6b5-8d5da6c567ee&leagueId=337bb869-0b42-484f-8eca-0c8842a13ec9&subLeague=b7d2c55b-e2af-44e2-9df2-3f6e05dc1768&enumType=ZpnAndLeagueAndPlay&group=735babd1-c372-4846-b6c4-a00e393bad25&voivodeship=fd118a32-2558-437c-a1d6-76a1f862e13d&isAdvanceMode=false&genderType=Male'); // Zastąp faktycznym adresem URL

  const matches = await page.evaluate(() => {
    const matchElements = document.querySelectorAll('.row-hover');
    const matches = [];
    
    matchElements.forEach(match => {
      const team1 = match.querySelector('.squad-name--right .squad-name__name').innerText.trim();
      const team2 = match.querySelector('.squad-name--force-abbreviation .squad-name__name').innerText.trim();
      const result = match.querySelector('.res') ? match.querySelector('.res').innerText.trim() : '';
      const date = match.querySelectorAll('.font-20.font-width-400.text-hide')[0]?.innerText.trim();
      const time = match.querySelectorAll('.font-20.font-width-400.text-hide')[1]?.innerText.trim();
      const status = match.querySelectorAll('.font-20.font-width-400.text-hide')[2]?.innerText.trim();
      const team1Logo = match.querySelector('.squad-name--right img')?.src || '';
      const team2Logo = match.querySelector('.squad-name--force-abbreviation img')?.src || '';
      
      matches.push({
        team1,
        team2,
        result,
        date,
        time,
        status,
        team1Logo,
        team2Logo
      });
    });
    
    return matches;
  });

  console.log(matches);
  await browser.close();
}

scrapeMatches();
