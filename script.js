vvar outputContainer=document.getElementById("output");

function getCodefromUser()
{
 var codeContainer=document.getElementById("code");
 var compileButton=document.getElementById('compile');
 var langButton=document.getElementById("language");
 compileButton.addEventListener('click',function()
 {
    compileCode(codeContainer.value,langButton.value);

 }
 );
 
}

function compileCode(codeContainer,langButton)
{
    var obj={python : "0" , js : "4" , c : "7" , cpp : "77" , Java : "8"};
    langCode=obj[langButton];
    
    var req =new XMLHttpRequest();
    req.open("POST","https://codequotient.com/api/executeCode");
    req.setRequestHeader("Content-Type", "application/json");
  
   

    req.send(JSON.stringify( { code:codeContainer , langId:langCode}));

    req.addEventListener("load",function(event)
    {
        jsondata=JSON.parse(event.target.responseText);
       
        if(jsondata.codeId)
        {
             setTimeout(function()
             {
                 getOutput(jsondata.codeId);
             }, 5000);
            

        }
    })
   
}
function getOutput(codeId)
  {
     var req =new XMLHttpRequest();
    req.open("GET",`https://codequotient.com/api/codeResult/${codeId}`);
    req.setRequestHeader("Content-Type", "application/json");
    req.send();
    req.addEventListener('load',function(event)
    {
        outputObject=JSON.parse(event.target.responseText);
        out=JSON.parse(outputObject.data);
        if(out.output!=='')
        outputContainer.value=out.output;
        else
        {
            outputContainer.value=out.errors;
        }
    })
  
}


getCodefromUser();
