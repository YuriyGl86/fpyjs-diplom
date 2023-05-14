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

  }

  /**
   * Очищает отрисованные изображения
   */
  clear() {

  }

  /**
   * Отрисовывает изображения.
  */
  drawImages(images) {
    console.log(images)
    console.log(this)
    images.forEach(image => {
      const imgHTML = `<div class='four wide column ui medium image-wrapper'><img src=${image} /></div>`
      this.imageContainer.insertAdjacentHTML('beforeend', imgHTML)
    })
  }

  /**
   * Контроллирует кнопки выделения всех изображений и отправки изображений на диск
   */
  checkButtonText(){

  }

}