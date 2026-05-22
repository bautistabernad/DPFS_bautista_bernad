window.addEventListener('load', function () {
    const form = document.querySelector('.auth-form');

    form.addEventListener('submit', function (event) {
        let errors = [];

        const email = document.querySelector('input[name="email"]');
        const password = document.querySelector('input[name="password"]');

        document.querySelectorAll('.front-error').forEach(error => error.remove());

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