 // Данные сообщений (в реальном приложении будут приходить с сервера)
 const messagesData = {
    1: [
        { text: "Привет! Как дела?", sender: "Иван Петров", time: "10:30", incoming: true },
        { text: "Привет! Все отлично, спасибо!", sender: "Вы", time: "10:32", incoming: false },
        { text: "Что нового?", sender: "Иван Петров", time: "10:33", incoming: true },
        { text: "Ничего особенного", sender: "Вы", time: "10:35", incoming: false },
        { text: "Давно не виделись", sender: "Иван Петров", time: "10:36", incoming: true },
        { text: "Да, нужно встретиться", sender: "Вы", time: "10:40", incoming: false },
        { text: "Как насчет пятницы?", sender: "Иван Петров", time: "10:41", incoming: true }
    ],
    2: [
        { text: "Давай встретимся завтра", sender: "Анна Сидорова", time: "09:15", incoming: true },
        { text: "Хорошо, в какое время?", sender: "Вы", time: "09:20", incoming: false },
        { text: "В 18:00 в кафе", sender: "Анна Сидорова", time: "09:22", incoming: true }
    ],
    3: [
        { text: "Я закончил задачу", sender: "Алексей", time: "15:45", incoming: true },
        { text: "Отлично, спасибо!", sender: "Вы", time: "15:50", incoming: false },
        { text: "Когда будет следующий этап?", sender: "Мария", time: "16:00", incoming: true },
        { text: "В понедельник обсудим", sender: "Вы", time: "16:05", incoming: false }
    ],
    4: [
        { text: "Отправила тебе файлы", sender: "Мария Козлова", time: "11:20", incoming: true },
        { text: "Получил, спасибо!", sender: "Вы", time: "11:25", incoming: false }
    ],
    5: [
        { text: "Спасибо за помощь!", sender: "Дмитрий Васнецов", time: "14:10", incoming: true },
        { text: "Всегда пожалуйста", sender: "Вы", time: "14:15", incoming: false }
    ],
    6: [
        { text: "Когда сможешь подойти?", sender: "Ольга Лебедева", time: "13:05", incoming: true },
        { text: "После обеда", sender: "Вы", time: "13:10", incoming: false }
    ]
};

// Обработка выбора чата
document.querySelectorAll('.chat-item').forEach(item => {
    item.addEventListener('click', function() {
        // Убираем выделение у всех чатов
        document.querySelectorAll('.chat-item').forEach(i => {
            i.classList.remove('active');
        });
        
        // Добавляем выделение текущему чату
        this.classList.add('active');
        
        // Получаем ID чата
        const chatId = this.getAttribute('data-chat-id');
        
        // Обновляем заголовок
        const chatName = this.querySelector('.chat-name').textContent;
        const chatAvatar = this.querySelector('.chat-avatar').textContent;
        
        document.getElementById('currentChatName').textContent = chatName;
        document.getElementById('currentChatAvatar').textContent = chatAvatar;
        document.getElementById('currentChatStatus').textContent = "online";
        
        // Активируем поле ввода
        document.getElementById('messageInput').disabled = false;
        
        // Загружаем сообщения
        loadMessages(chatId);
    });
});

// Функция загрузки сообщений
function loadMessages(chatId) {
    const messagesContent = document.getElementById('messagesContent');
    messagesContent.innerHTML = '';
    
    if (messagesData[chatId]) {
        messagesData[chatId].forEach(msg => {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message message-${msg.incoming ? 'incoming' : 'outgoing'}`;
            
            if (msg.incoming) {
                const senderDiv = document.createElement('div');
                senderDiv.className = 'message-sender';
                senderDiv.textContent = msg.sender;
                messageDiv.appendChild(senderDiv);
            }
            
            const textDiv = document.createElement('div');
            textDiv.className = 'message-text';
            textDiv.textContent = msg.text;
            messageDiv.appendChild(textDiv);
            
            const timeDiv = document.createElement('div');
            timeDiv.className = 'message-time';
            timeDiv.textContent = msg.time;
            messageDiv.appendChild(timeDiv);
            
            messagesContent.appendChild(messageDiv);
        });
        
        // Прокручиваем вниз
        messagesContent.scrollTop = messagesContent.scrollHeight;
    }
}

// Обработка отправки сообщения
document.getElementById('messageInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        const messageText = this.value.trim();
        if (messageText) {
            // В реальном приложении здесь будет отправка на сервер
            const activeChat = document.querySelector('.chat-item.active');
            if (activeChat) {
                const chatId = activeChat.getAttribute('data-chat-id');
                
                // Добавляем сообщение в локальные данные
                const newMessage = {
                    text: messageText,
                    sender: "Вы",
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    incoming: false
                };
                
                if (!messagesData[chatId]) {
                    messagesData[chatId] = [];
                }
                
                messagesData[chatId].push(newMessage);
                
                // Обновляем UI
                loadMessages(chatId);
                
                // Очищаем поле ввода
                this.value = '';
            }
        }
    }
});