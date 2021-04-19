javascript:
!(function(){
	console.log("badapple effect enabled");

	function renderVideoFrame(videoDom) {
		var asciiList = ['猿','帅','老','大', '　'];

		var scale = parseInt(videoDom.videoHeight/parseFloat($(videoDom).css("height")));
		var gap = 12/scale;
		console.log(scale);

		var videoSize = {width:parseFloat(videoDom.videoWidth/scale),height:parseFloat(videoDom.videoHeight/scale)};

		var canvas = document.querySelector("#badapplecanvas");
		if(!canvas){
			canvas = document.createElement("canvas");
			canvas.id = "badapplecanvas";
			canvas.style.width = videoDom.style.width;
			canvas.style.height = videoDom.style.height;
			canvas.style.position = "absolute";
			canvas.style.background = "#fff";
			canvas.style.zIndex = 999;
			canvas.style.top = "0";
			canvas.style.left = (parseFloat($(videoDom).css("width"))-videoSize.width)/2 + "px";
			canvas.width = videoSize.width;
			canvas.height = videoSize.height;

			videoDom.parentElement.appendChild(canvas);
		}

		const ctx = canvas.getContext("2d");

		ctx.drawImage(videoDom, 0, 0, videoSize.width, videoSize.height);

		var imgData = ctx.getImageData(0, 0, videoSize.width, videoSize.height).data;
		ctx.clearRect(0, 0, videoSize.width, videoSize.height);
		ctx.font=gap + "px Verdana";


		for (var h = 0; h < videoSize.height; h+=gap) {
			for(var w = 0; w < videoSize.width; w+=gap){
				var position = (videoSize.width * h + w) * 4;
				var r = imgData[position], g = imgData[position + 1], b = imgData[position + 2];

				var gray = (r*30 + g*59 + b*11 + 50) / 100;

				var i = Math.min(asciiList.length-1,parseInt(gray / (255 / asciiList.length)));

				ctx.fillText(asciiList[i], w, h);
			}
		}
	}

	var videoDom = document.querySelector("video");
	videoDom.style.display = "none";
	videoDom.addEventListener('canplay',function(){
		renderVideoFrame(videoDom);
	});

	videoDom.addEventListener('play',function(){
		console.log("开始播放");
		// btnPlayAndPause.innerText = "";

		startRender();
	});

	//监听播放结束
	videoDom.addEventListener('pause',function(){
	    console.log("播放暂停");
	    // btnPlayAndPause.innerText = "play";

	    stopRender();
	}); 

	//监听播放结束
	videoDom.addEventListener('ended',function(){
	    console.log("播放结束");
	    // btnPlayAndPause.innerText = "play";

	    stopRender();
	});

	var timerId;
	function startRender() {
		timerId = requestAnimationFrame(updateRender);
	}
	function updateRender(){
		renderVideoFrame(videoDom);
		timerId = requestAnimationFrame(updateRender);
	}
	function stopRender(){
		cancelAnimationFrame(timerId);
	}
})()