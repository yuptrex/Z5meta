(function () {
  'use strict';
  var CONTACT_EMAIL = 'frosternx@gmail.com';

  document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;

      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var message = form.message.value.trim();

      var subject = encodeURIComponent('Portfolio contact from ' + name);
      var body = encodeURIComponent(
        message + '\n\n—\n' + name + '\n' + email
      );

      window.location.href = 'mailto:' + CONTACT_EMAIL + '?subject=' + subject + '&body=' + body;
    });
  });
})();
