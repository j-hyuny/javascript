const movie = document.querySelector('.movie')

window.addEventListener('scroll', function () {
  const value = window.scrollY
  movie.style.clipPath = `circle(${value}px at center center)`
})
