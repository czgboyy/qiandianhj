window.addEventListener('load', function () {
    // 局部导航栏精灵图
    var spans = document.querySelector('.local-nav').querySelectorAll('.local-nav-icon');
    for (let i = 0; i < spans.length; i++) {
        spans[i].style.backgroundPosition = '0 -' + 32 * i + 'px';
    }

})