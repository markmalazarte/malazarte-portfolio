var keys = {
    "7ece43e9.ngrok.com": {
    	"name": "Mark's local machine - dev only",
        "clientId": "805012459399-84ci2jskasdcih0fn1asfae8kce931r6.apps.googleusercontent.com",
    },
     "977f988.ngrok.com":{
        "name": "Mark's machine, but using DowJones client id because he doesn't have access to newscorp systems",
        "clientId": "356450068732-vigm7gvghpl9hcnef0a8nrqpf8hdkafd.apps.googleusercontent.com",
    },
    "5c5b65cb.ngrok.com": {
    	"name": "Simon's local machine - dev only",
        "clientId": "805012459399-06u6j0lenhpf9idts5sdq5el56uftssg.apps.googleusercontent.com",
    },
    "6ee60dee.ngrok.com": {
        "name": "Eric's local machine - dev only",
        "clientId": "356450068732-u0fdsljp3uv7s79iug52ult9m4phe75k.apps.googleusercontent.com",
    },
    "dj-exec-dash.svc.newscorp.com": {
    	"name": "Prod instance",
        "clientId": "805012459399-251dkq3uqaj4p0iqj2rfojmvoseect3j.apps.googleusercontent.com",
    }
}

function getKey(keyname) {
    var hostname = window.location.hostname;
    console.log(hostname)
    return keys[hostname][keyname];
}
