function onClickButtonLogin() {
    let inputUsuario = document.getElementById('usuario');
    let inputSenha = document.getElementById('senha');

    if (inputUsuario.value == 'user' && inputSenha.value == 'pass') {
        alert('Login Ok');
    } else {
        alert('Login failed');
        inputUsuario.classList.add('userPassFail');
        inputSenha.classList.add('userPassFail');
    }
}