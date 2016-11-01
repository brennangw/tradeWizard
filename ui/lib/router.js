//Replies = new Mongo.Collection("replies");

Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    landingTemplate: 'landing'
});

var requireLogin = function() {
    if (Meteor.user()) {
        this.next();
    } else {
        if (Meteor.loggingIn()) {
            this.render('loading');
        }
        this.render('notLoggedIn');
    }
};



//hooks
Router.onBeforeAction(requireLogin, {only: 'landing'});

Router.route('/', {
    name: 'landing'
});