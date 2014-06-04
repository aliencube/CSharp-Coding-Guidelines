; "use strict";

(function ($) {
    $(document).ready(function () {
        getReadme();
    });

    // Gets the README.md.
    var getReadme = function () {
        var url = "https://api.github.com/repos/aliencube/CSharp-Coding-Guidelines/readme";
        $.ajax({
                type: "GET",
                url: url,
                dataType: "json"
            })
            .done(function(data) {
                var decoded = atob(data.content);
                markdownToHtml(decoded);
            });
    };

    // Converts the README.md markdown to HTML and put them into the HTML element.
    var markdownToHtml = function (markdown) {
        var url = "https://api.github.com/markdown";
        var params = {
            "mode": "gfm",
            "text": markdown
        };
        $.ajax({
                type: "POST",
                url: url,
                data: JSON.stringify(params),
                dataType: "html"
            })
            .done(function(data) {
                $("#main-content").html(data);
            });
    };
})(jQuery);
