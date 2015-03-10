if (Meteor.isServer) {
    Meteor.startup(function () {
        // 8980047 - Feb 2015
        var postContent = httpGet("https://hacker-news.firebaseio.com/v0/item/8980047.json");
        var comments = JSON.parse(postContent.content)["kids"];
        Meteor.log.debug(comments);
        _.each(comments, function (value, key) {
            var commentContent = httpGet("https://hacker-news.firebaseio.com/v0/item/" + value + ".json");
            Meteor.log.debug(commentContent)
        });
    });
}

var httpGet = function (url) {
    var future = new Future();
    Meteor.http.get(url, function(error, result) {
        if (!error) {
            return future.return(result);
        }
        return future.return(null);
    });
    return future.wait();
}
