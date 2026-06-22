// ===== БАЗА ЗНАНИЙ =====
const CATEGORIES = [
    { id: 1, name: 'Солнечная система', icon: '🌞' },
    { id: 2, name: 'Звёзды и созвездия', icon: '⭐' },
    { id: 3, name: 'Галактики', icon: '🌌' },
    { id: 4, name: 'Космические явления', icon: '💫' },
    { id: 5, name: 'История астрономии', icon: '📜' },
    { id: 6, name: 'Космические исследования', icon: '🚀' },
    { id: 7, name: 'Астрофизика', icon: '🔬' },
    { id: 8, name: 'Космические загадки', icon: '🕳️' },
    { id: 9, name: 'Наблюдения', icon: '🔭' },
    { id: 10, name: 'Космическая техника', icon: '🛰️' }
];

// Генерация статей (по 5 на категорию = 50 статей)
const ARTICLES = [];
for (let catId = 1; catId <= 10; catId++) {
    for (let i = 1; i <= 5; i++) {
        const catName = CATEGORIES.find(c => c.id === catId).name;
        ARTICLES.push({
            id: ARTICLES.length + 1,
            category_id: catId,
            title: `Тема ${i} в категории ${catName}`,
            content: `🌟 Это увлекательная статья о космосе!\n\n` +
                    `✨ Тема: ${catName}\n` +
                    `🔭 Узнай много нового о космосе!\n\n` +
                    `📝 Запомни эту информацию и поделись с друзьями!\n\n` +
                    `🚀 Ты делаешь успехи! Продолжай изучать!`
        });
    }
}

// Тестовые вопросы
const TEST_QUESTIONS = [];
for (let catId = 1; catId <= 10; catId++) {
    const qs = [
        { question: 'Как называется наша галактика?', options: ['Млечный Путь', 'Андромеда', 'Треугольник'], correct: 0 },
        { question: 'Какая планета самая большая?', options: ['Юпитер', 'Сатурн', 'Нептун'], correct: 0 },
        { question: 'Сколько планет в Солнечной системе?', options: ['7', '8', '9'], correct: 1 },
        { question: 'Какая звезда ближе всего к Земле?', options: ['Полярная', 'Солнце', 'Сириус'], correct: 1 },
        { question: 'Что такое чёрная дыра?', options: ['Звезда', 'Область с сильной гравитацией', 'Планета'], correct: 1 }
    ];
    qs.forEach(q => {
        TEST_QUESTIONS.push({
            id: TEST_QUESTIONS.length + 1,
            category_id: catId,
            ...q
        });
    });
}

// ===== ПРОГРЕСС =====
function getProgress() {
    const data = localStorage.getItem('astro_progress');
    if (data) return JSON.parse(data);
    const defaultProgress = {
        readArticles: [],
        points: 0,
        level: 1,
        testsPassed: 0,
        achievements: [],
        lastBonusDate: null
    };
    localStorage.setItem('astro_progress', JSON.stringify(defaultProgress));
    return defaultProgress;
}

function saveProgress(p) {
    localStorage.setItem('astro_progress', JSON.stringify(p));
}

function addPoints(amount) {
    const p = getProgress();
    p.points += amount;
    const newLevel = Math.floor(p.points / 100) + 1;
    if (newLevel > p.level) {
        p.level = newLevel;
        p.achievements.push(`🎉 Уровень ${newLevel} достигнут!`);
    }
    saveProgress(p);
    return p;
}

function markRead(articleId) {
    const p = getProgress();
    if (!p.readArticles.includes(articleId)) {
        p.readArticles.push(articleId);
        addPoints(10);
        const count = p.readArticles.length;
        if (count === 5) p.achievements.push('🌱 Первые шаги');
        if (count === 15) p.achievements.push('📚 Знаток планет');
        if (count === 30) p.achievements.push('✨ Звёздный странник');
        if (count === 50) p.achievements.push('🏆 Мастер Вселенной');
        saveProgress(p);
        return true;
    }
    return false;
}

function claimDailyBonus() {
    const p = getProgress();
    const today = new Date().toDateString();
    if (p.lastBonusDate === today) return false;
    p.lastBonusDate = today;
    addPoints(15);
    saveProgress(p);
    return true;
}

function getStats() {
    const p = getProgress();
    return {
        read: p.readArticles.length,
        total: ARTICLES.length,
        points: p.points,
        level: p.level,
        tests: p.testsPassed
    };
}

