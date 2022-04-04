/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
    static URL = '/user';
    /**
     * Устанавливает текущего пользователя в
     * локальном хранилище.
     * */
    static setCurrent(user) {
        let userId = {
            id: user.id,
            name: user.name
        };
        let data = JSON.stringify(userId);
        localStorage.setItem('user', data);
    }

    /**
     * Удаляет информацию об авторизованном
     * пользователе из локального хранилища.
     * */
    static unsetCurrent() {
        localStorage.removeItem('user');
    }

    /**
     * Возвращает текущего авторизованного пользователя
     * из локального хранилища
     * */
    static current() {
        if (localStorage.user) {
            const current = localStorage.user;
            return JSON.parse(current);
        } else {
            return null;
        }
    }

    /**
     * Получает информацию о текущем
     * авторизованном пользователе.
     * */
    static fetch(callback) {
        createRequest({
            method: 'GET',
            url: this.URL + '/current',
            callback: (err, response) => {
                if (err === null) {
                    callback(err, response);
                    if (response.success) {
                        this.current();
                    } else {
                        this.unsetCurrent();
                        console.log(response.error);
                    }
                }

            }
        });
    }

    /**
     * Производит попытку авторизации.
     * После успешной авторизации необходимо
     * сохранить пользователя через метод
     * User.setCurrent.
     * */
    static login(data, callback) {
        createRequest({
            method: 'POST',
            url: this.URL + '/login',
            data,
            callback: (err, response) => {
                if (err === null) {
                    if (response.success) {
                        this.setCurrent(response.user);
                    } else {
                        console.log(response.error);
                    }
                    callback(err, response);
                }
            }
        });
    }

    /**
     * Производит попытку регистрации пользователя.
     * После успешной авторизации необходимо
     * сохранить пользователя через метод
     * User.setCurrent.
     * */
    static register(data, callback) {
        console.log(data);
        createRequest({
            method: 'POST',
            url: this.URL + '/register',
            data,
            callback: (err, response) => {
                if (err === null) {
                    if (response.success) {
                        this.setCurrent(response.user);
                    } else {
                        console.log(response.error);
                    }
                    callback(err, response);
                }
            }
        })
    }

    /**
     * Производит выход из приложения. После успешного
     * выхода необходимо вызвать метод User.unsetCurrent
     * */
    static logout(callback) {
        createRequest({
            method: 'POST',
            url: this.URL + '/logout',
            callback: () => {
                callback();
            }
        })
    }
}