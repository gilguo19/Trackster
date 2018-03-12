var Trackster = {};
const API_KEY = '7c3c2a397773e8aec9c24199b8f2190e';

$(document).ready(function () {
  $('#searchButton').click(function () {
    Trackster.searchTracksByTitle($('#searchBox').val());
  });

  var input = document.getElementById("searchBox");
  input.addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
      document.getElementById("searchButton").click();
    }
  });

});

/*
  Given an array of track data, create the HTML for a Bootstrap row for each.
  Append each "row" to the container in the body to display all tracks. 
*/
Trackster.renderTracks = function (tracks) {

  $('#trackList').empty();

  for (var i = 0; i < tracks.length; i++) {
    var track = tracks[i];
    var albumImg = track.image[1]["#text"];

    var record = '<div class="row record">' +
      '<div class="col-xs-2">' +
      '<a href=" ' + track.url + ' "target="_blank">' +
      '<i class="fa fa-play-circle-o" id="playButton"></i>' +
      '</a>' +
      '</div>' +
      '<div class="col-xs-2">' + track.name + '</div>' +
      '<div class="col-xs-2">' + track.artist + '</div>' +
      '<div class="col-xs-2"><img src="' + albumImg + '"/></div>' +
      '<div class="col-xs-2">' + track.listeners + '</div>' +
      '</div>';

    $('#trackList').append(record);
  }
};

/*
  Given a search term as a string, query the LastFM API.
  Render the tracks given in the API query response.
*/

Trackster.searchTracksByTitle = function (title) {
  $.ajax({
    url: 'http://ws.audioscrobbler.com/2.0/?method=track.search&track=' + title + '&api_key=' + API_KEY + '&format=json',

    success: function (response) {
      Trackster.renderTracks(response.results.trackmatches.track);
    }
  });
};