const containerMerge = document.querySelector("#container-merge-sort");

 mergeSort = array => {
    if(array.length < 2) return array;
  
    array = array.map(function (x) { 
        return parseInt(x); 
    });
  
    const middle = Math.floor(array.length / 2);
    const leftSide = array.slice(0, middle);
    const rightSide = array.slice(middle, array.length);
    var aux = new Map();
    var new_l = leftSide;
    var new_r = rightSide;

    if (leftSide.length == 1){
        new_l = [leftSide[0]];
    }

    if (rightSide.length == 1){
        rightSide.length = 1;
        new_r = [rightSide[0]];
    }
    aux.set("t","s");
    aux.set("l",new_l);
    aux.set("r",new_r);
    steps.push(aux);
    return doMerge(mergeSort(leftSide), mergeSort(rightSide));
  }
  
  doMerge = (left, right) => {
    const result = [];
    while(left.length && right.length) {
      if(left[0] <= right[0]) {
        result.push(left.shift());
      } else {
        result.push(right.shift());
      }
    }
    while(left.length) result.push(left.shift());
    while(right.length) result.push(right.shift());
    var aux = new Map();
    var new_res = [];
    result.forEach((r) => {
        new_res.push(r);
    });
    
    aux.set("t","r");
    aux.set("r",new_res);
    steps.push(aux);
    return result;
  }
    
function generateBlocksMerge(list, end = false) {
    list.forEach((i) => {
      const block = document.createElement("div");
      block.classList.add("block");
      block.classList.add("number-item");
      if (end) {
        block.classList.add("merged");  
      }
      const blockLabel = document.createElement("label");
      blockLabel.classList.add("block__id");
      blockLabel.classList.add("card-body");
      blockLabel.innerHTML = i;
  
      block.appendChild(blockLabel);
      containerMerge.appendChild(block);
    });
  }

  doAnimationMerge = async (list) => {
    generateBlocksMerge(list);
    merged = mergeSort(list);
    createPartitions();
  }

  async function createPartitions() {
      var i = 1;
      var delta_time = 2000;
      steps.forEach((s) => {
        setTimeout(function (){
            if (locked_merge) {
                var html = "<div class='clear-msg-change' align='center'><p style='font-size:42px;color:white;'><b>Pausado</b></p><div>"; 
                $('.clear-msg-change').remove();
                $("#row-sort-merge-text").append(html);
                return;
            }
            const new_div = document.createElement("div");
            if (steps.length == 1) {
                new_div.classList.add("flex-a");
            } else {
                new_div.classList.add("flex-b");
            }
            new_div.classList.add("col-12");
            new_div.classList.add("my-5");
            if(s.get("t") == "s") {
                left = s.get("l");
                right = s.get("r");
                var cont = document.createElement("div");
                cont.classList.add("row");
                
                left.forEach((e) => {
                    // setTimeout(function (){
                        var block = document.createElement("div");
                        block.classList.add("block");
                        block.classList.add("number-item");
                        var blockLabel = document.createElement("label");
                        blockLabel.classList.add("block__id");
                        blockLabel.classList.add("card-body");
                        blockLabel.innerHTML = e;
                        block.appendChild(blockLabel);
                        cont.appendChild(block);
                        doScroll();
                    // },i*delta_time);
                });

                var cont2 = document.createElement("div");
                cont2.classList.add("row");

                right.forEach((e) => {
                    // setTimeout(function (){
                        var block2 = document.createElement("div");
                        block2.classList.add("block");
                        block2.classList.add("number-item");
                        var blockLabel2 = document.createElement("label");
                        blockLabel2.classList.add("block__id");
                        blockLabel2.classList.add("card-body");
                        blockLabel2.innerHTML = e;
                        block2.appendChild(blockLabel2);
                        cont2.appendChild(block2);
                        doScroll();
                    // },i*delta_time);
                });
                new_div.appendChild(cont);
                new_div.appendChild(cont2);
                containerMerge.appendChild(new_div);

            } else if (s.get("t") == "r") {
                result = s.get("r");
                if (result.length > 0) {
                    var cont3 = document.createElement("div");
                    cont3.classList.add("row");
                    cont3.classList.add("result");
                    result.forEach((e) => {
                        // setTimeout(function (){
                            var block3 = document.createElement("div");
                            block3.classList.add("block");
                            block3.classList.add("number-item");
                            
                            var blockLabel3 = document.createElement("label");
                            blockLabel3.classList.add("block__id");
                            blockLabel3.classList.add("card-body");
                            blockLabel3.innerHTML = e;
                            block3.appendChild(blockLabel3);
                            cont3.appendChild(block3);
                        // },i*delta_time);
                        doScroll();
                    });
                    new_div.appendChild(cont3);
                    containerMerge.appendChild(new_div);
                }
            }
            steps.shift();
        },i*delta_time);
        i++;

      });
  }

  doScroll = () => {
    var heightPage = $("#row-sort-merge-buttons").offset().top;
    window.scrollTo(0 , heightPage);
  }
