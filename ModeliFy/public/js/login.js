document.addEventListener('DOMContentLoaded',function(){
    const loginForm = document.getElementById('login-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const errorEmail = document.getElementById('errorEmail');
    const errorPassword = document.getElementById('errorPassword');

    loginForm.addEventListener('submit', function(event){
        event.preventDefault();
        validateForm();
    })

    emailInput.addEventListener('blur', function(){
        validateEmail();
    })

    emailInput.addEventListener('change', function(){
        clearError(errorEmail);
    })

    passwordInput.addEventListener('change', function(){
        clearError(errorPassword);
    })

    function validateForm(){
        const isValidEmail = validateEmail();
        const isValidPassword = validatePassword();

        if(isValidEmail && isValidPassword){
            saveToLocalStorage();
            alert('Has ingresado con exito');
        }
    }

    function validateEmail(){
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const emailValue = emailInput.value.trim();

        if(!emailRegex.test(emailValue)){
            showError(errorEmail, 'Ingrese un email valido');
    
            return false;
        }

        return true;
    }

    function validatePassword(){
        const passwordValue = passwordInput.value.trim();

        if(passwordValue.length < 8){
            showError(errorPassword, 'Ingrese una contraseña valida');
            return false;
        }

        return true;
    }

    function showError(errorElement, message){
        errorElement.innerHTML = message;
        errorElement.style.display = 'block';
    }

    function clearError(errorElement){
        errorElement.innerHTML = '';
        errorElement.style.display = 'none';
    }

    function saveToLocalStorage(){
        const emailValue = emailInput.value.trim();
        localStorage.setItem('email', emailValue);
        const body = bodyBuilderJSON();
        console.log(body);
        
    }

    function bodyBuilderJSON(){
        return {
            "email": emailInput.value ,
            "password": passwordInput.value ,
        }
    }

})