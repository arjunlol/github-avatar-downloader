//import request module
var request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');

//github username here
var GITHUB_USER = "arjunlol";
//github token here
var GITHUB_TOKEN = "02adcf4559363526c768a4aca3f705afe7f689d2";
//user Agent variable
var USER_AGENT = 'GitHub Avatar Downloader - Student Project';

//function uses request library to fetch list of contributors via HTTPS for respective repo
//cb is a callback function to handle asynchronous result returns
function getRepoContributors(repoOwner, repoName, cb) {
  //API URL
  var requestURL = 'https://' + GITHUB_USER + ":" + GITHUB_TOKEN +
    '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors?User-Agent=fjoisfjoisd';

  //options object used to pass header user-agent
  var options = {
    "url": requestURL,
    "headers": {
      "user-agent": USER_AGENT
    }
  }

  //logs body of JSON
  request.get(options, function (err, response) {
    cb(err, JSON.parse(response.body));
  });


}

//invoking getRepoContributors function using hard code values
getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  //loops through JSON object array and logs avatar url values
  for (var i = 0; i < result.length; i++){
    console.log(result[i].avatar_url);
  }
});