/**
 * Класс SearchBlock
 * Используется для взаимодействием со строкой ввода и поиска изображений
 * */
class SearchBlock {
  constructor( element ) {
    this.element = element
    this.registerEvents()

  }

  /**
   * Выполняет подписку на кнопки "Заменить" и "Добавить"
   * Клик по кнопкам выполняет запрос на получение изображений и отрисовывает их,
   * только клик по кнопке "Заменить" перед отрисовкой очищает все отрисованные ранее изображения
   */
  registerEvents(){
    
    this.element.querySelector('.button').addEventListener('click', () => {
      const id = this.element.querySelector('input').value.trim()      
      if(id) VK.get(id, App.imageViewer.drawImages.bind(App.imageViewer))
    })
    
  }

}