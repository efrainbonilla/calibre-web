
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

    var checkedDefault = false;
    $("#formReports input[type=radio]").on('change', function () {
        chekedDate(this.value);
    }).each(function (key, item) {
        if ($(item).is(':checked')) {
            checkedDefault = true;
            chekedDate(item.value);
        }
    });

    if (checkedDefault == false) {
         var chk0 = $(this.formReports.optionDate[0]);
         chk0.attr('checked', true);
         chekedDate(chk0.val());
    }
});
