$(document).ready(function(){
    var posInicial = 0;
    var posFinal = 0;

    var status = 0;
    $('.thumbs').on("touchstart, mousedown", function(e){
        status = 1;
        if(e.type === 'touchstart'){
          var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
          posInicial = touch.pageX;
        } else if (e.type === 'mousedown') {
          posInicial = e.pageX;
        }
    });
    $('.thumbs').on("touchmove, mousemove", function(e){
        if(status === 1){
            if(e.type === 'touchmove'){
                var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                posFinal = touch.pageX;
            }else if (e.type === 'mousemove') {
                posFinal = e.pageX;
            }
        }
    });
    $('.thumbs').on("touchend, mouseup", function(){
        if(status === 1){
            var r = Math.abs(posInicial - posFinal);

            if(r > 50){
                var sel = 0;
                $('.slider :radio').each(function(i){
                    if($(this).is(":checked")){
                        sel = i;
                    }
                });

                if(posInicial > posFinal){
                    $('.slider .control label').each(function(i){
                        if(i === sel+1 && $(this).is(":visible")){
                            var inputID = $(this).attr("for");
                            $('#' + inputID).addClass("active");
                            $('#' + inputID).trigger("click");
                            setTimeout(function(){
                                $('#' + inputID).removeClass("active");
                            },1);
                        }
                    });
                }else{
                    $('.slider .control label').each(function(i){
                        if(i === sel-1 && sel > 0){
                            var inputID = $(this).attr("for");
                            $('#' + inputID).addClass("active");
                            $('#' + inputID).trigger("click");
                            setTimeout(function(){
                                $('#' + inputID).removeClass("active");
                            },1);
                        }
                    });
                }
            }
            posInicial = 0;
            posFinal = 0;
        }
        status = 0;
    });
});

