// variables
const passwordCheckbox = document.querySelector('input[name="passwordApiRoute"]');
const validateCheckbox = document.querySelector('input[name="validateEmailApiRoute"]');
const userInput = document.getElementById('user-input');
const submitButton = document.getElementById('submitButton');
const apiResponse = document.getElementById('apiResponse');
const API_KEY = "ARzAAMIqMnGOJRMOK29ftw==Hs7rW84l2cOIMmgi";


function checkboxclick(clicked)
{
    //only one check box can be selected
    if (clicked === 'password')
        {
            validateCheckbox.checked = false;
        } 
    else if (clicked === 'validate') 
        {
            passwordCheckbox.checked = false;
        }

    //clear input and response
    userInput.value = '';
    apiResponse.textContent = 'enter your input for a result';
}

// Checkbox events
passwordCheckbox.addEventListener
(
    'click', function()
    {
        checkboxclick('password');
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
        if (!passwordCheckbox.checked && !validateCheckbox.checked)
            {
                apiResponse.textContent = 'plese select an API route';
                return;
            }
        

    //building API URL
    let url = '';
    if (passwordCheckbox.checked)
        {
            let passwordLength ='';
            if(inputValue)
            {
                const lengthNum =parseInt(inputValue);
                if (isNaN(lengthNum)|| lengthNum <= 0)
                {
                    apiResponse.textContent = 'please enter length of password';
                    return;
                }
                passwordLength = `?length=${lengthNum}`;
            }
             url = `https://api.api-ninjas.com/v1/passwordgenerator${passwordLength}`;
        }
    else if (validateCheckbox.checked)
        {
            if (!inputValue)
            {
                apiResponse.textContent = 'please enter an email to check validation';
                return;
            }
              url= `https://api.api-ninjas.com/v1/validateemail?email=${encodeURIComponent(inputValue)}`;
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
                return response.json();
        
        }
    )

    .then(function (data)
    {
        if(passwordCheckbox.checked)
        {
            apiResponse.textContent =`Generated Password: ${data.random_password}`;
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
