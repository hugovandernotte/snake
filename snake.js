function Snake() {
  this.x = scl;
  this.y = scl;
  this.xspeed = 0;
  this.yspeed = 0;
  this.total = 0;
  this.tail = [];

  this.dir = function(x, y) {
    if (this.tail.length === 0 || (Math.abs(x - this.xspeed) !== 2 && Math.abs(y - this.yspeed) !== 2)) {
      this.xspeed = x;
      this.yspeed = y;
    }
  }

  this.eat = function(pos) {
    var d = dist(this.x, this.y, pos.x, pos.y);
    if (d < 1) {
      this.total++;
      return true;
    }
    else {
      return false;
    }
  }

  this.foodNotOnSnake = function(pos) {
    if (pos.x === 0 || pos.y === 0) {
      return false;
    }
    if (dist(this.x, this.y, pos.x, pos.y) < 1) {
      return false;
    }
    for (var i = 0; i < this.tail.length; i ++) {
      var d = dist(this.tail[i].x, this.tail[i].y, pos.x, pos.y);
      if (d < 1) {
        return false;
      }
    }
    return true;
  }

  this.death = function() {
    for (var i = 0; i < this.tail.length; i ++) {
      var pos = this.tail[i];
      var d = dist(this.x, this.y, pos.x, pos.y);
      if (d < 1) {
        this.total = 0;
        this.tail = [];
        window.alert("Perdu!");
        this.xspeed = 0;
        this.yspeed = 0;
      }
    }
  }

  this.update = function() {
      if (this.total === this.tail.length){
        for (var i = 0; i < this.tail.length; i ++) {
          this.tail[i] = this.tail[i+1];
        }
      }
      this.tail[this.total - 1] = createVector(this.x, this.y);
      this.x = this.x + this.xspeed*scl;
      this.y = this.y + this.yspeed*scl;

      this.x = constrain(this.x, 0, width - scl);
      this.y = constrain(this.y, 0, height - scl);
      side = outBorder();
      if (side) {
        this.replace(side);
      }
  }

  this.replace = function(side) {
    if (s.eat(food)) {
      fruit = pickLocation();
      s.tail[s.total - 1] = createVector(s.x, s.y);
    }
    if (side === "right") this.x = Math.abs((this.x - width));
    if (side === "left") this.x = width - 2 * scl;
    if (side === "top") this.y = height - 2 * scl;
    if (side === "bottom") this.y = Math.abs((this.y - height));
  }

  this.show = function() {
    fill(101,215,121);
    for (var i = 0; i < this.total; i++) {
      rect(this.tail[i].x, this.tail[i].y, scl, scl);
    }
    fill(193,58,50);
    rect(this.x, this.y, scl, scl);
  }
}
