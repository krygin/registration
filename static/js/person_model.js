/**
 * Created by Ivan on 26.01.2015.
 */

var app = app || {};

(function () {
    app.PersonModel = Backbone.Model.extend({
        urlRoot: 'persons/',


        validate: function (attributes) {
            var result = {name: [], email: [], gender: [], tel: [], birthday: []};
            var email_pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
            if (attributes.name.length == 0) {
                result.name = "This field may not be blank";
            }
            if (attributes.name.length > 127) {
                result.name.push("Ensure this field has no more than 127 characters.");
            }

            if (attributes.email.length == 0) {
                result.email.push("This field may not be blank");
            }
            if (attributes.email.length > 75) {
                result.email.push("Ensure this field has no more than 75 characters.");
            }
            if (!email_pattern.test(attributes.email)) {
                result.email.push("Enter a valid email address.");
            }

            if (attributes.tel.length == 0) {
                result.tel.push("This field may not be blank");
            }
            console.log(result);
            for (var attribute in result) {
                if (result.hasOwnProperty(attribute)) {
                    if (!_.isEmpty(result[attribute])) {
                        return result
                    }
                }
            }
        }
    });
})();