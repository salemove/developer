# Operator public API.
The visitor public API consist of HTTP REST endpoints and javscript API. The API can only be used straight in the visitor browser on the site - it cannot be used by third party services outside the site.

## Headers
To use the REST API, the request needs to include at least 3 headers: ```Authorization```, ```Accept``` and ```X-Salemove-Visit-Session-ID```

### Authorization
To use the REST API, the request needs to include the visitors ```SessionId```. To get the visitor session id on the site, you can use the following snipper of code:

    'Authorization', 'SessionId ' + sm.persistentDataStore.get('session_id')

### Accept token

The API version must be explicitly set in the request ```Accept``` header.

    Accept: application/vnd.salemove.v1+json

### X-Salemove-Visit-Session-Id token
The request also needs to include ```X-Salemove-Visit-Session-ID```. You can get it the following way:

    'X-Salemove-Visit-Session-Id', sm.currentVisit?.visit_session_id

### Full ajax example
Here is a full ajax request example with all the headers

    $.ajax({
      type: 'GET',
      url: 'https://api.salemove.com/visitor',
      headers: {
        'Accept': 'application/vnd.salemove.v1+json',
        'X-Salemove-Visit-Session-Id', sm.currentVisit?.visit_session_id,
        'Authorization', 'SessionId ' + sm.persistentDataStore.get('session_id')
      },
      success: function(response){
          ajaxResponse = response;
      }
    });


# REST API

## Get current visitor

    GET /visitor

Fetches the information of current visitor on the site.

+ Response 200 (application/json)

      {
        "href" => 'http://sm.dev:3004/visitor',
        "name" => 'John',
        "email" => 'test@email.com',
        "phone" => '55443322',
        "note" => 'some random dude',
        "custom_attributes" => {
          "home_address" => 'Winston',
          "vip" => "true"
        }
      }


## Update current visitor

    POST /visitor

Updates the information of the current visitor on the site.

+ Request body

      }
        "name" => 'John',
        "email" => 'test@email.com',
        "phone" => '55443322',
        "note" => 'some random dude',
        "custom_attributes" => {
          "home_address" => 'Winston',
          "vip" => "true"
        }
      }

+ Response 200 (application/json)

      {
        "href" => 'http://sm.dev:3004/visitor',
        "name" => 'John',
        "email" => 'test@email.com',
        "phone" => '55443322',
        "note" => 'some random dude',
        "custom_attributes" => {
          "home_address" => 'Winston',
          "vip" => "true"
        }
      }

# Javascript API

## Fetching the API
Fetching the API will return a [promise](http://www.html5rocks.com/en/tutorials/es6/promises/). Once all SaleMove scripts have been loaded on the site, the promise will resolve and return the javascript API.

    sm.getApi().then(
        function(api){
          console.log("I got the api!", api);
          window.salemoveApi = api;
        },
        function(err){ console.log("An error occured: ", err)}
      );

## #EVENTS

    ENGAGEMENT_START
    ENGAGEMENT_END

All the available events that the SaleMove platform can fire are listed under the ```EVENTS``` variable.

    salemoveApi.EVENTS.ENGAGEMENT_START

## #addEventListener

    addEventListener(eventName, callback)

To add an event listener to the API, you can use the ```addEventListener``` method. The callback will be fired when SaleMove application fires the event

    salemoveApi.addEventListener(
      salemoveApi.EVENTS.ENGAGEMENT_END,
      function(args){ console.log('the engagement ended!')}
    );

## #removeEventListener

    removeEventListener(eventName, callback)

You can remove callbacks from the salemove api object listeners, provided you give the same callback to the function that you did when you added the event.

    salemoveApi.removeEventListener(
      salemoveApi.EVENTS.ENGAGEMENT_END,
      my_function}
    );
