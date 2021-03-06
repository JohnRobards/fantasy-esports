const Contest      = require('../models/Contest');
const User         = require('../models/User');

module.exports = {

	getInfo: function(req, res, next) {

		if (req.user) {
			Contest.findById(req.params.id, function(err, contest) {
				if (contest !== null) {
					//Search for contest

					for (var i = 0; i < req.user.contests.length; i++) {
						if (req.user.contests[i].id === contest._id) {
							//Send user's contest info and regular contest info to draft page
							return res.render('score', {
								userInfo:    JSON.stringify(req.user.contests[i]),
								contestInfo: JSON.stringify(contest)
							});
						}
					}
					return res.render('score', {
						userInfo:    JSON.stringify(''),
						contestInfo: JSON.stringify(contest)
					});
				} else {
					res.redirect('/404');
				}
			});
		} else {
			res.redirect('/');
		}
	}
};