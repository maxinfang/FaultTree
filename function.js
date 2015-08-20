var MEMBER_SEPARATOR='b';
var NODE_SEPARATOR='a';


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
  
function Node(id,type,parent,top,left,selectvalue,emv,prob){      
       this.id = "";
       this.type="";
       this.parentID =""; 
       this.top ="";
       this.left=""; 
       this.value=""; 
       this. emv="";//change this to the type? 
       this.prob="" 
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
       node.id=nodeAttribute[1];
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
          if(property=="value"){n.prob=node.value;}
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




 