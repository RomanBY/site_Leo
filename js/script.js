

'use strict';
var slider = (function (config) {

    const ClassName = {
        INDICATOR_ACTIVE: 'slider__indicator_active',
        ITEM: 'slider__item',
        ITEM_LEFT: 'slider__item_left',
        ITEM_RIGHT: 'slider__item_right',
        ITEM_PREV: 'slider__item_prev',
        ITEM_NEXT: 'slider__item_next',
        ITEM_ACTIVE: 'slider__item_active'
    }

    var
        _isSliding = false, // индикация процесса смены слайда
        _interval = 0, // числовой идентификатор таймера
        _transitionDuration = 700, // длительность перехода
        _slider = {}, // DOM элемент слайдера
        _items = {}, // .slider-item (массив слайдов)
        _sliderIndicators = {}, // [data-slide-to] (индикаторы)
        _config = {
            selector: '', // селектор слайдера
            isCycling: true, // автоматическая смена слайдов
            direction: 'next', // направление смены слайдов
            interval: 7000, // интервал между автоматической сменой слайдов
            pause: true // устанавливать ли паузу при поднесении курсора к слайдеру
        };

    var
        // функция для получения порядкового индекса элемента
        _getItemIndex = function (_currentItem) {
            var result;
            _items.forEach(function (item, index) {
                if (item === _currentItem) {
                    result = index;
                }
            });
            return result;
        },
        // функция для подсветки активного индикатора
        _setActiveIndicator = function (_activeIndex, _targetIndex) {
            if (_sliderIndicators.length !== _items.length) {
                return;
            }
            _sliderIndicators[_activeIndex].classList.remove(ClassName.INDICATOR_ACTIVE);
            _sliderIndicators[_targetIndex].classList.add(ClassName.INDICATOR_ACTIVE);
        },

        // функция для смены слайда
        _slide = function (direction, activeItemIndex, targetItemIndex) {
            var
                directionalClassName = ClassName.ITEM_RIGHT,
                orderClassName = ClassName.ITEM_PREV,
                activeItem = _items[activeItemIndex], // текущий элемент
                targetItem = _items[targetItemIndex]; // следующий элемент

            var _slideEndTransition = function () {
                activeItem.classList.remove(ClassName.ITEM_ACTIVE);
                activeItem.classList.remove(directionalClassName);
                targetItem.classList.remove(orderClassName);
                targetItem.classList.remove(directionalClassName);
                targetItem.classList.add(ClassName.ITEM_ACTIVE);
                window.setTimeout(function () {
                    if (_config.isCycling) {
                        clearInterval(_interval);
                        _cycle();
                    }
                    _isSliding = false;
                    activeItem.removeEventListener('transitionend', _slideEndTransition);
                }, _transitionDuration);
            };

            if (_isSliding) {
                return; // завершаем выполнение функции если идёт процесс смены слайда
            }
            _isSliding = true; // устанавливаем переменной значение true (идёт процесс смены слайда)

            if (direction === "next") { // устанавливаем значение классов в зависимости от направления
                directionalClassName = ClassName.ITEM_LEFT;
                orderClassName = ClassName.ITEM_NEXT;
            }

            targetItem.classList.add(orderClassName); // устанавливаем положение элемента перед трансформацией
            _setActiveIndicator(activeItemIndex, targetItemIndex); // устанавливаем активный индикатор

            window.setTimeout(function () { // запускаем трансформацию
                targetItem.classList.add(directionalClassName);
                activeItem.classList.add(directionalClassName);
                activeItem.addEventListener('transitionend', _slideEndTransition);
            }, 0);

        },
        // функция для перехода к предыдущему или следующему слайду
        _slideTo = function (direction) {
            var
                activeItem = _slider.querySelector('.' + ClassName.ITEM_ACTIVE), // текущий элемент
                activeItemIndex = _getItemIndex(activeItem), // индекс текущего элемента
                lastItemIndex = _items.length - 1, // индекс последнего элемента
                targetItemIndex = activeItemIndex === 0 ? lastItemIndex : activeItemIndex - 1;
            if (direction === "next") { // определяем индекс следующего слайда в зависимости от направления
                targetItemIndex = activeItemIndex == lastItemIndex ? 0 : activeItemIndex + 1;
            }
            _slide(direction, activeItemIndex, targetItemIndex);
        },
        // функция для запуска автоматической смены слайдов в указанном направлении
        _cycle = function () {
            if (_config.isCycling) {
                _interval = window.setInterval(function () {
                    _slideTo(_config.direction);
                }, _config.interval);
            }
        },
        // обработка события click
        _actionClick = function (e) {
            var
                activeItem = _slider.querySelector('.' + ClassName.ITEM_ACTIVE), // текущий элемент
                activeItemIndex = _getItemIndex(activeItem), // индекс текущего элемента
                targetItemIndex = e.target.getAttribute('data-slide-to');

            if (!(e.target.hasAttribute('data-slide-to') || e.target.classList.contains('slider__control'))) {
                return; // завершаем если клик пришёлся на не соответствующие элементы
            }
            if (e.target.hasAttribute('data-slide-to')) {// осуществляем переход на указанный сдайд
                if (activeItemIndex === targetItemIndex) {
                    return;
                }
                _slide((targetItemIndex > activeItemIndex) ? 'next' : 'prev', activeItemIndex, targetItemIndex);
            } else {
                e.preventDefault();
                _slideTo(e.target.classList.contains('slider__control_next') ? 'next' : 'prev   ');
            }
        },
        // установка обработчиков событий
        _setupListeners = function () {
            // добавление к слайдеру обработчика события click
            _slider.addEventListener('click', _actionClick);
            // остановка автоматической смены слайдов (при нахождении курсора над слайдером)
            if (_config.pause && _config.isCycling) {
                _slider.addEventListener('mouseenter', function (e) {
                    clearInterval(_interval);
                });
                _slider.addEventListener('mouseleave', function (e) {
                    clearInterval(_interval);
                    _cycle();
                });
            }
        };

    // init (инициализация слайдера)
    for (var key in config) {
        if (key in _config) {
            _config[key] = config[key];
        }
    }
    _slider = (typeof _config.selector === 'string' ? document.querySelector(_config.selector) : _config.selector);
    _items = _slider.querySelectorAll('.' + ClassName.ITEM);
    _sliderIndicators = _slider.querySelectorAll('[data-slide-to]');
    // запуск функции cycle
    _cycle();
    _setupListeners();

    return {
        next: function () { // метод next
            _slideTo('next');
        },
        prev: function () { // метод prev
            _slideTo('prev');
        },
        stop: function () { // метод stop
            clearInterval(_interval);
        },
        cycle: function () { // метод cycle
            clearInterval(_interval);
            _cycle();
        }
    }
}({
    selector: '.slider',
    isCycling: true,
    direction: 'next',
    interval: 5000,
    pause: true
}));
/*function viewdiv() {
    var b2 = document.getElementById('bt2_w');
    if (b2.style.display == "block") {
        b2.style.display = "none";
    } else {
        b2.style.display = "block";
    }
}*/

