// ==UserScript==
// @name       Record page load times
// @namespace  http://wolstenhol.me
// @version    0.1
// @description  Logs page load times for performance analysis 
// @match      https://example.org/*
// @creditTo https://github.com/alex-vv/chrome-load-timer/blob/master/src/timer.js
// ==/UserScript==
(function() {
    
    // The URL of your Google Drive form with /viewform at the end of the URL swapped with /formResponse
    var formResponseURL = "https://docs.google.com/forms/d/XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/formResponse";
    // The entry ID of your load time form field (find this by using the inspector to identify the form field's name value, e.g. name="entry.725701822")
    var loadTimeEntryID = "entry.725701822";
    // As above but for the form field that holds the URL of the page being loaded
    var documentURLEntryID = "entry.1348332447";
    
    if (window.top != window.self)  //don't run on frames or iframes
    return;
    
    if (document.readyState == "complete" && loadEventEnd > 0) {
        measure();
    } else {
        window.addEventListener("load", measure);
    }
    
    function measure() {
        setTimeout(function() {
            var t = performance.timing;
            var start = t.redirectStart == 0 ? t.fetchStart : t.redirectStart;
            if (t.loadEventEnd > 0) {
                var time = String(((t.loadEventEnd - start) / 1000).toPrecision(3)).substring(0, 4);
                var data = {};
                data[loadTimeEntryID] = time;
                data[documentURLEntryID] = document.URL;
		jQuery.ajax({
			url: formResponseURL,
			data: data,
			type: "POST",
			dataType: "xml"
		});
            } else {
            	setTimeout(measure, 1000); 
            }
        }, 0);
    }
})();
