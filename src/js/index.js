document.addEventListener('DOMContentLoaded', function() {

    const burger = document.querySelector('.header__burger');
    const navMenu = document.querySelector('.nav');
    const disciplines = document.querySelectorAll('.disciplines__name');
    const disciplinesText = document.querySelectorAll('.disciplines__description');
    const POPUP_HEIGHT = 700;

    if (!burger || !navMenu || !disciplines || !disciplinesText) {
        return;
    }

    burger.addEventListener('click', function(evt) {
        evt.preventDefault();

        if (burger.classList.contains('active')) {
            burger.classList.remove('active');
            navMenu.classList.remove('active');
        } else {
            burger.classList.add('active');
            navMenu.classList.add('active');
        }
    });

    disciplines.forEach(function(it,i) {
        it.addEventListener('click', function(evt) {
            evt.preventDefault();

            if (it.classList.contains('active')) {
                it.classList.remove('active');
                disciplinesText[i].classList.remove('active');
            } else {
                it.classList.add('active');
                disciplinesText[i].classList.add('active');
            }
        })
    });

    const popupWriteUsWrapper = document.querySelector('.popup-write-us__wrapper');

    if (document.body.offsetHeight > POPUP_HEIGHT) {
        if (!popupWriteUsWrapper.classList.contains('center')) {
            popupWriteUsWrapper.classList.add('center');
        }
    } else {
        if (popupWriteUsWrapper.classList.contains('center')) {
            popupWriteUsWrapper.classList.remove('center');
        }
    }

    /* popup */
    const openPopupBtn = document.querySelector('.contacts__btn');
    const popupWriteUs = document.querySelector('.popup-write-us');


    if (!openPopupBtn || !popupWriteUs) {
        return;
    }



    openPopupBtn.addEventListener('click', function(evt) {
        evt.preventDefault();

        popupWriteUs.classList.add('active');

        const popupCloseBtn = document.querySelector('.popup-write-us__close');
        const popupWriteUsWrapper = document.querySelector('.opacity');


        popupWriteUsWrapper.addEventListener('click', function(e) {
            e.preventDefault();

            if (e.target === popupWriteUsWrapper) {
                popupWriteUs.classList.remove('active');
            }
        });

        if (popupCloseBtn) {
            popupCloseBtn.addEventListener('click', function(evt) {
                evt.preventDefault();

                popupWriteUs.classList.remove('active');
            });
        }




    });


    /* validation form */

    const popupSuccess = document.querySelector('.popup_success');
    const popupError = document.querySelector('.popup_error');

    const form = document.querySelector('form');
    const phone = form.querySelector('#phone');
    let validatePhone = false;

    const maskOptions = {
        mask: '+{7}(000)000-00-00'
    };
    const mask = IMask(phone, maskOptions);


    mask.on("accept", function () {
        validatePhone = false;
    });

    mask.on("complete", function () {
        validatePhone = true;
    });


    const errorTemplate = document.querySelector('.error');

    function validateEmail(email) {
        const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

        if(reg.test(email) === false) {

            errorTemplate.classList.add('active');
            errorTemplate.textContent = 'Введите корректный e-mail!';

            return false;

        } else {

            errorTemplate.classList.remove('active');
            errorTemplate.textContent = '';

            return true;
        }
    }

    function validatePhoneNumber() {
        if (!validatePhone) {
            errorTemplate.classList.add('active');
            errorTemplate.textContent = 'Введите корректный телефон!';

            return false;
        } else {
            errorTemplate.classList.remove('active');
            errorTemplate.textContent = '';

            return true;
        }
    }

    function closePopupSuccess(evt) {
        evt.preventDefault();
        const popupSuccessCloseBtn = document.querySelector('.popup_success__close-btn');
        const popupSuccessContainer = document.querySelector('.popup_success .opacity');

        if ((evt.target === popupSuccessCloseBtn) || (evt.target === popupSuccessContainer)) {
            popupSuccess.classList.remove('active');

            document.removeEventListener('click', closePopupSuccess);
        }
    }

    function validateMessage(message) {
        if (message.length > 300) {
            errorTemplate.classList.add('active');
            errorTemplate.textContent = 'Сообщение должно содержать не более 300 символов!';

            return false;
        } else {
            errorTemplate.classList.remove('active');
            errorTemplate.textContent = '';

            return true;
        }
    }


    form.addEventListener('submit', function (evt) {
        evt.preventDefault();

        const email = form.querySelector('#email').value;
        const name = form.querySelector('#name').value;
        const message = form.querySelector('#message').value;

        validateEmail(email);

        validatePhoneNumber();

        validateMessage(message);

        if (validateEmail(email) && validatePhoneNumber() && validateMessage(message)) {


            /*
            * fetch(url)
            * .then(show popup-success)
            * .catch(show popup error)
            * */

            setTimeout(function() {

                popupWriteUs.classList.remove('active');

                popupSuccess.classList.add('active');

                document.addEventListener('click', closePopupSuccess);

            }, 1000);

        }
    });


    /* slider */
    const sliderPrevBtn = document.querySelector('.arrow_left');
    const sliderNextBtn = document.querySelector('.arrow_right');
    const sliderArray = document.querySelectorAll('.slider__item');

    if (!sliderPrevBtn || !sliderNextBtn || !sliderArray) {
        return;
    }

    sliderNextBtn.addEventListener('click', function(evt) {
        evt.preventDefault();

        const activeItem = document.querySelector('.slider__item.active');

        const arr = Array.from(sliderArray);

        const index = arr.indexOf(activeItem);

        activeItem.classList.remove('active');

        sliderArray[(index + 1) % sliderArray.length].classList.add('active');

    });

    sliderPrevBtn.addEventListener('click', function(evt) {
        evt.preventDefault();

        const activeItem = document.querySelector('.slider__item.active');

        const arr = Array.from(sliderArray);

        let index = arr.indexOf(activeItem) - 1;

        activeItem.classList.remove('active');

        if (index < 0) {
            index = arr.length - 1;
        }


        sliderArray[index].classList.add('active');

    });




});
