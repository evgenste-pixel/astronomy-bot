import logging
import sys
import subprocess
import importlib.metadata

# === АВТОУСТАНОВКА ЗАВИСИМОСТЕЙ ===
def check_and_install_dependencies():
    required = ["python-telegram-bot", "requests"]
    missing = []
    for pkg in required:
        try:
            importlib.metadata.version(pkg)
        except importlib.metadata.PackageNotFoundError:
            missing.append(pkg)
    
    if missing:
        print(f"📦 Устанавливаю: {', '.join(missing)}")
        for pkg in missing:
            subprocess.check_call([sys.executable, "-m", "pip", "install", pkg])
        print("✅ Зависимости установлены!")
    return True

check_and_install_dependencies()

from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo
from telegram.ext import Application, CommandHandler, ContextTypes
import config

logging.basicConfig(level=logging.INFO)

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user = update.effective_user
    
    # Проверяем, указан ли URL
    if not config.WEBAPP_URL or config.WEBAPP_URL == "https://ВАШ_АККАУНТ.github.io/astronomy-bot/":
        await update.message.reply_text(
            "⚠️ URL веб-приложения не настроен!\n\n"
            "1. Загрузите папку webapp на GitHub\n"
            "2. Включите GitHub Pages\n"
            "3. Вставьте ссылку в config.py\n\n"
            "Инструкция в README.md"
        )
        return
    
    welcome = (
        f"🌟 Привет, {user.first_name}!\n\n"
        "Добро пожаловать в космическое приключение! 🚀\n\n"
        "Нажми на кнопку ниже, чтобы открыть мини-приложение.\n"
        "Там ты найдёшь:\n"
        "📚 Статьи о космосе\n"
        "🎓 Тесты и викторины\n"
        "🏆 Достижения и уровни\n"
        "🎁 Ежедневные бонусы\n\n"
        "Поехали! 🌌"
    )
    
    keyboard = [
        [InlineKeyboardButton(
            "🚀 Открыть приложение", 
            web_app=WebAppInfo(url=config.WEBAPP_URL)
        )]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    await update.message.reply_text(welcome, reply_markup=reply_markup)

async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text(
        "🤖 Просто нажми /start и открой приложение!\n\n"
        "Все материалы находятся внутри мини-приложения.\n"
        "Там ты найдёшь:\n"
        "📚 Статьи о космосе\n"
        "🎓 Тесты для проверки знаний\n"
        "🏆 Достижения и уровни\n"
        "🎁 Ежедневные бонусы"
    )

def main():
    print("🚀 Запуск бота...")
    app = Application.builder().token(config.BOT_TOKEN).build()
    app.add_handler(CommandHandler("start", start))
    app.add_handler(CommandHandler("help", help_command))
    print("✅ Бот запущен! Напиши /start в Telegram.")
    app.run_polling()

if __name__ == "__main__":
    main()