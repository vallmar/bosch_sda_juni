var BANNER_SELECTORS = {
    content: '.M-B-BannerLeaderBoard__contentBlock',
    contentAnimate: 'M-B-BannerLeaderBoard__contentBlock--animate',
    contentAnimateLast: 'M-B-BannerLeaderBoard__contentBlock--animateLast',
    background: '.M-B-BannerLeaderBoard__bg',
    backgroundAnimate: 'M-B-BannerLeaderBoard__bg--animate',
    loop: '.M-B-BannerLeaderBoard--loop'
};

var BANNER_CONTENT_DURATION = 4800;

var BannerAnimator = function() {
    this.currentContent = 0;
    this.bannerBackgrounds = document.querySelectorAll(BANNER_SELECTORS.background);
    this.bannerContents = document.querySelectorAll(BANNER_SELECTORS.content);
    this.isLoop = (document.querySelector(BANNER_SELECTORS.loop) !== null);

    this.animate();
};

BannerAnimator.prototype.animate = function() {
    var that = this;

    var currentClass = (that.currentContent === that.bannerContents.length-1) && !that.isLoop ? BANNER_SELECTORS.contentAnimateLast : BANNER_SELECTORS.contentAnimate;

    that.bannerContents[that.currentContent].classList.remove(currentClass);
    void that.bannerContents[that.currentContent].offsetWidth;
    that.bannerContents[that.currentContent].classList.add(currentClass);

    if(that.bannerBackgrounds[that.currentContent]) {
        that.bannerBackgrounds[that.currentContent].classList.add(BANNER_SELECTORS.backgroundAnimate);
        if(that.bannerBackgrounds[that.currentContent-1]) {
            that.bannerBackgrounds[that.currentContent-1].classList.remove(BANNER_SELECTORS.backgroundAnimate);
        }
    }

    that.currentContent += 1;

    if(that.currentContent === that.bannerContents.length &&
       that.isLoop) {
        that.lastContent = that.bannerContents.length - 1;
        that.currentContent = 0;
    }

    if(that.currentContent < that.bannerContents.length) {
        window.setTimeout(function() {

            if(that.currentContent === 0) {
                that.rebuildBg();
            }

            that.animate();
        }, BANNER_CONTENT_DURATION);
    }
};

BannerAnimator.prototype.rebuildBg = function() {
    if(this.bannerBackgrounds.length >= 2) {
        if(this.bannerBackgrounds.length === 3) {
            this.bannerBackgrounds[this.bannerBackgrounds.length-1].classList.remove(BANNER_SELECTORS.backgroundAnimate);
            this.bannerBackgrounds[this.bannerBackgrounds.length-2].classList.remove(BANNER_SELECTORS.backgroundAnimate);
        }
    }
};
