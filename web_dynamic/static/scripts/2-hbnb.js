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
    console.log(amenitiesCheckedId);
  });

  $.get("http://127.0.0.1:5001/api/v1/status", (data) => {
    if (data.status === "OK") {
      $("#api_status").addClass("available");
    } else {
      $("#api_status").removeClass("available");
    }
  });
});
