var pageIndex = 2;
				  $(window).bind("scroll", function(){
                if($(this).scrollTop() + $(window).height() + 100 >= $(document).height() && $(this).scrollTop() >= 100) {
                    $(window).unbind("scroll");
                    $.get("/?pageIndex=" + pageIndex + "&limit=2", function(data){
                    	alert(JSON.stringify(data))
                       $("#heheren-content").append(data);
                       pageIndex++; 
                    }, "");
                };
            });