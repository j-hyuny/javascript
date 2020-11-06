const dimm = document.querySelector('.dimm')
const modal = document.querySelector('.modal')
const close = document.querySelector('.close')

function sendMail() {
  // get all data in form and return object
  function getFormData(form) {
    var elements = form.elements
    var honeypot

    var fields = Object.keys(elements)
      .filter(function (k) {
        if (elements[k].name === 'honeypot') {
          honeypot = elements[k].value
          return false
        }
        return true
      })
      .map(function (k) {
        if (elements[k].name !== undefined) {
          return elements[k].name
          // special case for Edge's html collection
        } else if (elements[k].length > 0) {
          return elements[k].item(0).name
        }
      })
      .filter(function (item, pos, self) {
        return self.indexOf(item) == pos && item
      })

    var formData = {}
    fields.forEach(function (name) {
      var element = elements[name]

      // singular form elements just have one value
      formData[name] = element.value

      // when our element has multiple items, get their values
      if (element.length) {
        var data = []
        for (var i = 0; i < element.length; i++) {
          var item = element.item(i)
          if (item.checked || item.selected) {
            data.push(item.value)
          }
        }
        formData[name] = data.join(', ')
      }
    })

    // add form-specific values into the data
    formData.formDataNameOrder = JSON.stringify(fields)
    formData.formGoogleSheetName = form.dataset.sheet || 'responses' // default sheet name
    formData.formGoogleSendEmail = form.dataset.email || '' // no email by default

    return { data: formData, honeypot: honeypot }
  }

  function handleFormSubmit(event) {
    //dimm과 로딩이 먼저 나타난다.
    dimm.classList.add('active')

    // handles form submit without any jquery
    event.preventDefault() // we are submitting via xhr below
    var form = event.target
    var formData = getFormData(form)
    var data = formData.data

    // console.log(data)
    if (data.name === '' || data.email === '' || data.message === '') {
      alert('이름과 이메일, 내용을 확인하세요!')
      return
    }

    // If a honeypot field is filled, assume it was done so by a spam bot.
    if (formData.honeypot) {
      return false
    }

    disableAllButtons(form)
    var url = form.action
    var xhr = new XMLHttpRequest()
    xhr.open('POST', url)
    // xhr.withCredentials = true;
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        form.reset()

        //성공후 동작
        modal.classList.add('active')
        //close를 눌렀을 때
        close.addEventListener('click', () => {
          dimm.classList.remove('active') /*dimm이 사라짐 */
          modal.classList.remove('active') /*modal이 사라짐 */
          location.reload() /*그상태에서 리프레쉬(f5작용)*/
        })
      }
    }
    // url encode form data for sending as post data
    var encoded = Object.keys(data)
      .map(function (k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
      })
      .join('&')
    xhr.send(encoded)
  }

  function loaded() {
    // bind to the submit event of our form
    var forms = document.querySelectorAll('form.gform')
    for (var i = 0; i < forms.length; i++) {
      forms[i].addEventListener('submit', handleFormSubmit, false)
    }
  }
  document.addEventListener('DOMContentLoaded', loaded, false)

  function disableAllButtons(form) {
    var buttons = form.querySelectorAll('button')
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true
    }
  }
}

sendMail()
