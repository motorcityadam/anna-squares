angular.module("template/ascalert/ascalert.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/ascalert/ascalert.html",
    "<div class='alert' ng-class='\"alert-\" + (type || \"warning\")'>\n" +
    "    <button ng-show='closeable' type='button' class='close' ng-click='close()'>&times;</button>\n" +
    "    <div ng-transclude></div>\n" +
    "</div>");
}]);
