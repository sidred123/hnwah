var httpGet = Meteor.wrapAsync(Meteor.http.get);

if (Meteor.isServer) {
    Meteor.methods({
        "posts": function () {
            // 8980047 - Feb 2015
            var postContent = httpGet("https://hacker-news.firebaseio.com/v0/item/8980047.json");
            var comments = JSON.parse(postContent.content)["kids"];
            Meteor.log.debug("number of comments: " + comments.length);
            var commentContents = [];
            comments = [comments[0]];
            _.each(comments, function (value, key) {
                var commentContent = httpGet("https://hacker-news.firebaseio.com/v0/item/" + value + ".json");
                //Meteor.log.debug(commentContent.data.text);
                commentContents.push(commentContent.data.text);
            });
            return commentContents;
        }
    });
};

if (Meteor.isClient) {
    posts = Meteor.call("posts", function (error, data) {
        console.log("posts returned");
        Session.set("posts", data);
    });
    Template.postsTable.helpers({
        getPosts: function () {
            console.log("getting posts");
            return Session.get("posts");
        }
    });
}
