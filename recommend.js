//import request module & fs
var request = require('request');
var fs = require('fs');
require('dotenv').config();
var counter = 0;
var length = 0;
var repoStars = {};

//error handling of env file
if(!process.env){
  throw ".env file is missing or is not in root director";
} else if (!process.env.USERNAME || !process.env.TOKEN){
  throw ".env file is missing information";
}

//github username here
var GITHUB_USER = process.env.USERNAME;
//github token here
var GITHUB_TOKEN = process.env.TOKEN;
//user Agent variable
var USER_AGENT = 'GitHub Avatar Downloader - Student Project';
//accepting command line arguments for the owner of the repo and the reponame respectively
var OWNER_AND_REPONAME = process.argv.slice(2);

//incorrect number of argument error
if (!(OWNER_AND_REPONAME.length == 2)){
  throw "Please input correct number of arguments (2)";
}

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
  };
  //passes error and parsed JSON body to callback function defined below
  request.get(options, function (err, response) {
    cb(err, JSON.parse(response.body));
  });
};

//function adds to stared repos object to find which repo is most popular
function getStarredRepos (starred_url) {
  //stared url format had {/owner}{/repo} at end, only wanted url before {
  var requestURL = 'https://' + GITHUB_USER + ":" + GITHUB_TOKEN + '@' +
   starred_url.split("{")[0].split("//")[1];
  var responseBody = "";

  var options = {
    "url": requestURL,
    "headers": {
      "user-agent": USER_AGENT
    }
  };

  request
  .get(options)
  .on('response', function (response){
    var body = '';
    response.on('data', function (chunk) {
      body += chunk;
    });
    response.on('end', function() {
      responseBody = JSON.parse(body);
      counter ++;
      for (var i = 0; i< responseBody.length; i++){
       //  console.log(i,requestURL, responseBody.length);
       // console.log(responseBody[i].name);
        if (repoStars[responseBody[i].full_name])
          repoStars[responseBody[i].full_name] += 1;
        else
          repoStars[responseBody[i].full_name] = 1;
     //   console.log(repoStars);
      }
    });
  })
  .on('end', function (){
    // var keysSorted = sortObject(repoStars);
    // console.log(keysSorted[0])
    // console.log(repoStars[keysSorted[0]]);
    // console.log(counter)
    while (counter === length){
      // console.log(repoStars)
      var keysSorted = sortObject(repoStars);
      for (var i = 0; i < 5; i++){
        console.log("[ ", repoStars[keysSorted[i]], " stars ]", keysSorted[i]);
      }
      break;
  }
  });
};

function sortObject (obj) {
  var keysSorted = Object.keys(obj).sort(function (a,b){
    return obj[b] - obj[a];
  })
 return keysSorted;
}



//invoking getRepoContributors function using hard code values
getRepoContributors (OWNER_AND_REPONAME[0], OWNER_AND_REPONAME[1], function(err, result) {
  //check if owner/repo exists
  if (!result[0]){
    throw "The provided owner/repo does not exist or invalid credentials in .env";
  }
  console.log("Errors:", err);
  length = result.length;
  //loops through JSON object array and downloads all avatar images
  for (var i = 0; i < result.length; i++){
    getStarredRepos(result[i].starred_url);

  }


});