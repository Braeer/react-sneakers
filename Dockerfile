# Используем официальный образ Node.js
FROM node:14-alpine AS build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы приложения
COPY . .

# Собираем React-приложение
RUN npm run build

# Используем легковесный образ для продакшн
FROM node:14-alpine AS production

# Устанавливаем глобально serve для раздачи статических файлов
RUN npm install -g serve

# Копируем собранные файлы из стадии сборки
COPY --from=build /app/build /app/build

# Устанавливаем рабочую директорию
WORKDIR /app

# Пробрасываем порт 5000
EXPOSE 5000

# Запускаем serve
CMD ["serve", "-s", "build", "-l", "5000"]
