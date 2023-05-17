/**
 * Класс Yandex
 * Используется для управления облаком.
 * Имеет свойство HOST
 * */
class Yandex {
  static HOST = 'https://cloud-api.yandex.net/v1/disk';

  /**
   * Метод формирования и сохранения токена для Yandex API
   */
  static getToken(){
    let token = localStorage.getItem('yandex')
    if(!token){
      token = prompt('введите яндекс-токен')
      localStorage.setItem('yandex', token)
    }
    return token
  }

  /**
   * Метод загрузки файла в облако
   */
  static uploadFile(path, url_img, callback){
    fetch(url_img)
    .then(response => response.blob())
    .then(responseimg => {
      console.log(responseimg)
      createRequest({url: 'https://cloud-api.yandex.net/v1/disk/resources/upload',
                    data: {
                      path: path,
                      overwrite: true,
                    },
                    method: 'GET',
                    headers: {
                      Authorization: this.getToken()
                    },
                    
                    callback: (response) => createRequest({
                      'img': responseimg,
                      url: response.href,
                      method: 'PUT',
                      callback: callback,
                    }),
        
      })
    })
  }

  /**
   * Метод удаления файла из облака
   */
  static removeFile(path, callback){

  }

  /**
   * Метод получения всех загруженных файлов в облаке
   */
  static getUploadedFiles(callback){

  }

  /**
   * Метод скачивания файлов
   */
  static downloadFileByUrl(url){

  }
}
