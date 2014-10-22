;(function($){
  $.fn.extend({
      "jLzindex" : function(){    
        var $dragIndex = $(this);
         
        for(var i=0; i <$dragIndex.length; i++){    
          var zIdxNum = 10000 - i ;
         
          $($dragIndex).css("z-index",'99999');
        }
 
         
        
        
         var index=   100000; 
         $dragIndex.mousedown(function(e){
           
           //find the largest value of index box
         
             
           var x=  e.currentTarget.id 
           var selected= $("#"+x);
           index= index+2;
           selected.css("z-index",index);
           console.log(index);
        });
      }
    
    })
})(jQuery)
