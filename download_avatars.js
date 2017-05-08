//import request module & fs
var request = require('request');
var fs = require('fs');

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

  //passes error and parsed JSON body to callback function defined below
  request.get(options, function (err, response) {
    cb(err, JSON.parse(response.body));
  });


}

//function will make request to given URL, saving resulting image file to path
function downloadImageByURL(url, filepath) {
  request.get(url)
    .pipe(fs.createWriteStream("./avatars/" + filepath));
}

//test hard coded image download function
downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466","kvirani.jpg");

//invoking getRepoContributors function using hard code values
getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  //loops through JSON object array and downloads all avatar images
  for (var i = 0; i < result.length; i++){
    downloadImageByURL(result[i].avatar_url, result[i].login + ".jpg");
  }
});