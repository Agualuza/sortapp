const container = document.querySelector("#container-bubble-sort");

async function bubbleSort(delay = 1000,l_i = 0,l_j = 0, paused = false) {
    if (delay && typeof delay !== "number") {
      alert("Primeiro argumento tem que ser do tipo número");
      return;
    }
   
    let blocks = document.querySelectorAll(".block");
    for (let i = 0; i < blocks.length - 1; i += 1) {
      console.log("i => "+i);
      for (let j = 0; j < blocks.length - i - 1; j += 1) {
        console.log("j => "+j);

        console.log("locked => "+locked);
        if(locked) {
          var html = "<div class='clear-msg-change' align='center'><p style='font-size:42px;color:white;'><b>Pausado</b></p><div>"; 
          $('.clear-msg-change').remove();
          $("#row-sort-bubble-text").append(html);
          break;
        } else {
            locked_i = i;
            locked_j = j;
            if(!paused || i > l_i || (i == l_i && j > l_j)) {
              blocks[j].style.backgroundColor = "#FF4949";
              blocks[j + 1].style.backgroundColor = "#FF4949";
            
              await new Promise(resolve =>
                setTimeout(() => {
                  resolve();
                }, delay)
              );
        
              const value1 = Number(blocks[j].childNodes[0].innerHTML);
              const value2 = Number(blocks[j + 1].childNodes[0].innerHTML);
              console.log("change" +value1+ " <=> "+value2)
              if (value1 > value2) {
                await swap(blocks[j], blocks[j + 1]);
                blocks = document.querySelectorAll(".block");
                var html = "<div class='clear-msg-change-pre' align='center'><p style='width: auto;font-size:42px;color:white;'><b>" + value1 + "⇔" + value2 + "</b></p><div>"; 
                $('.clear-msg-change-pre').remove();
                $("#bubble-pre").append(html);
              }
        
              blocks[j].style.backgroundColor = "#86ecfb";
              blocks[j + 1].style.backgroundColor = "#86ecfb";
            }
        }
      }
      if(!locked) {
        blocks[blocks.length - i - 1].style.backgroundColor = "#13CE66";
      }
    }
    if(!locked) {
      blocks[0].style.backgroundColor = "#13CE66";
      var html = "<div class='clear-msg-change-pre' align='center'><p style='width: auto;font-size:42px;color:white;'><b>" + "Ordenado" +"</b></p><div>"; 
      $('.clear-msg-change-pre').remove();
      $("#bubble-pre").append(html);
    }
  }
  
  function generateBlocks(list) {
    list.forEach((i) => {
      const block = document.createElement("div");
      block.classList.add("block");
      block.classList.add("number-item");

      const blockLabel = document.createElement("label");
      blockLabel.classList.add("block__id");
      blockLabel.classList.add("card-body");
      blockLabel.innerHTML = i;
  
      block.appendChild(blockLabel);
      container.appendChild(block);
    });
  }
  
  function swap(el1, el2) {
    return new Promise(resolve => {
      const style1 = window.getComputedStyle(el1);
      const style2 = window.getComputedStyle(el2);
  
      const transform1 = style1.getPropertyValue("transform");
      const transform2 = style2.getPropertyValue("transform");
  
      el1.style.transform = transform2;
      el2.style.transform = transform1;
  
      window.requestAnimationFrame(function() {
        setTimeout(() => {
          container.insertBefore(el2, el1);
          resolve();
        }, 250);
      });
    });
  }
