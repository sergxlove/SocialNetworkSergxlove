// Обработка клика по чату
document.querySelectorAll('.chat-item').forEach(item => {
    item.addEventListener('click', function () {
        // Здесь можно добавить переход в конкретный чат
        console.log('Переход в чат с ' + this.querySelector('.chat-name').textContent);

        // Помечаем как прочитанное
        const unreadCount = this.querySelector('.unread-count');
        if (unreadCount) {
            unreadCount.style.display = 'none';
        }
    });
});

// Обработка кнопки нового чата
document.querySelector('.new-chat-btn').addEventListener('click', function () {
    console.log('Создание нового чата');
    // Здесь можно открыть модальное окно для выбора контакта
});

// Поиск чатов
document.querySelector('.search-bar input').addEventListener('input', function (e) {
    const searchTerm = e.target.value.toLowerCase();
    document.querySelectorAll('.chat-item').forEach(item => {
        const chatName = item.querySelector('.chat-name').textContent.toLowerCase();
        const chatPreview = item.querySelector('.chat-preview').textContent.toLowerCase();

        if (chatName.includes(searchTerm) || chatPreview.includes(searchTerm)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
});