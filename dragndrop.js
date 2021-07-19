$(document).ready(function () {

  dict = {};

  dict[0] = {
    Chinese: "剪",
    English: "to cut with scissors",
  }
  dict[1] = {
    Chinese: "喝",
    English: "to drink",
  }
  dict[2] = {
    Chinese: "塘",
    English: "pond",
  }
  dict[3] = {
    Chinese: "婆",
    English: "old woman",
  }
  dict[4] = {
    Chinese: "家",
    English: "family",
  }
  dict[5] = {
    Chinese: "想",
    English: "to think",
  }
  dict[6] = {
    Chinese: "拿",
    English: "to hold",
  }
  dict[7] = {
    Chinese: "星",
    English: "star",
  }
  dict[8] = {
    Chinese: "破",
    English: "broken",
  }
  dict[9] = {
    Chinese: "院",
    English: "yard",
  }

  choices = [0,1,2,3,4,5,6,7,8,9];  //array of dictionary indexes
  correctness = [];  //0 for incorrect, 1 for correct

  //shuffle dictionary
  function shuffle(array){
    var currentIndex = Object.keys(dict).length;
    var randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    console.log(array);
  }

  shuffle(dict);
  shuffle(choices);


  for(var i = 0; i < 10; i++){
    let row = 
    `
    <div class="row" style="height: 75px; font-size: calc(1rem + 0.5vw)"> 
      <div class="col col-4 text-end"  style="display: flex; align-items: center;">
        <span id="q${i}"></span>
        ${i+1}. ${dict[i].English}
      </div>
      <div class="col col-4 answers">
        <div class="drop_container" style="border: 1px solid black; min-width: 50px; width: 75%; max-width: 150px; height: 75%; text-align: center; margin: auto; position: absolute; top: 0px; left: 0px; right: 0px; bottom:0px; border-radius: 5px;"></div>
      </div>
      <div class="col col-4 choices">
        <div class="drop_container" style="background-color: lightgrey; min-width: 50px; width: 75%; max-width: 150px; height: 75%; text-align: center;  margin: auto; position: absolute; top: 0px; left: 0px; right: 0px; bottom:0px; border-radius: 5px;">
          <div class="draggable_item" style="height: 50px; min-width: 50px; max-width: 150px; height: 100%; display: flex; align-items: center; justify-content: center; background: #d0ddf2; box-shadow: 5px 5px 5px #8080807d; border-radius: 5px;">${dict[choices[i]].Chinese}</div>
        </div>
      </div>
      
    </div>
    `;

    $(".container").append(row);
  }

  $(".draggable_item").draggable({
    revert: "invalid",
    stack: ".draggable_item",
  });

  $(".drop_container").droppable({
    accept: function(){
      if($(this).find(".draggable_item").length == 0)
        return true;
    },
    drop: function(event, ui){
      ui.draggable.appendTo($(this)).position( { of: $(this), my: 'center', at: 'center' } );
    }
      
    
  });


  $("#check").click(function(){
    $(".answers").each(function(index){
      var chin = $(this).find(".draggable_item").html();
      console.log(chin);
      if(dict[index].Chinese == chin){
        correctness[index] = 1;
       $(`#q${index}`).append(`<span style="color:green;">&#10004;</span>`);
      }
      else{ 
        correctness[index] = 0;
        $(`#q${index}`).append(`<span style="color:red;">&#10008;</span>`);
      }
    });

    console.log(correctness);

  });

  //auto move item from answer box back to choices list
  $(".container").on(
    "click",
    ".answers > .drop_container > .draggable_item",
    function () {
      var draggableitem = $(this);
      $(".choices > .drop_container").each(function () {
        if ($(this).find(".draggable_item").length == 0) {
          draggableitem.appendTo($(this));
          return false; // return false to break out of each function
        }
      });
    }
  );
	
});
