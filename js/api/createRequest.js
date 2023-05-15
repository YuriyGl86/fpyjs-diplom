/**
 * Основная функция для совершения запросов по Yandex API.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest
    
    xhr.open(options.method, options.URL)
    xhr.responseType = 'json'
    xhr.setRequestHeader('Authorization', `OAuth ${options.headers.Authorization}`)

};
