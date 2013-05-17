define(["jquery", "underscore"], function ($, _) {
	var
      _options = {
        $el: null,
        sectionClass: 'qc-item',
        buttonClass: 'question-button',
        nextButtonClass: 'next',
        prevButtonClass: 'prev',
        nextButtonText: 'следующий',
        prevButtonText: 'предыдущий',
        questionClass: 'question-class',
        inputClass: 'question-input',
        getResultsButtonClass: 'results',
        resultsButtonText: 'итого',
        questionsArr: null,
		success : function () {
		    alert('опрос закончен');      
		} 
      },
	  
	  _tmpl = {
		container : _.template(''+
			'<section class="<%= classname %>">' +
				'<%= quest %>' +
				'<%= answer_list %>' +
			'</section>'
		),
		quest : _.template(''+
			'<p class="<%= classname %>"><%= quest %></p>'
		),
		answer : _.template(''+
			'<li>' +
				'<label>' +
					'<input type="radio" class="<%= classname %>" name="question<%= id %>" value="<%= val %>" />'+
					'<%= text %>'+
				'</label>' +
			'</li>'),
		answer_list : _.template('<ul><%= quests %></ul>')
	  },
      
      _createList = function(questionNumber, answersObj) {
    	var list = '';
        $.each(answersObj.answers, function(i, val) {
			list += _tmpl.answer({
				classname :_options.inputClass,
				id : questionNumber,
				val : answersObj.points[i],
				text : val
			});	
        });	 
        
        return _tmpl.answer_list({quests:list});
      },
      
      _config = {
        result: 0,
        $button: $('<div>').addClass(_options.buttonClass),
        activeQuestionIndex: 0,
        $el: _options.$el
      },
      
      _layout = function() {
    	_options.$el.append(_config.$button.clone().addClass(_options.prevButtonClass).text(_options.prevButtonText).hide(), _config.$button.clone().addClass(_options.nextButtonClass).text(_options.nextButtonText), _config.$button.clone().addClass(_options.getResultsButtonClass).hide().text(_options.resultsButtonText));
    	
    	$.each(_options.questionsArr, function(questionNumber, answersObj) {
			_options.$el.append(
				_tmpl.container({
					classname : _options.sectionClass,
					quest: _tmpl.quest({quest:answersObj.question, classname:_options.questionClass}),
					answer_list : _createList(questionNumber, answersObj)			
				})
			);
		});
    	
    	$('.' + _options.sectionClass).hide().eq(_config.activeQuestionIndex).show();
      },
      
      _next = function(dir) {
    	var
    	  $section = $('.' + _options.sectionClass);
    	  
        if (dir === 'next' && _config.activeQuestionIndex !== $section.length - 1) {
          _config.activeQuestionIndex += 1;
          $('.' + _options.buttonClass + '.' + _options.prevButtonClass).show();
          if (_config.activeQuestionIndex === $section.length - 1) {
            $('.' + _options.buttonClass + '.' + _options.nextButtonClass).hide();	  
          }
        } else if (dir === 'prev' && _config.activeQuestionIndex !== 0) {
          _config.activeQuestionIndex -= 1;
          $('.' + _options.buttonClass + '.' + _options.nextButtonClass).show();
          if (_config.activeQuestionIndex === 0) {
            $('.' + _options.buttonClass + '.' + _options.prevButtonClass).hide();	  
          }
        }
        $section.hide().eq(_config.activeQuestionIndex).show();
      },
      
      _calculate = function() {
        $('.' + _options.inputClass + ':checked').each(function() {
          _config.result += parseInt($(this).val());   	  
        });      
        
        return _config.result;
      },
      
      _showSuccessButton = function() {
        if ($('.' + _options.sectionClass).length - 1 === _config.activeQuestionIndex) { 	
          $('.' + _options.buttonClass + '.' + _options.getResultsButtonClass).show();  
        }   
      },
      
            
      _initEvents = function() {
        $('.' + _options.buttonClass).on('click', function(e) {
          var
            $this = $(this),
            dir;
          if ($this.hasClass(_options.prevButtonClass)) {
            dir = 'prev';  
          } else if ($this.hasClass(_options.nextButtonClass)) {
            dir = 'next';  
          }
          _next(dir);
          _showSuccessButton(); 
          if ($this.hasClass(_options.getResultsButtonClass)) {
            _options.success(_calculate()); 	  
          }
        });  
      },
      
      _init = function() {
        _layout();
        _initEvents();
      };
	  
	return {
		init: function (options) {
			$.extend(_options, options);
			_init(); 	
		}	
    };
});