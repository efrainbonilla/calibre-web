
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
});
