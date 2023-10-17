
glscript = document.createElement("script");
glscript.src = gameconfig.enginepath + "/import.js";
document.body.appendChild(glscript);

glscript.onload = function(){
	imports();
};

async function imports()
{
	//LIBRARIES
	await importjs(gameconfig.enginepath + "/galaxyaudio.js");
    await importjs(gameconfig.enginepath + "/galaxygfx.js");
    await importjs(gameconfig.enginepath + "/galaxyinput.js");
	
	//ENGINE
	await importjs(gameconfig.enginepath + "/main.js");

    //LOAD GAME MAIN
    await importjs(gameconfig.main);
}