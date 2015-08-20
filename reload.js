function redraw(history){
    
     console.log(history);
  if(history == "No answer") { myNodes = [];}
  else{ myNodes=deserialise(history);}
      
     if (myNodes == []) return;
       
       if(mode != "submission"){
    for(n=0; n<myNodes.length;n++){ 
         var node= myNodes[n];
       console.log(node);
         drawnode(node);
       } 
    if(mode!="submission") {sentToparentPage();}
  
}
    if(mode =="submission"){ 
       console.log(myNodes);
        console.log("testredraw");
    
       for(n=0; n<myNodes.length;n++){ 
         var node= myNodes[n];
         console.log(node);
         drawnode(node);

}


      }
}
 