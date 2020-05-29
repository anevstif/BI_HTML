function validate(data) {
    const { login, password, confirmPassword, license, firstName, gender} = data;
    var setLogin = new Set();
    setLogin.add('beeline');
    setLogin.add('beeinterns');
    setLogin.add('bee');

    if (!login || !password || !firstName) {
        alert('Укажите логин/пароль/имя');
    } else if (password.length < 6) {
        alert('Пароль должен быть длинной не менее 6 символов');
    } else if (password !== confirmPassword) {
        alert('Пароли должны совпадать');
    } else if(setLogin.has(login)){
        alert('Логин занят, введите другой логин');
    } else if (!license) {
        alert('Необходимо согласие');
    } else {
        let temp;
        if (gender == 'male')
            temp = 'ый';
        else 
            temp = 'ая';
        alert(`Уважаем${temp} ${firstName}, заявка создана`);
    }
}
