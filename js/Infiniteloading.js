/**
 * Created by john on 2015/12/28.
 */
window.onload = function(){
    //运行瀑布流主函数
    PBL('masonry','box');
    //模拟数据
    var data = [
        {'src':'1.jpg'},
        {'src':'2.jpg'},
        {'src':'3.jpg'},
        {'src':'4.jpg'},
        {'src':'5.jpg'},
        {'src':'6.jpg'},
        {'src':'7.jpg'},
        {'src':'8.jpg'},
        {'src':'9.jpg'},
        {'src':'10.jpg'}
    ];

    //设置滚动加载
    window.onscroll = function(){
        //校验数据请求
        if(getCheck()){
            var masonry = document.getElementById('masonry');
            for(i in data){
                //创建box
                var box = document.createElement('div');
                box.className = 'box';
                masonry.appendChild(box);

                var img = document.createElement('img');
                img.src = 'images/'+data[i].src;
                img.style.height = 'auto';
                box.appendChild(img);
            }
            PBL('masonry','box');
        }
    }
}
/**
 * 瀑布流主函数
 * @param  masonry	[Str] 外层元素的ID
 * @param  box 	[Str] 每一个box的类名
 */
function PBL(masonry,box){
    //	1.获得外层以及每一个box
    var masonry = document.getElementById(masonry);
    var boxs  = getClass(masonry,box);
    //	2.获得屏幕可显示的列数
    var boxW = boxs[0].offsetWidth;
    var colsNum = Math.floor(document.documentElement.clientWidth/boxW);
    masonry.style.width = boxW*colsNum+'px';//为外层赋值宽度
    //	3.循环出所有的box并按照瀑布流排列
    var everyH = [];//定义一个数组存储每一列的高度
    for (var i = 0; i < boxs.length; i++) {
        if(i<colsNum){
            everyH[i] = boxs[i].offsetHeight;
        }else{
            var minH = Math.min.apply(null,everyH);//获得最小的列的高度
            var minIndex = getIndex(minH,everyH); //获得最小列的索引
            getStyle(boxs[i],minH,boxs[minIndex].offsetLeft,i);
            everyH[minIndex] += boxs[i].offsetHeight;//更新最小列的高度
        }
    }
}
/**
 * 获取类元素
 * @param  warp		[Obj] 外层
 * @param  className	[Str] 类名
 */
function getClass(masonry,className){
    var obj = masonry.getElementsByTagName('*');
    var arr = [];
    for(var i=0;i<obj.length;i++){
        if(obj[i].className == className){
            arr.push(obj[i]);
        }
    }
    return arr;
}
/**
 * 获取最小列的索引
 * @param  minH	 [Num] 最小高度
 * @param  everyH [Arr] 所有列高度的数组
 */
function getIndex(minH,everyH){
    for(index in everyH){
        if (everyH[index] == minH ) return index;
    }
}
/**
 * 数据请求检验
 */
function getCheck(){
    var documentH = document.documentElement.clientHeight;
    var scrollH = document.documentElement.scrollTop || document.body.scrollTop;
    return documentH+scrollH>=getLastH() ?true:false;
}
/**
 * 获得最后一个box所在列的高度
 */
function getLastH(){
    var masonry = document.getElementById('masonry');
    var boxs = getClass(masonry,'box');
    return boxs[boxs.length-1].offsetTop+boxs[boxs.length-1].offsetHeight;
}
/**
 * 设置加载样式
 * @param  box 	[obj] 设置的Box
 * @param  top 	[Num] box的top值
 * @param  left 	[Num] box的left值
 * @param  index [Num] box的第几个
 */
var getStartNum = 0;//设置请求加载的条数的位置
function getStyle(box,top,left,index){
    if (getStartNum>=index) return;
    $(box).css({
        'position':'absolute',
        'top':top,
        "left":left,
        "opacity":"0"
    });
    $(box).stop().animate({
        "opacity":"1"
    },999);
    getStartNum = index;//更新请求数据的条数位置
}
var currentWidth = 1100;
$(window).resize(function() {
    var winWidth = $(window).width();
    var conWidth;
    if(winWidth < 660) {
        conWidth = 440;
        col = 2
    } else if(winWidth < 880) {
        conWidth = 660;
        col = 3
    } else if(winWidth < 1100) {
        conWidth = 880;
        col = 4;
    } else {
        conWidth = 1100;
        col = 5;
    }

    if(conWidth != currentWidth) {
        currentWidth = conWidth;
        $('#masonry').width(conWidth);
        $('#masonry').BlocksIt({
            numOfCol: col,
            offsetX: 8,
            offsetY: 8
        });
    }
});