; "use strict";

var pages = [
    { "page": "index", "markdown": "readme" },
    { "page": "class-design-guidelines", "markdown": "Class.Design.Guidelines.md" },
    { "page": "member-design-guidelines", "markdown": "Member.Design.Guidelines.md" },
    { "page": "miscellaneous-design-guidelines", "markdown": "Miscellaneous.Design.Guidelines.md" },
    { "page": "maintainability-guidelines", "markdown": "Maintainability.Guidelines.md" },
    { "page": "naming-guidelines", "markdown": "Naming.Guidelines.md" },
    { "page": "performance-guidelines", "markdown": "Performance.Guidelines.md" },
    { "page": "framework-guidelines", "markdown": "Framework.Guidelines.md" },
    { "page": "documentation-guidelines", "markdown": "Documentation.Guidelines.md" },
    { "page": "layout-guidelines", "markdown": "Layout.Guidelines.md" }
];


(function ($) {
    $(document).ready(function () {
        var page = pages[0].markdown;
        getMarkdown(page);
    });

    // Gets the given markdown page.
    var getMarkdown = function (page) {
        var url = "https://api.github.com/repos/aliencube/CSharp-Coding-Guidelines/" + page;
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

    // Converts the markdown to HTML and put them into the HTML element.
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
