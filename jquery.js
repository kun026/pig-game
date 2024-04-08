$(document).ready(function () {
  let currentScore, scores, activePlayer, playing;
  
  const init = function () {
    currentScore = 0;
    scores = [0, 0];
    activePlayer = 0;
    playing = true;

    $(".score").text(0);
    $(".current-score").text(0);
    $(".dice").addClass("hidden");
    $(".player").removeClass("player--winner");
    $(".player--0").addClass("player--active");
    $(".player--1").removeClass("player--active");
  };

  init();

  // swtich player
  const switchPlayer = function () {
    currentScore = 0;
    $(`#current--${activePlayer}`).text(currentScore);

    activePlayer = activePlayer === 0 ? 1 : 0;

    $(".player--0").toggleClass("player--active");
    $(".player--1").toggleClass("player--active");
  };

  // roll dice
  $(".btn--roll").click(function () {
    if (playing) {
      let randomDice = Math.trunc(Math.random() * 6) + 1;

      $(".dice").removeClass("hidden").attr("src", `dice-${randomDice}.png`);

      if (randomDice === 1) {
        switchPlayer();
      } else {
        currentScore += randomDice;
        $(`#current--${activePlayer}`).text(currentScore);
      }
    }
  });

  // hold score
  $(".btn--hold").click(function () {
    if (playing) {
      scores[activePlayer] += currentScore;
      $(`#score--${activePlayer}`).text(scores[activePlayer]);

      if (scores[activePlayer] >= 100) {
        playing = false;
        $(".dice").addClass("hidden");
        $(`.player--${activePlayer}`)
          .addClass("player--winner")
          .removeClass("player--active");
      } else {
        switchPlayer();
        $(".dice").addClass("hidden");
      }
    }
  });

  $('.btn--new').click(init)
});
