# microblog-api
API для микроблога.

# /auth (GET)
Авторизация пользователя через логин и пароль, указанные при регистрации. Отдает токен для работы с API.

Параметры (query)
**login**
**password**

# /users (GET)
Получение списка пользователей (юзернеймов) и/или проверка наличия пользователя с указанным именем в базе.

Параметры (query)
*username (необязательно)*

# /users (POST)
Создание нового пользователя.

Параметры (body)
**login**
**password**
**username**
**email**

# /users (PUT)
Изменение данных о пользователе.

Параметры (body)
**token**
*username*
*password*
*email*

# /users (DELETE)
Удаление пользователя.

Параметры (body)
**token**

# /blogs (GET)
Получение данных о существующих блогах.

Параметры (query)
*_id*
*title*

# /blogs (POST)
Создание нового блога.

Параметры (body)
**token**
**title**
*description*
*image*

# /blogs (PUT)
Изменение данных о блоге.

Параметры (body)
**token**
**_id**
*title*
*description*
*image*

# /blogs (DELETE)
Удаление блога.

Параметры (body)
**token**
**_id**

# /posts (GET)
Получение данных о постах.

Параметры (query)
*_id*
*blog_id*
*title*

# /posts (POST)
Добавление нового поста.

Параметры (body)
**blog_id**
**title**
**body**

# /posts (PUT)
Изменение данных о посте.

Параметры (body)
**_id**
*blog_id*
*title*
*body*

# /posts (DELETE)
Удаление поста.

Параметры (body)
**_id**

# /comment (GET)
Получение всех комментариев.
