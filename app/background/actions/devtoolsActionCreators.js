var sow = require('../sow');
var Marty = require('marty');
var MartyStore = require('../stores/martyStore');
var Devtools = require('../stateSources/connections').Devtools;
var DevtoolsConstants = require('../constants/devtoolsConstants');

var DevtoolsActionCreators = Marty.createActionCreators({
  displayName: 'Devtools',
  devtoolsLoaded: function (tabId) {
    this.dispatch(DevtoolsConstants.LOADED, tabId);

    // If marty has already been on the page, then just
    // send the sow straight away
    if (MartyStore.hasMartyBeenFoundInTab(tabId)) {
      Devtools.send(tabId, {
        type: 'PAGE_LOADED',
        payload: sow(tabId)
      });
    }
  }
});

module.exports = DevtoolsActionCreators;