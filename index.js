async function calcBMI(){
    // Fetch data from input fields
    var weight = document.getElementById('weight').value;
    var feet = document.getElementById('feet').value;
    var inches = document.getElementById('inches').value;

    // Send data to the server
    fetch(`http://localhost:3000/calculateBMI?weight=${weight}&feet=${feet}&inches=${inches}`)
    .then(response => response.text())
    .then(result => {
        // Display the result on the client-side
        document.getElementById('result').innerText = result;
    })
    .catch(error => console.error('Error:', error));
}


async function calcRisk(){

}