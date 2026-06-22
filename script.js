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

// ===== СТАТЬИ С РЕАЛЬНЫМ СОДЕРЖАНИЕМ =====
const ARTICLES = [
    // Солнечная система (категория 1)
    { id: 1, category_id: 1, title: 'Что такое Солнечная система?', content: 'Солнечная система — это система, состоящая из Солнца и всех объектов, которые вращаются вокруг него: 8 планет, их спутников, астероидов, комет и метеороидов. Она образовалась около 4,6 миллиардов лет назад из гигантского облака газа и пыли.' },
    { id: 2, category_id: 1, title: 'Планеты Солнечной системы', content: 'В Солнечной системе 8 планет: Меркурий, Венера, Земля, Марс, Юпитер, Сатурн, Уран и Нептун. Первые четыре — планеты земной группы (твёрдые), а последние четыре — газовые гиганты. Самая большая планета — Юпитер, а самая маленькая — Меркурий.' },
    { id: 3, category_id: 1, title: 'Интересные факты о планетах', content: '1. Венера вращается в противоположную сторону.\n2. На Марсе находится самая высокая гора — Олимп (21 км).\n3. Юпитер больше всех планет вместе взятых.\n4. Сатурн имеет более 80 известных спутников.\n5. Уран вращается лёжа на боку.' },
    { id: 4, category_id: 1, title: 'Спутники планет', content: 'Спутники — это небольшие объекты, которые вращаются вокруг планет. У Земли есть Луна. У Марса два спутника — Фобос и Деймос. У Юпитера более 90 спутников, самый большой из которых — Ганимед (больше Меркурия!).' },
    { id: 5, category_id: 1, title: 'Астероиды и кометы', content: 'Астероиды — это каменные объекты, которые вращаются вокруг Солнца. Большинство из них находятся в поясе астероидов между Марсом и Юпитером. Кометы — это «грязные снежки», состоящие из льда и пыли. Когда они приближаются к Солнцу, у них появляется хвост.' },
    
    // Звёзды и созвездия (категория 2)
    { id: 6, category_id: 2, title: 'Что такое звезда?', content: 'Звезда — это огромный шар горячего газа, который излучает свет и тепло. В центре звезды происходят ядерные реакции, которые превращают водород в гелий. Наше Солнце — тоже звезда! Оно находится на расстоянии 150 миллионов километров от Земли.' },
    { id: 7, category_id: 2, title: 'Самые яркие звёзды', content: 'Сириус — самая яркая звезда на ночном небе. Она в 25 раз ярче Солнца и находится на расстоянии 8,6 световых лет. Другие яркие звёзды: Канопус, Арктур, Вега, Капелла и Ригель. Некоторые из них можно увидеть даже в городе.' },
    { id: 8, category_id: 2, title: 'Что такое созвездия?', content: 'Созвездие — это группа звёзд, которые образуют на небе фигуру. Всего на небе 88 созвездий. Самые известные: Большая Медведица, Малая Медведица, Орион, Кассиопея и Лебедь. В разные времена года мы видим разные созвездия.' },
    { id: 9, category_id: 2, title: 'Полярная звезда', content: 'Полярная звезда находится в созвездии Малой Медведицы. Она всегда указывает на север, поэтому её используют для навигации. Полярная звезда находится на расстоянии 433 световых лет от Земли и является пульсирующей переменной звездой.' },
    { id: 10, category_id: 2, title: 'Как рождаются и умирают звёзды?', content: 'Звёзды рождаются из облаков газа и пыли. Когда газ сжимается, он нагревается и начинается ядерная реакция. Звезда живёт миллионы или миллиарды лет. Когда водород заканчивается, звезда превращается в красного гиганта, а затем — в белого карлика, нейтронную звезду или чёрную дыру.' },
    
    // Галактики (категория 3) - добавим ещё
    { id: 11, category_id: 3, title: 'Что такое галактика?', content: 'Галактика — это огромное скопление звёзд, пыли и газа, удерживаемое гравитацией. В нашей Вселенной миллиарды галактик. Они бывают разных форм: спиральные, эллиптические и неправильные.' },
    { id: 12, category_id: 3, title: 'Наша галактика — Млечный Путь', content: 'Млечный Путь — это спиральная галактика, в которой мы живём. Она содержит около 200 миллиардов звёзд. В центре галактики находится сверхмассивная чёрная дыра. Диаметр Млечного Пути — около 100 000 световых лет.' },
    { id: 13, category_id: 3, title: 'Ближайшие галактики', content: 'Ближайшая к нам галактика — Туманность Андромеды. Она находится на расстоянии 2,5 миллиона световых лет. Через 4 миллиарда лет Млечный Путь и Андромеда столкнутся и образуют одну большую галактику.' },
    { id: 14, category_id: 3, title: 'Типы галактик', content: 'Спиральные галактики имеют закрученные рукава (как Млечный Путь). Эллиптические галактики имеют форму шара или овала. Неправильные галактики не имеют определённой формы. Каждый тип галактик уникален и по-своему красив.' },
    { id: 15, category_id: 3, title: 'Тёмная материя в галактиках', content: 'Учёные считают, что в галактиках есть тёмная материя — невидимое вещество, которое составляет большую часть массы Вселенной. Она не излучает свет, но оказывает гравитационное влияние на звёзды и галактики.' },
];

