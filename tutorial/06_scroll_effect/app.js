const section = document.querySelector('section')

window.addEventListener('scroll', function () {
  console.log(window.scrollY)
  let value = window.scrollY
  section.style.clipPath = `circle(${value}px at center center)`
})
