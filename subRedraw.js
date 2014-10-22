 var myNodes=new Array();
 var mode ="correct";
 var questionId=this.frameElement.attributes.id.value; 
 
 var array = questionId.split("_");
    console.log(array);
 if(array[0] == "question"){  
    }; 
 
 var namespaceforEntry = array[0]+"_"+array[1]+"_entry"; 
 var namespaceforLabel=  array[0]+"_"+array[1]+"_label"; 
 var namespaceforSubmit= array[0]+"_"+array[1]+"_submission"; 
 var namespaceforAnswer= array[0]+"_"+array[1]+"_answer"; 
 var op= new Array();

 
 
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
  if (element == null) { console.log(questionId); return;}
    console.log( element.innerHTML);
    return element.innerHTML;
 } 

function getsubmission(){
    var element= parent.document.getElementById(namespaceforSubmit);
    return element.innerHTML;
 } 

function getCorrectAnswer(){
   
  var el=parent.document.getElementById(namespaceforAnswer).innerHTML; 
     
  return el;
    
 } 

 var op = getEntry();
 var dataLabel= getLabel();
 var correctAnswer= getCorrectAnswer();
 
if(parent.document.getElementById(namespaceforAnswer))
   {
     
  mode ="correct";
 
   
   };


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
  
  var history=""; 
  if(mode=="correct"){
    
    history = getCorrectAnswer();
   
    
    }
      
  if(history == "" ){ 
      }
      else{ 
      //caculate the nodes depending on email;
      myNodes=deserialise(history); 
      // find the end of child;
      // calculatNode(myNodes); 
      var linkedArray= new Array(); 
      var linkedArray2= new Array(); 
        
        
        
      for(n=0; n<myNodes.length;n++){ 
       
      var node=myNodes[n];  
       console.log(node);
      var linkedNode= new NodeClass(node)
      //console.log(linkedNode);
      linkedArray.push(linkedNode);  
      linkedArray2.push(linkedNode);
  } 
        
      function findrootnode(){
        for(var n=0; n<linkedArray.length;n++){
        var  rootnode= linkedArray[n];
        var pid=rootnode.node.parentID;
        if(pid=="") {  
            return rootnode; };
        }
      } 
     function setchildren(){
          
        for (j=0;j<linkedArray.length;j++){ 
          
        var linkedNode=linkedArray[j];
           
           // linkedNode.node.parentID;
          
          var children= new Array(); 
              for(var n=0; n<linkedArray2.length;n++){ 
                var  thisnode= linkedArray2[n];  
                var node = thisnode.node;
                var pID= thisnode.node.parentID;  
               if(pID== linkedNode.id){
                 thisnode.prevNode= linkedNode;

                 children.push(thisnode); 
                }; 
              }
          
          //console.log(children);
          linkedNode.nextNodes=children; 
        }
      }
       
         function recursive(node){  
      var currentnode= node;
      var nextnodes= node.nextNodes;
      var nodedata= node.node; 
      var length= nextnodes.length;
         
    
      
      if( length>0) {
      var  prob=0;
      var max = 0;
      for (var x=0;x<length;x++){
          var childnode = nextnodes[x];  
          var childLevel = recursive(childnode);  
          
          if( max < childLevel){
            max=childLevel;  
            
        }
         
        } 
       node.level=max+1;
        return node.level
       
      } 
       
      node.level=1;
      return node.level;
              
  }
setchildren();
        var rootnode = findrootnode();
        var rootnodeid = rootnode.node.id;
        recursive(rootnode);
           
           
        var deep =rootnode.level
        
        for(var n=2; n<=deep ;n++){ 
              for(var m=0; m<linkedArray2.length;m++){ 
                var  lnode= linkedArray2[m];
                if(lnode.level==n){
                    
                  if(lnode.node.type=="S"){
                  
                    var ch =lnode.nextNodes; 
                    var maxemv=0;
                    var   _array = new Array();
                   
                   for(var l=0; l<ch.length; l++){
                    
                     _array.push(ch[l].node.emv);
                    
                    
                    }
                      var maxemv=Math.max.apply(Math,_array);
                    for(var l=0; l<ch.length; l++){
                
                      //find the largest emv node;
                       if(ch[l].node.emv==maxemv)
                           { ch[l].node.prob=1;}
                       else{ch[l].node.prob="0";}
                      }
                       
                    
                    
                    lnode.node.emv=maxemv;
                    
                    
                  }
                  if(lnode.node.type=="C"){
                     var ch =lnode.nextNodes; 
                     var sum= 0;
                    for(var l=0; l<ch.length; l++){
                    
                      //find the largest emv node;
                        var nodeemv=Number(ch[l].node.emv);
                        var  nodeprob=Number(ch[l].node.prob);
                             
                        var nodev=  numMulti(nodeemv,nodeprob);
       
                        sum =numAdd(sum , nodev);
                    
                    }
                    lnode.node.emv=sum;
                  
                  }              }
                 
                
              }
        }
           
           
           
        
        
      
        
    
        
      
       
     //  recursiveemv(rootnode); 
    //  recursive(rootnode); 
        
   for(n=0; n<myNodes.length;n++){ 
         var node= myNodes[n]; 
         drawnode(node);
   }
     // redraw(history);
        console.log("here");
        
     // find rootnode and hide the prob;
        $("#"+rootnodeid).children().each(function(no,el){
        if($(el).hasClass("datatable")){
          $(el).children().each(function(n,e){
            if ($(e).hasClass("Prob")){ $(e).hide();}
          })
        } 
        });
       addConnections(myNodes);
      }
  
    jsPlumb.bind("connection", function(info, originalEvent) {
        var conn = info.connection;
        var parentId=$('#'+conn.sourceId).parent().attr('id');
        var childId=$('#'+conn.targetId).parent().attr('id');
        var node = findnode(childId);
        node.parentID=parentId;
         
        updateNode(node,"parentID");  
        
        console.log(childId);
        $("#"+childId).children().each(function(no,el){
        if($(el).hasClass("droplist")){
        $(el).show();
        } 
        });
    })
  
});