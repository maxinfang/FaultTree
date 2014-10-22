 var myNodes=new Array();
 
 var questionId=this.frameElement.attributes.id.value; 
 
 var array = questionId.split("_");
    
 
if(array[0] != "question" && array[0] !='"question'){ 
      alert(alert(array[0])); 
      alert ("iframe setting not vailid!");
      
 }; 

 var mode="student";
 var _history=""; 
 var namespaceforSub = array[0]+"_"+array[1]+"_submission";
 var namespaceforEntry = array[0]+"_"+array[1]+"_entry"; 
 var namespaceforLabel= array[0]+"_"+array[1]+"_label"; 
 var op= new Array();
 
console.log(namespaceforSub);
if(parent.document.getElementById(namespaceforSub))
   {mode ="submission";
       console.log("11111");
   }
else{
    mode="student";
};


 
 function getEntry(){
   
    var elements=new Array();  
    var  seq=1;
    var  flag =1;
    
  while(flag){
    
    var  tempname= namespaceforEntry+"_"+seq; 
    var element=parent.document.getElementById(tempname);
    if ( typeof element !="undefined"&& element !=null ) { 
      
      var bu =element.innerHTML;
      elements.push( bu);
      seq++;
    }else {flag=0;}
      
   }
     return elements;
   }

function getLabel(){
    var element=  parent.document.getElementById(namespaceforLabel);
  if (element == null) { 
    console.log(questionId); return;}
    console.log( element.innerHTML);
    return element.innerHTML;
 } 

function getHistory(){
  
  var elem= parent.document.getElementsByTagName("input"); 
 
    
  var arr = new Array();
  var i = 0;
  var iarr = 0;
  var att;
  for(; i < elem.length; i++) {
        att = elem[i].getAttribute("type");
    if(att =="text") {
        return elem[i].value   
    }  
         
    }
  
    
  
  
  
 } 



function getSubmission(){
var element=parent.document.getElementById(namespaceforSub);
   
  //console.log(element.innerHTML);
  return element.innerHTML;
  }

 var op = getEntry();
 console.log(op);
 var dataLabel= getLabel(); 
 
 
$(document).ready(function()  {
   
    //initialize jsPlumb
     
    /*initialize endpoint Class*/
  
      jsPlumb.Defaults.Container = $("#canvasdiv");
   
      jsPlumb.DefaultDragOptions = {  cursor:"pointer",
                                      zIndex: 2000 };
      jsPlumb.endpointClass = "endpointClass";
      jsPlumb.connectorClass =  "connectorClass";   
  
    /*initialize bind function*/
   ///click
      
   ///connection  
   
     
   //check wehter we need reload or not

  if(mode=="submission") { 
                          _history= getSubmission();
                           
    
    }
  
  
  if(mode=="student"){_history=getHistory();
                      console.log("studentpage:"+_history);}
  
  if(_history == "" ){ 
      }
      else{ 
        
       redraw(_history); 
       addConnections(myNodes);
      
      }
  
  
  jsPlumb.bind("connection", function(info, originalEvent) {
        var conn = info.connection;
        var parentId=$('#'+conn.sourceId).parent().attr('id');
        var childId=$('#'+conn.targetId).parent().attr('id');
        var node = findnode(childId);
        node.parentID=parentId;
        updateNode(node,"parentID"); 
      
        $("#"+childId).children().each(function(no,el){
           if($(el).hasClass("droplist")){
        $(el).show();
            
        } 
          
        if($(el).hasClass("datatable")){ 
            $(el).children().each(function(noo,ell){
        if($(ell).hasClass("Prob")){
        $(ell).show();
        }  
        } ) 
              } 
        });
    
    
       
    
        });
  
  
   //initialzie button action to different buttons;
   jsPlumb.bind("connectionDetached", function(info, originalEvent) {
  var conn = info.connection; 
     console.log(conn);
   var parentId=$('#'+conn.sourceId).parent().attr('id');
        var childId=$('#'+conn.targetId).parent().attr('id');
        var  paId=$('#'+conn.sourceId).parent().attr('id');
        var node = findnode(childId);
       var beforeId= $('#'+info.targetId).parent().attr('id');
      // console.log("thisnodepriviousid"+beforeId);
      
     if(beforeId!=childId){
       var pendingnode = findnode(beforeId);;
        pendingnode.parentID="";
        updateNode(pendingnode,"parentID");
       
       $("#"+beforeId).children().each(function(no,el){
    
        if($(el).hasClass("droplist")){
         $(el).hide();
        } 
    
    
          if($(el).hasClass("datatable")){
        
            $(el).children().each(function(noo,ell){
        if($(ell).hasClass("Prob")){
        $(ell).hide();
        }
          
        } ) 
              }
    
    
        });
     }
     
     if(paId!=childId) {
        node.parentID="";
        console.log("this nodeid:"+node.id);
        updateNode(node,"parentID");
        
        
  $("#"+childId).children().each(function(no,el){
    
        if($(el).hasClass("droplist")){
         $(el).hide();
        } 
    
    
          if($(el).hasClass("datatable")){
        
            $(el).children().each(function(noo,ell){
        if($(ell).hasClass("Prob")){
        $(ell).hide();
        }
          
        } ) 
              }
    
    
        });
   }
})
  
    
  if(mode!="submission"){
    $("#a").click(function(){ 
         var node= new Node();
         node.id =generateID(myNodes);
         node.type="T";
         node= drawnode(node); 
         addNewNode(node);
  });
    $("#c").click(function(){ 
         var node= new Node();
         node.id =generateID(myNodes);
         node.type="C";
         node= drawnode(node);
         addNewNode(node);
  });
  
   $("#r").click(function(){ 
         var node= new Node();
         node.id =generateID(myNodes);
         node.type="S";
         node= drawnode(node);
         addNewNode(node);
  });
  
  $("#h").click(function(){ 
         var node= new Node();
         node.id =generateID(myNodes);
         node.type="H";
         node= drawnode(node);
         addNewNode(node);
  });
   $("#d").click(function(){ 
         var node= new Node();
         node.id =generateID(myNodes);
         node.type="D";
         node= drawnode(node);
         addNewNode(node);
  });
   
   $("#clear").click(function(){
     
           if (confirm('Are you sure you want to delete all nodes?')) { 
           for(var n=0; n<myNodes.length;n++){
           var node= myNodes[n];
           var currentId=node.id;    
          
             $("#"+currentId).children().each(function(no,el){
        if($(el).hasClass("_jsPlumb_endpoint_anchor_")){
            console.log(el.id);
           jsPlumb.detachAllConnections(el.id);
           jsPlumb.removeAllEndpoints(el.id); 
           
        } 
        });
         $('#'+currentId).remove();
          }
           
           myNodes.length = 0; 
           sentToparentPage();
             
         }  
       })
     }
     else{ $("#a").hide();
           $("#c").hide();
           $("#d").hide();
           $("#clear").hide();
           $("#h").hide();
           $("#r").hide();                
          }
    
})