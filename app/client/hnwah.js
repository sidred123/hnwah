Meteor.subscribe("jobPosts");

Template.postsTable.helpers({
    getPosts: function () {
        return JobPosts.find();
    }
});
