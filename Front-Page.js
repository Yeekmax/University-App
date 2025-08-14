
fetch("UniList.json")
    .then(response => response.json())
    .then(values => values.forEach(value => console.log(value.University)))
    .catch(error => console.error(error)); 




var nns = [-1,-1,-1,-1,-1,-1];
var nnsn = ["tuinn","locnn","livnn","coonn","foonn","extnn"]


function nn(variable){
    nns[variable] *= -1;
    console.log(nns[variable]);
    if(nns[variable] == 1){
    document.getElementById(nnsn[variable]).className = ".clicked";
    console.log(nnsn[variable]);
    }
    else{
        document.getElementById(nnsn[variable]).className = ".empty";
    }
}




    