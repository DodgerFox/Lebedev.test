'use strict'

window.onload = function () {
  openMenu()
  passValidation()
}


// открытие/закрытие меню
function openMenu() {
  var button = document.querySelector('.user'),
      menu = document.querySelector('.nav');

  button.addEventListener('click', () => {
    menu.classList.toggle('open')
  })
}


// инициализация слайдера
$('.slider-wrap').slick({
  infinite: false,
  dots: true,
  slidesToShow: 3,
  slidesToScroll: 1
});


// прокрутка страницы
$(".next-button").on("click", function() {
    $("html,body").stop().animate({
      scrollTop: $(".slider").offset().top
    }, 1e3)
})


// изменение количества товаров
$('.quantity__item').on('click', function () {
  var val = $(this).parent().find('.quantity__number').html();

  if ($(this).hasClass('plus')) {
    val++;
  }else{
    val--;
  }
  if (val == 1) {
    $(this).parent().find('.quantity__item.minus').addClass('disabled')
  }else{
    $(this).parent().find('.quantity__item.minus').removeClass('disabled')
  }
  $(this).parent().find('.quantity__number').html(val)

})


// слайд плэйсхолдера
$('.signup-form input').focusout(function () {
  var value=$.trim($(this).val());
  if(value.length > 0){
    $(this).siblings('span').addClass('active')
  }else {
    $(this).siblings('span').removeClass('active')
  }

})

$('.signup-form input').keydown(function () {
  var value=$.trim($(this).val());
  if(value.length > 0){
    $(this).siblings('span').addClass('active')
  }else {
    $(this).siblings('span').removeClass('active')
  }

})


// проверка поля ввода пароля
function passValidation() {
  var password = $('#password'),
      options = $('.signup-options__item'),
      mess = $('.signup-form__message');

  $(password).on('keyup', function () {
    var val=$.trim($(this).val()),
        letters = val.split(''),
        intRegex = /^\d+$/,
        floatRegex = /^((\d+(\.\d *)?)|((\d*\.)?\d+))$/,
        lower=0, upper=0, spec=0, qual=0;

    for (var i = 0; i<letters.length; i++) {
      if (letters[i] === letters[i].toUpperCase()
      && letters[i] !== letters[i].toLowerCase()) {
        upper++
      } else {
        lower++
      }
      if(intRegex.test(letters[i]) || floatRegex.test(letters[i])) {
        spec++
      }
    }

    if (val.length > 6) {
      $(options[0]).addClass('active')
      qual++
    }else{
      $(options[0]).removeClass('active')
    }
    if (upper > 0 && lower > 0){
      $(options[1]).addClass('active')
      qual++
    }else{
      $(options[1]).removeClass('active')
    }
    if (spec > 0){
      $(options[2]).addClass('active')
      qual++
    }else{
      $(options[2]).removeClass('active')
    }
    if (qual == 1) {
      var message = 'Weak password',
          classN = 'red';
    } else if (qual == 2){
      var message = 'Good password',
          classN = 'yellow';
    } else if (qual == 3){
      var message = 'Very good password',
          classN = 'green';
    }else{
      var message = '',
          classN = 'red';
    }
    $(mess).removeClass('red yellow green')
    $(mess).text(message).removeClass(classN).addClass(classN)
  })
}



// валидация формы
$("#form").validate({
  rules: {
    name: "required",
    email: {
      required: true,
      email: true
    },
    password: {
      required: true,
      minlength: 6
    },
    confpass: {
      required: true,
      minlength: 6,
      equalTo: '#password'
    }
  },
  messages: {
        confpass: {
          equalTo: 'Passwords do not match'
        }
    }
});
