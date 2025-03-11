const form = document.getElementById('form')
const username_input = document.getElementById('input-username')
const email_input = document.getElementById('input-email')
const password_input = document.getElementById('input-password')
const repeat_password_input = document.getElementById('input-repeat-password')
const error_message = document.getElementById('error-message')

form.addEventListener('submit',(e)=>{
    // e.preventDefault()

    let errors=[]
    //to identify the page either sigup or login
    if(username_input)
    {
        //we are in signup page
        errors=getSignupFromErrors(username_input.value, email_input.value, password_input.value, repeat_password_input.value)
    }
    else
    {
        //login page
        errors=getLoginFormErrors(email_input.value, password_input.value)
    }

    if(errors.length>0)
    {
        //if there are any errors
        e.preventDefault()
        error_message.innerText = errors.join(". ")
    }
})

function getSignupFromErrors(username, email, password, repeatPassword)
{
    let errors=[]

    if(username==='' || username==null)
    {
        errors.push('username is required')
        username_input.parentElement.classList.add('incorrect')
    }
    if(email==='' || email==null)
    {
        errors.push('email is required')
        email_input.parentElement.classList.add('incorrect')
    }
    if(password==='' || password==null)
    {
        errors.push('password is required')
        password_input.parentElement.classList.add('incorrect')
    }

    if(password.length < 8)
    {
        errors.push('Password must have at least 8 characters')
        //to indicate color
        password_input.parentElement.classList.add('incorrect')
    }

    //for checking repeat password
    if(password != repeatPassword)
    {
        errors.push('Password does not match with repeatPassword')
        password_input.parentElement.classList.add('incorrect')
        repeat_password_input.parentElement.classList.add('incorrect')
    }

    return errors;
}

function getLoginFormErrors(email, password)
{
    let errors = []

    if(email==='' || email==null)
    {
        errors.push('email is required')
        email_input.parentElement.classList.add('incorrect')
    }
    if(password==='' || password==null)
    {
        errors.push('password is required')
        password_input.parentElement.classList.add('incorrect')
    }
    

    return errors
}

const allInputs = [username_input, email_input, password_input, repeat_password_input].filter(input != null)

allInputs.forEach(input => {
    input.addEventListener('input',() =>{
        if(input.addEventListener.classList.contains('incorrect'))
        {
            input.parentElement.classList.remove("incorrect")
            error_message.innerText=''
        }
    })
}) 