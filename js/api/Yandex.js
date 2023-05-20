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

   static uploadFilePath(img_path, url_img, callback){
    if (!img_path.includes('/')){
      this.uploadFile(img_path, url_img, callback)    
    }
    else {
      const foldersList = img_path.split('/')
      console.log(foldersList.slice(0, foldersList.length-1))
      this.createFolders(foldersList.slice(0, foldersList.length-1), '', img_path, url_img, callback)

    }
  }



  static createFolders(folderList, folder_path='', img_path, url_img, callback ){
    let folders = folderList
    let currentPath = folder_path
    
    createRequest({
      method: 'PUT',
      url: this.HOST + '/resources',
      headers: {
        Authorization: this.getToken()
      },
      data: {
        path: currentPath + '/' + folders[0],        
      },
      callback: () => {
        if(folders.length == 1){
          this.uploadFile(img_path, url_img, callback)
          return
        }
        currentPath = currentPath + '/' + folders.shift()
        this.createFolders(folders, currentPath, img_path, url_img, callback)
      }
    })
  }



  /**
   * Метод удаления файла из облака
   */
  static removeFile(path, callback){
    const URL = this.HOST + '/resources'
    createRequest({
      method: 'DELETE',
      url: URL,
      headers: {
        Authorization: this.getToken()
      },
      callback: callback,
      data: {
        path: path,       
      },
    })

  }





  /**
   * Метод получения всех загруженных файлов в облаке
   */
  static getUploadedFiles(callback){
    const URL = this.HOST + '/resources/last-uploaded'
    createRequest({
      method: 'GET',
      url: URL,
      headers: {
        Authorization: this.getToken()
      },
      callback: callback,
      data: {
        media_type: 'image',
        fields: 'name, created, size, path, preview'        
      },
    })
  }





  /**
   * Метод скачивания файлов
   */
  static downloadFileByUrl(url){
    const a = document.createElement('a')
    a.href = url
    a.click()

  }


}
