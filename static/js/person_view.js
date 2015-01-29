/**
 * Created by Ivan on 26.01.2015.
 */

var app = app || {};

(function() {
    app.PersonView = Backbone.View.extend({
        tagName: 'tr',
        template: _.template($('#person-item-template').html()),
        events: {
            'click .delete': 'onDeleteButtonClick'
        },
        render: function(){
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        initialize: function() {
            this.listenTo(this.model, 'destroy', this.remove);
        },


        onDeleteButtonClick: function(e){
            e.preventDefault();
            this.model.destroy({
                wait: true,
                success: this.onSuccess,
                error: this.onFailure
            });
        },
        onSuccess: function(model, response, options){

        },
        onFailure: function(model, response, options){

        }
    });
})();