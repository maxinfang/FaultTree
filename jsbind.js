jsPlumb.bind("click", function(conn) { 
        var parentId=$('#'+conn.sourceId).parent().attr('id');
        var childId=$('#'+conn.targetId).parent().attr('id');
        var node = findnode(childId);
        node.parentID="";
        updateNode(node,"parentID");
        jsPlumb.detach(conn);   
  
        $("#"+childId).children().each(function(no,el){
        if($(el).hasClass("droplist")){
         $(el).hide();
        } 
        });
     }); 


 

