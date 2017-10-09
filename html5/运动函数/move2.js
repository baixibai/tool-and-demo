//非行间元素的属性提取
function getAttr_value(obj,name)
{
	if(obj.currentStyle)
	{
		return obj.currentStyle[name];
	}
	else
	{
		return getComputedStyle(obj,false)[name];
	}
}
//运动函数
function attrChange(obj,json,fnend)  //attr_value是要变化的属性值
{
	clearInterval(obj.timer); //obj.timer这是关键，影响执行
	obj.timer=setInterval(function(){
		for(var attr in json)
		{
		var bstop=true;
		var cur=0;
		if(attr=='opacity')
		{
			 cur=Math.round(parseFloat(getAttr_value(obj, attr))*100);//Math.round  消除不同浏览器取值不同，作用是四舍五入
		}
		else
		{
			cur=parseInt(getAttr_value(obj,attr));
		}
		
		//var speed=(attr_value-obj.offsetWidth)/6;
		var speed=(json[attr]-cur)/6;
		speed=speed>0?Math.ceil(speed):Math.floor(speed);
		if(cur!=json[attr])
			bstop=false;

			if(attr=='opacity')
			{

				obj.style.filter='alpha(opacity:'+(cur+speed)+')';
				obj.style.opacity=(cur+speed)/100;
			}
			else
			{
				obj.style[attr]=cur+speed+'px';
			}	
        }
		if(bstop)
			clearInterval(obj.timer);
			if (fnend) fnend();
	},30);
}