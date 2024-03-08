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
    const userData = {
        age: document.getElementById('age').value,
        weight: document.getElementById('weight').value,
        feet: document.getElementById('feet').value,
        inches: document.getElementById('inches').value,
        systolic_bp: document.getElementById('systolic_bp').value,
        diastolic_bp: document.getElementById('diastolic_bp').value,
        diabetes: document.getElementById('diabetes').checked,
        cancer: document.getElementById('cancer').checked,
        alzheimers: document.getElementById('alzheimers').checked
    };
    const response = await fetch(`/calculateRisk`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });
    const result = await response.text();
    document.getElementById('totalRiskResult').innerHTML = result;
    
}