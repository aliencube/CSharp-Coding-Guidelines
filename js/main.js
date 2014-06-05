; "use strict";

(function ($) {
    $(document).ready(function () {
        var file = getCurrentPage();
        var lang = getLanguage();
        $.each(pages, function (i, page) {
            if (page.page + ".html" == file) {
                var doc = page.doc;
                getMarkdown(doc, lang);
            }

            if (page.page == "index") {
                return;
            }

            var li = $("<li></li>").append($("<a></a>").attr("href", page.page + ".html").text(page.name));
            $("#nav-menu").append(li);
        });
    });

    // Gets the current page.
    var getCurrentPage = function() {
        var page = $.url().attr("file");
        if (page == undefined || !page.length) {
            page = "index.html";
        }
        return page;
    };

    // Gets the language from the query string.
    var getLanguage = function() {
        var lang = $.url().param("lang");
        if (lang == undefined || !lang.length) {
            lang = "en";
        }
        return lang;
    };

    // Gets the given markdown page.
    var getMarkdown = function (doc, lang) {
        var localistion = lang != "en" ? "localisation/" + lang + "/" : "";
        var url = "https://api.github.com/repos/aliencube/CSharp-Coding-Guidelines/contents/" + localistion + doc;
        $.ajax({
                type: "GET",
                url: url,
                dataType: "json"
            })
            .done(function(data) {
                var decoded = Base64.decode(data.content);
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
                for (var i in pages) {
                    if (i == 0) {
                        continue;
                    }
                    var doc = pages[i].doc;
                    var page = pages[i].page;
                    data.replace(doc, page + ".html");
                    console.log(doc + "::" + page);
                    console.log(data);
                }
                $("#main-content").html(data);
            });
    };

    var replaceDocuments = function () {
    };
})(jQuery);
