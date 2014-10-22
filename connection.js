function addConnections(nodeslist){
  
   var arraynodes=nodeslist.slice();
   
  for(n=0; n<arraynodes.length;n++){
   var node= arraynodes[n];
   var parentid = node.parentID;
    if(parentid!="") { 
      addConnection(node);
        }
  
  }
  
}


function addConnection(node){
  
        var targetid ;
     $("#"+node.id).children().each(function(no,el){
        if($(el).hasClass("_jsPlumb_endpoint_anchor_")){
          targetid= el.id ; 
        } 
        });
  
         
      var sourceid ;
          console.log(node.parentID);
      $("#"+node.parentID).children().each(function(no,el){
        if($(el).hasClass("_jsPlumb_endpoint_anchor_")){
          sourceid= el.id ;
           
        } 
        });
     
       s=jsPlumb.selectEndpoints({source: sourceid}).get(0);
       t=jsPlumb.selectEndpoints({target: targetid}).get(0);
       
       jsPlumb.connect({source:s, target:t}); 
        

}

