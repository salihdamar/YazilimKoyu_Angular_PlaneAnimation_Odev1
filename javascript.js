/* jet ve board olan elamanlara erişiyoruz.*/
var jet = document.getElementById("jet");
var board = document.getElementById("board");

//sola ve sola hareket
window.addEventListener("keydown", (e) => {
  var left = parseInt(window.getComputedStyle(jet).getPropertyValue("left"));
  if (e.key == "ArrowLeft" && left > 0) {
    jet.style.left = left - 8 + "px"; 
  }
  else if (e.key == "ArrowRight" && left <= 460) {
    jet.style.left = left + 8 + "px"; 
  }

  if (e.key == "ArrowUp" || e.keyCode == 32) {
    //32 is for space key
    var bullet = document.createElement("div");
    bullet.classList.add("bullets");
    board.appendChild(bullet);

    var movebullet = setInterval(() => {
      var rocks = document.getElementsByClassName("rocks");

      for (var i = 0; i < rocks.length; i++) {
        var rock = rocks[i];
        if (rock != undefined) {
          var rockbound = rock.getBoundingClientRect();
          var bulletbound = bullet.getBoundingClientRect();

          //Condition to check whether the rock/alien and the bullet are at the same position..!
          //If so,then we have to destroy that rock

          if (
            bulletbound.left >= rockbound.left &&
            bulletbound.right <= rockbound.right &&
            bulletbound.top <= rockbound.top &&
            bulletbound.bottom <= rockbound.bottom
          ) {
            rock.parentElement.removeChild(rock); //Just removing that particular rock;
            //Scoreboard
            document.getElementById("points").innerHTML =
              parseInt(document.getElementById("points").innerHTML) + 1;
          }
        }
      }
      var bulletbottom = parseInt(
        window.getComputedStyle(bullet).getPropertyValue("bottom")
      );

      //kusunun board dışına çıkışı engellendi
      if (bulletbottom >= 500) {
        clearInterval(movebullet);
      }

      bullet.style.left = left + "px"; 
      bullet.style.bottom = bulletbottom + 3 + "px";
    });
  }
});

//5 sn bir nesne üret
var generaterocks = setInterval(() => {
  var rock = document.createElement("div");
  rock.classList.add("rocks");  
  var rockleft = parseInt(
    window.getComputedStyle(rock).getPropertyValue("left")
  );
  rock.style.left = Math.floor(Math.random() * 450) + "px";

  board.appendChild(rock);
}, 5000);

//aşağı hareketi sağlanıyor.
var moverocks = setInterval(() => {
  var rocks = document.getElementsByClassName("rocks");

  if (rocks != undefined) {
    for (var i = 0; i < rocks.length; i++) {
      
      var rock = rocks[i];
      var rocktop = parseInt(
        window.getComputedStyle(rock).getPropertyValue("top")
      );
     
      if (rocktop >= 475) {
        alert("Game Over");
        clearInterval(moverocks);
        window.location.reload();
      }

      rock.style.top = rocktop + 25 + "px";
    }
  }
}, 450);
