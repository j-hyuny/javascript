const btn = document.querySelector('.btn')
const dimm = document.querySelector('.dimm')
const modal = document.querySelector('.modal')
const close = document.querySelector('.close')

btn.addEventListener('click', function () {
  console.log(this)

  dimm.classList.add('open')
  modal.classList.add('open')
})

close.addEventListener('click', () => {
  dimm.classList.remove('open')
  modal.classList.remove('open')
})

dimm.addEventListener('click', () => {
  dimm.classList.remove('open')
  modal.classList.remove('open')
})
