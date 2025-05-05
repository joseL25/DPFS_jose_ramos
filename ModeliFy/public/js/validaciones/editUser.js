window.onload = ()=>{
    const form = document.querySelector('form');
    const errorsList = document.querySelector('.errors');

    form.onsubmit = (e)=>{
        errorsList.innerHTML = '';
        // e.preventDefault();
        const name = form.name.value.trim();
        const lastname = form.lastname.value.trim();
        const email = form.email.value.trim();
        const password = form.password.value.trim();
        
        let errors = [];

        if(validator.isEmpty(name)){
            errors.push('Nombre: Credencial Incorrecta');
        }
        if(validator.isEmpty(lastname)){
            errors.push('Apellido: Credencial Incorrecta');
        }

        if(!validator.isEmail(email)){
            errors.push('Email: Credencial Incorrecta');
        }

        if(validator.isEmpty(password)){
            errors.push('Password: Credencial Incorrecta');
        }

        if(!validator.isLength(password, {min: 6})){
            errors.push('Password: Debe tener al menos 6 caracteres');
        }

        if(errors.length >0){
            errorsList.classList.add('display-errors');
            e.preventDefault();
            errors.forEach(err => {
                errorsList.innerHTML += `<li>${err}</li>`;
            });
        }
    }
}
