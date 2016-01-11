/**
 * Created by john on 2016/1/11.
 */


window.onload=function(){
    //获取返回顶部id
    var topbtntop=document.getElementById("btntop");
    var timer = null;
 //添加滚动条监控事件
    window.onscroll=function(){
        //获取页面可见区域宽度
        var pagelookheight = document.documentElement.clientHeight;
        //获取页面被卷去的高度即（滚动条距离页面开始顶端高度）
        var backtop = document.body.scrollTop;
        if(backtop>pagelookheight){
            topbtntop.style.display ="block"   //滚动超过第一屏时返回按钮显示
        }else{
            topbtntop.style.display = "none"  //滚动条在页面第一屏时返回按钮不存在
        }
    }
    //返回按钮点击事件
    topbtntop.onclick=function(){
        //alert(11);
        //设置计时器设定滚动时间
        timer = setInterval(function(){
            var backtop = document.body.scrollTop;
            var speedtop = backtop / 5; //变化速度
            document.body.scrollTop = backtop-speedtop;//变化高度
            if(backtop==0){
                clearInterval(timer);
            }
        },30)
    }
}
