/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
    /**
     * Запускает initAuthLinks и initToggleButton
     * */
    static init() {
        this.initAuthLinks();
        this.initToggleButton();
    }

    /**
     * Отвечает за скрытие/показа боковой колонки:
     * переключает два класса для body: sidebar-open и sidebar-collapse
     * при нажатии на кнопку .sidebar-toggle
     * */
    static initToggleButton() {
        const sidebarToggle = document.querySelector('.sidebar-toggle');
        const bodyApp = document.querySelector('.app');
        sidebarToggle.addEventListener('click', () => {
            if (bodyApp.classList.contains('sidebar-open')) {
                bodyApp.classList.remove('sidebar-open');
                bodyApp.classList.remove('sidebar-collapse');
            } else {
                bodyApp.classList.add('sidebar-open');
                bodyApp.classList.add('sidebar-collapse');
            };
        });
    }

    /**
     * При нажатии на кнопку входа, показывает окно входа
     * (через найденное в App.getModal)
     * При нажатии на кнопку регастрации показывает окно регистрации
     * При нажатии на кнопку выхода вызывает User.logout и по успешному
     * выходу устанавливает App.setState( 'init' )
     * */
    static initAuthLinks() {
        const itemRegister = document.querySelector('.menu-item_register');
        const itemLogin = document.querySelector('.menu-item_login');
        const itemLogout = document.querySelector('.menu-item_logout');

        itemRegister.addEventListener('click', (e) => {
            e.preventDefault();
            let modal = App.getModal('register');
            modal.open();
        });
        itemLogin.addEventListener('click', (e) => {
            e.preventDefault();
            let modal = App.getModal('login');
            modal.open();
        });
        itemLogout.addEventListener('click', (e) => {
            e.preventDefault();
            User.logout(() => {
                App.setState('init');
                User.unsetCurrent();
            });
        });
    }
}