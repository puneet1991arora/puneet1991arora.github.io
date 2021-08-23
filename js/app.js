$(document).ready(function () {
  
  // type of search
  $('#search-type-tabs li').on('click', function (event) {
	event.preventDefault();
	document.querySelector('input[type="text"]').parentNode.classList.remove('error');
	document.querySelector('input[type="text"]').value ='';
	var getClickAttr = $(this).attr('data-type');
	$('#search-type-tabs li').removeClass('active');
	$('#search-type-tabs li[data-type='+getClickAttr+']').addClass('active');
    if(getClickAttr == 'email') {
	  $('input[name="email"]').attr("placeholder", "Enter an Email Address");
	  $('.error-msg').text('Please enter a valid email address');
    }else if(getClickAttr == 'phone') {
	  $('input[name="email"]').attr("placeholder", "Enter an Phone Number");
	  $('.error-msg').text('Please enter a valid phone number');
	}
  });
  
  // onclick to search
  $('#btn-search').on('click', function (event) {
	searchResultFn(event,'click')
  });
  
  // enter to search
  $('input[type="text"]').keypress(function (event) {
	keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
	  searchResultFn(event,'enter')
	}
  })
  
});

// validation and search
function searchResultFn(event, value) {
  var regEx;
  getVal = $('input[type="text"]').val().toLowerCase();
  getActiveTab = $('#search-type-tabs li.active').attr('data-type');
  if(getActiveTab == 'email') {
    regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  }else if(getActiveTab == 'phone') {
    regEx = /^[0-9]{10}$/;
  }
  event.preventDefault();
  localStorage.clear(); //Clears storage for next request
  if (getVal.match(regEx)) {
    if (value == 'click') {
	  $('.above-the-fold').hide();
	  $('.features').hide();
	  $('.spinner').show();
	}
	document.querySelector('input[type="text"]').parentNode.classList.remove("error");
	const url ='https://ltv-data-api.herokuapp.com/api/v1/records.json?'+ getActiveTab +'=' + getVal;
	  fetch(url)
	    .then((response) => response.text())
		.then(function (contents) {
		  localStorage.setItem("searchResult", contents);
		  window.location.href = "result.html";
		})
		.catch((e) => console.log(e));
  } else {
    document.querySelector('input[type="text"]').parentNode.classList.add("error");
  }
}