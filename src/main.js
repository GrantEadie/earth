import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import EarthPhotos from './earth-photos.js'

function clearFields() {
  $('#location').val("");
}

$(document).ready(function() {
  $('#getSubmit').click(function() {
    let date = $('#earth-date').val();
    let dateParsed = date.replace(/[-]/gi, "/")
    console.log(dateParsed);
    clearFields();
    let promise = EarthPhotos.getEarth(date);
    promise.then(function(response) {
      const body = JSON.parse(response);
      console.log(body[0].identifier);
      $('.showEarth1').html(`<img src="https://epic.gsfc.nasa.gov/archive/natural/${dateParsed}/png/epic_1b_${body[0].identifier}.png">`);
    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error}`);
    });
  });
});