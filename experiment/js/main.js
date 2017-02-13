(function () {
  "use trict"

  $(document).ready(function (){
    $(".nav-fixed").on("click","a", function (event) {
        //отменяем стандартную обработку нажатия по ссылке
        event.preventDefault();
       //забираем идентификатор бока с атрибута href
       var id  = $(this).attr('href'),
      //узнаем высоту от начала страницы до блока на который ссылается якорь
      top = $(id).offset().top;    
        //анимируем переход на расстояние - top за 1500 мс
        $('body,html').animate({scrollTop: top}, 800);
      });
    
    let blackBlock = document.querySelector('.black-block');
    let sectionPrice = document.querySelector('.section-price');

    let body = document.body,
        html = document.documentElement;

    let heightBody = Math.max( body.scrollHeight, body.offsetHeight, 
                           html.clientHeight, html.scrollHeight, html.offsetHeight );


    sectionPrice.addEventListener('mouseover', (event) => {
      let target = event.target;
      if (target.classList.contains('price-photo')) {
        target.style.transform = 'scale(1.3)';
      }
    });



    sectionPrice.addEventListener('mouseout', (event) => {
      let target = event.target;
      if (target.classList.contains('price-photo')) {
        target.style.transform = 'scale(1)';
      }
    });


    sectionPrice.addEventListener('mouseenter', (event) => {
      let target = event.target;
      blackBlock.style.height = heightBody + 'px';
      blackBlock.classList.add('active');
      if (target.className == 'section-price') {
        target.classList.add('active');
      }
    });

    sectionPrice.addEventListener('mouseleave', (event) => {
      let target = event.target;
      blackBlock.classList.remove('active');
      target.classList.remove('active');
      
    });


  });

})();