# Курсовая работа «Облачное хранилище WebCloud (UI)» курса «JavaScript: основы работы в браузере»
### Описание
Вам необходимо написать программу для резервного копирования фотографий из профиля (аватарок) пользователя vk в облачное хранилище Яндекс.Диск.

Сервис предполагает следующий функционал:
1. **Получение изображений из vk.** Позволяет получить и отобразить полученные изображения из профиля любой открытой страницы.
2. **Предпросмотр загружамых изображений.** Позволяет посмотреть изображение перед отправкой.
3. **Загрузка выбранных изображений.** Позволяет загрузить определённые изображения по передаваемому пути.
4. **Просмотр загруженных изображений.** Позволяет просматривать информацию об изображениях, а также удалять их из облака и загружать на устройство.

### Цель курсовой работы:

Выполнив курсовую работу, вы научитесь на практике взаимодействовать со страницей с помощью JavaScript с использованием библиотеки semantic-ui, а также работать с инструментами разработчика в браузере (инструментами DevTools).

1. Создать облачный сервис для резервного копирования изображений с помощью JavaScript.
2. Настроить предпросмотр загружаемых изображений и загрузку изображений по передаваемому пути.
3. Настроить управление загруженными изображениями.

### Перед началом работы:
1. В проекте для компонент используется библиотека [semantic-ui](https://semantic-ui.com/). Вам необходимо ознакомится с возможностями этой библиотеки.
2. Сделайте Fork репозитория с заданием курсовой работы.
3. Ознакомьтесь с заданием. Какие классы и методы присутсвуют в проекте. Как взаимодействуют классы и методы между собой.
4. Приступайте к реализации задания.

### Инструкция к выполнению курсовой работы:

1. Взаимодействие с VK API
    1. [Реализация запросов на сервер](./md/vk_api.md)
    2. [Блок поиска изображений](./md/search_block.md)
    3. [Взаимодействие с отображаемыми изображениями](./md/image_viewer.md)
2. Взаимодействие с Yandex API
    1. [Единый интерфейс взаимодействия с сервером](./md/createRequest.md)
    2. [Реализация класса Yandex для более удобного взаимодействия с сервером](./md/yandex_api.md)
3. Реализация модальных окон
    1. [Загрузка изображений](./md/upload_images.md)
    2. [Управление загруженными изображениями](./md/control_uploaded_images.md)

---
## Что необходимо для сдачи задания?

1. Сделан Fork репозитория с заданием курсовой работы.
1. Создан облачный сервис для резервного копирования изображений с помощью JavaScript.
1. Настроен предпросмотр загружаемых изображений и загрузку изображений по передаваемому пути.
1. Настроено управление загруженными изображениями.
1. Репозиторий загружен на [Github](https://github.com/).

---
## Критерии сдачи
- Не нарушена структура классов и методов.
- Реализовано API для взаимодействиям с VK и Yandex Cloud.
- Реализованы все методы и классы, которые требуются в задании.
- Использован репозиторий, доступ к нему открыт (публичный репозиторий), ссылка на репозиторий отправлена на проверку в личном кабинете.

---
## Как правильно задавать вопросы руководителю курсовой работы?

**Что поможет решить большинство частых проблем:**

1. Попробовать найти ответ сначала самостоятельно в интернете или в материалах курса и только после этого спрашивать у руководителя курсовой работы. Скилл поиска ответов пригодится вам в профессиональной деятельности.
1. По возможности, задавать вопросы в комментариях к коду. В одном вопросе должна быть заложена одна проблема.
1. Если вопросов больше одного, то присылайте их в виде нумерованного списка. Так руководителю курсовой работы будет проще отвечать на каждый из них. 
1. При необходимости прикрепите к вопросу скриншоты и стрелочкой покажите, где не получается. Программу для этого можно скачать здесь [https://app.prntscr.com/ru/](https://app.prntscr.com/ru/)
1. Начинать работу над курсовой работой как можно раньше! Чтобы было больше времени на правки.
1. Делать курсовую работу по частям, а не все сразу. Иначе, есть шанс, что нужно будет все переделывать :)

**Что может стать источником проблем:**

1. Вопросы вида «Ничего не работает. Не запускается. Всё сломалось». Руководитель курсовой работы не сможет ответить на такой вопрос без дополнительных уточнений. Цените своё время и время других.
1. Откладывание выполнения курсового проекта на последний момент.
1. Ожидание моментального ответа на свой вопрос. Руководители курсовой работы - работающие разработчики, которые занимаются, кроме преподавания, своими проектами. Их время ограничено, поэтому постарайтесь задавать правильные вопросы, чтобы получать быстрые ответы :)
699113813