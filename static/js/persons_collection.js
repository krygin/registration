/**
 * Created by Ivan on 26.01.2015.
 */


var app = app || {};

(function() {
    var PersonsCollection = Backbone.Collection.extend({
        model: app.PersonModel,
        url: 'persons/'
    });
    app.persons = new PersonsCollection();
})();