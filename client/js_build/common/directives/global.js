/*! anna-squares - v0.1.7 - 09-01-2014 */
app.directive("asOnTouch", function($timeout) {
    return function(scope, elem, attrs) {
        $timeout(function() {
            elem.bind("touchstart", function(evt) {
                evt.target.focus();
            });
        }, 0, false);
    };
});

app.directive("asMatchField", [ function() {
    return {
        restrict: "A",
        scope: true,
        require: "ngModel",
        link: function(scope, elem, attrs, control) {
            if (attrs.asMatchField === "") return;
            var checker = function() {
                var e1 = scope.$eval(attrs.ngModel);
                var e2 = scope.$eval(attrs.asMatchField);
                return e1 === e2;
            };
            scope.$watch(checker, function(n) {
                control.$setValidity("match", n);
            });
        }
    };
} ]);