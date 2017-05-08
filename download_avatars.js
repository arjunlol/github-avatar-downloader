//import request module & fs
var request = require('request');
var fs = require('fs');
require('dotenv').config();

console.log('Welcome to the GitHub Avatar Downloader!');

//github username here
var GITHUB_USER = process.env.USERNAME;
//github token here
var GITHUB_TOKEN = process.env.TOKEN;
//user Agent variable
var USER_AGENT = 'GitHub Avatar Downloader - Student Project';
//accepting command line arguments for the owner of the repo and the reponame respectively
var OWNER_AND_REPONAME = process.argv.slice(2);

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
  //passes error and parsed JSON body to callback function defined below
  request.get(options, function (err, response) {
    cb(err, JSON.parse(response.body));
  });
}

//function will make request to given URL, saving resulting image file to path
function downloadImageByURL (url, filepath) {
  request.get(url)
    .pipe(fs.createWriteStream("./avatars/" + filepath));
}

//invoking getRepoContributors function using hard code values
getRepoContributors (OWNER_AND_REPONAME[0], OWNER_AND_REPONAME[1], function(err, result) {
  //does not execute callback if arguments for owner and repo not passed in command line
  if(!OWNER_AND_REPONAME[0] && !OWNER_AND_REPONAME[1]){
    console.log("Please input arguments for both the owner and the name of the repo, respectively");
    console.log('Thanks.')
    return;
  }
  console.log("Errors:", err);
  //loops through JSON object array and downloads all avatar images
  for (var i = 0; i < result.length; i++){
    downloadImageByURL(result[i].avatar_url, result[i].login + ".jpg");
  }
});