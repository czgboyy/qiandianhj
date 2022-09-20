window.addEventListener('load', function () {
    // 局部导航栏精灵图
    var spans = document.querySelector('.local-nav').querySelectorAll('.local-nav-icon');
    for (let i = 0; i < spans.length; i++) {
        spans[i].style.backgroundPosition = '0 -' + 32 * i + 'px';
    }
    //移动端轮播图
    //1.可以自动播放图片
    //2.手指可以拖动播放轮播图

    // 动态生成小圆点
    var focus = document.querySelector('.focus');
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('ol');
    var ul_li = ul.children[0];
    var w = ul_li.offsetWidth;
    var num = 0;
    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        li.setAttribute('index', i);
        ol.appendChild(li);
    }
    ol.children[0].className = 'current';
    // 克隆第一张在最后，最后一张在最前
    var last = ul.children[ul.children.length - 1].cloneNode(true);
    ul.insertBefore(last, ul.children[0]);
    var first = ul.children[1].cloneNode(true);
    ul.appendChild(first);
    ul.style.marginLeft = -w + 'px';
    // 设置定时器
    var timer = setInterval(function () {
        num++;
        var translatex = -w * num;
        ul.style.transform = 'translateX(' + translatex + 'px)';
        ul.style.transition = 'all .3s';
    }, 2000);

    ul.addEventListener('transitionend', function () {
        if (num >= 3) {
            num = 0;
            ul.style.transition = 'none';
            ul.style.transform = 'translateX(0)';
        } else if (num < 0) {
            num = 2;
            ul.style.transition = 'none';
            ul.style.transform = 'translateX(-' + num * w + 'px)';
        }
        // 小圆点变化
        ol.querySelector('li.current').classList.remove('current');
        ol.children[num].classList.add('current');
    })

    //手指拖动
    var startX = 0;
    var moveX = 0;
    ul.addEventListener('touchstart', function (e) {
        // 第一次触碰的位置
        startX = e.targetTouches[0].pageX;
        clearInterval(timer);
    })
    ul.addEventListener('touchmove', function (e) {
        moveX = e.targetTouches[0].pageX - startX;
        var translatex = -num * w + moveX;
        ul.style.transition = 'none';
        ul.style.transform = 'translateX(' + translatex + 'px)';
        e.preventDefault;
    })
    // 根据手指移动的距离来判断上一张还是下一张
    ul.addEventListener('touchend', function () {
        // 如果移动距离大于50px就移动到下一张或者上一张
        if (Math.abs(moveX) > 50) {
            if (moveX > 0) {
                num--;
            } else {
                num++;
            }
            var translatex = -w * num;
            ul.style.transform = 'translateX(' + translatex + 'px)';
            ul.style.transition = 'all .3s';
        } else {
            var translatex = -w * num;
            ul.style.transform = 'translateX(' + translatex + 'px)';
            ul.style.transition = 'all .1s';
        }
        clearInterval(timer);
        timer = setInterval(function () {
            num++;
            var translatex = -w * num;
            ul.style.transform = 'translateX(' + translatex + 'px)';
            ul.style.transition = 'all .3s';
        }, 2000);

    })

    // 返回顶部
    var goBack = document.querySelector('.goBack');
    var nav = document.querySelector('nav');
    window.addEventListener('scroll', function () {
        if (window.pageYOffset > nav.offsetTop) {
            goBack.style.display = 'block';
        } else {
            goBack.style.display = 'none';
        }
    })
    goBack.addEventListener('touchend', function () {
        window.scroll(0, 0);
    })
});