async function importjs(file) {
	load = false;
	console.log("Loading: "  + file);
	return new Promise((resolve, reject) => {
		let timeWas = new Date();
		script = document.createElement("script");
		script.src = file;
		document.body.appendChild(script);
		script.onload = function(){
			load = true;
		};
		let wait = window.setInterval(function() {
			if(load)
			{
				clearInterval(wait);
				console.log("Loaded: " + file);
				resolve();
			}
		}, 5);
	});
}