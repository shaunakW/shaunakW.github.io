// Old code to access Canvas API
// Likely not needed

const main = document.getElementById("main");
// Canvas API doesn't return all courses for some reason
canvasRequest("courses?enrollment_state=active", function (response) {
    const json = JSON.parse(response);
    for (const c of json) {
        const date = new Date(c["start_at"]);
        if (date.getFullYear() > 2015) {
            const a = document.createElement("a");
            a.href = `https://bcp.instructure.com/courses/${c["id"]}`;
            a.target = "_blank";
            a.style.display = "block";
            a.style.margin = "10px 0";
            const pre = document.createElement("pre");
            pre.style.fontFamily = "Rubik";
            const name = c["name"].split("-");
            pre.innerHTML = `${name.slice(0, name.length - 3).join("-")}  -  ${name[name.length - 1]}`;
            a.appendChild(pre);
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
    xhttp.setRequestHeader("Authorization", `Bearer ${canvasAccessToken}`); // canvasAccessToken from config.js
    xhttp.send();
}