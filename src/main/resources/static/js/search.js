//一般直接写在一个js文件中
layui.use(['layer', 'form'], function(){
    var layer = layui.layer;
});
function openD(title, url, w, h){
    layer.open({
        type: 1,
        area: [w, h],
        fixed: false, //不固定
        maxmin: true,
        title: title,
        content: url
    });
}
/*var obj = new WxLogin({
    id:"login_container",
    appid: "",
    scope: "",
    redirect_uri: "",
    state: "",
    style: "",
    href: ""
});*/
function searchYear(yearEnd, data, info, sex, year){
    $.post(basePath + "/searchYear",{yearEnd: yearEnd, data: JSON.stringify(data), info: JSON.stringify(info), sex: sex, startYear: year},function(result){
        openD(year + "流年", result, "800px", "550px");
    });
}