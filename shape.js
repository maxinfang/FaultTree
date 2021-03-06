 
/*
  if(color =="blue") Color="#0060bf";
  if(color =="red") Color="#d9534f";
  if(color =="orange") Color="#ffa500";
 
  if(color =="grey") Color ="#808080"; //testing color
  if(dotcolor =="red") {dotColor="red";Color ="#ffa500";}
  else {dotColor="#456"}
  if(outlinecolor =="outlinered") { strokecolor="red";  }
  else { strokecolor="black";}*/
 var strokecolor='black';
var Color="#fa0000";// if(color =="orange") Color="#ffa500";
 
if(mode=="correct") {    Color="#ffa500";}   //"#5cc902"};
if(mode=="submission") { Color= "#0060bf"};  

function addShape(type,dragzone,color,nodeoutline){
  
   if(color =="green") color="#5cc902";
   if(color =="blue") Color="#0060bf";
  if(color =="red") Color="#d9534f";
  if(color =="orange") Color="#ffa500";
  if(color =="green") Color ="#5cc902";
  if(color =="grey") Color ="#808080";
  
  console.log(nodeoutline);
  
  if(nodeoutline =='red'){strokecolor="red"; }
  if(nodeoutline =='blue'){strokecolor="#7e9fc2"; }
  else{strokecolor="black";}
  
  if (type=="T") {addTriangle(dragzone,color);}
  if (type=="C") {addCircle(dragzone,color);}
  if (type=="A") {addRect(dragzone,color);}
  if (type=="O") {addRectwithor(dragzone,color);}
  if (type=="D") {addDiamond(dragzone,color);}
}

function addDiamond(dragzone,color) {
  
     if(color==null) color= "#0060bf";
    var paper = new Raphael(
      $(dragzone).get(0), 100, 100); 
  
    var diamond= paper.path( "M0 25L 50 50L100 25L50 0Z")
           .attr({
            fill : color,
            stroke : "black",
            strokeWidth : 0,
            r : 5
      }); 
     var sourcePoint= {
        anchor:"Bottom", 
         connectorStyle: {
              
            lineWidth: 2,
            strokeStyle: '#666'
        }, 
       connector:["Flowchart"],
        maxConnections: -1,
        /*connectorOverlays: [["Arrow",
        { width: 15,
         length: 15}
        ]], */
        isSource:true,
        isTarget:false
        };
         
        var targetPoint= {
        anchor: "Top",
        isSource:false,
        isTarget:true
    };
    var currentId = $(dragzone).attr('id'); 
    e1= jsPlumb.addEndpoint(currentId, sourcePoint);
    e2= jsPlumb.addEndpoint(currentId, targetPoint);  
  
};
 
function addRect(dragzone,color) { 
    
      if(color==null) color= "#0060bf";
      
   var paper = new Raphael(
        $(dragzone).get(0), 100,135); 
   // paper.path("M20,150 Q50,5 80,150Z") ;
     
      paper.path("M50,25 L50,100 M30,135 Q50,65 70,135Z").attr({
            fill : color }); 
   var cp = paper.circle(50, 113, 4).attr("fill", "black");
         var rect =paper.rect(1, 1, 98, 49)
           .attr({
            fill : color,  
            stroke : strokecolor,
            strokeWidth : 2,
             
             
            
            
        }); 
    var sourcePoint= {
        anchor:"Bottom", 
         connectorStyle: {
            lineWidth: 2,
            strokeStyle: '#666'
        }, 
        connector:["Flowchart"],
        maxConnections: -1,
        /*connectorOverlays: [["Arrow",
        { width: 15,
         length: 15}
        ]], */
        isSource:true,
        isTarget:false
        };
         
        var targetPoint= {
        anchor: "Top",
        isSource:false,
        isTarget:true
    };  
    var currentId = $(dragzone).attr('id'); 
    e1= jsPlumb.addEndpoint(currentId, sourcePoint);
    e2= jsPlumb.addEndpoint(currentId, targetPoint);   
  }

function addRectwithor(dragzone,color) { 
  
   if(color==null) color= "#0060bf";
  
   var paper = new Raphael(
        $(dragzone).get(0), 100,135); 
   // paper.path("M20,150 Q50,5 80,150Z") ;
     
      paper.path("M50,40 L50,100 M30,135 Q 50,65 70,135 Q50,110 30,135").attr({
            fill : color,
            stroke : "black",
            strokeWidth : 0}); 
         var cross = paper.path("M50,105 L50,115 M45, 110 L55 110").attr({
    "stroke": "black",
    "stroke-width": 3
});
        var rect =paper.rect(1, 1, 98, 49)
           .attr({
             fill : color,
            
            stroke : strokecolor,
            strokeWidth : 2,
             
        }); 
  
  
    var sourcePoint= {
        anchor:"Bottom", 
         connectorStyle: {
            lineWidth: 2,
            strokeStyle: '#666'
        }, 
        connector:["Flowchart"],
        maxConnections: -1,
        /*connectorOverlays: [["Arrow",
        { width: 15,
         length: 15}
        ]], */
        isSource:true,
        isTarget:false
        };
         
        var targetPoint= {
        anchor: "Top",
        isSource:false,
        isTarget:true
    };  
    var currentId = $(dragzone).attr('id'); 
    e1= jsPlumb.addEndpoint(currentId, sourcePoint);
    e2= jsPlumb.addEndpoint(currentId, targetPoint);   
  }

