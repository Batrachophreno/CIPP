$(document).ready(function () {

    //This function keeps trying to get the data until the variable 'waiting' disappears. It repeats every 5 seconds to a maximum of 300 seconds.


    $.ajax({
        'async': true,
        'global': false,
        'url': 'api/ExecAlertsList',
        'dataType': "json",
        'contentType': "application/json",
        'success': function (GUID) {
            //when succesfull, we get a GUID as a return. We use the GUID to get the actual data instead.
            GetAPIData("api/ExecAlertsList", GUID.GUID).then((data) => {
              console.log(data);
                //here we process the actual data returned by the GetAPIData feature!
                $('#loader').html(`<i class="fas fa-check-circle text-success fa-2x"></i>`)

                if (data.MSResults != "") {
                  $("#NewAlerts").html(data.NewAlertsCount);
                  $("#InProgressAlerts").html(data.InProgressAlertsCount);
                  $("#HighSeverityAlerts").html(data.SeverityHighAlertsCount);
                  $("#MediumSeverityAlerts").html(data.SeverityMediumAlertsCount);
                  $("#LowSeverityAlerts").html(data.SeverityLowAlertsCount);
                  $("#InformationalSeverityAlerts").html(data.SeverityInformationalCount);

                    data.MSResults.forEach(function (item) {
                        if (item.Id !== null) {
                          $('#Passwords').append(`<tr><td>${item.Tenant}</td><td>${item.Id}</td><td>${item.Title}</td><td>${item.Category}</td><td>${item.EventDateTime}</td><td>${item.Severity}</td><td>${item.Status}</td></tr>`);
                        }

                    });
                } else {
                    $('#Passwords').append(`<tr><td>Something went WRONG!</td><td></td><td></td></tr>`);

                }
            })
        },
        'error': function (xhr, ajaxOptions, thrownError) {
            $("#loader").html('<i class="fas fa-times-circle text-danger fa-2x"></i>Error - could not retrieve information from API.')
        }
    });
})