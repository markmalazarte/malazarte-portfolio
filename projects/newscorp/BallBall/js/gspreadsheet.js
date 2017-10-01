
var scopes = 'https://www.googleapis.com/auth/bigquery.readonly';

function handleClientLoad() {
    console.log('inside handleClientLoad function');
    window.setTimeout(checkAuth,1);
}

function checkAuth() {
    console.log('inside checkAuth function');
    gapi.auth.authorize({client_id: getKey('clientId'), scope: scopes, immediate: true}, handleAuthResult);
    console.log('finished checkAuth function');
}

function handleAuthResult(authResult) {
    console.log('inside handleAuthResult function');
    console.log(gapi.auth.getToken());
    var authButton = document.getElementById('authButton');
    authButton.style.display = 'none';
    if (authResult && !authResult.error) {
        //Access token has been successfully retrieved, requests can be sent to the API.
        gapi.client.setApiKey('');
        gapi.client.load('bigquery', 'v2', function() {
            postAuth();
        });   
    } else {
        //No access token could be retrieved, show the button to start the authorization flow.
        authButton.style.display = 'block';
        authButton.onclick = function() {
            gapi.auth.authorize({client_id: getKey('clientId'), scope: scopes, immediate: false}, handleAuthResult);
        };
    }
}

function toD3CompatibleData(data){
    var out = []
    for (var i = 0; i < data.length; i++) {
        out.push({'x':data[i]['date'] + 3600*5, 'y':data[i]['value']})
    }
    out.sort(function(a,b) {
        return a['x'] - b['x']
    });
    return out
}

function formatBulletChartData(all_data){
    var out = {} 
    out['Print'] = []
    out['Digital'] = []
    for(var k = 0; k < all_data.length; k++){
        var to_append = {}
        var data = all_data[k]
        to_append['title'] = data['date_title']
        to_append['measures'] = [data['booked'], data['expected']]
        to_append['markers'] = [data['outlook'], data['last_year']]
        to_append['date'] = data['date']
        out[data['type']].push(to_append)
    }
    out['Print'].sort(function(a,b) {
        return a['date'] - b['date']
    });
    out['Digital'].sort(function(a,b) {
        return a['date'] - b['date']
    });
    return out
}

function getDataFromBigQuery(callback) {
    var query = "SELECT * FROM [Dashboard_Results.WSJ_Dashboard] where dashboard_time = '" + getLastThursday() + "'"
    populateAllTheData(query, formatTimeSeriesAndvalues, callback);
}

function getBulletChartData(callback) {
    var query = "SELECT * FROM [Dashboard_Results.WSJ_Ad_Pacing] where dashboard_time = '" + getLastThursday() + "'"
    populateAllTheData(query, formatBulletChartData, callback);
}

function formatTimeSeriesAndvalues(data) {
    var out = {}
    for(var k = 0; k < data.length; k++) {
        var to_append = data[k]
        var label = to_append['widget_label']
        if (isNaN(to_append['date'])){
            out[label] = to_append['value']
        }
        else if (out[label] == undefined) {
            out[label] = []
            out[label].push(to_append)
        }
        else {
            out[label].push(to_append)
        }
    }
    
    for (var k in out) {
        if (out[k] instanceof Object) {
            out[k] = toD3CompatibleData(out[k])
        }
    }
    return out
}

function populateAllTheData(query, formatter,callback) {
   var projectId = '356450068732';

   var request = gapi.client.bigquery.jobs.query({
      'projectId': projectId,
      'timeoutMs': '30000',
      'query': query
    });
   var x = []

   request.execute(function(response) {     
        getEntireReponse(response, x, 0, formatter, callback)

    });
    
  }


function getEntireReponse(response, out, cRow, formatter, callback) {
    var projectId = '356450068732';
    
    if('rows' in response) {
        out.push(response);
        var jobId = response['jobReference']['jobId'];
        cRow += response['rows'].length
        var totalRows = response['totalRows']
        if (cRow < totalRows) {

             var request = gapi.client.bigquery.jobs.getQueryResults({
                      'projectId': projectId,
                      'jobId': jobId,
                      'startIndex': cRow
                    });
             request.execute(function(response_again) {

                getEntireReponse(response_again, out, cRow, formatter, callback)
             }
                );
        }
        else {
            data = formatter(iterateResponse(out))
            callback(data)
        }
    }
    else {
        data = formatter(iterateResponse(out))
        callback(data)
    }
    
}


function iterateResponse(response) {

    var fields = response[0]['schema']['fields'];
    var schema = [];
    var types = [];
    var out = [];
    for(var i = 0; i < fields.length; i++) {
        schema.push(fields[i]['name']);
    }
    for(var i = 0; i < fields.length; i++) {
        types.push(fields[i]['type']);
    }
    for(var i = 0; i < response.length; i++) {
        rows = response[i]['rows'];
        for(var j = 0; j < rows.length; j++) {
            r = rows[j]['f'];
            var to_append = {};

            for(var k = 0; k < r.length; k++) {
                to_append[schema[k]] = cnvrt_out(r[k]['v'], types[k]);
            }
            out.push(to_append)
            
        }
    }
    return out
}

function cnvrt_out(value, type) {
    if(type == 'TIMESTAMP' || type == 'FLOAT') {
        return parseFloat(value)
    }
    return value

}

function getLastThursday(the_day) {

    if(the_day == undefined) {
        var today = new Date()
    }
    else {
        var today = the_day
    }
  
    if (today.getDay() >= 6 || (today.getDay() == 5 && today.getUTCHours() >= 17)) {
        var delta = 7- today.getDay();
    }
    else {
        var delta = -1 * today.getDay();
    }

    today.setDate(today.getUTCDate() + delta - 3)
    return Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()) / 1000
}
