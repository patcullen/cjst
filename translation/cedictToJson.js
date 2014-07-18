// Settings
var settings = {
	cedictLocation: 'cedict_ts.u8', // downlaoded from http://www.mdbg.net/chindict/chindict.php?page=cedict
	outputLocation: 'data/',
	zh: {
		process: true,
		filenames: 'traditional', // or 'simplified'
		include: {
			query: true,
			traditional: false,
			simplified: false,
			pinyin: false,
			zhuyin: false,
			translation: true
		}
	},
	extension: '', //eg: '.json' or '.txt'
	jsonp: null // if set, will pad the json with a function name specified here.

};

//setup Dependencies
var
	fs = require('fs'),
	cjst = require('../lib/cjst.js').cjst,
	async = require('async')
;

var program = {

	processRawFile: function(options, cb) {
		fs.readFile(options.cedictLocation, 'utf8', function (err, data) {
			if (err) {
				console.log(err);
				if (cb) cb({ st:'er', err: err });
			} else {
				var lines = data.split('\n'),
					start = (new Date()).getTime(),
					done = 0;
				async.eachLimit(lines, 20, function(line, iCallback) {
					program.processLine(line, options, iCallback);
					if (++done % 1000 === 0)
						console.log('' + done + ' lines processed.');
				}, function(err) {
					console.log('fin. (' + ~~(((new Date()).getTime() - start) / 1000) + ')');
				});
			}
		});
	},

	processLine: function(line, options, callback) {
		if (line[0] == '#') {
			callback();
			return;
		}
		var source = line.replace(/(\[.*?\])/g, '').split('/');

		if (options.zh.process) {
			var zh = {},
				word = source[0].trim().split(' ')[0],
				filename = (options.zh.filenames == 'traditional' ? cjst.simplifiedToTraditional(word) : cjst.traditionalToSimplified(word)),
				hash = cjst.md5ChineseText(filename);

			if (options.zh.include.query)
				zh.query = word;

			if (options.zh.include.traditional)
				zh.traditional = cjst.simplifiedToTraditional(word);

			if (options.zh.include.simplified)
				zh.simplified = cjst.traditionalToSimplified(word);

			if (options.zh.include.pinyin)
				zh.pinyin = cjst.chineseToPinyin(word);

			if (options.zh.include.zhuyin)
				zh.zhuyin = cjst.chineseToZhuyin(word);

			if (options.zh.include.translation) {
				zh.translation = [];
				for (var i = 1; i < source.length; i++)
					if (source[i].trim() !== '')
						zh.translation.push(source[i]);
			}


			var f1 = hash.substring(0,1).toLowerCase(),
				 f2 = hash.substring(1,2).toLowerCase();

			// save the output to file
			fs.exists(options.outputLocation + f1 + '/', function(e0) {
				var hasFirstFolder = function(e) {
					fs.exists(options.outputLocation + f1 + '/' + f2 + '/', function(e1) {
						var hasSecondFolder = function() {
							// setup content
							var content = JSON.stringify(zh);
							// wrap in a jsonp wrapper if desired
							if (options.jsonp)
								content = options.jsonp + '(' + content + ')';
							// finally write to file
							fs.writeFile(options.outputLocation + f1 + '/' + f2 + '/' + hash + options.extension, content, function(writeErr) {
								if(writeErr)
									console.log(writeErr);
								callback();
							});
						};
						if (e1) hasSecondFolder(); else fs.mkdir(options.outputLocation + f1 + '/' + f2 + '/', 0777, hasSecondFolder);
					});

				};
				if (e0) hasFirstFolder(); else fs.mkdir(options.outputLocation + f1 + '/', 0777, hasFirstFolder);
			});
		}

	}

};

program.processRawFile(settings, function(d) {
	console.dir(d);
});
