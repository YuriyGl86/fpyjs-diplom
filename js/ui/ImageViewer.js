/**
 * Класс ImageViewer
 * Используется для взаимодействием блоком изображений
 * */
class ImageViewer {
  constructor( element ) {
    this.imageWrapper = element
    this.preview = element.querySelector('div.column.six.wide')
    this.imageContainer = element.querySelector('div.ui.grid').firstElementChild
    
    this.registerEvents()
  }



  /**
   * Добавляет следующие обработчики событий:
   * 1. Клик по изображению меняет класс активности у изображения
   * 2. Двойной клик по изображению отображает изображаения в блоке предпросмотра
   * 3. Клик по кнопке выделения всех изображений проверяет у всех ли изображений есть класс активности?
   * Добавляет или удаляет класс активности у всех изображений
   * 4. Клик по кнопке "Посмотреть загруженные файлы" открывает всплывающее окно просмотра загруженных файлов
   * 5. Клик по кнопке "Отправить на диск" открывает всплывающее окно для загрузки файлов
   */
  registerEvents(){
    this.imageContainer.addEventListener('dblclick', this.dblclickHandler.bind(this))
    this.imageContainer.addEventListener('click', this.clickHandler.bind(this))
    this.imageWrapper.querySelector('button.select-all').addEventListener('click', this.selectHandler.bind(this))
    this.imageWrapper.querySelector('button.send').addEventListener('click', this.sendHandler.bind(this))
    this.imageWrapper.querySelector('button.show-uploaded-files').addEventListener('click', this.showuploadedHandler.bind(this))
  }




  /**
   * Очищает отрисованные изображения
   */
  clear() {
    // console.log('вызов clear')
    // console.log(this)
    this.imageContainer.innerHTML = ''
  }




  /**
   * Отрисовывает изображения.
  */
  drawImages(images) {
    // console.log(images)
    // console.log(this)
    if(this.replace){
      this.clear()
      this.replace = false      
    }
    images.forEach(image => {
      const imgHTML = `<div class='four wide column ui medium image-wrapper'><img src=${image} /></div>`
      this.imageContainer.insertAdjacentHTML('beforeend', imgHTML)
    })
    this.checkButtonText()
  }




  /**
   * Контроллирует кнопки выделения всех изображений и отправки изображений на диск
   */
  checkButtonText(){
    // console.log('проверка кнопок', this)

    const imgs = Array.from(this.imageContainer.querySelectorAll('img'))
    const selectButton = this.imageWrapper.querySelector('button.select-all')
    const sendButton = this.imageWrapper.querySelector('button.send')

    const selectedImg = imgs.filter(img => img.classList.contains('selected'))
    if (selectedImg.length == imgs.length) selectButton.innerText = 'Снять выделение'
    else selectButton.innerText = 'Выбрать всё'

    if (selectedImg.length > 0) sendButton.classList.remove('disabled')
    else sendButton.classList.add('disabled')

    if (imgs.length > 0) selectButton.classList.remove('disabled')
    else selectButton.classList.add('disabled')


  }


  /**
   * Обработчик события двойного клика
   */
  dblclickHandler(event){
    const target = event.target
    if(target.tagName === 'IMG'){
      // console.log('двойной клик')
      this.preview.querySelector('img').src = target.src
    }
  }


  /**
   * Обработчик события одинарного клика
   */
  clickHandler(event){
    const target = event.target
    if(target.tagName === 'IMG'){
      // console.log('один клик')
      target.classList.toggle('selected')
      this.checkButtonText()
    }
  }

  selectHandler(event){
    const imgs = Array.from(this.imageContainer.querySelectorAll('img'))
    const selectedImg = imgs.filter(img => img.classList.contains('selected'))
    if (selectedImg.length == imgs.length) {
      imgs.forEach(img => img.classList.remove('selected'))
      this.checkButtonText()
    } else {
      imgs.forEach(img => img.classList.add('selected'))
      this.checkButtonText()
    }
  }

  sendHandler(){
    // console.log('загрузчик')
    const modal = App.getModal('fileUploader')
    modal.open()
    const selectedImgs = Array.from(this.imageContainer.querySelectorAll('img.selected'))
    modal.showImages(selectedImgs)

  }

  showuploadedHandler(){
    const modal = App.getModal('filePreviewer')
    modal.open()
    modal.modalDOM.querySelector('i.asterisk.loading.icon.massive').style.display = 'block'
    Yandex.getUploadedFiles(modal.showImages)
  }

}