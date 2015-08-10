/*

Copyright (C) 2015 Alex Jordan

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but
WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public
License along with this program.  If not, see
<http://www.gnu.org/licenses/>.

*/

var https = require('https');

module.exports = function(user, branch, options, callback) {
	var headers = {};
	if (options.ua) headers['User-Agent'] = options.ua;
	if (options.auth_token) headers['Authorization'] = 'token ' + options.auth_token;
	
	https.get({hostname: 'api.github.com', path: '/users/' + user + '/repos', headers: headers}, function(res) {
		var reposRaw = '';
		
		res.on('data', function(chunk) {
			reposRaw += chunk.toString();
		});

		res.on('end', function() {
			var repos = JSON.parse(reposRaw);
			
			repos.forEach(function(repo) {
				https.get({
					hostname: 'api.github.com',
					path: '/repos/' + user + '/' + repo.name + '/branches',
					headers: headers
				}, function(res) {
					var branches;
					var branchesRaw = '';
					
					res.on('data', function(chunk) {
						branchesRaw += chunk.toString();
					});
					
					res.on('end', function() {
						branches = JSON.parse(branchesRaw);
						for (var j in branches) {
							var remote_branch = branches[j];
							if (remote_branch.name === branch) {
								callback(null, repo.name);
							}
						}
					});
				}).on('error', callback);
			});
		});
	}).on('error', callback);
}
