
/**

# s.js: minimalistic javascript sprintf().

    // standalone
    s('http://%s:%d', 'localhost', 40)

    // extend String.prototype
    s.extend();
    'http://%s:%d'.s('localhost', 40);

Only supports `%s` and `%d`. Escape `%` as `%%`.

**/

(function (g) {
  function s (str) {
    var i = 1, args = arguments;
    return String(str).replace(/%?%(d|s)/g, function (symbol, type) {
      if ('%' == symbol[1]) return symbol;
      var arg = args[i++];
      return 'd' == type ? Number(arg) : String(arg);
    });
  };

  s.extend = function () {
    String.prototype.s = function () {
      var arr = [this];
      arr.push.apply(arr, arguments)
      return s.apply(null, arr);
    }
  }
  g.top ? g.s = s : module.exports = s;
})(this);
