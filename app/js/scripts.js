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

// Convert Timestamp to date
var timeConverter = function(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    return time;
}

var appendHtml = function(output, dest) {
    document.querySelector(dest).innerHTML = output;
}

window.onload = function() {
    var htmlTemp = "";
    getJSON('https://www.instagram.com/explore/tags/instagram/?__a=1',
        function(err, data) {
            if (err !== null) {
                console.log('Something went wrong: ' + err);
            } else {
                //console.log(data.graphql.hashtag.edge_hashtag_to_top_posts.edges);
                /*
                data.graphql.hashtag.edge_hashtag_to_top_posts.edges.forEach(function(item){		    
                	htmlTemp +='<tr>'+
                	'<td>w:'+item.node.dimensions.width+' / h:'+item.node.dimensions.height+'</td>'+
                	'<td>'+item.node.display_url+'</td>'+
                	'<td>'+item.node.edge_liked_by.count+'</td>'+
                	'<td>'+item.node.edge_media_preview_like.count+'</td>'+
                	'<td>'+item.node.edge_media_to_caption.edges[0].node.text+'</td>'+
                	'<td>'+item.node.edge_media_to_comment.count+'</td>'+
                	'<td>'+item.node.id+'</td>'+
                	'<td>'+item.node.is_video+'</td>'+
                	'<td>'+item.node.owner.id+'</td>'+
                	'<td>'+item.node.shortcode+'</td>'+
                	'<td>'+item.node.taken_at_timestamp+'<br><br>'+timeConverter(item.node.taken_at_timestamp)+'</td>'+
                	'<td>'+item.node.thumbnail_src+'</td>'+
                	'<td><p>src : '+item.node.thumbnail_resources[0].src+'</p><p>w : '+item.node.thumbnail_resources[0].config_width+'</p><p>h : '+item.node.thumbnail_resources[0].config_height+'</p></td>'
                	'</tr>';
                });
                */
                data.graphql.hashtag.edge_hashtag_to_top_posts.edges.forEach(function(item) {
                    htmlTemp += '<tr>' +
                        '<td>' + item.node.id + '</td>' +
                        '<td>' + item.node.display_url + '</td>' +
                        '<td>' + item.node.edge_media_to_caption.edges[0].node.text + '</td>' +
                        '<td>' + timeConverter(item.node.taken_at_timestamp) + '</td>' +
                        '</tr>';
                });
                appendHtml(htmlTemp, '#insTable tbody');
            }
        }
    );
}