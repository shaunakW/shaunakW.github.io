const msalConfig = {
    auth: {
        // clientId and tenantId from config.js
        clientId: clientId,
        authority: "https://login.microsoftonline.com/" + tenantId,
        redirectUri: window.location.href
    }
};

const msal = new Msal.UserAgentApplication(msalConfig);
const classesToday = document.getElementById("classes-today");
const classes = document.getElementById("classes");

const request = {
    scopes: ["calendars.read.shared"]
};

msal.acquireTokenSilent(request).then(function (response) {
    getClasses(response["accessToken"]);
}).catch(function (error) {
    console.log(error);
    msal.acquireTokenPopup(request).then(function (response) {
        getClasses(response["accessToken"]);
    }).catch(function (error) {
        console.log(error);
    });
});

const startDate = new Date();
startDate.setHours(8, 15, 0, 0);
const endDate = new Date(startDate.valueOf());
endDate.setHours(14, 45, 0, 0);

function getClasses(accessToken) {
    const xhttp = new XMLHttpRequest();
    const params = {
        startDateTime: startDate.toISOString(),
        endDateTime: endDate.toISOString(),
        $select: "subject,start,end,isAllDay",
        $filter: "categories/any(c:c eq 'BCP Schedule')"
    };
    const url = getApiUrl("/me/calendarView", params);
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            const json = JSON.parse(xhttp.responseText);
            console.log(json);
            if (json["value"].length > 0) {
                for (const i of json["value"]) {
                    if (i["isAllDay"]) {
                        classesToday.innerHTML = "Today: " + i["subject"];
                    } else {
                        const subject = i["subject"].split(" - P");
                        const tr = document.createElement("tr");

                        const startTime = hourMinute(new Date(i["start"]["dateTime"]));
                        const endTime = hourMinute(new Date(i["end"]["dateTime"]));

                        tr.innerHTML = `<td>Period ${subject[1]} - ${subject[0]}</td><td>${startTime} - ${endTime}</td>`;
                        classes.appendChild(tr);
                    }
                }
            } else {
                classes.innerHTML = "Hooray!! No classes today!"
            }
        }// else console.log(xhttp.responseText)
    };
    xhttp.open("GET", url, true);
    xhttp.setRequestHeader("Authorization", `Bearer ${accessToken}`);
    xhttp.setRequestHeader("Prefer", 'outlook.timezone="America/Los_Angeles"');
    xhttp.send();
}

function getApiUrl(endpoint, params) {
    let url = `https://graph.microsoft.com/v1.0${endpoint}?`;
    for (const p in params) {
        url += `${p}=${params[p]}&`;
    }
    return url;
}

function hourMinute(date) {
    const hh = (date.getHours() - 1) % 12 + 1;
    let mm = date.getMinutes();
    if (mm < 10) mm = "0" + mm;
    return `${hh}:${mm}`;
}