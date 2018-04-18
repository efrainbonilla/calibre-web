
$(function() {
    $("#bookViewModal")
        .on("show.bs.modal", function(e) {
            var $modalBody = $(this).find(".modal-body");
            var iframe = $('<iframe id="viewpdf"></iframe>');
            $modalBody.append(iframe);

            $.ajax({
              type: "POST",
              url: $(e.relatedTarget).attr('data-href'),
              data: {}
            });

            iframe.attr('src', e.relatedTarget.href);
            iframe.attr('width', '100%');
            iframe.attr('height', $( window ).height() + 'px');
        })
        .on("hidden.bs.modal", function() {
            $(this).find(".modal-body").html("");
        });

    var preFilters = $.Callbacks();
    $.ajaxPrefilter(preFilters.fire);


    $("#userHistoryModal")
        .on("show.bs.modal", function(e) {
            var $modalBody = $(this).find(".modal-body");

            // Prevent static assets from loading multiple times
            var useCache = function(options) {
                options.async = true;
                options.cache = true;
            };
            preFilters.add(useCache);

            $.get(e.relatedTarget.href).done(function(content) {
                $modalBody.html(content);
                preFilters.remove(useCache);
            });
        })
        .on("hidden.bs.modal", function() {
            $(this).find(".modal-body").html("...");
        });

    $("#bookHistoryModal")
        .on("show.bs.modal", function(e) {
            var $modalBody = $(this).find(".modal-body");

            // Prevent static assets from loading multiple times
            var useCache = function(options) {
                options.async = true;
                options.cache = true;
            };
            preFilters.add(useCache);

            $.get(e.relatedTarget.href).done(function(content) {
                $modalBody.html(content);
                preFilters.remove(useCache);
            });
        })
        .on("hidden.bs.modal", function() {
            $(this).find(".modal-body").html("...");
        });

    var del = $("#del");
    var month = $("#month");
    var between = $("#between");

    function chekedDate(value) {
        switch (value) {
            case 'del':
                del.removeAttr('disabled');
                month.attr('disabled', true);
                between.attr('disabled', true);
                break;

            case 'month':
                month.removeAttr('disabled');
                del.attr('disabled', true);
                between.attr('disabled', true);
                break;

            case 'between':
                between.removeAttr('disabled');
                del.attr('disabled', true);
                month.attr('disabled', true);
                break;

            default:
                return false;
                break;
        }
    }

    var checkedFilterDateDefault = false;
    $("#formReports #filterdate input[type=radio]").on('change', function () {
        chekedDate(this.value);
    }).each(function (key, item) {
        if ($(item).is(':checked')) {
            checkedFilterDateDefault = true;
            chekedDate(item.value);
        }
    });

    if (checkedFilterDateDefault == false) {
         var chk0 = $(this.formReports.optionDate[0]);
         chk0.attr('checked', true);
         chekedDate(chk0.val());
    }



    var user = $("#user");

    function chekedUser(value) {
        switch (value) {
            case '1':
                user.removeAttr('disabled');
                break;


            case '0':
                user.attr('disabled', true);
                break;
            default:
                return false;
                break;
        }
        console.log(user, value);
    }


    var checkedFilterUserDefault = false;
    $("#formReports #filteruser input[type=radio]").on('change', function () {
        chekedUser(this.value);
    }).each(function (key, item) {
        if ($(item).is(':checked')) {
            checkedFilterUserDefault = true;
            chekedUser(item.value);
        }
    });

    if (checkedFilterUserDefault == false) {
         var chk0 = $(this.formReports.optionUser[1]);
         chk0.attr('checked', true);
         chekedUser(chk0.val());
    }

});

function openPrint(event, id, title, subtitle) {



    title = (title)? title : 'Title';
    subtitle = (subtitle)? subtitle : 'Subtitle';

    text = $(id)? $(id).prop('outerHTML') : id;


    popupPrint(title,  subtitle, text, false, true);
}

function popupPrint(title, subtitle, text, headStyle, bodyContent) {
    var win = window.open('', '_blank', 'width=730, height=500, top=50, left=50, scrollbars=1');

    var head = '<html><head>';
    head += '<title>'+title+'</title>';

    if (!headStyle) {
       head += '<link rel="STYLESHEET" type="text/css" href="/static/css/libs/bootstrap.min.css">';

    }

    head += '</head>';

    var body = '<body>';

    if (!bodyContent) {
        body +="<table class='table table-bordered' cellSpacing='0' cellPadding='0' align='center' border='0' width='100%'>";
        body += "<tr>";

        body += "<td>";
        body += "<table class='table table-bordered' cellSpacing='0' cellPadding='0' align='center' border='0' width='100%'>";
        body += "<tr><td align='left' style='padding-top: 8px;'>";


        body += "</td></tr>";
        body += "<tr><td class='separator'>&nbsp;</td></tr>";
        body += "<tr><td class='barraNavegacion' colspan='2'>&nbsp;"+subtitle+"</td></tr>";
        body += "<tr><td class='separator'>&nbsp;</td></tr>";
        body += "<tr><td>";
        body += "<div id='content'>";
    }

    body += text;

    if (!bodyContent) {
        body += "</div></td></tr>";
        body += "</table>";
        body += "</td></tr>";
        body += "</table>";
    }

    body += '</body></html>';

    win.document.write(head + body);
    win.document.close();

    return win;
}
