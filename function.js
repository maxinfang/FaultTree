var MEMBER_SEPARATOR='b';
var NODE_SEPARATOR='a';

function NodeClass(node) { 
  
  
  this.id=node.id;
  this.prevNode=null;       
  this.nextNodes=null;       
  this.node=node;  
  this.level=0; 
  
}


function recursiveemv(node) {
      var currentnode= node;
      var nextnodes= node.nextNodes;
      var nodedata= node.node; 
      var length= nextnodes.length;
      var emv=0;
      var prob=0;
       
      
     
      if( length>0) {  
      for (var x=0;x<length;x++){ 
        var childnode = nextnodes[x];  
         emv = emv+ recursive(childnode);  
        }  
        
      nodedata.emv=  emv; 
      return  emv;
       
      } 
     
      prob = nodedata.emv; 
      return Number(emv);
              
  }
      
function numMulti(num1, num2) {
  
    var baseNum = 0;

    try {

        baseNum += num1.toString().split(".")[1].length;

    } catch (e) {

    }

    try {
        baseNum += num2.toString().split(".")[1].length;

    } catch (e) {

    }

    return Number(num1.toString().replace(".", "")) * Number(num2.toString().replace(".", "")) / Math.pow(10, baseNum);

};
function numAdd(num1, num2) {

    var baseNum, baseNum1, baseNum2;

    try {

        baseNum1 = num1.toString().split(".")[1].length;

    } catch (e) {

        baseNum1 = 0;

    }

    try {

        baseNum2 = num2.toString().split(".")[1].length;

    } catch (e) {

        baseNum2 = 0;

    }

    baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));

    return (num1 * baseNum + num2 * baseNum) / baseNum;

};



 function accDiv(arg1,arg2){
  var t1=0,t2=0,r1,r2;
  try{t1=arg1.toString().split(".")[1].length}catch(e){}
  try{t2=arg2.toString().split(".")[1].length}catch(e){}
  with(Math){
  r1=Number(arg1.toString().replace(".",""))
  r2=Number(arg2.toString().replace(".",""))
  return (r1/r2)*pow(10,t2-t1);
  }
}

    
        
     



if (!Array.prototype.indexOf)
{
  Array.prototype.indexOf = function(elt /*, from*/)
  {
    var len = this.length >>> 0;

    var from = Number(arguments[1]) || 0;
    from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
    if (from < 0)
      from += len;

    for (; from < len; from++)
    {
      if (from in this &&
          this[from] === elt)
        return from;
    }
    return -1;
  };
}


if(Array.prototype.compare)
    console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.compare = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] != array[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
}
/*
if (!Array.prototype.compare)
{
Array.prototype.compare = function(testArr) {
  //console.log("*****************************************************************");
 // console.log(this);
//  console.log(testArr);
    if (this.length != testArr.length) return false;
    for (var i = 0; i < testArr.length; i++) {
        if ((this[i] == "" && testArr[i] == "0") ||
        (this[i] == "0" && testArr[i] == "")) {
          // accept empty string = 0
                continue;
        }
        else if (this[i] != testArr[i]) return false;
    }
 
    return true;
}
  }
  
  
  

  
  
  
  
 */ 
  
function checkTolerance(submitvalue,correctvalue,tolerance){
 
    var difference = Math.abs(submitvalue-correctvalue); 
  console.log(difference);
       if (difference <= tolerance) {
     return true;
    }
    else false;
}

  
function Node(id,type,parent,top,left,selectvalue,emv,prob){      
       this.id = "";
       this.type="";
       this.parentID =""; 
       this.top ="";
       this.left=""; 
       this.value=""; 
       this. emv="";//change this to the type? 
       this.prob="" ;
  this.bordercolor="";
     }  
 
function deserialise(string){
      
       var array= new Array();
    //if (string ="no answer") return array;
       var stringnode=  string.split('a');
    //   console.log(stringnode);
       for(i=0;i<stringnode.length-1;i++){
     //      if(stringnode[i]==" ") continue;
       var nodeAttribute=stringnode[i].split('b');
       //console.log(nodeAttribute[1]);
       var node = new Node();
       node.type= nodeAttribute[0]
       if(nodeAttribute[1]){ node.id=nodeAttribute[1];}
       else {node.id=0;}
       node.value=nodeAttribute[2];
       node.left =nodeAttribute[3]; 
       node.top =nodeAttribute[4]; 
       node.emv=nodeAttribute[5];
       node.prob=nodeAttribute[6]; 
       node.parentID=nodeAttribute[7]; 
       array.push(node); 
       }  
     return array; 
}


