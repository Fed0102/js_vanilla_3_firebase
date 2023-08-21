export const getAuthForm = () => {
    return `
    <form class="mui-form" id="auth-form">
        <div class="mui-textfield mui-textfield--float-label">
            <input type="email"
                   id="email"
            >
            <label for="email">Email</label>
        </div>
        <div class="mui-textfield mui-textfield--float-label">
            <input type="password"
                   id="password"
            >
            <label for="password">Password</label>
        </div>
        <button type="submit"
                class="mui-btn mui-btn--raised mui-btn--primary"
        >
            Login
        </button>
    </form>
    `
}

export const authWithEmailAndPassword = (email, password) => {
    const API_KEY = 'AIzaSyAIkJeYQ2BO_xl0YzHbGajs_h797OALoVo';
    return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`, {
        method: 'POST',
        body: JSON.stringify({
            email,
            password,
            returnSecureToken: true
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => data.idToken)
}