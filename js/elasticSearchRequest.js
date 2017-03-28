/**
 * Created by Foba on 3/27/2017.
 */
//TODO: Condense function
(function() {
    const ElasticSearchAddr = "http://35.185.217.146:9200/firebase/line/_search?q=text_entry_norm:";
    var httpRequest;
    document.getElementById("button").onclick = function() {

        //Todo: Sanitize search text
        var searchText = document.getElementById('search_text').value;
        var searchEncoded = encodeURIComponent(searchText);

        // Tilda added for fuzzy searching
        //Todo: Make a json structured query
        makeRequest(ElasticSearchAddr + searchText+'~');
    };

    function makeRequest(url) {
        httpRequest = new XMLHttpRequest();

        if (!httpRequest) {
            alert('Giving up :( Cannot create an XMLHTTP instance');
            return false;
        }

        httpRequest.onreadystatechange = alertContents;
        httpRequest.open('GET', url);
        httpRequest.send();
    }

    function alertContents() {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                //$("#par_text").text(httpRequest.responseText);
                //TODO: Move outside of function?????
                var responseJSON = JSON.parse(httpRequest.responseText);
                displaySearchResults(responseJSON.hits.hits);
            } else {
                alert('There was a problem with the request. Status: ' + httpRequest.status);
            }
        }
    }
})();

function displaySearchResults(arr) {
    var out = "";
    var i;
    for(i = 0; i < arr.length; i++) {
    out +=  '<li class="mdl-list__item mdl-list__item--three-line">' +
            '<span class="mdl-list__item-primary-content"><i class="material-icons mdl-list__item-avatar">person</i>' +
            '<span>' + arr[i]._source.speaker + '</span>' +
            '<span class="mdl-list__item-text-body">' + arr[i]._source.text_entry_orig + '</span></span></li>';

        // out += '<p>' + arr[i]._source.speaker + ' : ' +
        //     arr[i]._source.text_entry_orig + '<\p>';
    }
    document.getElementById("quotes_list").innerHTML = out;
}
