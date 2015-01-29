/**
 * Created by Ivan on 25.01.2015.
 */
var app = app || {};

(function () {
    app.AppView = Backbone.View.extend({
        el: '#registration_app',
        initialize: function () {
            this.$table = $('#table_body');
            $('#birthday').datepicker({
                format: "yyyy-mm-dd",
                autoclose: true,
                startView: 2
            }).on('changeDate', function () {
                $('#birthday').datepicker('hide');
            });
            this.listenTo(app.persons, 'add', this.add_person_to_list);
            this.listenTo(app.persons, 'reset', this.add_all_persons_to_list);
            app.persons.fetch({reset: true});

        },
        events: {
            'submit form': 'add_person'
        },
        add_person: function (e) {
            e.preventDefault();
            this.restoreForm();
            var model = new app.PersonModel();
            var form_name = this.$el.find("input[name=name]").val();
            var form_birthday = this.$el.find("input[name=birthday]").val();
            var form_gender = this.$el.find("input[name=gender]:checked").val();
            var form_email = this.$el.find("input[name=email]").val();
            var form_tel = this.$el.find("input[name=tel]").val();
            model.set({
                name: form_name,
                birthday: form_birthday,
                gender: form_gender,
                email: form_email,
                tel: form_tel
            });
            if (!model.isValid()) {
                var validationError = model.validationError;
                this.notifyErrors(validationError);
            }
            app.persons.create(model, {
                wait: true,
                success: this.onSuccess.bind(this),
                error: this.onFailure.bind(this)
            });
        },
        add_person_to_list: function (person) {
            var view = new app.PersonView({model: person});
            this.$table.append(view.render().el);
        },
        add_all_persons_to_list: function () {
            this.$table.html('');
            app.persons.each(this.add_person_to_list, this);
        },
        onSuccess: function (model, response, options) {
            var f = this.$el.find('#form')[0];
            f.reset();
            this.restoreForm();
        },
        onFailure: function (model, response, options) {
            console.log(response);
            var validationError = JSON.parse(response.responseText);
            console.log(validationError);
            console.log(this);
            this.notifyErrors(validationError);
        },


        notifyErrors: function (validationErrors) {
            if (!_.isEmpty(validationErrors.email)) {
                $('#email_control_group').addClass('error');
                $('#email_error').removeClass('hide').text(validationErrors.email.toString());
            }
            if (!_.isEmpty(validationErrors.name)) {
                $('#name_control_group').addClass('error');
                $('#name_error').removeClass('hide').text(validationErrors.name.toString());
            }
            if (!_.isEmpty(validationErrors.gender)) {
                $('#gender_control_group').addClass('error');
                $('#gender_error').removeClass('hide').text(validationErrors.gender.toString());
            }
            if (!_.isEmpty(validationErrors.tel)) {
                $('#tel_control_group').addClass('error');
                $('#tel_error').removeClass('hide').text(validationErrors.tel.toString());
            }
            if (!_.isEmpty(validationErrors.birthday)) {
                $('#birthday_control_group').addClass('error');
                $('#birthday_error').removeClass('hide').text(validationErrors.birthday.toString());
            }
        },
        restoreForm: function () {
            $('#email_control_group').removeClass('error');
            $('#email_error').addClass('hide').text("");
            $('#name_control_group').removeClass('error');
            $('#name_error').addClass('hide').text("");
            $('#gender_control_group').removeClass('error');
            $('#gender_error').addClass('hide').text("");
            $('#tel_control_group').removeClass('error');
            $('#tel_error').addClass('hide').text("");
            $('#birthday_control_group').removeClass('error');
            $('#birthday_error').addClass('hide').text("");
        }
    });
})();