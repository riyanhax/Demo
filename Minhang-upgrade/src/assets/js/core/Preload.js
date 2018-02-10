var App = {};

App.Preload = (function(){
	var Preload = {};
	var tasks = [];
	
	Preload.start = function(onComplete)
	{
		window.onload = function()
		{
			tasks.length > 0 ? runTask(0) : allComplete();
		}
		
		function allComplete()
		{
			onComplete();
		}
		
		function runTask(idx)
		{
			if(idx == tasks.length)
			{
				allComplete();
				return;
			}
			var task = tasks[idx];
			task.onComplete = function()
			{
				runTask(idx+1);
			}
			task.start();
		}
	}
	
	Preload.appendTask = function(task)
	{
		tasks.push(task);
	}
	
	Preload.Task = function(handler)
	{
		this.start = function()
		{
			var _self = this;
			handler(function(){
				_self.onComplete();
			});
		}
	}
	
	//用于存储资源
	Preload.assets = {};
	
	return Preload;
})();

