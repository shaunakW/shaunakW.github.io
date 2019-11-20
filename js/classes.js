import {clientId, tenantId} from "./config";

const msalConfig = {
    auth: {
        // clientId and tenantId from config.js
        clientId: clientId,
        authority: "https://login.microsoftonline.com/" + tenantId,
        redirectUri: window.location.href
    }
};

const msal = new Msal.UserAgentApplication(msalConfig);

const request = {
    scopes: ["calendars.read"]
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
const nextDay = new Date(startDate.valueOf());
nextDay.setDate(nextDay.getDate() + 1);

function getClasses(accessToken) {
    const todayParams = {
        startDateTime: startDate.toISOString(),
        endDateTime: endDate.toISOString(),
        $select: "subject,start,end,isAllDay",
        $filter: "categories/any(c:c eq 'BCP Schedule')"
    };
    graphApi("/me/calendarView", todayParams, accessToken, function (json) {
        const order = document.getElementById("today-order");
        const classes = document.getElementById("today");
        if (json.value.length > 0) {
            for (const i of json.value) {
                if (i.isAllDay) {
                    order.innerHTML = "Today: " + i.subject;
                } else {
                    classes.appendChild(tableRow(i.subject, new Date(i.start.dateTime), new Date(i.end.dateTime)));
                }
            }
        } else {
            classes.innerHTML = "Hooray!! No classes today!"
        }
    });

    const nextParams = {
        $select: "subject,start,end,isAllDay",
        $filter: `categories/any(c:c eq 'BCP Schedule') and start/dateTime ge '${nextDay.getFullYear()}-${nextDay.getMonth() + 1}-${nextDay.getDate()}'`,
        $orderby: "end/dateTime",
        $top: 7
    };
    graphApi("/me/events", nextParams, accessToken, function(json) {
        const order = document.getElementById("next-order");
        const classes = document.getElementById("next");
        for (const i of json.value) {
            const start = new Date(i.start.dateTime);
            const end = new Date(i.end.dateTime);
            if (i.isAllDay) {
                order.innerHTML = `Next Class Day (${start.getMonth() + 1}-${start.getDate()}): ${i.subject}`;
                break;
            } else {
                classes.appendChild(tableRow(i.subject, start, end));
            }
        }
    })
}

function tableRow(subj, start, end) {
    const subject = subj.split(" - P");
    const tr = document.createElement("tr");

    const startTime = hourMinute(start);
    const endTime = hourMinute(end);

    tr.innerHTML = `<td>Period ${subject[1]} - ${subject[0]}</td><td>${startTime} - ${endTime}</td>`;
    return tr;
}

const logout = document.getElementsByClassName("logout");

function graphApi(endpoint, params, accessToken, completion) {
    let url = `https://graph.microsoft.com/v1.0${endpoint}?`;
    for (const p in params) {
        url += `${p}=${params[p]}&`;
    }

    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            const json = JSON.parse(xhttp.responseText);
            completion(json);
            if (logout[0].hidden) {
                // Show logout items when user is logged in and gets data
                for (const i of logout) {
                    i.hidden = false;
                }
            }
        }
    };
    xhttp.open("GET", url, true);
    xhttp.setRequestHeader("Authorization", `Bearer ${accessToken}`);
    xhttp.setRequestHeader("Prefer", 'outlook.timezone="America/Los_Angeles"');
    xhttp.send();
}

function hourMinute(date) {
    const hh = (date.getHours() - 1) % 12 + 1;
    let mm = date.getMinutes();
    if (mm < 10) mm = "0" + mm;
    return `${hh}:${mm}`;
}
