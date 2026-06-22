#!/usr/bin/env python3

import os
import sys
import subprocess
import importlib.metadata
import platform

REQUIRED_PYTHON = (3, 8)
REQUIRED_PACKAGES = ["python-telegram-bot", "requests"]

class Colors:
    GREEN = '\033[92m' if platform.system() != "Windows" else ''
    RED = '\033[91m' if platform.system() != "Windows" else ''
    YELLOW = '\033[93m' if platform.system() != "Windows" else ''
    BLUE = '\033[94m' if platform.system() != "Windows" else ''
    HEADER = '\033[95m' if platform.system() != "Windows" else ''
    END = '\033[0m' if platform.system() != "Windows" else ''

def print_color(text, color=Colors.GREEN):
    print(f"{color}{text}{Colors.END}")

def check_python():
    version = sys.version_info
    if version.major < REQUIRED_PYTHON[0] or version.minor < REQUIRED_PYTHON[1]:
        print_color(f"❌ Требуется Python {REQUIRED_PYTHON[0]}.{REQUIRED_PYTHON[1]}", Colors.RED)
        print_color(f"   У вас: Python {version.major}.{version.minor}", Colors.RED)
        return False
    print_color(f"✅ Python {version.major}.{version.minor} — OK", Colors.GREEN)
    return True

def install_deps():
    print_color("\n📦 Проверка зависимостей...", Colors.BLUE)
    missing = []
    for pkg in REQUIRED_PACKAGES:
        try:
            importlib.metadata.version(pkg)
            print_color(f"   ✅ {pkg} установлен", Colors.GREEN)
        except:
            print_color(f"   ❌ {pkg} не найден", Colors.RED)
            missing.append(pkg)
    
    if missing:
        print_color(f"\n📦 Устанавливаю: {', '.join(missing)}", Colors.YELLOW)
        for pkg in missing:
            subprocess.check_call([sys.executable, "-m", "pip", "install", pkg])
        print_color("✅ Все зависимости установлены!", Colors.GREEN)
    else:
        print_color("✅ Все зависимости уже установлены!", Colors.GREEN)
    return True

def check_config():
    print_color("\n⚙️  Проверка конфигурации...", Colors.BLUE)
    try:
        import config
        if not config.BOT_TOKEN or config.BOT_TOKEN == "ВАШ_ТОКЕН_ОТ_BOT_FATHER":
            print_color("❌ Токен бота не настроен!", Colors.RED)
            print_color("   Открой config.py и вставь токен от @BotFather", Colors.YELLOW)
            return False
        
        if not config.WEBAPP_URL or config.WEBAPP_URL == "https://ВАШ_АККАУНТ.github.io/astronomy-bot/":
            print_color("⚠️  URL веб-приложения не настроен", Colors.YELLOW)
            print_color("   Инструкция по настройке GitHub Pages:\n", Colors.YELLOW)
            print_color("   1. Создай репозиторий на GitHub", Colors.YELLOW)
            print_color("   2. Загрузи папку webapp в репозиторий", Colors.YELLOW)
            print_color("   3. Включи GitHub Pages в настройках", Colors.YELLOW)
            print_color("   4. Скопируй ссылку в config.py", Colors.YELLOW)
            return False
        
        print_color("✅ Конфигурация проверена", Colors.GREEN)
        return True
    except ImportError:
        print_color("❌ Файл config.py не найден!", Colors.RED)
        return False

def run():
    print_color("\n" + "="*50, Colors.HEADER)
    print_color("🚀 ЗАПУСК БОТА", Colors.HEADER)
    print_color("="*50, Colors.HEADER)
    print_color("\n✨ Бот запускается...", Colors.GREEN)
    print_color("ℹ️  Для остановки нажми Ctrl+C\n", Colors.YELLOW)
    
    try:
        subprocess.run([sys.executable, "bot.py"])
    except KeyboardInterrupt:
        print_color("\n\n👋 Бот остановлен", Colors.YELLOW)

def main():
    print_color("\n🌟" + "="*50, Colors.HEADER)
    print_color("🚀 КОСМИЧЕСКИЙ ГИД — УСТАНОВЩИК", Colors.HEADER)
    print_color("🌟" + "="*50, Colors.HEADER)
    
    if not check_python():
        sys.exit(1)
    
    if not install_deps():
        sys.exit(1)
    
    if not check_config():
        print_color("\n❌ Настройте config.py перед запуском", Colors.RED)
        sys.exit(1)
    
    run()

if __name__ == "__main__":
    main()