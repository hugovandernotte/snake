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

  this.eat = function(pos, fruit) {
    var d = dist(this.x, this.y, pos.x, pos.y);
    if (d < 1) {
      this.total++;
      score += fruit.points;
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
        score = 0;
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

      this.edges();
  }

  this.edges = function() {
    if (this.x > width) this.x = 0;
    if (this.x < 0) this.x = width - scl;
    if (this.y > height) this.y = 0;
    if (this.y < 0) this.y = height - scl;
  }

  this.show = function() {
    fill(68,150,107);
    for (var i = 0; i < this.total; i++) {
      rect(this.tail[i].x, this.tail[i].y, scl, scl);
    }
    fill(193,58,50);
    rect(this.x, this.y, scl, scl);
  }
}
