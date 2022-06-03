var AnimModel = function (el, trigger) {
  this.el = el;
  this.x = el.getAttribute('data-x');
  this.y = el.getAttribute('data-y');
  this.trigger = trigger;
  
  window.addEventListener("scroll", this.watch.bind(this));
}

AnimModel.prototype.init = function () {
  TweenMax.set(this.el, {x: this.x, y: this.y, opacity: 0});
  this.watch();
}

AnimModel.prototype.watch = function () {
  var rect = this.el.getBoundingClientRect();
    var windowHeight = window.innerHeight;
    var toBottom = windowHeight - (rect.top + rect.width);
    if (toBottom > this.trigger) {
      this.start()
    }
}

AnimModel.prototype.start = function () {
  TweenMax.to(this.el, 1.5, {x: 0, y: 0, opacity: 1});
}

var anims = document.querySelectorAll('[data-anim]');
for (var i = 0; i < anims.length; i++) {
  var Anim = new AnimModel(anims[i], -60);
  Anim.init();
}