 var questionId=this.frameElement.attributes.id.value; 
 
 var array = questionId.split("_");
    
 if(array[0] == "question"){  
    }; 
 
 var namespaceforEntry = array[0]+"_"+array[1]+"_entry"; 
 var namespaceforLabel=  array[0]+"_"+array[1]+"_label"; 
 var namespaceforSubmit= array[0]+"_"+array[1]+"_submission"; 
 var namespaceforAnswer= array[0]+"_"+array[1]+"_answer"; 
 var namespacefortoleranceprob = array[0]+"_"+array[1]+"_tolerance_prob"; 
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

function getToleranceprob(){
   var element= parent.document.getElementById(namespacefortoleranceprob);
   
    if (element == null) {   return 0.01;}
     
    return element.innerHTML;
  
}

 var op = getEntry();
 var dataLabel= getLabel();
 
function redraw(history){
    
 
  if(history == "No answer") { myNodes = [];}
  else{ myNodes=deserialise(history);}
      
     if (myNodes == []) return;
       
       
     if(mode != "submission"){
        myNodes=deserialise(history);
       
       
    for(n=0; n<myNodes.length;n++){ 
     
        var node= myNodes[n];
       console.log(node);
         drawnode(node);
       } 
       
       
     
      
      sentToparentPage();
      
     
    
     
  
}
  
  
  
    if(mode =="submission"){
      
  var correctAnswer= getCorrectAnswer();
  var _history= getsubmission();
  var tolerance_prob=getToleranceprob();

      
function getCorrectAnswer(){
   
  var el=parent.document.getElementById(namespaceforAnswer).innerHTML; 
     
  return el;
    
 }  
      
      
   var correctAnswer= getCorrectAnswer();
      
      
      myNodes=deserialise(history);
      myNodes_correct= deserialise( getCorrectAnswer());  
      
       var linkedArray= new Array(); 
      var linkedArray2= new Array();  
        
       var linkedArray_correct= new Array(); 
      var linkedArray2_correct= new Array(); 
        
      for(n=0; n<myNodes.length;n++){ 
       
      var node=myNodes[n];  
       
      var linkedNode= new NodeClass(node);
      //console.log(linkedNode);
      linkedArray.push(linkedNode);  
      linkedArray2.push(linkedNode);
  } 
        
       for(n=0; n<myNodes_correct.length;n++){ 
       
      var node=myNodes_correct[n];  
       
      var linkedNode= new NodeClass(node)
      //console.log(linkedNode);
      linkedArray_correct.push(linkedNode);  
      linkedArray2_correct.push(linkedNode);
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
        for(var n=0; n<linkedArray_correct.length;n++){
        var  rootnode= linkedArray_correct[n];
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
           // console.log(parentnode.id);
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
          
        for (j=0;j<linkedArray_correct.length;j++){ 
          
        var linkedNode=linkedArray_correct[j];
           
           // linkedNode.node.parentID;
          
          var children= new Array(); 
              for(var n=0; n<linkedArray2_correct.length;n++){ 
                var  thisnode= linkedArray2_correct[n];  
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
        
        var rootnode_correct = findrootnode_student();
       
        var rootnodeid = rootnode.node.id;
        recursive(rootnode); 
        recursive(rootnode_correct); 
        console.log(linkedArray); 
        console.log("here"); 
        console.log(myNodes.length);
        console.log("here");
        var deep =rootnode.level;
        var deep_correct =rootnode_correct.level;
        
        
        console.log(deep); 
        
        for(var n=2; n<=deep_correct ;n++){ 
             
            for(var m=0; m<linkedArray2_correct.length;m++){
             var  lnode= linkedArray2_correct[m]; 
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
                       
                    }
                    lnode.node.prob=temp; 
                  } 
                }  
            }  
        } 
        
        
        
         for(var n=2; n<=deep ;n++){ 
             
            for(var m=0; m<linkedArray2.length;m++){
             var  lnode=linkedArray2[m]; 
                if(lnode.level==n){
                  if(lnode.node.type == "O") {
                  
                   var ch =lnode.nextNodes; 
                   var _array = new Array();
                  
                    var temp=1;
                    for(var l=0; l<ch.length; l++){ 
                      temp= numMulti (temp,1-ch[l].node.prob); 
                    }
                      
                   if  (!checkTolerance( lnode.node.prob,1-temp ,tolerance_prob) ) {                   
                      
                      
                     lnode.node.bordercolor='red' ;
                    
                     
                   }
                    
                  }
                  
                  if(lnode.node.type == "A") {
                    var ch =lnode.nextNodes; 
                    var _array = new Array(); 
                    var temp=1;
                    for(var l=0; l<ch.length; l++){ 
                      temp= numMulti (temp,ch[l].node.prob); 
                   
                    }
                    
                  //  lnode.node.prob=temp; 
                     
                    if (!checkTolerance( lnode.node.prob,temp ,tolerance_prob) ){ 
                     lnode.node.bordercolor='red' ; 
                       console.log("+++");
                      console.log(lnode.node);
                   }
                    
                  } 
                }  
            }  
        } 
        
         for(var x=0; x<linkedArray2.length;x++){
           
              var  lnode= linkedArray2[x];  
               console.log(lnode);
               var list=[];
               var idlist= getAncestors(lnode,list);
           
           
             if(lnode.node.value){idlist.push(lnode.node.value);}

               else { idlist.push('0');}            
               
               
               
               lnode.node.ancestors= idlist;
           
          }
        
           for(var x=0; x<linkedArray2_correct.length;x++){
           
              var  lnode= linkedArray2_correct[x];  
              
               var list=[];
               var idlist= getAncestors(lnode,list);
             
               if(lnode.node.value){idlist.push(lnode.node.value);}

               else { idlist.push('0');}             
               
              
               lnode.node.ancestors= idlist; 
          }
         
       
        console.log(rootnode_correct);
          
        
         for(var x=0; x<linkedArray2.length;x++){ 
            
            var  lnode= linkedArray2[x];  
                 lnode.node.color="#d9534f";         
           for(var y=0; y<linkedArray2_correct.length;y++){  
              var lnode_correct= linkedArray2_correct[y];  
                
              console.log(lnode.node.ancestors);
              console.log(lnode_correct.node);
              
                if(
   lnode.node.ancestors.compare(lnode_correct.node.ancestors)){
                     console.log("student:"); 
                      console.log(lnode_correct.node);
                      console.log("correct:");
                      console.log(lnode.node);
                      lnode.node.color="green";
                  
                  
                  if(lnode.node.type != lnode_correct.node.type){
                    if(lnode.node.type=="C" && lnode_correct.node.type=="D") continue;
                          if(lnode.node.type=="D" && lnode_correct.node.type=="C") continue;
                        lnode.node.color="orange";
                        lnode.node.outlinecolor='red';
                  }
                  
                 
                  if(lnode.node.bordercolor=='red'){
                      lnode.node.color="orange"; 
                    
                   if (checkTolerance( lnode.node.prob,lnode_correct.node.prob,tolerance_prob) ){ 
                      lnode.node.bordercolor='blue' ; }
                      
                   
                       
                    }
                  
                  else  if(lnode.node.prob==lnode_correct.node.prob){
                    
                      lnode.node.bordercolor='black';
                    
                  }
                  else if (lnode.node.type == "C"){
                    lnode.node.bordercolor='red' ; 
                  
                  }
                   
                  
                  console.log(lnode);
                   
                }
            
            }    
           
          }
      
      
      
      
 
       for(n=0; n<myNodes.length;n++){ 
         var node= myNodes[n];
         console.log(node);
         drawnode(node);

             }
    
         sentToparentPage();

      }
}
 