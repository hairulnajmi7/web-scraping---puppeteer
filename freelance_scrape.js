const puppeteer = require('puppeteer');
// const cheerio = require('cheerio');
// const con = require('./connection');

const b = (
    
    async () => {
    const browser = await puppeteer.launch ({ 
        headless: false });
    const page = await browser.newPage();
    await page.goto('https://www.workana.com/en/freelancers/malaysia', { 
        waitUntil: 'load' });
    // await page.waitForSelector('.result_text a');
    
    await page.setViewport({
        width: 1200,
        height: 800
    });

//     const searchButtonNodeSelector = "div > div.js-pager-container > div.text-center.hidden-xs.wk-pager-scroll > nav > ul > li:nth-child(2) > a";
// await page.click(searchButtonNodeSelector);
var data;
var count=1;

while(count<3){
    await page.click(`div > div.js-pager-container > div.text-center.hidden-xs.wk-pager-scroll > nav > ul > li:nth-child(${count}) > a`);
    await autoScroll(page);

    data=await page.evaluate(() => {

        var names = document.querySelectorAll("div > div > div.col-sm-7.col-md-8 > div.row > div.worker-details.col-xs-12.col-sm-7.col-md-9.text-center-xs > h3 > a");
        var hourlyRates = document.querySelectorAll("div > div > div.col-sm-5.col-md-4.col-xs-12 > div.worker-details.text-center-sm > h4");
        var experiences = document.querySelectorAll("div > div > div.col-sm-7.col-md-8 > div.skills.hidden-xs > div");
        var completedProjects = document.querySelectorAll("div > div > div.col-sm-5.col-md-4.col-xs-12 > div.worker-details.text-center-sm > p:nth-child(2) > span:nth-child(1)");
        var countries = document.querySelectorAll("div > div > div.col-sm-7.col-md-8 > div.row > div.worker-details.col-xs-12.col-sm-7.col-md-9.text-center-xs > span.country > span > a");
        var ratings = document.querySelectorAll("div > div.col-sm-7.col-md-8 > div.row > div.worker-details.col-xs-12.col-sm-7.col-md-9.text-center-xs > label > span > span");

        var name = Array.from(names, name => name.innerText);
        var hourlyRate = Array.from(hourlyRates, hourlyRate => hourlyRate.innerText);
        var experience =Array.from(experiences, experience => experience.innerText);
        var completedProject = Array.from(completedProjects, completedProject => completedProject.innerText);
        var country = Array.from(countries, country => country.innerText);
        var rating = Array.from(ratings, rating => rating.innerText);

        return {
            name, hourlyRate, experience, completedProject, country, rating 
        };
    });

  count++;

}

console.log(data.name);
console.log(data.hourlyRate);
console.log(data.experience);
console.log(data.completedProject);
console.log(data.country);
console.log(data.rating);

// "#workers > div > div.js-pager-container > div.text-center.hidden-xs.wk-pager-scroll > nav > ul > li:nth-child(2) > a"
// await page.$('#workers > div > div.js-pager-container > div.text-center.hidden-xs.wk-pager-scroll > nav > ul > li:nth-child(2) > a');
0// Get the "viewport" of the page, as reported by the page.
    

    // for (i = 0; i < a.length; i++) {
    //     var sql = "INSERT INTO job (name, company) VALUES ('" + a[i] + "'," + "'" + b[i] + "')";
    //     con.query(sql, function (err, result) {
    //         if (err) throw err;
    //         console.log("All jobs record inserted");
    //     });
    // }

    await browser.close();

})();

async function autoScroll(page) {
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if (totalHeight >= scrollHeight) {
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}

module.exports = b;