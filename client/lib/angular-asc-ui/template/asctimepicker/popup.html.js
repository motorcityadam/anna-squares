angular.module("template/asctimepicker/popup.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/asctimepicker/popup.html",
    "<ul class=\"dropdown-menu\" ng-style=\"{display: (isOpen && 'block') || 'none', top: position.top+'px', left: position.left+'px'}\">\n" +
    "  <li style=\"padding: 0 10px; background: #ccc;\" ng-transclude></li>\n" +
    "  <li class=\"divider\"></li>\n" +
    "  <li style=\"padding: 9px;\">\n" +
    "    <span class=\"btn-group\">\n" +
    "      <button class=\"btn btn-sm btn-info\" ng-click=\"now()\">Now</button>\n" +
    "      <button class=\"btn btn-sm btn-danger\" ng-click=\"clear()\">Clear</button>\n" +
    "    </span>\n" +
    "    <button class=\"btn btn-sm btn-success pull-right\" ng-click=\"isOpen = false\">Close</button>\n" +
    "  </li>\n" +
    "</ul>");
}]);
