//setup slider
var theSlider;
var animationSpeed = 500;
$(document).ready(function () {
    theSlider = $('.features-slider .bxslider').bxSlider({
        mode: 'vertical',
        pager: false,
        auto: true,
        touchEnabled: false,
        pause: 4000,
        controls: false,
        autoHover: true,
        infiniteLoop: true,
        adaptiveHeight: true,
        slideMargin: 100,
        onSliderLoad: function (currentIndex) {
            setupSlider(currentIndex);
        },
        hideControlOnEnd: true,
        onSlideBefore: function ($slideElement, oldIndex, newIndex) {
            toggleSlider($slideElement, oldIndex, newIndex);
        },
        speed: animationSpeed
    });
});

function setupSlider(currentIndex) {
    $('.features-slider .slide.page' + currentIndex).toggleClass('active');
    $('.features-slider .slide').click(function (dom) {
        var index;
        try {
            index = dom.currentTarget.dataset.page;
        } catch (error) {
            index = dom.currentTarget.getAttribute('data-page');
        }
        theSlider.goToSlide(index);
        $('.features-slider .slide').removeClass('active');
        $('.features-slider .slide.page' + index).addClass('active');
        theSlider.stopAuto();
    });
}

function toggleSlider($slideElement, oldIndex, newIndex) {
    setTimeout(function () {
        $('.features-slider .slide.page' + oldIndex).removeClass('active');
        $('.features-slider .slide.page' + newIndex).addClass('active');
    }, animationSpeed / 2);
}

function goToSlide0() {
    theSlider.goToSlide(0);
}
