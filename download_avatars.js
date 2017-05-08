//import request module
var request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');

//function uses request library to fetch list of contributors via HTTPS for respective repo
//cb is a callback function to handle asynchronous result returns
function getRepoContributors(repoOwner, repoName, cb) {

}

//invoking getRepoContributors function using hard code values
getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});