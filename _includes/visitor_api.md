# Visitor public API.
The visitor public API consist of HTTP REST endpoints, javscript, HTML, CSS API and hotlinks. The API can only be used straight in the visitor browser on the site - it cannot be used by third party services outside the site.

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

Updates the information of the current visitor on the site. You can send custom attributes attributes as key-value pairs to the visitor. The server treats all keys and values as strings and also returns them as strings. You cannot use nested key-value pairs.

+ Request body

      }
        "name" => 'John',
        "email" => 'test@email.com',
        "phone" => '55443322',
        "note" => 'some random dude',
        "custom_attributes" => {
          "home_address" => 'Winston',
          "vip" => 'true',
          "last_visited" => '2014-02-18T12:24:34.420Z'
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
          "vip" => 'true',
          "last_visited" => '2014-02-18T12:24:34.420Z'
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

# HTML and CSS API

## Hiding some elements from the operator

    class: sm_cobrowsing_hidden_field

To hide an element for the operator during observation or cobrowsing, you can put a css class on an element.

    <div class='sm_cobrowsing_hidden_field'>...</div>
    <div class='sm_cobrowsing_hidden_field other-classes'>...</div>
    <div class='other-classes sm_cobrowsing_hidden_field'>...</div>
    <input class='other-classes sm_cobrowsing_hidden_field' ...>..</input>
    <form class='other-classes sm_cobrowsing_hidden_field' ...>..</form>

## Masking a field from the operator

    class: sm_cobrowsing_masked_field

To hide the value of an element for the operator during observation or cobrowsing, you can put a css class on an input. Every character that the visitor types to that field will be replaced with an asterisk ```*``` for the operator.

    <form action="action" method="get">
    First name:
    <input class="sm_cobrowsing_masked_field" type="text" name="first_name" />
    Last name:
    <input class= "sm_cobrowsing_masked_field last_name_class"type="text" name="last_name" />
    <input type="submit" value="Submit" />
    </form>

## Disabling some elements for the operator

    class: sm_cobrowsing_disabled_field

To disable an element for the operator during cobrowsing, to the operator cannot interact with the element, you can put a css class on an input.

    <form action="action" method="get">
    First name:
    <input class="sm_cobrowsing_disabled_field" type="text" name="first_name" />
    Last name:
    <input class= "sm_cobrowsing_disabled_field last_name_class"type="text" name="last_name" />
    <input type="submit" value="Submit" />
    </form>

## External button

    class: salemove-button

To put a SaleMove specific button on the web page that will open media-selection dialog when clicked, you can put a css class on a button or span. The button color and text can be customized by speaking with your customer success manager.

    <div class='salemove-button'>...</div>
    <span class='salemove-button'>...</span>

## Custom element external button

    Attribute: data-sm-show-media-selection-on=[event]

To put a SaleMove specific button on the page on any type of element, not just button or span, that will trigger media-selection, use a custom javascript attribute on the element with the desired (DOM event)[http://www.w3schools.com/jsref/dom_obj_event.asp].

    link: <a data-sm-show-media-selection-on="click" href="javascript:void(0);">...</a>
    div: <div data-sm-show-media-selection-on="dblclick"><h3>Double-click me to start an engagement!</h3></div>

# Hotlink

## Trigger media selection

    Url-hash: #sm_show_media_selection

To trigger a media selection dialog immediately when the page opens, put a hash at the end of the url. This can be used, for example, to open the media selection immediately after the site visitor clicks on a link and navigates to a new page.


    With site address:      http://www.site.com
    The ‘hotlink' would be: http://www.site.com#sm_show_media_selection.

    <a href='http://www.site.com#sm_show_media_selection'>...</a>

## Trigger expand reactive tab for X seconds

    Url-hash: #sm_show_reactive_tab_20_seconds

To expand the reactive tab for X seconds then the linked page opens, you can put a hash at the end of the url. This can be used, for example, to show the operator selector immediately after the visitor clicks on a link and navigates to a new page.

    With site address:      http://www.site.com
    The 'hotlink' would be: http://www.site.com#sm_show_reactive_tab_20_seconds.

    <a href='http://www.site.com#sm_show_reactive_tab_20_seconds'>...</a>


