/**
 * Класс FileUploaderModal
 * Используется как всплывающее окно для загрузки изображений
 */
class FileUploaderModal extends BaseModal {
  constructor( element ) {
    super(element)
    this.registerEvents()
    this.content = this.modalDOM.querySelector('.content')
    this.images = this.content.getElementsByClassName('image-preview-container')
    // console.log(this.content)
  }



  /**
   * Добавляет следующие обработчики событий:
   * 1. Клик по крестику на всплывающем окне, закрывает его
   * 2. Клик по кнопке "Закрыть" на всплывающем окне, закрывает его
   * 3. Клик по кнопке "Отправить все файлы" на всплывающем окне, вызывает метод sendAllImages
   * 4. Клик по кнопке загрузке по контроллерам изображения: 
   * убирает ошибку, если клик был по полю вода
   * отправляет одно изображение, если клик был по кнопке отправки
   */
  registerEvents(){
    this.modalDOM.querySelector('i.x.icon').addEventListener('click', this.close.bind(this))
    this.modalDOM.querySelector('.close').addEventListener('click', this.close.bind(this))
    this.modalDOM.querySelector('.send-all').addEventListener('click', this.sendAllImages.bind(this))
    // console.log(this.content)
    this.modalDOM.querySelector('.content').addEventListener('click', this.imgContainerHandler.bind(this))
    
  }




  /**
   * Отображает все полученные изображения в теле всплывающего окна
   */
  showImages(images) {
    const HTMLList = []
    images.forEach(img => {
      HTMLList.push(this.getImageHTML(img))
    })
    const imagesHTML = HTMLList.join()
    // console.log(this.content)
    this.content.insertAdjacentHTML('beforeend', imagesHTML)
    // console.log(this.images.length, this.images)
  }






  /**
   * Формирует HTML разметку с изображением, полем ввода для имени файла и кнопкной загрузки
   */
  getImageHTML(item) {
    const imgHTML = `
      <div class="image-preview-container">
        <img src='${item.src}' />
        <div class="ui action input">
          <input type="text" placeholder="Путь к файлу">
          <button class="ui button"><i class="upload icon"></i></button>
        </div>
      </div>`
      return imgHTML
  }





  /**
   * Отправляет все изображения в облако
   */
  sendAllImages() {
    console.log('отправить всё')
    const imgList = Array.from(this.images)
    console.log(imgList)
    imgList.forEach(img => {
      this.sendImage(img)
    })

  }




  /**
   * Валидирует изображение и отправляет его на сервер
   */
  sendImage(imageContainer) {
    console.log('отправка: ', imageContainer )
    const path = imageContainer.querySelector('input').value.trim()
    if(!path){
      imageContainer.querySelector('div.ui.action.input').classList.add('error')
      return
    }
    imageContainer.querySelector('div.ui.action.input').classList.add('disabled')
    const URL = imageContainer.querySelector('img').src
    Yandex.uploadFile(path, URL, '')

  }



  imgContainerHandler(event){
    if (event.target.tagName == 'INPUT') {
      event.target.closest('.input').classList.remove('error')
    }
    if (event.target.closest('button').matches('button.ui.button')){
      this.sendImage(event.target.closest('.image-preview-container'))
    }
  }
}