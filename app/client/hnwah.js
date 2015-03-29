Meteor.call("posts", function (error, data) {
    console.log("posts returned");
    Session.set("posts", data);
});

Template.postsTable.helpers({
    getPosts: function () {
        console.log("getting posts");
        return Session.get("posts");
    }
});
