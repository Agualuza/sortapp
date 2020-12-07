const container = document.querySelector("#container-bubble-sort");

async function bubbleSort(delay = 1000,l_i = 0,l_j = 0) {
    if (delay && typeof delay !== "number") {
      alert("Primeiro argumento tem que ser do tipo número");
      return;
    }
    if(l_i > 0 || l_j > 0){
      document.querySelectorAll(".block").forEach((e) => {
        e.backgroundColor = "";
      });
    }
    let blocks = document.querySelectorAll(".block");
    for (let i = l_i; i < blocks.length - 1; i += 1) {
      for (let j = l_j; j < blocks.length - i - 1; j += 1) {
        if(locked) {
          var html = "<div class='clear-msg-change' align='center'><p style='font-size:42px;color:white;'><b>Pausado</b></p><div>"; 
          $('.clear-msg-change').remove();
          $("#row-sort-bubble-text").append(html);
          break;
        } else {
            locked_i = i;
            locked_j = j;
            blocks[j].style.backgroundColor = "#FF4949";
            blocks[j + 1].style.backgroundColor = "#FF4949";
      
            await new Promise(resolve =>
              setTimeout(() => {
                resolve();
              }, delay)
            );
      
            const value1 = Number(blocks[j].childNodes[0].innerHTML);
            const value2 = Number(blocks[j + 1].childNodes[0].innerHTML);
      
            if (value1 > value2) {
              await swap(blocks[j], blocks[j + 1]);
              blocks = document.querySelectorAll(".block");
            }
      
            blocks[j].style.backgroundColor = "#86ecfb";
            blocks[j + 1].style.backgroundColor = "#86ecfb";
        }
      }
      if(!locked) {
        blocks[blocks.length - i - 1].style.backgroundColor = "#13CE66";
      }
    }
    if(!locked) {
      blocks[0].style.backgroundColor = "#13CE66";
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
