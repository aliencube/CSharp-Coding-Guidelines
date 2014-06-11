; "use strict";

(function ($) {
    $(document).ready(function () {
        var path = getCurrentPath();
        if (path == undefined || path == "404") {
            location.href = "/404.html";
        }
        var lang = getLanguage();

        $.each(pages, function (i, page) {
            getDropdown(page);
            getMarkdown(page, lang);
        });

        $("#lang a").click(function () {
            $.cookie("lang", $(this).attr("href").replace("?lang=", ""));
            location.reload();
            return false;
        });

        $("a.internal").click(function () {
            var url = $.url(this);
            var anchor = "#" + url.attr("fragment");
            $("html, body").scrollTo(anchor, 500, { "offset": { "top": -50, "left": 0 } });
            return false;
        });
    });

    // Gets the current path.
    var getCurrentPath = function() {
        var path = $.url().attr("path");
        if (path == undefined || path == "/") {
            path = "index";
            var query = $.url().attr("query");
            if (query != undefined && query.length) {
                path = query;
                if (!validatePage(path)) {
                    path = "404";
                }
            }
        }
        return path.replace("/", "");
    };

    // Validates whether the path provide is valid or not.
    var validatePage = function (path) {
        if (path == undefined || !path.length) {
            return false;
        }

        var validated = false;
        for (var i in pages) {
            var page = pages[i];
            if (page.page != path) {
                continue;
            }
            validated = true;
            break;
        }
        return validated;
    };

    // Gets the language from the query string.
    var getLanguage = function () {
        var lang = $.cookie("lang");
        if (lang == undefined || !lang.length) {
            lang = "en";
            $.cookie("lang", lang);
        }
        return lang;
    };

    // Gets the dropdown menu link.
    var getDropdown = function (page) {
        if (page.page == "index") {
            return;
        }
        var $a = $("<a></a>").attr("href", "#" + page.page).addClass("internal").text(page.name);
        var $li = $("<li></li>").append($a);
        $("#dropdown-menu").append($li);
    };

    // Gets the given markdown page.
    var getMarkdown = function (page, lang) {
        var localistion = lang != "en" ? "localisation/" + lang + "/" : "";
        var url = "https://api.github.com/repos/aliencube/CSharp-Coding-Guidelines/contents/" + localistion + page.doc;
        $.ajax({
                type: "GET",
                url: url,
                dataType: "json",
                headers: { "Authorization": "token fc1878f03ccb0ce54ca44e92964d700a32b9d070" }
            })
            .done(function(data) {
                var decoded = Base64.decode(data.content);
                markdownToHtml(page, decoded);
            });
    };

    // Converts the markdown to HTML and put them into the HTML element.
    var markdownToHtml = function (page, markdown) {
        var url = "https://api.github.com/markdown";
        var params = {
            "mode": "gfm",
            "text": markdown
        };
        $.ajax({
                type: "POST",
                url: url,
                data: JSON.stringify(params),
                dataType: "html",
                headers: { "Authorization": "token fc1878f03ccb0ce54ca44e92964d700a32b9d070" }
            })
            .done(function(data) {
                getContents(page, data);
            });
    };

    // Gets the contents.
    var getContents = function(page, data) {
        for (var i in pages) {
            var doc = pages[i].doc;
            data = data.replace(doc, "");
        }
        $("#main-content #section-" + page.page).html(data).append($("<hr />"));

        $("#main-content #section-" + page.page + " a[href^='?']").addClass("internal");
        $("#main-content #section-" + page.page + " a[href$='-']").each(function(i) {
            $(this).attr("href", $(this).attr("href").replace(/\-$/gi, ""));
        });
        $("#main-content #section-" + page.page + " h1").each(function(i) {
            $(this).attr("id", $(this).text().trim().toLowerCase().replace(/ /gi, "-"));
        });
        $("#main-content #section-" + page.page + " h2").each(function(i) {
            $(this).attr("id", $(this).text().trim().toLowerCase().replace(/ /gi, "-"));
        });
    };
})(jQuery);
