const main = document.getElementById("main");

// Canvas API doesn't return all courses for some reason
canvasRequest("courses?enrollment_state=active", function (response) {
    const json = JSON.parse(response);
    for (const c of json) {
        const date = new Date(c["start_at"]);
        if (inSchoolYear(date)) {
            const a = document.createElement("a");
            a.href = `https://bcp.instructure.com/courses/${c["id"]}`;
            a.target = "_blank";
            a.style.display = "block";
            a.style.margin = "10px 0";
            a.innerHTML = c["name"];
            main.appendChild(a);
        }
    }
});

// Makes HTTP request to Canvas API
function canvasRequest(apiSection, completion) {
    const xhttp = new XMLHttpRequest();
    const corsAnywhere = "https://cors-anywhere.herokuapp.com";
    const url = `https://bcp.instructure.com/api/v1/${apiSection}`;
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            console.log(JSON.parse(xhttp.responseText));
            completion(xhttp.responseText);
        }
    };
    xhttp.open("GET", `${corsAnywhere}/${url}`, true);
    xhttp.setRequestHeader("Authorization", `Bearer ${getToken()}`);
    xhttp.send();
}

// TODO: get OAuth access token
function getToken() {
    return "" // Put your access token here
}

// Checks if given date is in current school year
// Note: dates are offset by 5 months so dates in the same school year have the same year ending
const current = new Date();
current.setMonth(current.getMonth() - 5);
function inSchoolYear(date) {
    date.setMonth(date.getMonth() - 5);
    return date.getFullYear() === current.getFullYear();
}