// ===== ТЕСТОВЫЕ ВОПРОСЫ =====
const TEST_QUESTIONS = [];
const questionBank = [
    { question: 'Сколько планет в Солнечной системе?', options: ['7', '8', '9'], correct: 1 },
    { question: 'Какая планета самая большая?', options: ['Юпитер', 'Сатурн', 'Нептун'], correct: 0 },
    { question: 'Как называется наша галактика?', options: ['Млечный Путь', 'Андромеда', 'Треугольник'], correct: 0 },
    { question: 'Какая звезда ближе всего к Земле?', options: ['Полярная', 'Солнце', 'Сириус'], correct: 1 },
    { question: 'Что такое чёрная дыра?', options: ['Звезда', 'Область с сильной гравитацией', 'Планета'], correct: 1 },
    { question: 'Сколько основных созвездий на небе?', options: ['66', '88', '108'], correct: 1 },
    { question: 'Какая планета имеет кольца?', options: ['Марс', 'Сатурн', 'Венера'], correct: 1 },
    { question: 'Что такое астероид?', options: ['Каменный объект', 'Ледяной объект', 'Газовый объект'], correct: 0 },
    { question: 'Какой спутник у Земли?', options: ['Фобос', 'Луна', 'Деймос'], correct: 1 },
    { question: 'Какая планета самая горячая?', options: ['Меркурий', 'Венера', 'Марс'], correct: 1 }
];

// Добавляем вопросы для каждой категории
for (let catId = 1; catId <= 10; catId++) {
    const shuffled = questionBank.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 4);
    selected.forEach(q => {
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
let currentCategoryId = null;

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
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
    currentCategoryId = categoryId;
    const cat = CATEGORIES.find(c => c.id === categoryId);
    document.getElementById('category-title').textContent = `${cat.icon} ${cat.name}`;
    const container = document.getElementById('articles-list');
    container.innerHTML = '';
    const read = getProgress().readArticles;
    const articles = ARTICLES.filter(a => a.category_id === categoryId);
    
    if (articles.length === 0) {
        container.innerHTML = '<p style="color:#999;">В этой категории пока нет статей</p>';
    } else {
        articles.forEach(a => {
            const div = document.createElement('div');
            div.className = 'article-item' + (read.includes(a.id) ? ' read' : '');
            div.textContent = a.title;
            div.onclick = () => showArticle(a.id);
            container.appendChild(div);
        });
    }
    showPage('articles-page');
}

function showArticle(articleId) {
    const a = ARTICLES.find(art => art.id === articleId);
    if (!a) {
        document.getElementById('article-content').textContent = 'Статья не найдена';
        return;
    }
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
                setTimeout(() => {
                    // Возврат к списку статей
                    if (currentCategoryId) showArticles(currentCategoryId);
                    else showPage('categories-page');
                }, 500);
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
        container.innerHTML = '<p style="color:#999;">Пока нет достижений. Читай статьи и зарабатывай награды!</p>';
    } else {
        container.innerHTML = p.achievements.map(a => `<div class="achievement-item">${a}</div>`).join('');
    }
    showPage('achievements-page');
}

function startQuiz() {
    let html = '<p style="color:#999;margin-bottom:16px;">Выбери категорию для теста:</p>';
    let hasAvailable = false;
    CATEGORIES.forEach(cat => {
        const unread = getUnread(cat.id);
        if (unread.length < 2) {
            html += `<button class="quiz-option" style="opacity:0.4;" disabled>${cat.icon} ${cat.name} (нужно прочитать 2 статьи)</button>`;
        } else {
            hasAvailable = true;
            html += `<button class="quiz-option" onclick="startQuizCategory(${cat.id})">${cat.icon} ${cat.name}</button>`;
        }
    });
    if (!hasAvailable) {
        html += '<p style="color:#ffd700;margin-top:12px;">📚 Прочитай хотя бы 2 статьи в любой категории, чтобы открыть тест!</p>';
    }
    document.getElementById('quiz-content').innerHTML = html;
    showPage('quiz-page');
}

function startQuizCategory(categoryId) {
    const questions = getRandomQuestions(categoryId, 5);
    if (questions.length === 0) {
        document.getElementById('quiz-content').innerHTML = '<p style="color:#ffd700;">В этой категории пока нет вопросов. Попробуй другую!</p>';
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
                    <p>Правильных ответов: <strong>${score}</strong> из ${questions.length}</p>
                    <p>➕ Получено очков: <strong>${points}</strong></p>
                    <button class="back-btn" onclick="startQuiz()">🔙 К тестам</button>
                    <button class="back-btn" onclick="showPage('main-menu')">🏠 Главное меню</button>
                </div>
            `;
            return;
        }
        
        const q = questions[current];
        let html = `<p style="color:#fff;font-weight:500;margin-bottom:8px;">Вопрос ${current+1} из ${questions.length}</p>`;
        html += `<p style="color:#ddd;font-size:1.05rem;margin-bottom:12px;">${q.question}</p>`;
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
                }, 1000);
            });
        });
    }
    renderQuestion();
}

// ===== НАВИГАЦИЯ =====
document.addEventListener('click', function(e) {
    const btn = e.target.closest('[data-page]');
    if (!btn) return;
    const page = btn.dataset.page;
    
    if (page === 'main-menu') {
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
    } else if (page === 'categories') {
        renderCategories();
    } else if (page === 'articles') {
        if (currentCategoryId) {
            showArticles(currentCategoryId);
        } else {
            showPage('categories-page');
        }
    } else if (page === 'quiz') {
        startQuiz();
    } else if (page === 'stats') {
        showStats();
    } else if (page === 'achievements') {
        showAchievements();
    }
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
