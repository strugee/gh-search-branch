# gh-search-branch

[![NPM](https://nodei.co/npm/gh-search-branch.png)](https://npmjs.org/package/gh-search-branch)

Find GitHub repositories that contain a particular branch name.

## Installation

    npm install gh-search-branch

## Usage

`gh-search-branch` takes three to four arguments:

```js
function(user, branch, [options, ]callback) {
	
}
```

`user` is the GitHub user whose repos should be searched.

`branch` is the name of the branch that should be searched for.

The `options` object is optional, and contains extra parameters for `gh-search-branch`. If it contains the key `ua`, `gh-search-branch` will send this string to GitHub in the `User-Agent` header. If it contains the key `auth_token`, `gh-search-branch` will use this as an OAuth2 token to authenticate to the GitHub API, in order to disable rate-limiting. It is strongly recommended that you set both of these options.

`callback` is a function callback. If a repo is found, `callback` will be passed `null` as the first argument and the name of the repo as the second. If an error is encountered while searching, `callback` will be passed the error object. Note that `callback` may be called multiple times with an error.

For example:

```js
var branch_search = require('gh-search-branch');

var user = 'someone'; // GitHub user
var branch = 'master'; // Branch to search for
var options = {'ua': 'Foobar/1.0.0', 'auth_token': 'a1b2c3d4e5f6g7h8i9j0'}; // Options object

branch_search(user, branch, options, function(err, repo) {
	if (err) throw err;
	console.log('Found the ' + branch + ' branch in repo ' + repo);
});

// Omitting the options object:

branch_search(user, branch, function(err, repo) {
	if (err) throw err;
	console.log('Found the ' + branch + ' branch in repo ' + repo);
});
```

## Author

Alex Jordan (@strugee on GitHub)

## License

LGPL3+
