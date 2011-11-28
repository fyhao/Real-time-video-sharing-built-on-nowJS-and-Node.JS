/**
 * Real Time Video Sharing built on nowJS and Node.JS
 * Author: fyhao
 */
// utility library

/**
 * Include the HTML views file
 */
exports.template = function(name) {
		var c = require('fs').readFileSync(__dirname + "/views/" + name + ".html");
		return c;
};

/**
 * To delete <code>item</code> from <code>list</code>
 */
exports.deleteItem = function(list, item) {
	for(var i in list) {
		if(list[i] == item) {
			list.splice(i, 1);
		}
	}
};
