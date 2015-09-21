/* */ 
'use strict';
var lang_1 = require("../core/facade/lang");
var url_search_params_1 = require("./url_search_params");
var URLSearchParams_UnionFixer = url_search_params_1.URLSearchParamsUnionFixer;
var ConnectionBackend = (function() {
  function ConnectionBackend() {}
  ConnectionBackend.prototype.createConnection = function(request) {
    throw new lang_1.BaseException('Abstract!');
  };
  return ConnectionBackend;
})();
exports.ConnectionBackend = ConnectionBackend;
var Connection = (function() {
  function Connection() {}
  Connection.prototype.dispose = function() {
    throw new lang_1.BaseException('Abstract!');
  };
  return Connection;
})();
exports.Connection = Connection;
