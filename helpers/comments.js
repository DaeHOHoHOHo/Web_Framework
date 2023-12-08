var models = require('../models'),
    async = require('async');

module.exports = {
    newest: function(callback) {
        if (typeof callback !== 'function') {
            throw new Error('callback is not a function');
        }

        models.Comment.find({}, {}, { limit: 5, sort: { 'timestamp': -1 } }, function(err, comments) {
            if (err) {
                return callback(err);
            }

            var attachImage = function(comment, next) {
                models.Image.findOne({ _id: comment.image_id }, function(err, image) {
                    if (err) {
                        return next(err);
                    }
                    comment.image = image;
                    next();
                });
            };

            async.each(comments, attachImage, function(err) {
                if (err) {
                    return callback(err);
                }
                callback(null, comments);
            });
        });
    }
};
