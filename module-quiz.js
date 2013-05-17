var quizModule = (function (window, $) {
    var defaults = {
            currentQuestion: 0,
            score: 0
        },
        questionTemplate = $("#question-template").html(),
        $wrap = $('.quiz-wrap'),
        $nextButton = $('.question__next-button'),
        $resultButton = $('.question__result-button'),
        data = questions;
 
    function renderQuestion () {
        $wrap.html(_.template(questionTemplate, data[defaults.currentQuestion]));
    }

    function nextButtonClickHandler () {
        disableNextButton();
        defaults.score += calcPoints($wrap.find(':checked').attr('value'));
        defaults.currentQuestion++;
        renderQuestion();

        if (defaults.currentQuestion == data.length-1) {
            showResultButton();
        }
    }

    function resultButtonClickHandler () {
        defaults.score += calcPoints($wrap.find(':checked').attr('value'));
        disableResultButton();
        $wrap.off('mouseup', wrapMouseUpEvents);
        $(document).trigger('quiz:isover', defaults.score);
    }

    function enableNextButton () {
        $nextButton.removeAttr('disabled');
    }

    function disableNextButton () {
        $nextButton.attr({disabled: 'disabled'});
    }

    function enableResultButton () {
        $resultButton.removeAttr('disabled');
    }

    function disableResultButton () {
        $resultButton.attr({disabled: 'disabled'});
    }

    function showResultButton () {
        $nextButton.hide();
        $resultButton
            .show()
            .on('mouseup', resultButtonClickHandler);
    }

    function calcPoints(val) {
        return parseInt(data[defaults.currentQuestion].points[val]);
    }

    function wrapMouseUpEvents () {
        if ($wrap.find(':checked'))
                if (defaults.currentQuestion < data.length -1)
                    enableNextButton();
                else 
                    enableResultButton();
    }

    function attachEventListeners () {
        $wrap.on('mouseup', wrapMouseUpEvents);
        $nextButton.on('mouseup', nextButtonClickHandler);        
    }

    return {
            init: function () {
                var _this = this;

                quizModule = _.extend(quizModule, EventBus);
                attachEventListeners();
                renderQuestion();
            }
}})(window, jQuery);