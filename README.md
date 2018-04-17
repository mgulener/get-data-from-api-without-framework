<h2>Javascript</h2>
Get data from url (json format) and call getJSON function's callback.
<pre>
var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
        var status = xhr.status;
        if (status === 200) {
            callback(null, xhr.response);
        } else {
            callback(status, xhr.response);
        }
    };
    xhr.send();
};
</pre>

I use an instagram api as a sample. You can use another api that return a json format data.
<pre>
window.onload = function() {
    var htmlTemp = "";
    getJSON('https://www.instagram.com/explore/tags/instagram/?__a=1',
        function(err, data) {
            if (err !== null) {
                console.log('Something went wrong: ' + err);
            } else {
                data.graphql.hashtag.edge_hashtag_to_top_posts.edges.forEach(function(item) {
                    //create your template
                });
                document.querySelector('#insTable tbody').innerHTML = htmlTemp; // append your template
            }
        }
    );
}
</pre>
