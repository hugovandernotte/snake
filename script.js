var waitForEl = function(selector, callback) {
  if (jQuery(selector).length) {
    callback();
  } else {
    setTimeout(function() {
      waitForEl(selector, callback);
    }, 100);
  }
};

waitForEl("canvas", function() {
  let canva = jQuery("canvas");
  canva.wrap("<div class='flex'></div>");
  let flex = jQuery(".flex");
  flex.append("<div class='scores'></div>");
  let scores = jQuery(".scores");
  scores.append("<h3> Best scores: </h3>")
});
