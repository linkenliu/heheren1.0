function uploadImg(token) {
	var uploader = WebUploader.create({
		// 选完文件后，是否自动上传
		auto: true,
		// swf文件路径
		swf: '/webuploader-0.1.5/Uploader.swf',
		// 文件接收服务端。
		server: 'http://upload.qiniu.com/',
		// 选择文件的按钮。可选。
		// 内部根据当前运行是创建，可能是input元素，也可能是flash.
		pick: '#picker',
		// 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
		resize: false,
		// 只允许选择图片文件。
		accept: {
			title: 'Images',
			extensions: 'gif,jpg,jpeg,bmp,png',
			mimeTypes: 'image/*'
		},
		formData: {
			token: token
		},
		duplicate: true, // 去重， 根据文件名字、文件大小和最后修改时间来生成hash Key
		fileNumLimit: 9 // 超出则不允许加入队列
	});

	// 当有文件被添加进队列的时候
	uploader.on('fileQueued', function(file) {
		$("#imgList").append(
		  '<div id="pic_' + file.id + '" class="item-uploader">' +
			  '<img src="" class="images-uploader" width="120" height="80">' +
			  '<input type="hidden" class="qkey" name="picture" value="">' +
			  '<a  href="#" id="img2_'+ file.id +'" class="delimg"><i class="glyphicon glyphicon-remove" style="color:red"></i></a>' +
		  '</div>'
		);
	});

	// 文件上传过程中创建进度条实时显示。
	uploader.on('uploadProgress', function(file, percentage) {
		var $li = $('#' + file.id),
			$percent = $li.find('.progress .progress-bar');
		// 避免重复创建
		if (!$percent.length) {
			$percent = $(
				'<div class="progress progress-striped active">' +
				'<div class="progress-bar" role="progressbar" style="width: 0%"></div>' +
				'</div>'
			).appendTo($li).find('.progress-bar');
		}
		$percent.css('width', percentage * 100 + '%');
	});

	// 文件上传完成功触发事件
	uploader.on('uploadSuccess', function(file, response) {
		var path = "http://7xoxjl.com1.z0.glb.clouddn.com/";
		$('#pic_' + file.id).find('input.qkey').val(response.key);
		$('#pic_' + file.id).find('img.images-uploader').attr("src", path + response.key);
		$("#img2_"+file.id).bind("click", function() {
			var key = response.key;
			$.post('/superAdmin/image/delete',{qiniuKey:key},function(data){
				$('#pic_' + file.id).remove();
			});
		});
	});

	// 文件上次完失败触发事件
	uploader.on('uploadError', function(file) {
		$('#' + file.id).find('p.state').text('上传出错');
	});

	// 文件上传完成触发事件
	uploader.on('uploadComplete', function(file) {
		$('#' + file.id).find('.progress').fadeOut();
	});
	
	return uploader;
}



//上传图片
function uploadBanner(token) {
	var uploader = WebUploader.create({
		// 选完文件后，是否自动上传
		auto: true,
		// swf文件路径
		swf: '/webuploader-0.1.5/Uploader.swf',
		// 文件接收服务端。
		server: 'http://upload.qiniu.com/',
		// 选择文件的按钮。可选。
		// 内部根据当前运行是创建，可能是input元素，也可能是flash.
		pick: '#picker2',
		// 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
		resize: false,
		// 只允许选择图片文件。
		accept: {
			title: 'Images',
			extensions: 'gif,jpg,jpeg,bmp,png',
			mimeTypes: 'image/*'
		},
		formData: {
			token: token
		},
		duplicate: true, // 去重， 根据文件名字、文件大小和最后修改时间来生成hash Key
		fileNumLimit: 9 // 超出则不允许加入队列
	});

	// 当有文件被添加进队列的时候
	uploader.on('fileQueued', function(file) {
		$("#banner").append(
		  '<div id="pic_' + file.id + '" class="item-uploader">' +
			  '<img src="" class="images-uploader" width="120" height="80">' +
			  '<input type="hidden" class="qkey" name="banner" value="">' +
			  '<a  href="#" id="img2_'+ file.id +'" class="delimg"><i class="glyphicon glyphicon-remove" style="color:red"></i></a>' +
		  '</div>'
		);
	});

	// 文件上传过程中创建进度条实时显示。
	uploader.on('uploadProgress', function(file, percentage) {
		var $li = $('#' + file.id),
			$percent = $li.find('.progress .progress-bar');
		// 避免重复创建
		if (!$percent.length) {
			$percent = $(
				'<div class="progress progress-striped active">' +
				'<div class="progress-bar" role="progressbar" style="width: 0%"></div>' +
				'</div>'
			).appendTo($li).find('.progress-bar');
		}
		$percent.css('width', percentage * 100 + '%');
	});

	// 文件上传完成功触发事件
	uploader.on('uploadSuccess', function(file, response) {
		var path = "http://7xoxjl.com1.z0.glb.clouddn.com/";
		$('#pic_' + file.id).find('input.qkey').val(response.key);
		$('#pic_' + file.id).find('img.images-uploader').attr("src", path + response.key);
		$("#img2_"+file.id).bind("click", function() {
			var key = response.key;
			// ajax请求后台数据
			$.post('/superAdmin/image/delete',{qiniuKey:key},function(data){
				$('#pic_' + file.id).remove();
			});
		});
	});

	// 文件上次完失败触发事件
	uploader.on('uploadError', function(file) {
		$('#' + file.id).find('p.state').text('上传出错');
	});

	// 文件上传完成触发事件
	uploader.on('uploadComplete', function(file) {
		$('#' + file.id).find('.progress').fadeOut();
	});
	
	return uploader;
}

