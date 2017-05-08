//import request module
var request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');

//github username here
var GITHUB_USER = "";
//github token here
var GITHUB_TOKEN = "";

//function uses request library to fetch list of contributors via HTTPS for respective repo
//cb is a callback function to handle asynchronous result returns
function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://' + GITHUB_USER + ":" + GITHUB_TOKEN +
    '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  console.log(requestURL);
}

//invoking getRepoContributors function using hard code values
getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});