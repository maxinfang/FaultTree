function addDroplist(options){ 
  newselect= document.createElement('select');
  $(newselect).addClass("droplist");
  var select= $(newselect).uniqueId(); 
  selectId=$(newselect).prop("id");
  for(o=0;o<op.length;o++){
    $(newselect).append('<option value='+o+' style="width:50;">'+op[o]+'</option>');
  }  
  
  if (typeof options == 'undefined'){
   
   
    return $(newselect); 
  }
  else{ 
    newselect.value= options;
    return $(newselect); 
  }

};


function addlabel(lable){ 
  var newlabel= document.createElement('LABEL');
  newlabel.setAttribute("for",lable);
  
  newlabel.innerHTML = lable; 
  return newlabel;
};

function addtext(lable,value){ 
  var text= document.createElement('input');
  
  $(text).uniqueId();  
  text.type="text";
  $(text).addClass("droplist");
  text.style.width='40px';
  text.name=lable;    if(typeof(value) != "undefined")
  {
    
    text.value=value;
  }
  
  return text;
};

