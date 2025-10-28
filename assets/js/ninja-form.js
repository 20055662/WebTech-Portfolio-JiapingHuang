// variables
const barcodeCheckbox = document.querySelector('input[name="barcodeApiRoute"]');
const validateCheckbox = document.querySelector('input[name="validateEmailApiRoute"]');
const userInput = document.getElementById('user-input');
const submitButton = document.getElementById('submitButton');
const apiResponse = document.getElementById('apiResponse');
const API_KEY = "ARzAAMIqMnGOJRMOK29ftw==Hs7rW84l2cOIMmgi";


function checkboxclick(clicked)
{
    //only one check box can be selected
    if (clicked === 'barcode')
        {
            validateCheckbox.checked = false;
        } 
    else if (clicked === 'validate') 
        {
            barcodeCheckbox.checked = false;
        }

    //clear input and response
    userInput.value = '';
    apiResponse.textContent = 'enter your input for a result';
}

// Checkbox events
barcodeCheckbox.addEventListener
(
    'click', function()
    {
        checkboxclick('barcode');
    }
);

validateCheckbox.addEventListener
(
    'click', function()
    {
        checkboxclick('validate');
    }
);

//submitButton events
submitButton.addEventListener
(
    'click', function()
    {
        apiResponse.textContent = '';
        const inputValue = userInput.value.trim();
        //input validation
        if (!barcodeCheckbox.checked && !validateCheckbox.checked)
            {
                apiResponse.textContent = 'plese select an API route';
                return;
            }
        
        if (!inputValue)
            {
                apiResponse.textContent = 'please enter text to generate a barcode or enter an email to check validation.';
                return;
            }

    //building API URL
    let url = '';
    if (barcodeCheckbox.checked)
        {
             url = 'https://api.api-ninjas.com/v1/barcodegenerate?text=${encodeURIComponent(inputValue)}';
        }
    else if (validateCheckbox.checked)
        {
              url= 'https://api.api-ninjas.com/v1/validateemail?email=${encodeURIComponent(inputValue)}';
        }

    //Fetch API data
    fetch
    (
        url,
        {
            method: 'GET',
            headers:{'X-Api-Key':API_KEY}
        }
    )
    .then
    (
        function(response)
        {
            if(!response.ok)
                {
                    return response.text()
                    .then(function(text)
                    {
                        throw new Error
                        (
                            'Error:' +(text || response.statusText)
                        );
                    }   );
                }
        
            if (barcodeCheckbox.checked)
                {
                    return response.blob();
                }
            else
                {
                    return response.jason();
                }
        }
    )

    .then(function (data)
    {
        if(barcodeCheckbox.checked)
        {
            const imgUrl = URL.createObjectURL(data);
            apiResponse.innerHTML ='<img src="'+ imgUrl +'" alt="Generate Barcode">';
        }
        else
        {
            apiResponse.textContent = JSON.stringify(data, null, 2);
        }
    })
    .catch(function(error)
    {
        apiResponse.textContent= 'Network or API Error:' +error.message;
    });
        
});
