/**
 * Класс BaseModal
 * Используется как базовый класс всплывающего окна
 */
class BaseModal {
  constructor( element ) {
    this.modalSemantic = element
    this.modalDOM = element[0]
  }

  /**
   * Открывает всплывающее окно
   */
  open() {
    this.modalSemantic.modal('show')
  }

  /**
   * Закрывает всплывающее окно
   */
  close() {
    this.modalSemantic.modal('hide')
  }
}