document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
   
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(loginForm);
        console.log(formData.email);

        try {
            const response = await axios.post('http://localhost:3000/api/signin', formData);

            if (response.status === 200) {
                const responseData = response.data;
                if (responseData.redirectTo) {
                    window.location.href = responseData.redirectTo;
                } else {
                    console.error('No redirectTo property in the response.');
                }
            } else {
                console.error('Login failed. Status:', response.status);
            }
        } catch (error) {
            console.error('An error occurred during login:', error);
        }
    });
});
