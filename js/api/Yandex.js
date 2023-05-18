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
    // if (path.includes('/')){
    //   console.log(this)    
    //   this.createPath(path)
    // }
    
    fetch(url_img)
    .then(response => response.blob())
    .then(imgBlob => {
      console.log(imgBlob)
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
                      'img': imgBlob,
                      url: response.href,
                      method: 'PUT',
                      callback: callback,
                    }),
        
      })
    })
  }

   static async uploadFilePath(path, url_img, callback){
    if (!path.includes('/')){
      this.uploadFile(path, url_img, callback)    
    }
    else {
      await this.createPath(path).then(this.uploadFile(path, url_img, callback))


    }
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

  static createFolder(path, callback){
    const URL = this.HOST + '/resources'
    createRequest({
      method: 'PUT',
      url: URL,
      headers: {
        Authorization: this.getToken()
      },
      data: {
        path: path,        
      },
      callback: callback
    })
  }

  static async createPath(path){
    const path1 = path.split('/')
    const folders = path1.slice(0, path1.length-1)
    console.log(folders)
    let currentPath = ''
    folders.forEach(folder => {
      currentPath = currentPath + '/' + folder
      this.createFolder(currentPath, (response) => {console.log('создана папка по пути:' + path)})
      
    })

  }


}
