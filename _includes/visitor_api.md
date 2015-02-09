# Visitor public API.
The visitor public API includes a set of HTTP REST endpoints and javscript API. The API can only be used from the visitor browser on the site - it cannot be used by third party services outside the site.

## Headers
In order to use the REST API, the request needs to include at least 3 headers: ```Authorization<```, ```Accept``` and ```X-Salemove-Visit-Session-ID```.

### Authorization
The request has to include the visitor's ```SessionId```. The visitor session id on the site can be retrieved by using the salemove javascript API:

    'Authorization', salemoveApi.getRequestHeaders()['Authorization']

### Accept token

The API version must be explicitly set in the request ```Accept``` header.

    Accept: application/vnd.salemove.v1+json

### X-Salemove-Visit-Session-Id token
The request also needs to include ```X-Salemove-Visit-Session-ID```.

    'X-Salemove-Visit-Session-Id', salemoveApi.getRequestHeaders()['X-Salemove-Visit-Session-Id']

### Full ajax example
The following is an example of a ajax request including all necessary headers.

    $.ajax({
      type: 'GET',
      url: 'https://api.salemove.com/visitor',
      headers: salemoveApi.getRequestHeaders(),
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
        "href" => 'http://api.salemove.com/visitor',
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
        "href" => 'http://api.salemove.com/visitor',
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

It is possible to remove callbacks that have been previously registered.

    salemoveApi.removeEventListener(
      salemoveApi.EVENTS.ENGAGEMENT_END,
      my_function}
    );

## #getRequestHeaders

    getRequestHeaders()

Returns a hash of the headers and values that are required for the visitor to authenticate with the API.

    $.ajax({
      type: 'GET',
      url: 'https://api.salemove.com/visitor',
      headers: salemoveApi.getRequestHeaders(),
      success: function(response){
          ajaxResponse = response;
      }
    });