function serialise(myNodes){
      var answervalue =""; 
      for(l=0;l<myNodes.length;l++){
      var thisnode=myNodes[l]; 
      answervalue+=thisnode.type;
      answervalue+=MEMBER_SEPARATOR;
      answervalue+=thisnode.id;
      answervalue+=MEMBER_SEPARATOR;
      answervalue+=thisnode.value;
      answervalue+=MEMBER_SEPARATOR;
      answervalue+=thisnode.left;
      answervalue+=MEMBER_SEPARATOR;
      answervalue+=thisnode.top;
      answervalue+=MEMBER_SEPARATOR;
      answervalue+=thisnode.emv;
      answervalue+=MEMBER_SEPARATOR;
      answervalue+=thisnode.prob;
      answervalue+=MEMBER_SEPARATOR;
      answervalue+=thisnode.parentID;
      answervalue+=MEMBER_SEPARATOR;
      answervalue+=NODE_SEPARATOR;
    } 
      return answervalue;
};

function generateID(myNodes){
      
  if (typeof(myNodes) == "undefined" ) {return 1;} 
      var myNodesArray=myNodes;
      var max=0;   
      for(n=0; n<myNodesArray.length;n++){ 
         var node= myNodes[n]; 
          node.id >=max;
          max=node.id 
       } 
  
      var ret= Number(max) +1;
      return ret;
      
      };

  function findnode(id){ 
       for(n=0; n<myNodes.length;n++){
         if (myNodes[n].id == id){ 
         return myNodes[n];
         }
       }
       }

 function addNewNode(node){ 
     myNodes.push(node);
     sentToparentPage();
   }


function  emptymyNodes(){ 
    myNodes=[];
    jsPlumb.reset; 
    sentToparentPage();
   }


 function updateNode(node,property){ 
      var myNodesArray=myNodes; 
      for(n=0; n<myNodesArray.length;n++){ 
         var n= myNodes[n]; 
        if(  n.id== node.id){
          if(property=="top") {n.top=node.top;}
          if(property=="left"){n.left=node.left;}
          if(property=="parentID"){n.parentID=node.parentID;}
          if(property=="emv"){n.emv=node.emv;}
          if(property=="prob"){n.prob=node.prob;}
          if(property=="value"){n.value=node.value;}
        }
       } 
   if(mode == "student"){ sentToparentPage();}
   return;
      };


function  giveWarning(){
      var numberOfnoParent=0;
  for(n=0; n<myNodes.length;n++){
        var node= myNodes[n];
        var parentid = node.parentID;
        if(parentid=="") numberOfnoParent++;
       }  
         if (numberOfnoParent>1) {
           
           $("body").css("background-color","#fee");
           $("p").text("Warning: Not all nodes are connected!");
            
         }  
            else{
              $("body").css("background-color","transparent");
              $("p").text("");
            
       }; 
}

function sentToparentPage()
{ console.log(myNodes);
  giveWarning();
  var answervalue = serialise(myNodes); 
  
  if(mode !="submission" && mode !="correct"){
 // window.parent.save(answervalue);
 // $('#answer').val(answervalue); 
      var elem= parent.document.getElementsByTagName("input"); 
 
    
  var arr = new Array();
  var i = 0;
  var iarr = 0;
  var att;
  for(; i < elem.length; i++) {
        att = elem[i].getAttribute("type");
    if(att =="text") {
       elem[i].value   = answervalue;
    }  
         
    } 
   
   console.log("save:"+answervalue);
  }
  
  if(mode =="submission" || mode =="correct"){
  
    console.log(" ");
  
  
  
  }
}

 
function deleteNode(node)
{
       var deletedNodeid=node.id; 
       var index = myNodes.indexOf(node); 
       
       myNodes.splice(index,1); 
       for(n=0; n<myNodes.length;n++){
        var node= myNodes[n];
        
        if(node.parentID==node.id){ 
        node.parentID="";
                                             $("#"+node.id).children().each(function(no,el){
        if($(el).hasClass("droplist")){
        $(el).hide();
        } 
        });}
       }  
       giveWarning();  
      $("#"+deletedNodeid).remove();
      
}

function validateProbability(value)
{
    var num = value;
    var regex=/^[+]?[0-9]*\.?[0-9]*$/;
    var emdashregex=/[－]+/;
    var commaregex=/[,]+/;
  
  message="true";
  
  if (!num.match(regex)) { message="Numbers must only contain .1234567890"; 
                          }
     
     
  if(num.match(emdashregex)){
         message +="\nHint: Are you using the standard negative sign? ";  
              } 
  
 if(num.match(commaregex)){
        message +="\nHint: Do not use comma (,) as decimal point? ";  
  }
         
   return message;
  
  
 }



 