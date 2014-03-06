// require('./core/discovery').start();
require('./core/database').start();
require('./core/utility').start();

require('./glados/connect').connect();

require('./client/app');