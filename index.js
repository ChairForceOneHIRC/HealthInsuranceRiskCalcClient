
// Function to calculate risk
async function calcRisk() {
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

    // Validate user input
    const validationErrors = validateInput(userData);
    if (validationErrors.length > 0) {
        displayErrors(validationErrors);
        return;
    }

    // Generate summary
    const summary = generateSummary(userData);

    // Update HTML to display summary
    document.getElementById('summary').innerHTML = summary;

    // Send request to calculate risk
    const queryParams = new URLSearchParams(userData).toString();
    const response = await fetch(`http://localhost:3000/calculateRisk?${queryParams}`);
    const result = await response.json();
    // Update HTML to display results
    document.getElementById('BMI').innerHTML = "BMI : " + result.BMI;
    document.getElementById('totalRiskResult').innerHTML = "Total risk: " + result.riskCategory;
}

// Function to validate user input
function validateInput(userData) {
    const errors = [];

     // Reset borders to default after 
     document.getElementById('age').style.border = '1px solid #ced4da';
     document.getElementById('weight').style.border = '1px solid #ced4da';
     document.getElementById('feet').style.border = '1px solid #ced4da';
     document.getElementById('inches').style.border = '1px solid #ced4da';
     document.getElementById('systolic_bp').style.border = '1px solid #ced4da';
     document.getElementById('diastolic_bp').style.border = '1px solid #ced4da';

    // Check if any of the required fields are blank
    if (userData.age.trim() === '') {
        errors.push("Age is required.");
        document.getElementById('age').style.border = '2px solid red';
    }

    if (userData.weight.trim() === '') {
        errors.push("Weight is required.");
        document.getElementById('weight').style.border = '2px solid red';
    }

    if (userData.feet.trim() === '') {
        errors.push("Height (feet) is required.");
        document.getElementById('feet').style.border = '2px solid red';
    }

    if (userData.inches.trim() === '') {
        errors.push("Height (inches) is required.");
        document.getElementById('inches').style.border = '2px solid red';
    }

    if (userData.systolic_bp.trim() === '') {
        errors.push("Systolic Blood Pressure is required.");
        document.getElementById('systolic_bp').style.border = '2px solid red';
    }

    if (userData.diastolic_bp.trim() === '') {
        errors.push("Diastolic Blood Pressure is required.");
        document.getElementById('diastolic_bp').style.border = '2px solid red';
    }

    if (userData.feet < 2 ) {
        errors.push("Minimum height should be 2 feet.");
        document.getElementById('feet').style.border = '2px solid red';
    }

    // we can add more validation rules here for other fields

    return errors;
}


// Function to generate summary
function generateSummary(userData) {
    let summary = `<strong>Summary:</strong><br>`;
    summary += `Age: ${userData.age} years<br>`;
    summary += `Weight: ${userData.weight} lbs<br>`;
    summary += `Height: ${userData.feet} feet ${userData.inches} inches<br>`;
    summary += `Systolic Blood Pressure: ${userData.systolic_bp}<br>`;
    summary += `Diastolic Blood Pressure: ${userData.diastolic_bp}<br>`;
    summary += `Family Diseases: ${userData.diabetes ? 'Diabetes ' : ''}${userData.cancer ? 'Cancer ' : ''}${userData.alzheimers ? 'Alzheimer\'s' : ''}<br>`;
    return summary;
}

// Function to display error messages
function displayErrors(errors) {
    errors.forEach(error => {
        alert(error); // You can replace this with any other method to display errors on the page
    });
}