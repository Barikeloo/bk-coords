$(function () {
    ShowCoords(false)
    function ShowCoords(bool) {
        if (bool) {
            $("#container").fadeIn(200);
        } else {
            $("#container").fadeOut(200);
        }
    }

    function initCoords(data) {
        ShowCoords(true);
        $(".x").text("X : " + data.coordsX);
        $(".y").text("Y : " + data.coordsY);
        $(".z").text("Z : " + data.coordsZ);
        document.onkeyup = function (data) {
            if (data.which == 27) {
                $.post('https://bk-coords/close', JSON.stringify({}));
                return
            }
        };
        const copyToClipboard = str => {
            const el = document.createElement('textarea');
            el.value = str;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
         };
        $(".copiar").click(function () { 
            window.addEventListener('message', (event) => {
                if (event.data.type === 'clipboard') {
                    copyToClipboard(event.data.data);
                }
            });
            $(".notificacion").fadeIn();
            setTimeout(() => {
                $(".notificacion").fadeOut();
            }, 1000);
            
        });
    }
    window.addEventListener('message',  function(event, data){
        let v =  event.data;
        if (v.action == 'ShowCoords') {
            initCoords(v);
        } else if (v.action == 'HideCoords') {
            ShowCoords(false);
        }
    })
});