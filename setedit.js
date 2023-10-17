class set {
    counts = 0;
    position = new position();
}

class position {
    //Side: Which side. (0 = A, 1 = B)
    side = 0;
    //Yard: What yard line divided by 5. (EG: 30 = 6, 45 = 9)
    yard = 10;
    //StepsY: Steps from yard line. (+ = outside, - = inside, 0 = on)
    stepsy = 0;
    //Line: Which line you are on. (0 = Front Sideline, 1 = Home Hash, 2 = Visitor Hash, 3 = Back Sideline)
    line = 1;
    //StepsL: Steps from line. (+ = behind, - = in front, 0 = on)
    stepsl = 0;
}

let cset = new set();

function updateset() {
    let setn = parseInt(document.getElementById("set").value);
    let counts =  parseInt(document.getElementById("counts").value);
  
    let side = document.getElementById("side").value;
    let stepsy = parseFloat(document.getElementById("stepsy").value);
    let stepsin = document.getElementById("stepsin").value;
    let yard = parseInt(document.getElementById("yard").value);

    let stepsl = parseFloat(document.getElementById("stepsl").value);
    let linein = document.getElementById("linein").value;
    let line = parseInt(document.getElementById("line").value);

    if(yard == 10) { document.getElementById("side").setAttribute("style", "display: none")} else { document.getElementById("side").setAttribute("style", "") }
    if(stepsin == "on") { document.getElementById("stepsy").setAttribute("style", "display: none")} else { document.getElementById("stepsy").setAttribute("style", "") }

    if(linein == "on") { document.getElementById("stepsl").setAttribute("style", "display: none")} else { document.getElementById("stepsl").setAttribute("style", "") }

    let cs = new set();
    cs.counts = counts;

    if(side == "sa") { cs.side = 0 } else { cs.side = 1 }
    cs.yard = yard;
    if(stepsin == "in") { cs.stepsy = -stepsy }
    else if(stepsin == "out") { cs.stepsy = stepsy }
    else { cs.stepsy = 0 }

    cs.line = line;
    if(linein == "f") { cs.stepsl = -stepsl }
    if(linein == "b") { cs.stepsl = stepsl }
    if(linein == "on") { cs.stepsl = 0 }

    cset = cs;
    
    return {s: setn, c: counts, sd: side, sty: stepsy, stin: stepsin, yd: yard, stl: stepsl, lin: linein, ln: line}
    
}