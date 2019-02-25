$(() => {
    $("#side-bar").hide();
    $("#search-btn").click(() => {
        $("#search-btn").prop("disabled", true);
        console.log("Search!")
        const text = $("#search-text").val();
        search(text);
    });
});

function addResult(place) {
  $("#result-list").append(''.concat(`
    <li class="list-group-item d-flex justify-content-between lh-condensed">
      <div>
        <h6 class="my-0">`, place.name, `</h6>
        <small class="text-muted">(`, place.lat, `, `, place.lon, `)</small>
      </div>
    </li>
  `));
};

function search(text) {
  $("#res-count").html("");
  $("#result-list").html(
    `<div class="d-flex align-items-center">
       Loading...
       <div class="spinner-border ml-auto text-primary" role="status" aria-hidden="true"></div>
     </div>`);
  $("#side-bar").show();
  params = {
    text: text,
    limit: 10
  };
  $.get('search', params, (data) => {
      $("#res-count").html(data.length);
      $("#result-list").html('');
      data.forEach(addResult);
      $("#search-btn").prop("disabled", false);
  });
};