function getUnread(categoryId) {
    const read = getProgress().readArticles;
    return ARTICLES.filter(a => a.category_id === categoryId && !read.includes(a.id));
}

function getRandomQuestions(categoryId, count = 5) {
    const pool = TEST_QUESTIONS.filter(q => q.category_id === categoryId);
    const shuffled = pool.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

// ===== ИНТЕРФЕЙС =====
let currentCategoryId = null; // ← НОВАЯ ПЕРЕМЕННАЯ для хранения текущей категории

function showPage(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function renderCategories() {
    const container = document.getElementById('categories-list');
    container.innerHTML = '';
    CATEGORIES.forEach(cat => {
        const div = document.createElement('div');
        div.className = 'category-item';
        div.textContent = `${cat.icon} ${cat.name}`;
        div.onclick = () => showArticles(cat.id);
        container.appendChild(div);
    });
    showPage('categories-page');
}

function showArticles(categoryId) {
    currentCategoryId = categoryId; // ← ЗАПОМИНАЕМ КАТЕГОРИЮ
    const cat = CATEGORIES.find(c => c.id === categoryId);
    document.getElementById('category-title').textContent = `${cat.icon} ${cat.name}`;
    const container = document.getElementById('articles-list');
    container.innerHTML = '';
    const read = getProgress().readArticles;
    ARTICLES.filter(a => a.category_id === categoryId).forEach(a => {
        const div = document.createElement('div');
        div.className = 'article-item' + (read.includes(a.id) ? ' read' : '');
        div.textContent = a.title;
        div.onclick = () => showArticle(a.id);
        container.appendChild(div);
    });
    showPage('articles-page');
}

function showArticle(articleId) {
    const a = ARTICLES.find(art => art.id === articleId);
    if (!a) return;
    document.getElementById('article-title').textContent = a.title;
    document.getElementById('article-content').textContent = a.content;
    const btn = document.getElementById('mark-read-btn');
    const read = getProgress().readArticles;
    if (read.includes(articleId)) {
        btn.disabled = true;
        btn.textContent = '✅ Уже прочитано';
    } else {
        btn.disabled = false;
        btn.textContent = '✅ Прочитал (+10 очков)';
        btn.onclick = () => {
            if (markRead(articleId)) {
                btn.disabled = true;
                btn.textContent = '✅ Прочитано! +10 очков';
                // Возвращаемся к списку статей через 0.5 секунды
                setTimeout(() => showArticles(a.category_id), 500);
            }
        };
    }
    showPage('article-page');
}

function showStats() {
    const s = getStats();
    const container = document.getElementById('stats-content');
    container.innerHTML = `
        <div class="stats-line"><span class="stats-label">📖 Прочитано статей</span><span class="stats-value">${s.read} / ${s.total}</span></div>
        <div class="stats-line"><span class="stats-label">⭐️ Уровень</span><span class="stats-value">${s.level}</span></div>
        <div class="stats-line"><span class="stats-label">✨ Очки знаний</span><span class="stats-value">${s.points}</span></div>
        <div class="stats-line"><span class="stats-label">🎓 Пройдено тестов</span><span class="stats-value">${s.tests}</span></div>
        <div class="stats-line"><span class="stats-label">🚀 До следующего уровня</span><span class="stats-value">${100 - (s.points % 100)} очков</span></div>
    `;
    showPage('stats-page');
}

function showAchievements() {
    const p = getProgress();
    const container = document.getElementById('achievements-list');
    if (p.achievements.length === 0) {
        container.innerHTML = '<p>Пока нет достижений. Читай статьи и зарабатывай награды!</p>';
    } else {
        container.innerHTML = p.achievements.map(a => `<div class="achievement-item">${a}</div>`).join('');
    }
    showPage('achievements-page');
}

function startQuiz() {
    let html = '<p>Выбери категорию для теста:</p>';
    CATEGORIES.forEach(cat => {
        const unread = getUnread(cat.id);
        if (unread.length < 2) {
            html += `<button class="quiz-option" style="opacity:0.4;" disabled>${cat.icon} ${cat.name} (нужно прочитать 2 статьи)</button>`;
        } else {
            html += `<button class="quiz-option" onclick="startQuizCategory(${cat.id})">${cat.icon} ${cat.name}</button>`;
        }
    });
    document.getElementById('quiz-content').innerHTML = html;
    showPage('quiz-page');
}

function startQuizCategory(categoryId) {
    const questions = getRandomQuestions(categoryId, 5);
    if (questions.length === 0) {
        alert('В этой категории пока нет вопросов.');
        return;
    }
    
    let current = 0;
    let score = 0;
    let answered = false;
    const container = document.getElementById('quiz-content');

    function renderQuestion() {
        if (current >= questions.length) {
            const p = getProgress();
            p.testsPassed += 1;
            saveProgress(p);
            const points = score * 10;
            addPoints(points);
            
            container.innerHTML = `
                <div class="quiz-result">
                    <p>🎓 Тест завершён!</p>
                    <p>Правильных ответов: ${score} из ${questions.length}</p>
                    <p>➕ Получено очков: ${points}</p>
                    <button class="back-btn" onclick="startQuiz()">🔙 К тестам</button>
                    <button class="back-btn" onclick="showPage('main-menu')">🏠 Главное меню</button>
                </div>
            `;
            return;
        }
        
        const q = questions[current];
        let html = `<p><strong>Вопрос ${current+1} из ${questions.length}</strong></p><p>${q.question}</p>`;
        q.options.forEach((opt, idx) => {
            html += `<button class="quiz-option" data-optindex="${idx}">${opt}</button>`;
        });
        container.innerHTML = html;
        answered = false;
        
        container.querySelectorAll('.quiz-option').forEach(btn => {
            btn.addEventListener('click', function() {
                if (answered) return;
                answered = true;
                const idx = parseInt(this.dataset.optindex);
                const isCorrect = (idx === q.correct);
                if (isCorrect) score++;
                
                const all = container.querySelectorAll('.quiz-option');
                all.forEach((b, i) => {
                    if (i === q.correct) b.classList.add('correct');
                    else if (i === idx && !isCorrect) b.classList.add('wrong');
                    b.disabled = true;
                });
                
                setTimeout(() => {
                    current++;
                    renderQuestion();
                }, 1200);
            });
        });
    }
    renderQuestion();
}

// ===== НАВИГАЦИЯ (исправлено) =====
document.querySelectorAll('[data-target]').forEach(btn => {
    btn.addEventListener('click', function() {
        const target = this.dataset.target;
        if (target === 'main-menu') {
            // Обновляем бонус
            const p = getProgress();
            const today = new Date().toDateString();
            const bonusBtn = document.getElementById('dailyBonus');
            if (p.lastBonusDate === today) {
                bonusBtn.disabled = true;
                bonusBtn.textContent = '🎁 Бонус получен сегодня';
            } else {
                bonusBtn.disabled = false;
                bonusBtn.textContent = '🎁 Ежедневный бонус (+15 очков)';
                bonusBtn.onclick = () => {
                    if (claimDailyBonus()) {
                        bonusBtn.disabled = true;
                        bonusBtn.textContent = '✅ Бонус получен! +15 очков';
                        document.getElementById('greeting').textContent = `У тебя ${getProgress().points} очков! 🚀`;
                    }
                };
            }
            showPage('main-menu');
        } else if (target === 'categories') {
            renderCategories();
        } else if (target === 'articles') {    // ← НОВОЕ УСЛОВИЕ
            if (currentCategoryId) {
                showArticles(currentCategoryId);
            } else {
                // Если категория не сохранена, возвращаемся на главную
                showPage('main-menu');
            }
        } else if (target === 'quiz') {
            startQuiz();
        } else if (target === 'stats') {
            showStats();
        } else if (target === 'achievements') {
            showAchievements();
        }
    });
});

// ===== ЗВЁЗДНЫЙ ФОН =====
function createStars() {
    const container = document.getElementById('stars');
    for (let i = 0; i < 200; i++) {
        const star = document.createElement('div');
        star.style.cssText = `
            position: absolute;
            width: ${Math.random() * 3 + 1}px;
            height: ${Math.random() * 3 + 1}px;
            background: #fff;
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.8 + 0.2};
            animation: twinkle ${2 + Math.random() * 4}s infinite alternate;
        `;
        container.appendChild(star);
    }
}
const style = document.createElement('style');
style.textContent = `@keyframes twinkle { from { opacity: 0.2; } to { opacity: 1; } }`;
document.head.appendChild(style);

// ===== СТАРТ =====
createStars();
const p = getProgress();
document.getElementById('greeting').textContent = `У тебя ${p.points} очков! 🚀`;
