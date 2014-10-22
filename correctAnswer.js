
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

    
        
     

