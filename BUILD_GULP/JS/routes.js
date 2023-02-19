"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _members = _interopRequireDefault(require("../JSON/members.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var router = _express["default"].Router();

console.log(_members["default"]);
router.get("/", function (req, res, next) {
  res.sendFile("/home/anatoliy/STUDY/WEB_LAB3/WWW/pages/index.html"); //res.render("/home/anatoliy/STUDY/WEB_LAB3/WWW/pages/index.html");
  //res.end(JSON.stringify(usersJson));

  next();
});
router.get("/users", function (req, res, next) {
  //res.render("/home/anatoliy/STUDY/WEB_LAB3/WWW/pages/friends.html");
  res.end(JSON.stringify(_members["default"]));
  return;
});
router.get("/user/:num/friends", function (req, res, next) {
  console.log("RENDER");
  res.sendFile("/home/anatoliy/STUDY/WEB_LAB3/WWW/pages/friends.html");
});
router.get("/user/:num/getFriendsList", function (req, res, next) {
  console.log("GETFRIENDSLIST");
  var temp = [];

  var _iterator = _createForOfIteratorHelper(_members["default"][req.params.num].friends),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var friend = _step.value;
      temp.push(_members["default"][friend]);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  console.log("SUKAA BLYATT");
  console.log(temp);
  res.end(JSON.stringify(temp));
});
router.get("/user/:num/news", function (req, res, next) {
  res.sendFile("/home/anatoliy/STUDY/WEB_LAB3/WWW/pages/news.html");
  return;
});
router.get("*", function (req, res) {
  console.log("NEXT");
  res.status(404);
  res.end("Page not found");
});
var _default = router;
exports["default"] = _default;