/*$("#bt2").click(function(e) {
    e.preventDefault();
    $("#bt2_w").addClass(' active');
    $("#bt3").removeClass(' active');
    $(this).removeClass(' active');
})*/


/*when click buttom, add class to id class="main__content__info" */
$(document).ready(function(){
    $("#bt1").click(function(){
        $("#bt1_w").addClass("active");/* return false;*/
        $("#bt4_w").removeClass("active");
        $("#bt2_w").removeClass("active");
        $("#bt3_w").removeClass("active");
    });
});
$(document).ready(function(){
    $("#bt2").click(function(){
        $("#bt2_w").addClass("active");/* return false;*/
        $("#bt4_w").removeClass("active");
        $("#bt1_w").removeClass("active");
        $("#bt3_w").removeClass("active");
    });
});
$(document).ready(function(){
    $("#bt3").click(function(){
        $("#bt3_w").addClass("active");/* return false;*/
        $("#bt4_w").removeClass("active");
        $("#bt1_w").removeClass("active");
        $("#bt2_w").removeClass("active");
    });
});
$(document).ready(function(){
    $("#bt4").click(function(){
        $("#bt4_w").addClass("active");/* return false;*/
        $("#bt2_w").removeClass("active");
        $("#bt1_w").removeClass("active");
        $("#bt3_w").removeClass("active");
    });
});

/*
add class to buttom when you click*/
$(document).ready(function () {
    $('#bt1').click(function () {
        $('#bt1').addClass('active_butm');
        $('#bt2').removeClass('active_butm');
        $('#bt3').removeClass('active_butm');
        $('#bt4').removeClass('active_butm');
    })
});
$(document).ready(function () {
    $('#bt2').click(function () {
        $('#bt2').addClass('active_butm');
        $('#bt1').removeClass('active_butm');
        $('#bt3').removeClass('active_butm');
        $('#bt4').removeClass('active_butm');
    })
});
$(document).ready(function () {
    $('#bt3').click(function () {
        $('#bt3').addClass('active_butm');
        $('#bt2').removeClass('active_butm');
        $('#bt1').removeClass('active_butm');
        $('#bt4').removeClass('active_butm');
    })
});
$(document).ready(function () {
    $('#bt4').click(function () {
        $('#bt4').addClass('active_butm');
        $('#bt2').removeClass('active_butm');
        $('#bt3').removeClass('active_butm');
        $('#bt1').removeClass('active_butm');
    })
});

/*
button up*/
$(document).ready(function(){
    $('body').append('<a href="#" id="go-top" title="Вверх"></a>');
});

$(function() {
    $.fn.scrollToTop = function() {
        $(this).hide().removeAttr("href");
        if ($(window).scrollTop() >= "250") $(this).fadeIn("slow")
        var scrollDiv = $(this);
        $(window).scroll(function() {
            if ($(window).scrollTop() <= "250") $(scrollDiv).fadeOut("slow")
            else $(scrollDiv).fadeIn("slow")
        });
        $(this).click(function() {
            $("html, body").animate({scrollTop: 0}, "slow")
        })
    }
});

$(function() {
    $("#go-top").scrollToTop();
});

//mobile menu
(function($){
    $(function() {
        $('.menu__icon').on('click', function() {
            $(this).closest('.menu')
                .toggleClass('menu_state_open');
        });

        $('.menu__links-item').on('click', function() {
            // do something

            $(this).closest('.menu')
                .removeClass('menu_state_open');
        });
    });
})(jQuery);
