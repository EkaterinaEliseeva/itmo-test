document.addEventListener('DOMContentLoaded', function() {

    const burger = document.querySelector('.header__burger');
    const navMenu = document.querySelector('.nav');
    const disciplines = document.querySelectorAll('.disciplines__name');
    const disciplinesText = document.querySelectorAll('.disciplines__description');

    if (!burger || !navMenu || !disciplines || !disciplinesText) {
        return;
    }

    burger.addEventListener('click', function(evt) {
        evt.preventDefault();
        console.log(1);

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


    /* popup */
    const openPopupBtn = document.querySelector('.contacts__btn');
    const popupWriteUs = document.querySelector('.popup-write-us');
    const opacityBlock = document.querySelector('.opacity');
    const popup = document.querySelector('.popup-write-us__wrapper');

    if (!openPopupBtn || !popupWriteUs) {
        return;
    }

    openPopupBtn.addEventListener('click', function(evt) {
        evt.preventDefault();

        popupWriteUs.classList.add('active');
        console.log(popup.scrollHeight);
        opacityBlock.style.height = popup.scrollHeight;


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
});
