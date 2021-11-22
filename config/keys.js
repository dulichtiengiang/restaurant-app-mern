const LIVE = false;

if (LIVE) {
    //! true -> prod
    module.exports = require('./prod'); //! require('./prod.js');

} else {
    //! flase -> dev
    module.exports = require('./dev'); //! require('./dev.js');
}