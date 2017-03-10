'use strict';

const request = require('request');
const cheerio = require('cheerio');
const inquirer = require('inquirer');

let $cheerio;

request('http://www.ribroadcasters.com/News_and_Events/Closings_Delays/', (err, response, body) => {

  if (err) {
    console.error('RI Broadcaster website request failed', err);
    return;
  }

  $cheerio = cheerio.load(body);

  const $orgNameElems = $cheerio('td.orgname');

  let orgId;
  let closingId;
  for (let i = 0; i < $orgNameElems.length; i += 1) {
    orgId = toSlug($cheerio('td.orgname b a').eq(i).text());
    closingId = orgId + '-CLOSINGS';

    $cheerio('td.orgname').parent().eq(i).attr('id', orgId);
    $cheerio('td.orgname').parent().eq(i).next().attr('id', closingId);

  }

  // console.log($cheerio('#PARKING-BAN').html());

  const closings = $cheerio('#PARKING-BAN-CLOSINGS');

  console.log(closings.find('td').text()); // eslint-disable-line

  // inquirer.prompt([
  //   {
  //     type: 'list',
  //     name: 'orgType',
  //     message: 'Use the arrow keys to select an organization type',
  //     paginated: true,
  //     choices: getChoices()
  //   }
  // ])
  //   .then((answers) => {
  //   console.log(toSlug(answers.orgType));
  //   });

  // console.log(select);
});

function getChoices (sort) {

  const $orgNameElems = $cheerio('td.orgname b a');

  let choices = [];

  sort = sort || true;

  for (let i = 0; i < $orgNameElems.length; i += 1) {
    choices.push($orgNameElems[i].children[0].data);
  }

  return (sort) ? choices.sort() : choices;
}

function toSlug(string){
  if (typeof string !== 'string'){
    return string;
  }

  return string.replace(/[\s//]/g, '-');
}

function processHtml(err, response, body) {


}