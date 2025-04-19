const chatsData = {
    1: {
        name: "Анна Петрова",
        avatar: "АП",
        status: "online",
        messages: [
            { text: "Привет! Как дела?", time: "10:25", incoming: true },
            { text: "Давно не виделись...", time: "10:25", incoming: true },
            { text: "Привет! Все отлично, спасибо!", time: "10:28", incoming: false },
            { text: "Как твои дела?", time: "10:28", incoming: false }
        ]
    },
    2: {
        name: "Павел Сидоров",
        avatar: "ПС",
        status: "был в сети 2 часа назад",
        messages: [
            { text: "Привет, как продвигается проект?", time: "Вчера, 18:45", incoming: true },
            { text: "Готовы к завтрашней встрече?", time: "Вчера, 18:46", incoming: true },
            { text: "Да, все готово. Завтра все обсудим", time: "Вчера, 19:30", incoming: false }
        ]
    },
    3: {
        name: "Мария Козлова",
        avatar: "МК",
        status: "была в сети вчера",
        messages: [
            { text: "Отправила тебе файлы по проекту", time: "Пн, 14:20", incoming: true },
            { text: "Спасибо, посмотрю сегодня вечером", time: "Пн, 15:45", incoming: false }
        ]
    },
    4: {
        name: "Рабочая группа",
        avatar: "РГ",
        status: "5 участников",
        messages: [
            { text: "Кто-нибудь может помочь с отчетом?", time: "12 апр, 10:15", incoming: true, sender: "Ольга" },
            { text: "Я могу помочь после обеда", time: "12 апр, 10:30", incoming: true, sender: "Алексей" },
            { text: "Я закончил свою часть работы", time: "12 апр, 12:45", incoming: true, sender: "Алексей" },
            { text: "Отлично, спасибо!", time: "12 апр, 13:20", incoming: false }
        ]
    },
    5: {
        name: "Дмитрий Васнецов",
        avatar: "ДВ",
        status: "был в сети 5 апр",
        messages: [
            { text: "Привет, ты не мог бы помочь мне с настройкой?", time: "4 апр, 16:10", incoming: true },
            { text: "Конечно, в чем проблема?", time: "4 апр, 16:45", incoming: false },
            { text: "Спасибо за помощь!", time: "5 апр, 11:20", incoming: true }
        ]
    },
    6: {
        name: "Ольга Лебедева",
        avatar: "ОЛ",
        status: "была в сети 3 апр",
        messages: [
            { text: "Когда сможешь подойти?", time: "3 апр, 09:15", incoming: true },
            { text: "Думаю после обеда, часов в 14", time: "3 апр, 09:30", incoming: false }
        ]
    }
};

// Элементы DOM
const chatsList = document.getElementById('chatsList');
const chatWindow = document.getElementById('chatWindow');
const backButton = document.getElementById('backButton');
const currentChatName = document.getElementById('currentChatName');
const currentChatAvatar = document.getElementById('currentChatAvatar');
const currentChatStatus = document.getElementById('currentChatStatus');
const chatMessages = document.getElementById('chatMessages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');

const sidebarToggle = document.getElementById('sidebarToggle');
const sidebar = document.querySelector('.sidebar');

sidebarToggle.addEventListener('click', function() {
    sidebar.classList.toggle('collapsed');
});

// Текущий открытый чат
let currentChatId = null;

// Обработка клика по чату
document.querySelectorAll('.chat-item').forEach(item => {
    item.addEventListener('click', function() {
        const chatId = this.getAttribute('data-chat-id');
        openChat(chatId);
        
        // Помечаем как прочитанное
        const unreadCount = this.querySelector('.unread-count');
        if (unreadCount) {
            unreadCount.style.display = 'none';
        }
    });
});

// Функция открытия чата
function openChat(chatId) {
    currentChatId = chatId;
    const chat = chatsData[chatId];
    
    // Обновляем заголовок чата
    currentChatName.textContent = chat.name;
    currentChatAvatar.textContent = chat.avatar;
    currentChatStatus.textContent = chat.status;
    
    // Очищаем и заполняем сообщения
    chatMessages.innerHTML = '';
    chat.messages.forEach(msg => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${msg.incoming ? 'incoming' : 'outgoing'}`;
        
        if (msg.sender) {
            const senderSpan = document.createElement('span');
            senderSpan.className = 'message-sender';
            senderSpan.textContent = msg.sender + ': ';
            messageDiv.appendChild(senderSpan);
        }
        
        const textSpan = document.createElement('span');
        textSpan.className = 'message-text';
        textSpan.textContent = msg.text;
        messageDiv.appendChild(textSpan);
        
        const timeSpan = document.createElement('span');
        timeSpan.className = 'message-time';
        timeSpan.textContent = msg.time;
        messageDiv.appendChild(timeSpan);
        
        chatMessages.appendChild(messageDiv);
    });
    
    // Прокручиваем вниз
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Показываем окно чата и скрываем список
    chatWindow.style.display = 'grid';
    chatsList.style.display = 'none';
}

// Обработка кнопки "Назад"
backButton.addEventListener('click', function() {
    chatWindow.style.display = 'none';
    chatsList.style.display = 'block';
});

// Обработка кнопки нового чата
document.querySelector('.new-chat-btn').addEventListener('click', function() {
    console.log('Создание нового чата');
    // Здесь можно открыть модальное окно для выбора контакта
});

// Отправка сообщения
sendButton.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

function sendMessage() {
    const text = messageInput.value.trim();
    if (text && currentChatId) {
        // В реальном приложении здесь будет отправка на сервер
        const now = new Date();
        const time = now.getHours() + ':' + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
        
        // Добавляем сообщение в интерфейс
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message outgoing';
        
        const textSpan = document.createElement('span');
        textSpan.className = 'message-text';
        textSpan.textContent = text;
        messageDiv.appendChild(textSpan);
        
        const timeSpan = document.createElement('span');
        timeSpan.className = 'message-time';
        timeSpan.textContent = time;
        messageDiv.appendChild(timeSpan);
        
        chatMessages.appendChild(messageDiv);
        messageInput.value = '';
        
        // Прокручиваем вниз
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // В реальном приложении здесь будет сохранение сообщения
        chatsData[currentChatId].messages.push({
            text: text,
            time: time,
            incoming: false
        });
    }
}

// Поиск чатов
document.querySelector('.search-bar input').addEventListener('input', function(e) {
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