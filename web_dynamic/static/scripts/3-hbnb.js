$(document).ready(function () {
  const amenitiesCheckedId = [];
  const amenitiesCheckedName = [];
  $("input:checkbox").change(function () {
    if ($(this).is(":checked")) {
      amenitiesCheckedName.push($(this).data("name"));
      amenitiesCheckedId.push($(this).data("id"));
    } else {
      amenitiesCheckedName.splice(
        amenitiesCheckedName.indexOf($(this).data("name")),
        1
      );
      amenitiesCheckedId.splice(
        amenitiesCheckedId.indexOf($(this).data("id")),
        1
      );
    }
    if (amenitiesCheckedName.length > 0) {
      $(".amenities h4").text(amenitiesCheckedName.join(", "));
    } else {
      $(".amenities h4").html("&nbsp;");
    }
  });

  $.get("http://127.0.0.1:5001/api/v1/status", (data) => {
    if (data.status === "OK") {
      $("#api_status").addClass("available");
    } else {
      $("#api_status").removeClass("available");
    }
  });

  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:5001/api/v1/places_search",
    data: "{}",
    dataType: "json",
    contentType: "application/json",
    success: (data) => {
      console.log(data);
      data.map((place) => {
        $(".places").append(
          `<article> <div class="title_box"><h2>${place.name}</h2><div class="price_by_night">$${place.price_by_night}</div></div><div class="information"><div class="max_guest">${place.max_guest} Guest</div><div class="number_rooms">${place.number_rooms} Bedroom</div><div class="number_bathrooms">${place.number_bathrooms} Bathroom</div></div><div class="description">${place.description}</div></article>`
        );
      });
    },
  });
});
