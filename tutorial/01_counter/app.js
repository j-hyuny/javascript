const price = document.querySelector('.price')
const count = document.querySelector('.count')
const sum = document.querySelector('.sum')
// const plus = document.querySelector('.plus')
// const minus = document.querySelector('.minus')
// const reset = document.querySelector('.reset')
const btns = document.querySelectorAll('button')

/*확인방법*/
// console.log(price)
// console.log(count)
// console.log(sum)
// console.log(btns)

const unit_price = 15000
let num = 1

price.textContent = unit_price /*단가*/
count.textContent = num
sum.textContent = unit_price * num

function printTotalprice() {
  count.textContent = num
  sum.textContent = unit_price * num
}

// btns.forEach(function(item){
// })

btns.forEach((btn) => {
  //아이템 출력
  btn.addEventListener('click', function (e) {
    // console.log(e.target.className)
    if (e.target.className === 'plus') {
      num++
      printTotalprice()
    } else if (e.target.className === 'minus') {
      num--
      if (num <= 1) num = 1
      printTotalprice()
    } else {
      num = 1
      printTotalprice()
    }
  })
})

// plus.addEventListener('click', function () {
//   //할일
//   num++
// })

// minus.addEventListener('click', function () {
//   //할일
//   num--
//   if (num <= 1) num = 1
// })

// reset.addEventListener('click', function () {
//   //할일
//   num = 1
// })
