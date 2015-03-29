var httpGet = Meteor.wrapAsync(Meteor.http.get);

Meteor.methods({
    "posts": function () {
        // 8980047 - Feb 2015
        var postContent = httpGet("https://hacker-news.firebaseio.com/v0/item/8980047.json");
        var comments = JSON.parse(postContent.content)["kids"];
        Meteor.log.debug("number of comments: " + comments.length);
        var commentContents = [];
        _.each(comments, function (value, key) {
            var commentContent = httpGet("https://hacker-news.firebaseio.com/v0/item/" + value + ".json");
            commentContents.push(commentContent.data.text);
        });
        return commentContents;
    }
});
