$(document).ready(function () {
  
  // onclick button to search
  $("#btn-search").on("click", function (event) {
	emailValSearchFn(event,'click')
  });
  
  // enter to search
  $('input[type="text"]').keypress(function (event) {
	keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
	  emailValSearchFn(event,'enter')
	}
  })
  
});

// email validation and search
function emailValSearchFn(event, value) {
  email = $('input[type="text"]').val().toLowerCase();
  regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  event.preventDefault();
  localStorage.clear(); //Clears storage for next request
  if (email.match(regEx)) {
    if (value == 'click') {
	  $('.above-the-fold').hide();
	  $('.features').hide();
	  $('.spinner').show();
	}
	document.querySelector('input[type="text"]').parentNode.classList.remove("error");
	const url ='https://ltv-data-api.herokuapp.com/api/v1/records.json?email=' + email;
	  fetch(url)
	    .then((response) => response.text())
		.then(function (contents) {
		  localStorage.setItem("emailSearchResult", contents);
		  window.location.href = "result.html";
		})
		.catch((e) => console.log(e));
  } else {
    document.querySelector('input[type="text"]').parentNode.classList.add("error");
  }
}