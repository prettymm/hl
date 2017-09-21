//String.format('{0} is a {1}', 'A', 'B')
String.format = function () { //It can be removed if not used
    // The string containing the format items (e.g. "{0}")
    // will and always has to be the first argument.
    var theString = arguments[0];

    // start with the second argument (i = 1)
    for (var i = 1; i < arguments.length; i++) {
        // "gm" = RegEx options for Global search (more than one instance)
        // and for Multiline search
        var regEx = new RegExp("\\{" + (i - 1) + "\\}", "gm");
        theString = theString.replace(regEx, arguments[i]);
    }

    return theString;
}
function MakeRequest(theUrl, paramData, callbackfunction, requestType, async, cache) {
    if (requestType == undefined) {
        requestType = "POST"
    }
    if (paramData == undefined) {
        paramData = '{}'
    }
    if (async == undefined) {
        async = false;
    }
    if (cache == undefined) {
        cache = false;
    }


    $.ajax({
        url: theUrl,
        data: paramData,
        dataType: "json",
        type: requestType,
        async: async,
        cache: cache,
        //contentType: "application/json",
        //contentType: 'application/json; charset=utf-8',
        error: function (e) {
            //alert("An error has occurred." + e);
        },
        success: function (data) {
            callbackfunction(data);
        }
    });
}
//var countryID = GetQueryStringParams('countryID');
function GetQueryStringParams(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}
