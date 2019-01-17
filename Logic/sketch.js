var element;
var calls = [];
var vist = [];
var st, en;
var pulse;

function setup() {
	createCanvas(1500, 750);
	elements = new Array(1000);
	for(var i = 0; i < elements.length; i++){
		elements[i] = random(0, height);
	}
	vis = new Array(1000);
	for(var i = 0; i < vis.length; i++){
		vis[i] = new Array(vis.length);
		for(var j = 0; j < vis.length; j++){
			vis[i][j] = 0;
		}
	}
	calls.push(createVector(0, elements.length - 1));
	
	pulse = new p5.Pulse();
	pulse.amp(0.5);
	pulse.freq(220);
	pulse.start();
}

function draw() {
	background(255);
	//frameRate(5);
	mergeSort();
	var size = width / elements.length;
	print(elements.length);
	for(var i = 0; i < elements.length; i++){
		noStroke();
		if(st <= i && i <= en){
			fill(255, 0, 0);
			pulse.freq(elements[i]);
		}
		else{
			if(st == en){
				fill(0, 255, 0);
				pulse.stop();
			}
			else
				fill(0);
		}
		rect(i * size, height - elements[i], size, elements[i]);
	}
}

function merge(l1, r1, l2, r2){
	var temp = [];
	var idx1 = l1, idx2 = l2;
	while (idx1 <= r1 && idx2 <= r2) {
		if(elements[idx1] <= elements[idx2])
			temp.push(elements[idx1]), idx1++;
		else
			temp.push(elements[idx2]), idx2++;
	}
	while (idx1 <= r1) {
		temp.push(elements[idx1]);
		idx1++;
	}
	while (idx2 <= r2) {
		temp.push(elements[idx2]);
		idx2++;
	}
	for(var i = l1, j = 0; i <= r2; i++, j++)
		elements[i] = temp[j];
}

function mergeSort(){
	while (calls.length > 0) {
		l = calls[calls.length - 1].x, r = calls[calls.length - 1].y;
		print(l + ' '  + r);
		if(l == r){
			calls.pop();
			continue;
		}
		var mid = floor((l + r) / 2);
		if(!vis[l][mid]){
			vis[l][mid] = 1;
			calls.push(createVector(l, mid));
			continue;
		}
		if(!vis[mid + 1][r]){
			vis[mid + 1][r] = 1;
			calls.push(createVector(mid + 1, r));
			continue;
		}
		merge(l, mid, mid + 1, r);
		calls.pop();
		st = l, en = r;
		return;
	}
	st = -1, en = -1;
}
