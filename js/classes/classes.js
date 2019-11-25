const clientId = '8866edb7-8c56-48d6-a7cc-223fd09280ea';
const tenantId = 'b0e91a46-079b-4108-bd1a-e246d5d2f971';

const msalConfig = {
    auth: {
        clientId: clientId,
        authority: 'https://login.microsoftonline.com/' + tenantId,
        redirectUri: window.location.href
    }
};

const msal = new Msal.UserAgentApplication(msalConfig);

const request = {
    scopes: ['calendars.read']
};

msal.acquireTokenSilent(request).then(function (response) {
    getClasses(response.accessToken);
}).catch(function (error) {
    console.log(error)
    msal.acquireTokenPopup(request).then(function (response) {
        getClasses(response.accessToken);
    }).catch(function (error) {
        console.log(error);
        alert('There was an error trying to log you in. You might need to enable pop-ups for this website then reload. If the error still persists, check the console.');
    });
});

function showClasses() {
    anime({
        targets: '#classes > *',
        translateY: [hr(1).getBoundingClientRect().top - hr(2).getBoundingClientRect().top, 0],
        delay: 500,
        duration: 2000,
        easing: 'easeOutBounce',
        begin: () => document.getElementById('classes').style.opacity = 1,
        complete: showHomework
    });
}

function showHomework() {
    anime({
        targets: '#homework > *',
        translateY: [hr(2).getBoundingClientRect().top - hr(4).getBoundingClientRect().top, 0],
        duration: 2000,
        easing: 'easeOutBounce',
        begin: () => document.getElementById('homework').style.opacity = 1
    })
}

function hr(n) {
    return document.getElementById('hr-' + n);
}