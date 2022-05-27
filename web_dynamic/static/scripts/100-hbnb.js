$(document).ready(function () {
  const amenitiesCheckedId = [];
  const amenitiesCheckedName = [];
  const citiesCheckedId = [];
  const citiesCheckedName = [];
  const statesCheckedId = [];
  const statesCheckedName = [];
  $(".amenities .popover li input:checkbox").change(function () {
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
  $(".locations .popover li ul li input:checkbox").change(function () {
    if ($(this).is(":checked")) {
      citiesCheckedName.push($(this).data("name"));
      citiesCheckedId.push($(this).data("id"));
    } else {
      citiesCheckedName.splice(
        citiesCheckedName.indexOf($(this).data("name")),
        1
      );
      citiesCheckedId.splice(citiesCheckedId.indexOf($(this).data("id")), 1);
    }
  });

  $(".locations .popover h2 input:checkbox").change(function () {
    if ($(this).is(":checked")) {
      statesCheckedName.push($(this).data("name"));
      statesCheckedId.push($(this).data("id"));
    } else {
      statesCheckedName.splice(
        statesCheckedName.indexOf($(this).data("name")),
        1
      );
      statesCheckedId.splice(statesCheckedId.indexOf($(this).data("id")), 1);
    }
  });

  $(".locations .popover input:checkbox").change(function () {
    const allLocations = citiesCheckedName.concat(statesCheckedName);
    if (allLocations.length > 0) {
      $(".locations h4").text(allLocations.join(", "));
    } else {
      $(".locations h4").html("&nbsp;");
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

  $("button").click(() => {
    $(".places").empty();
    $.ajax({
      type: "POST",
      url: "http://127.0.0.1:5001/api/v1/places_search",
      data: JSON.stringify({
        amenities: amenitiesCheckedId,
        states: statesCheckedId,
        cities: citiesCheckedId,
      }),
      dataType: "json",
      contentType: "application/json",
      success: (data) => {
        data.map((place) => {
          $(".places").append(
            `<article> <div class="title_box"><h2>${place.name}</h2><div class="price_by_night">$${place.price_by_night}</div></div><div class="information"><div class="max_guest">${place.max_guest} Guest</div><div class="number_rooms">${place.number_rooms} Bedroom</div><div class="number_bathrooms">${place.number_bathrooms} Bathroom</div></div><div class="description">${place.description}</div></article>`
          );
        });
      },
    });
  });
});
