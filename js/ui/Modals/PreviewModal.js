/**
 * Класс PreviewModal
 * Используется как обозреватель загруженный файлов в облако
 */
class PreviewModal  extends BaseModal {
  constructor( element ) {
    super(element)
    this.registerEvents()
    this.content = this.modalDOM.querySelector('.content')
  }

  /**
   * Добавляет следующие обработчики событий:
   * 1. Клик по крестику на всплывающем окне, закрывает его
   * 2. Клик по контроллерам изображения: 
   * Отправляет запрос на удаление изображения, если клик был на кнопке delete
   * Скачивает изображение, если клик был на кнопке download
   */
  registerEvents() {
    this.modalDOM.querySelector('i.x.icon').addEventListener('click', this.close.bind(this))
    this.modalDOM.querySelector('.content').addEventListener('click', this.imgContainerHandler.bind(this))
  }


  /**
   * Отрисовывает изображения в блоке всплывающего окна
   */
  showImages(data) {
    console.log('отрисовка файлов на диске')
    console.log(this)
    let HTMLList = []
    data.items.forEach(item => HTMLList.push(App.getModal('filePreviewer').getImageInfo(item)))
    const imagesHTML = HTMLList.join()
    App.getModal('filePreviewer').content.insertAdjacentHTML('beforeend', imagesHTML)
    App.getModal('filePreviewer').modalDOM.querySelector('i.asterisk.loading.icon.massive').style.display = 'none'
  }




  /**
   * Форматирует дату в формате 2021-12-30T20:40:02+00:00(строка)
   * в формат «30 декабря 2021 г. в 23:40» (учитывая временной пояс)
   * */
  formatDate(date) {
    const month = {
      0: 'января',
      1: 'февраля',
      2: 'марта',
      3: 'апреля',
      4: 'мая',
      5: 'июня',
      6: 'июля',
      7: 'августа',
      8: 'сентября',
      9: 'октября',
      10: 'ноября',
      11: 'декабря',
    }
    const ms = Date.parse(date)
    const d = new Date(ms)
    const  datestring = `${("0" + d.getDate()).slice(-2)} ${month[d.getMonth()]} ${d.getFullYear()} г. в ${("0" + d.getHours()).slice(-2)}:${("0" + d.getMinutes()).slice(-2)}`

    return datestring
  }




  /**
   * Возвращает разметку из изображения, таблицы с описанием данных изображения и кнопок контроллеров (удаления и скачивания)
   */
  getImageInfo(item) {
    console.log(item.preview)
    console.log(this.formatDate(item.created))
    const imgHTML = `<div class="image-preview-container">
    <img src=${item.preview}/>
    <table class="ui celled table">
    <thead>
      <tr><th>Имя</th><th>Создано</th><th>Размер</th></tr>
    </thead>
    <tbody>
      <tr><td>${item.name}</td><td>${this.formatDate(item.created)}</td><td>${item.size}Кб</td></tr>
    </tbody>
    </table>
    <div class="buttons-wrapper">
      <button class="ui labeled icon red basic button delete" data-path=${item.path}>
        Удалить
        <i class="trash icon"></i>
      </button>
      <button class="ui labeled icon violet basic button download" data-file=${item.file}>
        Скачать
        <i class="download icon"></i>
      </button>
    </div>
  </div>`
  return imgHTML


  }

  imgContainerHandler(event){
    const target = event.target.closest('button')
    if (target && target.matches('.delete')){
      console.log('удалить',target.querySelector('i.icon') )
      target.querySelector('i.icon').classList.remove('trash')
      target.querySelector('i.icon').classList.add('spinner','loading')
      target.classList.add('disabled')
      const path = target.dataset.path
      
      Yandex.removeFile(path, () => {
        target.closest('div.image-preview-container').remove()
      })
    } else if (target && target.matches('.download')){
      console.log('скачиваем файл')
      const URL = target.dataset.file
      Yandex.downloadFileByUrl(URL)
    }
  }
}
