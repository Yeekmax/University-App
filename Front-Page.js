fetch("UniList.json")
    .then(response => response.json())
    .then(value => console.log(value))
    .catch(error => console.error(error)); 