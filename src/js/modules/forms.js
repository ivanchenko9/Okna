import checkNumInputs from './checkNumInputs';

const forms = (state) => {
    const form = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input');
          
    checkNumInputs('input[name="user_phone"]');
    
    const message = {
        loading: "Загрузка...",
        success: "Данные успешно отправлены!",
        failure: "Ошибка при отправке данных!"
    };

    const postData = async (url, data) => {
        document.querySelector('.status').textContent = message.loading;

        let result = await fetch(url, {
            method: "Post",
            body: data
        });

        return await result.text();
    };

    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = "";
        });
    };

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.appendChild(statusMessage);

            const formData = new FormData(item);
            if (item.getAttribute('data-calc') === "end") {
                for (let key in state) {
                    formData.append(key, state[key]);
                }
            }

            postData('assets/server.php', formData)
            .then(result => {
                console.log(result);
                statusMessage.textContent = message.success;
            })
            .catch(() => {statusMessage.textContent = message.failure;})
            .finally(() => {
                clearInputs();
                setTimeout(() => {
                    statusMessage.remove();
                }, 5000);
            });

        });
    });
};

export default forms;