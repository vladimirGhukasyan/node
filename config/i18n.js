var i18n = require("i18n");

i18n.configure({
    locales:['hy'],
    defaultLocale: 'hy',
    directory: __dirname + '/locales'
});
module.exports = i18n;
