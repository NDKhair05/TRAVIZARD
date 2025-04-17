const Handlebars = require('handlebars');

// Định nghĩa helper
Handlebars.registerHelper('eq', (a, b) => a === b);


module.exports = {

    formatPrice: function (price) {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    },
}
