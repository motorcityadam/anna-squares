angular.module("template/ascdatepicker/popup.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/ascdatepicker/popup.html",
    "<ul class=\"dropdown-menu\" ng-style=\"{display: (isOpen && 'block') || 'none', top: position.top+'px', left: position.left+'px'}\">\n" +
    "	<li ng-transclude></li>\n" +
    "	<li ng-show=\"showButtonBar\" style=\"padding:10px 9px 2px\">\n" +
    "		<span class=\"btn-group\">\n" +
    "			<button type=\"button\" class=\"btn btn-sm btn-info\" ng-click=\"today()\">{{currentText}}</button>\n" +
    "			<button type=\"button\" class=\"btn btn-sm btn-default\" ng-click=\"showWeeks = ! showWeeks\" ng-class=\"{active: showWeeks}\">{{toggleWeeksText}}</button>\n" +
    "			<button type=\"button\" class=\"btn btn-sm btn-danger\" ng-click=\"clear()\">{{clearText}}</button>\n" +
    "		</span>\n" +
    "		<button type=\"button\" class=\"btn btn-sm btn-success pull-right\" ng-click=\"isOpen = false\">{{closeText}}</button>\n" +
    "	</li>\n" +
    "</ul>\n" +
    "");
}]);
