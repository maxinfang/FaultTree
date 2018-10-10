 var myNodes=new Array();
 
 var questionId=this.frameElement.attributes.id.value; 
 
 var array = questionId.split("_");
    
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
 var _history= getsubmission();
 
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
      myNodes_student=deserialise(_history); 
        
       
      // find the end of child;
      // calculatNode(myNodes); 
      var linkedArray= new Array(); 
      var linkedArray2= new Array();  
        
       var linkedArray_student= new Array(); 
      var linkedArray2_student= new Array(); 
        
      for(n=0; n<myNodes.length;n++){ 
       
      var node=myNodes[n];  
       
      var linkedNode= new NodeClass(node)
      //console.log(linkedNode);
      linkedArray.push(linkedNode);  
      linkedArray2.push(linkedNode);
  } 
        
       for(n=0; n<myNodes_student.length;n++){ 
       
      var node=myNodes_student[n];  
       
      var linkedNode= new NodeClass(node)
      //console.log(linkedNode);
      linkedArray_student.push(linkedNode);  
      linkedArray2_student.push(linkedNode);
  } 
        
        
        
      function findrootnode_correct(){
        for(var n=0; n<linkedArray.length;n++){
        var  rootnode= linkedArray[n];
        var pid=rootnode.node.parentID;
          console.log(rootnode);
        if(pid=="") {  
            return rootnode; };
        }
      } 
        
        function findrootnode_student(){
        for(var n=0; n<linkedArray_student.length;n++){
        var  rootnode= linkedArray_student[n];
        var pid=rootnode.node.parentID;
          console.log(rootnode);
        if(pid=="") {  
            return rootnode; };
        }
      } 
        
     function getAncestors(nodeclass,list){
       
            var parentlist= list;
             
        var parentnode = nodeclass.prevNode ;
            console.log(parentnode);
        if ( parentnode==null) {
             console.log(parentlist);
             return parentlist;
           }
        else {  
            console.log(parentnode.id);
          //parentnode = nodeclass.prevNode();
            parentlist.push(parentnode.node.value);
            getAncestors(parentnode,parentlist); 
        }
       
         return parentlist;
       
         
     
     }   
     function setchildren_correct(){
          
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
        
        
         function setchildren_student(){
          
        for (j=0;j<linkedArray_student.length;j++){ 
          
        var linkedNode=linkedArray_student[j];
           
           // linkedNode.node.parentID;
          
          var children= new Array(); 
              for(var n=0; n<linkedArray2_student.length;n++){ 
                var  thisnode= linkedArray2_student[n];  
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
        setchildren_correct(); 
        setchildren_student(); 
        
        var rootnode = findrootnode_correct();
        
        var rootnode_student = findrootnode_student();
       
        var rootnodeid = rootnode.node.id;
        recursive(rootnode); 
        recursive(rootnode_student); 
        console.log(linkedArray); 
        console.log("here"); 
        console.log(myNodes.length);
        console.log("here");
        var deep =rootnode.level;
        console.log(deep); 
        
        for(var n=2; n<=deep ;n++){ 
             
            for(var m=0; m<linkedArray2.length;m++){
             var  lnode= linkedArray2[m]; 
                if(lnode.level==n){
                  if(lnode.node.type == "O") {
                  
                   var ch =lnode.nextNodes; 
                   var _array = new Array();
                  
                    var temp=1;
                    for(var l=0; l<ch.length; l++){ 
                      temp= numMulti (temp,1-ch[l].node.prob); 
                    }
                 
                   lnode.node.prob=1-temp;
                  }
                  if(lnode.node.type == "A") {
                    var ch =lnode.nextNodes; 
                    var _array = new Array(); 
                    var temp=1;
                    for(var l=0; l<ch.length; l++){ 
                      temp= numMulti (temp,ch[l].node.prob); 
                      console.log("test"+temp);
                    }
                    lnode.node.prob=temp; 
                  } 
                }  
            }  
        } 
        
         for(var x=0; x<linkedArray2.length;x++){
           
              var  lnode= linkedArray2[x];  
               console.log(lnode);
               var list=[];
               var idlist= getAncestors(lnode,list);
               
               idlist.push(lnode.node.value);
               lnode.node.ancestors= idlist;
           
          }
        
           for(var x=0; x<linkedArray2_student.length;x++){
           
              var  lnode= linkedArray2_student[x];  
              
               var list=[];
               var idlist= getAncestors(lnode,list);
               
               idlist.push(lnode.node.value);
               lnode.node.ancestors= idlist;
           
          }
        
         for(var x=0; x<linkedArray2.length;x++){ 
            
            var  lnode= linkedArray2[x];  
                 lnode.node.color="red"; 
           for(var y=0; y<linkedArray2_student.length;y++){ 
              var lnode_student= linkedArray2_student[y];   
                if( lnode.node.ancestors.compare(lnode_student.node.ancestors)){
                  lnode.node.color="green";
                  if(lnode.node.prob==lnode_student.node.prob){
                     lnode.node.bordercolor='blcak';
                  }
                  else{lnode.node.bodercolor='red'}
                  console.log(lnode);
                   
                }
            
            }    
           
          }
        
        
       for(n=0; n<myNodes.length;n++){ 
         var node= myNodes[n];
        console.log(node); 
         drawnode(node);
       }
   
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