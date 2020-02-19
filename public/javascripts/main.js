$(window).scroll(() => {
  if ($(window).scrollTop() > 300) {
    $('.totop').fadeIn()
  } else {
    $('.totop').fadeOut()
  }
})

$('.totop').click(() => {
  $('html').animate(
    { scrollTop: 0 },
    { duration: 200 }
  )
})