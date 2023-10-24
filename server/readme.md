### Участники проекта

Хе Максим, Лябаев Адильхан, Сагидолды Диас

### Имеющиеся эндпоинты:

POST /users - Регистрация нового пользователя
POST /users/sessions - Логин пользователя

GET /post - Получение списка постов
GET /post/:id - Получение информации о посте по ID
POST /post - Создание нового поста
DELETE /post/:id - Удаление поста по ID

GET /comments/:id - Получение комментариев к посту по ID
POST /comments - Создание нового комментария
DELETE /comments/:id - Удаление комментария по ID

### Ипользуемые методы отправки

Для метода POST использовался thunder client, по адресу http://localhost:8000/.

### Пример post-запроса

POST http://localhost:8000/users
{
"username": "test",
"password": "111"
}

пример ответа

Если такого пользователя не существует:
{
"username": "test",
"token": null,
"id": 1
}

Если такой пользователь существует:
{
"error": {
"message": "User already exists."
}
}

POST http://localhost:8000/users/sessions
{
"username": "test",
"password": "111"
}

пример ответа
Если такой пользователь существует:
{
"id": 1,
"username": "test",
"token": "457fcea5-e969-4d86-898a-0d6ff0736eda"
}

Если пользователь существует, но введен неверный пароль
Login or password is wrong

Если пользователя не существует
User not exist

GET http://localhost:8000/post

пример ответа
[
{
"id": 2,
"title": "test1",
"description": "1",
"image": "",
"userId": 1,
"datetime": "2023-10-09T12:10:34.867Z",
"user": {
"id": 1,
"username": "test",
"token": "a490bcfb-5741-44ac-9049-64c8b3e4c4fe"
}
},
{
"id": 3,
"title": "test1",
"description": "",
"image": "",
"userId": 1,
"datetime": "2023-10-09T12:10:42.536Z",
"user": {
"id": 1,
"username": "test",
"token": "a490bcfb-5741-44ac-9049-64c8b3e4c4fe"
}
}
]

GET http://localhost:8000/post/:id

пример ответа
{
"id": 4,
"title": "test",
"description": "test",
"image": "c9f698ad-07ca-448a-9cf1-bbcfa8eaf162.png",
"userId": 1,
"datetime": "2023-10-09T13:47:32.435Z",
"user": {
"id": 1,
"username": "test",
"token": "a490bcfb-5741-44ac-9049-64c8b3e4c4fe"
}
}

POST http://localhost:8000/post

Отправка используя Form-data
title: test,
description: test,
image: файл картинки

В headers нужно передавать токен пользователя

пример ответа
{
"title": "test",
"description": "test",
"image": "c9f698ad-07ca-448a-9cf1-bbcfa8eaf162.png",
"userId": "1",
"id": 4,
"datetime": "2023-10-09T13:47:32.435Z"
}

DELETE http://localhost:8000/post/:id

пример ответа
в ответе только статус 204

GET http://localhost:8000/comments/:id

пример ответа
[
{
"id": 5,
"userId": 1,
"postId": 3,
"datetime": "2023-10-09T18:36:40.157Z",
"text": "new test",
"user": {
"id": 1,
"username": "test",
"password": "$2b$10$0teTUdjoVvzIvwmwXLb1tuAzfzrhruf4.wwT7r1M1kCWOFiKqimdi",
"token": "a490bcfb-5741-44ac-9049-64c8b3e4c4fe"
}
},
{
"id": 6,
"userId": 1,
"postId": 3,
"datetime": "2023-10-09T18:36:44.493Z",
"text": "new test 2",
"user": {
"id": 1,
"username": "test",
"password": "$2b$10$0teTUdjoVvzIvwmwXLb1tuAzfzrhruf4.wwT7r1M1kCWOFiKqimdi",
"token": "a490bcfb-5741-44ac-9049-64c8b3e4c4fe"
}
},
]

POST http://localhost:8000/comments
В headers нужно передавать токен пользователя
{
"postId": "3",
"text": "33333333333"
}

пример ответа
{
"userId": "1",
"postId": "3",
"text": "33333333333",
"id": 11,
"datetime": "2023-10-09T22:58:03.870Z"
}

DELETE http://localhost:8000/comments/:id

пример ответа
в ответе только статус 204
