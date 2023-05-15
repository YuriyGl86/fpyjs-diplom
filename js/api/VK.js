/**
 * Класс VK
 * Управляет изображениями из VK. С помощью VK API.
 * С помощью этого класса будет выполняться загрузка изображений из vk.
 * Имеет свойства ACCESS_TOKEN и lastCallback
 * */
class VK {

  static ACCESS_TOKEN = localStorage.getItem('token')
  static lastCallback;

  /**
   * Получает изображения
   * */
  static get(id = '', callback){
    this.lastCallback = callback
    const script = document.createElement('SCRIPT');
    script.id = 'request'
    script.src = `https://api.vk.com/method/photos.get?owner_id=${id}&album_id=profile&photo_sizes=1&access_token=${this.ACCESS_TOKEN}&v=5.131&callback=VK.processData`;
    document.getElementsByTagName("head")[0].appendChild(script);
  
  }

  /**
   * Передаётся в запрос VK API для обработки ответа.
   * Является обработчиком ответа от сервера.
   */
  static processData(result){
    document.querySelector('#request').remove()
  
    if (result.error){
      alert(`Ошибка ${result.error.error_code} - ${result.error.error_msg}`)
      return
    }
    const photos = result.response.items
    const res = []
  
    const sizes = 's, m, x, o, p, q, r, y, z, w'  
    
    photos.forEach(photo => {
      const sizeList = photo.sizes
      sizeList.sort((a,b) => {
        return sizes.indexOf(a.type) - sizes.indexOf(b.type)
      })
      // console.log(sizeList)
      // console.log(sizeList[1])
      res.push(sizeList[sizeList.length-1].url)

    });
    // console.log(res)
    this.lastCallback(res)
    this.lastCallback = ()=>{}

    
    
    // console.log(result.response.items[0].sizes)
  }
}
