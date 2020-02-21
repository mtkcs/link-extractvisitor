const request = require('request');
const cheerio = require('cheerio');
const uniq = require('lodash/uniq');

function run(url) {
  console.log("\nRun at", new Date());
  request(url, function(err, resp, body){
    $ = cheerio.load(body);
    const links = $('a');
    let hrefs = [];

    $(links).each(function(i, link){
      hrefs.push($(link).attr('href'));
    });

    const regex = new RegExp(`^${url}`, 'i');
    hrefs = uniq(hrefs).filter((l) => regex.test(l))

    hrefs.forEach((h) => {
      request({url: h, time: true}, function(err, resp, body){
        console.log(`Done ${h}:${resp.statusCode}:${resp.elapsedTime}ms`);
      })
    });
  });
}

module.exports = run;
