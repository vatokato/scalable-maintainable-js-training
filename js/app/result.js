define([], function () {
	var
      _options = {
        $el: null,
        resultsArr: null
      },
      
      _initEvents = function() {

      },
      
      _showResults = function(result) {
        $.each(_options.resultsArr, function(index, val) {
          var
            $this = $(this);
          if (result <= val.to) {
            _options.$el.html(val.status); 
            return false;
          } 	
        });     	  
      },
      
      _init = function() {
        _initEvents();
      };
	  
    return {
		start : function (data) {
			_showResults(data.result); 
		},
		init: function (options) {
			$.extend(_options, options);
			_init(); 	
		}	
    }
});