function addTriangle(dragzone,color) {
   if(color==null) color= "#0060bf";
    var paper = new Raphael(
      $(dragzone).get(0), 102, 82);  
    var triangle =paper.path( "M0 80L 100 80L50 0Z")
           .attr({
            fill : color,
            stroke : "black",
            strokeWidth : 0,
            r : 5
      }); 
     var sourcePoint= {
        anchor:"Bottom", 
         connectorStyle: {
            lineWidth: 2,
            strokeStyle: '#666'
        }, 
        connector:["Flowchart"],
        maxConnections: -1,
        /*connectorOverlays: [["Arrow",
        { width: 15,
         length: 15}
        ]], */
        isSource:true,
        isTarget:false
        };
         
        var targetPoint= {
        anchor: "Top",
        isSource:false,
        isTarget:true,
           maxConnections: -1
    };
    var currentId = $(dragzone).attr('id'); 
    e1= jsPlumb.addEndpoint(currentId, sourcePoint);
    e2= jsPlumb.addEndpoint(currentId, targetPoint);  
  
};

  function addCircle(dragzone,color) {
     if(color==null) color= "#0060bf";
    var paper = new Raphael(
    $(dragzone).get(0), 102, 102);   
    var circle =paper.ellipse(51, 30, 50, 25)
           .attr({
            fill : color ,
            stroke :strokecolor,
            strokeWidth :1
        }); 
    var sourcePoint= {
        anchor:"Bottom", 
         connectorStyle: {
            lineWidth: 2,
            strokeStyle: '#666'
        }, 
         connector:["Flowchart"],
        maxConnections: -1,
    /*    connectorOverlays: [["Arrow",
        { width: 15,
         length: 15}
        ]], */
        isSource:true,
        isTarget:false
        };
         
        var targetPoint= {
        anchor: "Top",
        isSource:false,
        isTarget:true
    };  
    var currentId = $(dragzone).attr('id'); 
    e1= jsPlumb.addEndpoint(currentId, sourcePoint);
    e2= jsPlumb.addEndpoint(currentId, targetPoint); 
        
  }

  function addAnd(dragzone){
     var paper = new Raphael(
      $(dragzone).get(0),100, 100); 
     paper.path("M0,60 Q20,5 40,60Z") 
 //  var and =paper.path("M 57  2 L 43  2 L 37 12 L 44 16 L 50  7 L 52 12 L 49 //13 L 59 13 L 63  5 L 60  6 Z M 50 35 L 38 35 L 31 23 L 34 16 L 31 15 L 40 15 //L 44 23 L 41 22 L 38 27 L 50 27 Z  M 51 31 L 56 25 L 56 27 L 62 27 L 56 16 L //63 12 L 69 23 L 62 35 L 56 35 L 56 38 Z")
           .attr({
            fill : color
        });  
}

  function addHexagon(dragzone) {
     if(color==null) color= "#0060bf";
    var paper = new Raphael(
    $(dragzone).get(0), 100, 100);  
    
    var hpath= hexagon(50,50,50);
    function hexagon(x,y,r) {
       
  var x1 = x;
  var y1 = y-r;
  var x2 = x+(Math.cos(Math.PI/6)*r);
  var y2 = y-(Math.sin(Math.PI/6)*r);
  var x3 = x+(Math.cos(Math.PI/6)*r);
  var y3 = y+(Math.sin(Math.PI/6)*r);
  var x4 = x;
  var y4 = y+r;
  var x5 = x-(Math.cos(Math.PI/6)*r);
  var y5 = y+(Math.sin(Math.PI/6)*r);
  var x6 = x-(Math.cos(Math.PI/6)*r);
  var y6 = y-(Math.sin(Math.PI/6)*r);
  
  var path = "M"+x1+" "+y1+" L"+x2+" "+y2+" L"+x3+" "+y3+" L"+x4+" "+y4+" L"+x5+" "+y5+" L"+x6+" "+y6+"z";
  return path;
}
     var hexagon=paper.path(hpath)
           .attr({
            fill : color,
            stroke : "black",
            strokeWidth : 0
             
      });
    
     hexagon.transform("r90");
    
    var sourcePoint= {
        anchor:"Bottom", 
         connectorStyle: {
            lineWidth: 2,
            strokeStyle: '#666'
        }, 
        connector: ["Flowchart"],
        maxConnections: -1,
     /*   connectorOverlays: [["Arrow",
        { width: 15,
         length: 15}
        ]],  */
        isSource:true,
        isTarget:false
        };
         
        var targetPoint= {
        anchor: "Top",
        isSource:false,
        isTarget:true
    };  
    var currentId = $(dragzone).attr('id'); 
    e1= jsPlumb.addEndpoint(currentId, sourcePoint);
    e2= jsPlumb.addEndpoint(currentId, targetPoint);  
  }
  