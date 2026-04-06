# Self-Assessment

**PR с self-assessment:** (https://github.com/dzzuze/SAA-Cat/pull/68)

## Deploy (https://dzzuze.github.io/SAA-Cat/)

## 📊 Personal Features Score

| Category         | Feature / Description                                                    | PR / Code Link | Points |
| ---------------- | ------------------------------------------------------------------------ | -------------- | ------ |
| Frameworks       | React (Vite + React setup проекта)                                       |                | +5     |
| Architecture     | State Manager (Zustand для хранения auth и user данных)                  |                | +10    |
| Backend & Data   | BaaS Auth (Firebase Authentication: login, register, session handling)   |                | +15    |
| Backend & Data   | BaaS CRUD (Firestore: создание user, топики, получение данных)           |                | +15    |
| UI & Interaction | Responsive + базовая структура UI (Header, страницы)                     |                | +5     |
| My Components    | Rich UI Screen: Dashboard (список топиков + фильтры сложности)           |                | +20    |
| My Components    | Rich UI Screen: Profile Page (редактирование данных пользователя)        |                | +20    |
| My Components    | Rich UI Screen: Topic Page (динамический роутинг + загрузка данных)      |                | +20    |
| My Components    | Complex Component: Markdown Renderer (react-markdown + syntax highlight) |                | +25    |
| UI & Interaction | Advanced UI Logic (фильтрация топиков по сложности)                      |                | +10    |
| Quality          | Unit Tests (Vitest + RTL, базовые тесты страниц)                         |                | +10    |
| UI & Interaction | Toast Notifications (react-hot-toast)                                    |                | +5     |
| Backend & Data   | Backend Framework usage (Firebase SDK как backend layer)                 |                | +10    |
| Architecture     | API Layer (функции работы с Firestore, изоляция от UI)                   |                | +10    |
| DevOps & Role    | Git Hooks (Husky + commitlint + lint-staged)                             |                | +5     |

| **Total** | **185+** |

---

## 🛠️ Описание моей работы

В рамках проекта я в основном отвечал за архитектуру фронтенда, интеграцию с backend (Firebase), а также за реализацию пользовательских экранов и логики работы с данными.

### Основные зоны ответственности:

- Настройка проекта (Vite + React, ESLint, Prettier, Husky, commitlint)
- Интеграция Firebase:
  - Authentication (регистрация, логин, сессии)
  - Firestore (хранение пользователей, топиков, контента)

- Реализация state management через Zustand
- Построение структуры данных и API-слоя для работы с Firestore
- Разработка страниц приложения:
  - Dashboard
  - Profile Page
  - Topic Page

- Работа с динамическим роутингом
- Реализация отображения контента через Markdown
- Добавление базового тестирования (Vitest + React Testing Library)

---

## ⚙️ Технологии и инструменты

- React + Vite
- Zustand (state management)
- Firebase (Auth + Firestore)
- React Router
- react-markdown + syntax highlighter
- Vitest + React Testing Library
- Husky + commitlint
- react-hot-toast

---

## 🚧 Сложности и как я их решал

### 1. Интеграция Firebase в уже существующий код

Проблема:
В проекте уже были заготовки и временные решения от команды, которые конфликтовали с новой архитектурой.

Решение:
Постепенно внедрил Zustand и Firebase, заменяя временные решения на централизованное хранение состояния и API-слой.

---

### 2. Сохранение сессии пользователя

Проблема:
После перезагрузки страницы пользователь разлогинивался.

Решение:
Использовал Firebase Auth + подписку на изменение состояния пользователя и синхронизацию со стором.

---

### 3. Работа с Firestore и структурой данных

Проблема:
Не было изначально продуманной структуры данных.

Решение:
Спроектировал структуру коллекций:

- users
- topics
- content

Связал пользователя через `uid`, реализовал CRUD-операции.

---

### 4. Отображение контента

Проблема:
Текст из базы отображался некорректно.

Решение:
Перешел на Markdown-формат и реализовал кастомный рендеринг через `react-markdown` + подсветку кода.

---

### 5. Проблема с 404 на деплое

Проблема:
GitHub Pages не корректно обрабатывал роутинг.

Решение:
Добавил копирование `index.html` в `404.html` при деплое.

---

## 🧩 Мои 2 ключевых Feature Components

### 🔥 1. Markdown Renderer + Topic Page

**Что делает:**

- Загружает контент из Firestore
- Отображает его как Markdown
- Поддерживает код, переносы строк и структуру

**Почему это сложно:**

- Нужно было подобрать формат хранения данных
- Настроить корректный рендер
- Интегрировать с роутингом и загрузкой данных

---

### 🔥 2. Auth + Profile + Firestore Integration

**Что делает:**

- Регистрация и логин пользователя
- Создание пользователя в Firestore
- Хранение и редактирование профиля

**Почему это сложно:**

- Нужно синхронизировать Auth и базу данных
- Обрабатывать состояние пользователя

---

## 💭 Итоги

За время проекта я:

- Разобрался с Firebase (Auth + Firestore)
- Научился работать со state management (Zustand)
- Получил опыт интеграции backend в frontend-приложение
- Улучшил навыки архитектуры приложения
- Работал с тестированием и инструментами разработки

Также столкнулся с реальными проблемами командной разработки:

- несогласованность решений
- отсутствие финального дизайна
- сложности коммуникации

Но это дало полезный опыт и понимание, как строить процессы в будущем.

---

## 🚀 Что бы улучшил

- Добавил бы более строгую архитектуру с самого начала
- Выбрал бы дизайн для всего приложения
- Продумал структуру данных заранее
- Ввел бы code conventions раньше
- Больше автоматизации (тесты, CI/CD)

---

## 📎 Заключение

Основной вклад в проект — это:

- архитектура работы с данными
- интеграция Firebase
- реализация экранов и логики
