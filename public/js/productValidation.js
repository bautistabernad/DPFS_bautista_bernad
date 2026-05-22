window.addEventListener('load', function () {
    const form = document.querySelector('.auth-form');

    form.addEventListener('submit', function (event) {
        let errors = [];

        const name = document.querySelector('input[name="name"]');
        const description = document.querySelector('textarea[name="description"]');
        const image = document.querySelector('input[name="image"]');

        document.querySelectorAll('.front-error').forEach(error => error.remove());

        if (name.value.trim() === '') {
            errors.push({
                input: name,
                message: 'El nombre del producto es obligatorio'
            });
        } else if (name.value.trim().length < 5) {
            errors.push({
                input: name,
                message: 'El nombre debe tener al menos 5 caracteres'
            });
        }

        if (description.value.trim() === '') {
            errors.push({
                input: description,
                message: 'La descripción es obligatoria'
            });
        } else if (description.value.trim().length < 20) {
            errors.push({
                input: description,
                message: 'La descripción debe tener al menos 20 caracteres'
            });
        }

        if (image && image.value !== '') {
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