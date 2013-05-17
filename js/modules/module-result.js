var resultModule = (function (window, $) {
    var defaults = {
            score: 0
        },
        resultTemplate = $("#result-template").html(),
        $wrap = $('.result-wrap');
 
    function renderResult (data) {
        $wrap.html(_.template(resultTemplate, data));
    }

    function attachEventListeners () {
        _.extend(resultModule, EventBus);    
    }

    function getStatus(data) {
        console.log(data);
        for (var i=0, l=results.length; i<l; i++) {
            if (data <= results[i].to) {
                return {'score': data, 'status': results[i].status};
            }
        }
    }
    
    return {
            init: function () {
                var _this = this;

                attachEventListeners();
            },
            showResult: function (data) {
                renderResult(getStatus(data));
            }
}})(window, jQuery);