//复制下面的代码，打开网址：https://www.sojson.com/yasuojs.html
//粘贴后选择普通压缩，然后再粘贴到收藏夹网页地址栏中

javascript:
(function(str,bgap=12,color=0){

	var asciiList = str.split("");

	function renderVideoFrame(videoDom) {

		var scale =1;

		if(videoDom.videoHeight>videoDom.videoWidth){
			scale = parseInt(videoDom.videoHeight/parseFloat($(videoDom).css("height")));
		}else{
			scale = parseInt(videoDom.videoWidth/parseFloat($(videoDom).css("width")));
		}

		var gap = bgap/scale;

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

				if(color){
					ctx.fillStyle = "rgb("+r+","+g+","+b+")";
					ctx.fillText(asciiList[0], w, h);
				}else{
					var gray = (r*30 + g*59 + b*11 + 50) / 100;

					var i = Math.min(asciiList.length-1,parseInt(gray / (255 / asciiList.length)));

					ctx.fillText(asciiList[i], w, h);
				}
			}
		}
	}

	var videoDom = document.querySelector("video");
	videoDom.style.display = "none";

	videoDom.addEventListener('play',function(){
		startRender();
	});

	//监听播放结束
	function pauseAndStopHandler(){
	    stopRender();
	}
	videoDom.addEventListener('pause',pauseAndStopHandler); 
	videoDom.addEventListener('ended',pauseAndStopHandler);

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

	console.log("badapple effect enabled");
})("猿老帅大 ");