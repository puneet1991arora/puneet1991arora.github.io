$(document).ready(function () {
  /**
   * Gets an object and sets its content into the result card in the result page
   * If there's no content in the JSON object, makes sure to tell the user
   */
  if (window.localStorage) {
    if (localStorage.searchResult) {
      var emailResult = JSON.parse(localStorage.getItem('searchResult')); //get the object & parses the object into an JSON object
      if (JSON.stringify(emailResult) == "[]") {
        $('#result-count').text("0 Results");
        $(".result-desc").text("Try starting a new search below");
      } else {
        $('#result-count').text("1 Result");
        $("#result-subtext").html("Look at the result below to see the details of the person you’re searched for.");
        $(".name").append(emailResult.first_name + " " + emailResult.last_name);
        $('.user-description').append(emailResult.description);
        $("#address").append("<p>" + emailResult.address + '</p>');
        $(".email").append("<p>" + emailResult.email + "</p>");

        for (const phone_number in emailResult.phone_numbers) {
          phone = emailResult.phone_numbers[phone_number]
          formatted_phone = "(" + phone.substring(0, 3) + ") " + phone.substring(3, 6) + "-" + phone.substring(6, 10);

          $(".phone-num").append(
            "<a href=" + `tel:${phone}` + " style='display: block;color: #004A80;'>" + `${formatted_phone}` + "</a>"
          );
        }

        for (const relative in emailResult.relatives) {
          $(".relatives").append(
            "<p style='margin-bottom: 0'>" + `${emailResult.relatives[relative]}` + "</p>"
          );
        }

        $(".result-wrap").show();
      }
    }
  }
});
