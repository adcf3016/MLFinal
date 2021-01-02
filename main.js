/*$(document).ready(function(){
    //do something
    $("#thisButton").click(function(){
        processImage();
    });
});*/

$("document").ready(function() {
    $("#inputImage").change(function(e) {
        processImage(e.target.files[0]);
    });
});




function processImage(imageObject) {

    //確認區域與所選擇的相同，因為使用免費的，所以區域選West Center US
    var uriBase = "https://westcentralus.api.cognitive.microsoft.com/vision/v3.1/ocr";

    var params = {
        "language": "unk",
        "detectOrientation": true
    };
    //顯示分析的圖片
    //var sourceImageUrl = document.getElementById("inputImage").value;
    var sourceImageUrl = URL.createObjectURL(imageObject);

    document.querySelector("#sourceImage").src = sourceImageUrl;
    //送出分析
    $.ajax({
            url: uriBase + "?" + $.param(params),
            // Request header
            beforeSend: function(xhrObj) {
                xhrObj.setRequestHeader("Content-Type", "application/octet-stream"); //application/json
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
            },
            type: "POST",

            processData: false,
            contentType: false,


            // Request body
            //data: '{"url": ' + '"' + sourceImageUrl + '"}',
            data: imageObject,
        })
        .done(function(data) {
            //顯示JSON內容
            $("#responseTextArea").val(JSON.stringify(data, null, 2));

        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            //丟出錯誤訊息
            var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
            errorString += (jqXHR.responseText === "") ? "" : jQuery.parseJSON(jqXHR.responseText).message;
            alert(errorString);
        });
};