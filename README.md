#Chrome load time logger
A greasemonkey script to record page load times and log them to a Google Drive form/spreadsheet.

##Getting started
1. Create a Google Form within [Google Drive](http://drive.google.com) (click the red CREATE button, then select Form).
2. Add a field to record the page load time, and another field to record the URL being loaded. A timestamp column will be automatically created for you in the spreadsheet that Google Drive will use to store the form submissions.
3. Take a note of your form's key which can be found in the URL of the form creation page. It will look something like this: `1ZkptJLhs8XAR37wN1gq8TH0iNuCHWZ9eDv70NQvsbRA`.
4. Open timer.js and insert your form key into the `formResponseURL` variable , replacing the long string of `XXXX`s.
5. Back in Google Drive, view your live form. Use the Inspector or View Source option to find the name attribute of both your form fields. These values will look something like `entry.725701822`. Copy and paste these values into the `loadTimeEntryID` and `documentURLEntryID` variables in timer.js.
6. Amend the Greasemonkey match rule ```// @match      https://example.org/*``` to execute the script on whichever domain you want to collect load time data for.
7. Add the script to your Greasemonkey dashboard and make sure it is enabled. Data will now be sent to your Google Form and saved for you in your Google Drive account. You will see XSS/'xmlhttprequest cannot load' errors in your console, but these can be ignored - the data is being sent to Google Drive despite the errors.

###Credit
Load time logging code is based on [alex-vv's Chrome plugin to display page load times](https://github.com/alex-vv/chrome-load-timer).
