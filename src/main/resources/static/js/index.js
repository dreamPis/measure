$(function () {
    var country = $("select[name=country]");
    var province = $("select[name=province]");
    var provinceData = null;
    var cityData = null;
    country.on("change", function () {
        province.empty();
        province.append('<option value="">-选择省-</option>');
        $("select[name=city]").empty().append('<option value="">-选择市-</option>');
        var name = $(this).val();
        var temp = '<select name="city"><option value="">-选择市-</option></select>';
        $("select[name=city]").remove();
        if(name == "中国"){
            $("#cityInfo").append(temp);
        }
        $.post(basePath + "/getlon",{name: name},function(result){
            provinceData = result;
            var html = '';
            for(var i = 0; i < provinceData.length; i++){
                if(name == "中国"){
                    html += '<option value="'+provinceData[i].prov+'">'+provinceData[i].prov+'</option>'
                }else{
                    html += '<option data="'+provinceData[i].lon+'" value="'+provinceData[i].id+'">'+provinceData[i].city+'</option>'
                }
            }
            province.append(html);
        });
    });
    province.on("change", function () {
        $("select[name=city]").empty().append('<option value="">-选择市-</option>');
        var name = $(this).val();
        $.post(basePath + "/getcitylon",{name: name},function(result){
            cityData = result;
            var html = '';
            for(var i = 0; i < cityData.length; i++){
                html += '<option data="'+cityData[i].lon+'" value="'+cityData[i].id+'">'+cityData[i].city+'</option>'
            }
            $("select[name=city]").append(html);
        });
        var lng = province.find("option:selected").attr("data");
        if(lng != undefined && lng != 'undefined'){
            $("input[name=lng]").val(lng);
        }
    });
    $("#cityInfo").on("change", "select[name=city]", function () {
        var lng = $(this).find("option:selected").attr("data");
        $("input[name=lng]").val(lng);
    });
});