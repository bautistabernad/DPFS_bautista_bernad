window.addEventListener('load', function () {
    const form = document.querySelector('.auth-form');

    form.addEventListener('submit', function (event) {
        let errors = [];

        const firstName = document.querySelector('input[name="firstName"]');
        const lastName = document.querySelector('input[name="lastName"]');
        const email = document.querySelector('input[name="email"]');
        const password = document.querySelector('input[name="password"]');
        const image = document.querySelector('input[name="image"]');

        document.querySelectorAll('.front-error').forEach(error => error.remove());

        if (firstName.value.trim() === '') {
            errors.push({
                input: firstName,
                message: 'El nombre es obligatorio'
            });
        } else if (firstName.value.trim().length < 2) {
            errors.push({
                input: firstName,
                message: 'El nombre debe tener al menos 2 caracteres'
            });
        }

        if (lastName.value.trim() === '') {
            errors.push({
                input: lastName,
                message: 'El apellido es obligatorio'
            });
        } else if (lastName.value.trim().length < 2) {
            errors.push({
                input: lastName,
                message: 'El apellido debe tener al menos 2 caracteres'
            });
        }

        if (email.value.trim() === '') {
            errors.push({
                input: email,
                message: 'El email es obligatorio'
            });
        } else if (!email.value.includes('@') || !email.value.includes('.')) {
            errors.push({
                input: email,
                message: 'Debes ingresar un email válido'
            });
        }

        if (password.value.trim() === '') {
            errors.push({
                input: password,
                message: 'La contraseña es obligatoria'
            });
        } else if (password.value.length < 8) {
            errors.push({
                input: password,
                message: 'La contraseña debe tener al menos 8 caracteres'
            });
        }

        if (image.value !== '') {
            const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;

            if (!allowedExtensions.exec(image.value)) {
                errors.push({
                    input: image,
                    message: 'La imagen debe ser JPG, JPEG, PNG o GIF'
                });
            }
        }

        if (errors.length > 0) {
            event.preventDefault();

            errors.forEach(error => {
                const small = document.createElement('small');
                small.classList.add('form-error', 'front-error');
                small.innerText = error.message;

                error.input.insertAdjacentElement('afterend', small);
            });
        }
    });
});