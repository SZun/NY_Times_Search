var urlFormat = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q='
var apiKey = '8fd501e6f6ec474db1e3f712f2ac9260';

var searchField;
var searchResults;
var resultCountField;

$(document).ready(function () {
    searchField = $('#search-field');
    searchResults $('#search-results');
    resultCountField = $('#records-count');
});

$('#search-button').on('click', function () {
    var searchTerm = searchField.val();
    var queryURL = urlFormat + searchTerm + '&api_key=' + apiKey;

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        var elements = createNewElements(response);

        clearSearchResults();

        $.each(elements, function(i, element) {
            searchResults.append(element);
        });
    };
});

$('#clear-button').on('click', function () {
    clearSearchResults();
});

function clearSearchResults() {
    searchResults.empty();
}

function createNewElements(response) {
    var articles = [];

    for (var i = 0; i < Math.min(response.docs.length, resultCountField.val()); i++) {
        var article = $("<li class='article'>");
        var doc = response.docs[i];
        var byline = doc.byline;

        var title = $("<h2>").text(doc.headline.main);
        var abstract = $("<p>").text(doc.snippet);
        var author;

        // Creating a paragraph tag with the result item's rating
        if (byline) {
            author = $("<h3>").text(byline.original);
        }
        else{
            author = "no author";
        }

        var clicky = $('<a class="article-anchor">');
        clicky.attr('href' = doc.web_url);

        clicky.append(title);
        clicky.append(author);
        clicky.append(abstract);
        article.append(clicky);

        articles.push(article);
    }

    return articles;
}
