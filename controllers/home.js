var sidebar = require('../helpers/sidebar'),
    ImageModel = require('../models').Image;

module.exports = {
    index: function(req, res) {
        var viewModel = {
            images: []
        };

        ImageModel.find({}, {}, { sort: { timestamp: -1 }})
            .then(images => {
                viewModel.images = images;
                sidebar(viewModel, function(viewModel) {
                    res.render('index', viewModel);
                });
            })
            .catch(err => { throw err; });
    }
};
