Meteor.publish("jobPosts", function () {
    return JobPosts.find({});
});
