function drawnode(node){
      
      
      newdiv= document.createElement('div'); 
      $(newdiv).attr('id',node.id);
      var containerId = $(newdiv).attr('id');
      $(newdiv).addClass("container");
      $(newdiv).addClass(node.type);
      
     //postion
      if(node.top==""){ 
       }
       else{
         console.log("set position");
      $(newdiv).css({ top: node.top, left: node.left });
      } 
      
  
      $("#canvasdiv").append(newdiv);
      dragzone= document.createElement('div');
  
     deletezone= document.createElement('div'); 
    var elem = document.createElement("img");
    elem.setAttribute("src", " icon-error.png");
    $(elem).uniqueId();
    $(elem).attr('align', 'right');
   $(deletezone).addClass("delete");
    $(deletezone).append(elem); 
    $(deletezone).addClass("delete");
  
  
  
  
      $(dragzone).uniqueId();
      var deleteId  =$(elem).attr("id");
      var currentId=$(dragzone).attr("id");
      // dropL=addDroplist();
      // $(newdiv).append(dropL);
 
      if(mode =="student") { $(newdiv).append(deletezone); } 
  
     $(newdiv).append(dragzone);  
      
      addShape(node.type,dragzone,node.color,node.outlinecolor); 
      
    // $(newdiv).append(dropL);
  
   
     
  var dropL;
  var dropLid;
  
  if(node.value==""){ 
     dropL=addDroplist();
     dropLid=$(dropL).prop('id');
     
  }
  
  else{
    
    console.log(node);
    dropL=addDroplist(node.value);
    dropLid=$(dropL).prop('id');

  }  
  
     $(dropL).change(function() { 
      var indexvalue= $( "#"+dropLid+" option:selected" ).val();
      node.value= indexvalue;
      updateNode(node,"value");
    })
  
   
    // if (node.parentID!=""){        
       $(newdiv).append(dropL.show()); 
       
   //  }
  
   //  else{ 
       
     //  $(newdiv).append(dropL.hide()); 
           
     //} 
 
      datadiv= document.createElement('div');
      $(datadiv).addClass("datatable");
      $(newdiv).append(datadiv); 
     
     
  
 /* var emv; 
  if(node.emv==""){
    emv=addtext("EMV");
  }
     else{  
  emv= addtext("EMV",node.emv)
     }
  
   $(newdiv).append(emv); */
  
      var prob;
      var problabel;
      var probs;
      console.log(node);
      if(node.bordercolor =='red'){
         prob=addtextwithred("Prob",node.prob);
      }else   if(node.bordercolor =='blue'){
         prob=addtextwithblue("Prob",node.prob);
      }else {
       prob=addtext("Prob",node.prob);
      }
     
      problabel=addlabel("Prob");
      $(datadiv).append( problabel);  
      $(datadiv).append( prob);  
    $(datadiv).append(dropL.show()); 
        
        
      
     var br = document.createElement('br')  
    //$(datadiv).append(br);
    // $(datadiv).append(problabel);
    //  $(datadiv).append(prob);
    //  $(datadiv).append(probs);
         
         prob.addEventListener("input", function(e) {
    
    var num = prob.value; 
    var message = validateProbability( num);
    if (message!="true"){
         alert(message);
        prob.value= prob.defaultValue;
         }else{
        prob.defaultValue= num;
           
      }
    
  }, false);
       
     $(prob).change(function() {
           node.prob= $(prob).val();
           updateNode(node,"prob");
         
});   
  /*   $(emv).change(function() {
           node.emv= $(emv).val();
           updateNode(node,"emv");
         
      });  
   */ 
  
     /* $(newdiv).dblclick(function() {
      if (confirm('Are you sure you want to delete the node?')) {   
        jsPlumb.detachAllConnections(currentId );
        jsPlumb.removeAllEndpoints(currentId); 
        deleteNode(node); 
        $(this).empty();  
        sentToparentPage(); 
        }  
      });
  */
   $("#"+deleteId).click(function() { 
    if (confirm('Delete this node?')) {   
      jsPlumb.detachAllConnections(currentId )
      jsPlumb.removeAllEndpoints(currentId); 
       
      $("#"+node.id).empty();  
      
       deleteNode(node);
         $(this).empty();  
        sentToparentPage(); 
      
    }  
    
  });
    
      jsPlumb.draggable($("#"+containerId), {
  containment:$("#canvasdiv").parent(),
        scroll:false     
}); 
  
      $("#"+containerId).draggable(  
         {   containment: $("#canvasdiv").parent(),
             scroll:false,
             handle:  "#"+currentId,
             stop: function(event, ui ){ 
             position = ui.position; 
             //value="top:"+position.top+"left:"+position.left;
             node.top=position.top;
             node.left=position.left; 
             updateNode(node,"top");
             updateNode(node,"left"); 
            }
          }
       );   
      //connection
     
      var top= $('#'+containerId).position().top;
      var left=$('#'+containerId).position().left;
  
      node.top=top;
      node.left=left;
  
      return node;
   
}