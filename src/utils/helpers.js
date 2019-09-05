/**
 * Генерация уникального идентификатора
 * @returns {string} uuid
 */
export const uuid = () => {
  const s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4()
}

/**
 * Фокус элемента по id
 * @param {number} id id элемента
 * @param {boolean} isEnd установить курсор в конец
 */
export function focusElement (id, isEnd) {
  setTimeout(() => {
    const el = document.getElementById(id)
    if (el) {
      el.focus()
      if (isEnd) {
        setCaretToEnd(el)
      }
    }
  }, 0)
}

/**
 * Получить дочерние textNode
 * @param {HTMLElement} target элемент
 */
export const getAllTextnodes = (target) => {
  let treeWalker = document.createTreeWalker(
    target,
    NodeFilter.SHOW_TEXT,
    null,
    false
  )
  let nodeList = []
  while(treeWalker.nextNode()) {
    const node = treeWalker.currentNode
    nodeList.push(node)
  }
  return nodeList
}

/**
 * Позиция курсора
 * @param {HTMLElement} target элемент
 */
export const getCaretPosition = (target) => {
  if (!target) return
  let caretOffset = 0
  if (typeof window.getSelection !== 'undefined') {
    const range = window.getSelection().getRangeAt(0)
    const selected = range.toString().length
    const preCaretRange = range.cloneRange()
    preCaretRange.selectNodeContents(target)
    preCaretRange.setEnd(range.endContainer, range.endOffset)
    caretOffset = preCaretRange.toString().length - selected
  }
  return caretOffset
}

/**
 * @param {HTMLElement} target элемент
 * @param {number} position позиция курсора
 */
export const getCaretData = (target, position) => {
  if (!target) return
  let node
  let nodes = getAllTextnodes(target)
  for(let n = 0; n < nodes.length; n++) {
    if (position > nodes[n].nodeValue.length && nodes[n + 1]) {
      // remove amount from the position, go to next node
      position -= nodes[n].nodeValue.length
    } else {
      node = nodes[n]
      break
    }
  }
  // you'll need the node and the position (offset) to set the caret
  return { node, position }
}

/**
 * Установить позицию курсора
 * @param {HTMLElement} target элемент
 * @param {number} position позиция курсора
 */
export function setCaretPosition (target, position) {
  if (!target) return
  const d = getCaretData(target, position)
  if (!d.node) return
  const sel = window.getSelection()
  const range = document.createRange()
  range.setStart(d.node, d.position)
  range.collapse(true)
  sel.removeAllRanges()
  sel.addRange(range)
}

/**
 * Установить позицию курсора в конец
 * @param {HTMLElement} target элемент
 */
export function setCaretToEnd (target) {
  target.focus()
  if (document.createRange) {
    const range = document.createRange()
    const sel = window.getSelection()
    range.selectNodeContents(target)
    range.collapse(false)
    sel.removeAllRanges()
    sel.addRange(range)
  } else {
    const textRange = document.body.createTextRange()
    textRange.moveToElementText(target)
    textRange.collapse(false)
    textRange.select()
  }
}

/**
 * insert text or orther to editor
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand
 * @module Editor
 */
export const insertText = (content) => {
  document.execCommand('insertText', false, content)
}

/**
 * Функция прерывания
 * @param {number} ms длительность прерывания
 * @returns {Promise}
 */
export const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

/**
 * Функция копирования в буфер
 * @param {string} text текст
 */
export function copyToClipboard (text) {
  return new Promise((resolve, reject) => {
    const el = document.createElement('textarea')
    el.value = text
    el.setAttribute('readonly', '')
    el.style.position = 'absolute'
    el.style.left = '-9999px'
    document.body.appendChild(el)
    let selected

    try {
      // Check if there is any content selected previously
      // Store selection if found
      // Mark as false to know no selection existed before
      document.getSelection().rangeCount > 0
        ? document.getSelection().getRangeAt(0)
        : false
      el.select()
      // Copy - only works as a result of a user action (e.g. click events)      
      const successful = document.execCommand('copy')
      const msg = successful ? 'successful' : 'unsuccessful'
      resolve(msg)
    } catch (error) {
      // eslint-disable-next-line
      console.error('Unable to copy, ', error)
      reject(error)
    }

    document.body.removeChild(el)
    // If a selection existed before copying
    // Unselect everything on the HTML document
    // Restore the original selection
    if (selected) {
      document.getSelection().removeAllRanges()
      document.getSelection().addRange(selected)
    }
  })
}
