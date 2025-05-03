const submitFunction = (event)=>{
    if(!validarFormulario()){
        event.preventDefault();
    } else{
        event.preventDefault();

        alert(
            'Los datos enviados fueron: \n'+
            'nombre: ' + document.getElementById('name').value + '\n'+
            'apellido: ' + document.getElementById('lastname').value + '\n'+
            'correo: ' + document.getElementById('email').value + '\n' 
        );
    }
}

document.getElementById('formulario').addEventListener('submit', submitFunction);

// esto valida los campos de texto
function validarFormulario(){
    let camposTexto = document.querySelectorAll('input[type="text"]');
    let validacionCorrecta = true;

    camposTexto.forEach(campo => {
        let errorCampo = document.getElementById('error' + campo.id.charAt(0).toUpperCase() + campo.id.slice(1));
        if(campo.value.length == ''){
            mostrarError(errorCampo, '¡Este campo es requerido!');
            validacionCorrecta = false;
        } else if(campo.value.length > 0 && campo.value.length < 3){
            mostrarError(errorCampo, '¡Este campo debe tener al menos 3 caracteres');
            validacionCorrecta = false;
        } else{
            ocultarError(errorCampo);
        }
    });

    //esto valida el campo email
    const email = document.getElementById("email");
    let errorEmail = document.getElementById("errorEmail");

    if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)){// este regex valida que el formato de email sea valido
        ocultarError(errorEmail);
    } else{
        mostrarError(errorEmail, "¡Ingrese un correo electronico valido!")
        validacionCorrecta = false
    }

    const password = document.getElementById("password");
    let errorPassword = document.getElementById("errorPassword");

    if(password.value == ''){
        mostrarError(errorPassword, "Ingrese una contraseña");
        validacionCorrecta = false
    } else if(password.value.length < 10){
        mostrarError(errorPassword, "la contraseña debe tener mas de 10 caracteres");
        validacionCorrecta = false
    }else{
        ocultarError(errorPassword);
    }

    return validacionCorrecta

}

const mostrarError = (elemento, mensaje)=>{
    elemento.textContent = mensaje;
    elemento.style.display = "block";
}

const ocultarError = (elemento)=>{
    elemento.textContent = '';
    elemento.style.display = "none";
}