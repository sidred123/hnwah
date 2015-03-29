var BASE_API_URL = "https://hacker-news.firebaseio.com/v0/item/"

var POSTS = [{
    "id": "8980047", // Feb 2015
    "year": 2015,
    "month": "Feb"
}, {
    "id": "9127232", // Mar 2015
    "year": 2015,
    "month": "Mar"
}];

var getURL = function (itemId) {
    return BASE_API_URL + itemId + ".json"
};

var httpGet = Meteor.wrapAsync(Meteor.http.get);

Meteor.startup(function () {
    _.each(POSTS, function (post) {
        var postId = post.id;
        if (HNPosts.findOne({"id": postId}) === undefined) {
            console.log("HNPost with id: " + postId + " doesn't exist. Inserting in db now.");
            HNPosts.insert({
                "id": postId,
                "year": post["year"],
                "month": post["month"]
            });
        }
        var url = getURL(postId);
        console.log(url);
        var postContent = httpGet(url);
        var comments = JSON.parse(postContent.content)["kids"];
        console.log(comments.length + " job postings found for " + post["month"] + " " + post["year"]);
        var cIndex = 1;
        _.each(comments, function (commentId, key) {
            if (JobPosts.findOne({id: commentId}) === undefined) {
                console.log("Job post with id: " + commentId + " doesn't exist. Inserting in db now." + cIndex);
                var commentUrl = getURL(commentId);
                var commentContent = httpGet(commentUrl);
                JobPosts.insert({
                    "id": commentId,
                    "postId": postId,
                    "content": commentContent.data.text
                });
            }
            cIndex++;
        });
    });
});
