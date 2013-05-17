(function ( $, window, document, undefined ) {
    var pluginName = "QuizPlugin",
        defaults = {
            currentQuestion: 0,
            score: 0
        };
 
    function QuizPlugin( element, options ) {
        this.element = element;
        this.options = $.extend( {}, defaults, options) ;
        
        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }
 
    QuizPlugin.prototype.init = function () {
        var _this = this;

        renderQuestion(this.element, this.options.questions[defaults.currentQuestion]);

        $('.question__next-button').on('mouseup', function () {
            _this.next();
        });        

    };
    QuizPlugin.prototype.next = function () {
        var value = parseInt($(this.element).find(':checked').attr('value')),
            question = this.options.questions[defaults.currentQuestion];

        if ((value >= 0) && defaults.currentQuestion < this.options.questions.length) {
            defaults.score += question.points[value];
            defaults.currentQuestion += 1;
            renderQuestion(this.element, this.options.questions[defaults.currentQuestion]);
            console.log(defaults);
        }

        if (defaults.currentQuestion === this.options.questions.length) {
            console.log('quiz is over');
        }
    }

/*    QuizPlugin.prototype.quizIsOver = function () {

    }
*/
    function renderQuestion (element, question) {
        $(element).html(buildQuestion(question));
    }

    function buildQuestion (question) {
        var html = [],
            answers = question.answers;

        html.push('<div class="question-wrap">');
        html.push('<div class="question__title">' + question.question + '</div>');
  
        for (var i=0, length=answers.length; i<length; i++) {
            html.push('<div class="question__radio"><input type="radio" name="answer" id="answer-'+ i +'" value="'+i+'"><label for="answer-'+ i +'">' + answers[i] + '</label></div>')
        }

        html.push('</div>');

        return html.join('');
    }
 

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if ( !$.data(this, "plugin_" + pluginName )) {
                $.data( this, "plugin_" + pluginName, 
                new QuizPlugin( this, options ));
            }
        });
    }
 
})( jQuery, window, document );


(function ( $, window, document, undefined ) {
 
    var pluginName = "ScorePlugin",
        defaults = {
            propertyName: "value"
        };
 
    function ScorePlugin( element, options ) {
        this.element = element;
        this.options = $.extend( {}, defaults, options) ;
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }
 
    ScorePlugin.prototype.init = function () {
    };


    function renderResult () {
        var html = [];

        html.push();

        return html.join('');
    } 

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if ( !$.data(this, "plugin_" + pluginName )) {
                $.data( this, "plugin_" + pluginName, 
                new ScorePlugin( this, options ));
            }
        });
    }
 
})( jQuery, window, document );
$(function () {
    $('.quiz-wrap').QuizPlugin({questions: questions});
    $('.score-wrap').ScorePlugin();
});