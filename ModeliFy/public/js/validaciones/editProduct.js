window.onload = ()=>{
    const form = document.querySelector('.form-dat');
    const errorsList = document.querySelector('.errors');

    form.onsubmit = (e)=>{
        errorsList.innerHTML = '';
        // e.preventDefault();
        const name = form.name.value.trim();
        const description = form.description.value.trim();
        const price = form.price.value.trim();
        const category = form.category.value.trim();
        const file = form.file.value.trim();
        
        let errors = [];

        if(validator.isEmpty(name)){
            errors.push('Nombre: Debe ingresar el nombre del modelo');
        }
        if(validator.isEmpty(description)){
            errors.push('Descripcion: Debe ingresar la descripcion del modelo');
        }
        if(!validator.isLength(description, {min: 20})){
            errors.push('Descripcion: Debe tener al menos 20 caracteres');
        }
        if(validator.isEmpty(price)){
            errors.push('Precio: Debe ingresar un precio');
        }
        if(validator.isEmpty(category)){
            errors.push('Categoria: Debe seleccionar el tipo de modelo');
        }
        if(validator.isEmpty(file)){
            errors.push('Archivo: Debe selecionar el archivo de su modelo');
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