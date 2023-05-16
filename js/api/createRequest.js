/**
 * Основная функция для совершения запросов по Yandex API.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest
    
    const url = new URL(options.url)
    const params = new URLSearchParams()
    for(let key in options.data){
        params.set(key, options.data[key])
    }
    url.search = params.toString()

    xhr.addEventListener('readystatechange', () => {
        if(xhr.readyState === xhr.DONE){
            console.log(xhr.response)
            options.callback(xhr.response)
        }
    })
    
    xhr.open(options.method, url)
    xhr.responseType = 'json'
    
    if(options.img){
        const img = new FormData
        img.append('file', options.img)
        xhr.send(img)
    } else{
        xhr.setRequestHeader('Authorization', `OAuth ${options.headers.Authorization}`)
        xhr.send()
    }
    




};
