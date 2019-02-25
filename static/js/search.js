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
  $("#result-list").html("");
  $("#side-bar").show();
  params = {
    text: text,
    limit: 10
  };
  $.get('search', params, (data) => {
      console.log(data);
      $("#res-count").html(data.length);
      data.forEach(addResult);
      $("#search-btn").prop("disabled", false);
  });
};
