
fetch("UniList.json")
    .then(response => response.json())
    .then(values => values.forEach(value => console.log(value.University)))
    .catch(error => console.error(error)); 




    