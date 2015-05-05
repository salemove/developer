# Visitor public API.
The visitor public API consists of HTTP REST endpoints, javscript, HTML, CSS API and hotlinks. The API can only be used straight in the visitors' browser on the site - it cannot be used by third party services outside the site.

## Headers
In order to use the REST API, the request needs to include at least 3 headers: ```Authorization```, ```Accept``` and ```X-Salemove-Visit-Session-Id```.

### Authorization
The request has to include the visitors' ```SessionId```. The visitor session id on the site can be retrieved by using the SaleMove javascript API.

> Authorization

```javascript
'Authorization', salemoveApi.getRequestHeaders()['Authorization']
```

### Accept token

The API version must be explicitly set in the request ```Accept``` header.

> Accept token

```shell
Accept: application/vnd.salemove.v1+json
```

### X-Salemove-Visit-Session-Id token
The request also needs to include ```X-Salemove-Visit-Session-Id```.

> X-Salemove-Visit-Session-Id token

```javascript
'X-Salemove-Visit-Session-Id', salemoveApi.getRequestHeaders()['X-Salemove-Visit-Session-Id']
```

### Full ajax example
The following is an example of a ajax request including all necessary headers.

> Full ajax example

```javascript
$.ajax({
  type: 'GET',
  url: 'https://api.salemove.com/visitor',
  headers: salemoveApi.getRequestHeaders(),
  success: function(response){
      ajaxResponse = response;
  }
});
```

## REST API

### Get current visitor

> Get current visitor

```shell
GET /visitor
```

Fetches the information of current visitor on the site.

> + Response 200 (application/json)

```json
{
  "href": "http://api.salemove.com/visitor",
  "name": "John",
  "email": "test@email.com",
  "phone": "55443322",
  "note": "some random dude",
  "custom_attributes": {
    "These are custom fields, which you can define yourself. Those shown below are just examples": "...",
    "home_address": "Winston",
    "vip": "true"
  }
}
```

### Update current visitor

> Update current visitor

```shell
POST /visitor
```

Updates the information of the current visitor on the site. You can send custom attributes as key-value pairs to the visitor. The server treats all keys and values as strings and also returns them as strings. You cannot use nested key-value pairs.

The ```note_update_method``` parameter takes either value ```replace``` which replaces existing notes or value ```append``` which adds note to the existing notes. If this field is left out, the default ```replace``` value is omitted.

> + Request body

```json
{
  "name": "John",
  "email": "test@email.com",
  "phone": "55443322",
  "note": "some random dude",
  "note_update_method": "append",
  "custom_attributes": {
    "These are custom fields, which you can define yourself. Those shown below are just examples": "...",
    "home_address": "Winston",
    "vip": true,
    "last_visited": "2014-02-18T12:24:34.420Z"
  }
}
```

> + Response 200 (application/json)

```json
{
  "href": "http://api.salemove.com/visitor",
  "name": "John",
  "email": "test@email.com",
  "phone": "55443322",
  "note": "some random dude",
  "custom_attributes": {
    "These are custom fields, which you can define yourself. Those shown below are just examples": "...",
    "home_address": "Winston",
    "vip": "true",
    "last_visited": "2014-02-18T12:24:34.420Z"
  }
}
```

## Javascript API

### Fetching the API
Fetching the API will return a [promise](http://www.html5rocks.com/en/tutorials/es6/promises/). Once all SaleMove scripts have been loaded on the site, the promise will resolve and return the javascript API.

> Fetching the API


```javascript
sm.getApi().then(
    function(api){
      console.log("I got the api!", api);
      window.salemoveApi = api;
    },
    function(err){ console.log("An error occured: ", err)}
  );
```


### Events

> Events

```shell
ENGAGEMENT_START
ENGAGEMENT_END
```

All the available events that the SaleMove platform can fire are listed under the ```EVENTS``` variable.

```javascript
salemoveApi.EVENTS.ENGAGEMENT_START
```

#### add Event Listener

> addEventListener

```javascript
addEventListener(eventName, callback)
```

To add an event listener to the API, you can use the ```addEventListener``` method. The callback will be fired when SaleMove application fires the event

> + Sample usage

```javascript
salemoveApi.addEventListener(
  salemoveApi.EVENTS.ENGAGEMENT_END,
  function(args){ console.log('the engagement ended!')}
);
```

#### remove Event Listener

> removeEventListener

```javascript
removeEventListener(eventName, callback)
```

It is possible to remove callbacks that have been previously registered.

> + Sample usage

```javascript
salemoveApi.removeEventListener(
  salemoveApi.EVENTS.ENGAGEMENT_END,
  my_function}
);
```

#### get Request Headers

> getRequestHeaders

```javascript
getRequestHeaders()
```

Returns a hash of the headers and values that are required for the visitor to authenticate with the API.

> + Sample usage

```javascript
$.ajax({
  type: 'GET',
  url: 'https://api.salemove.com/visitor',
  headers: salemoveApi.getRequestHeaders(),
  success: function(response){
      ajaxResponse = response;
  }
});
```

## HTML and CSS API

### Hiding some elements from the operator

> Hiding some elements from the operator

```html
class: sm_cobrowsing_hidden_field
```

To hide an element for the operator during observation or cobrowsing, assign a CSS class to an element.

> + Sample usage

```html
<div class='sm_cobrowsing_hidden_field'>...</div>
<div class='sm_cobrowsing_hidden_field other-classes'>...</div>
<div class='other-classes sm_cobrowsing_hidden_field'>...</div>
<input class='other-classes sm_cobrowsing_hidden_field' other="...">..</input>
<form class='other-classes sm_cobrowsing_hidden_field' other="...">..</form>
```

### Masking a field from the operator

> Masking a field from the operator

```html
class: sm_cobrowsing_masked_field
```

To hide the value of an element for the operator during observation or cobrowsing, assign a CSS class to an input element. Every character that the visitor types to that field will be replaced with an asterisk ```*``` for the operator.

> + Sample usage 

```html
<form action="action" method="get">
First name:
<input class="sm_cobrowsing_masked_field" type="text" name="first_name" />
Last name:
<input class="sm_cobrowsing_masked_field last_name_class" type="text" name="last_name" />
<input type="submit" value="Submit" />
</form>
```

### Disabling some elements for the operator

> Disabling some elements for the operator

```html
class: sm_cobrowsing_disabled_field
```

To disable an element for the operator during cobrowsing, assign a CSS class to an input element. The operator cannot interact with the element. 

> + Sample usage

```html
<form action="action" method="get">
First name:
<input class="sm_cobrowsing_disabled_field" type="text" name="first_name" />
Last name:
<input class="sm_cobrowsing_disabled_field last_name_class "type="text" name="last_name" />
<input type="submit" value="Submit" />
</form>
```

### External button

> External button

```html
class: salemove-button
```

To put a SaleMove specific button on the web page that will open media-selection dialog when clicked, assign a CSS class to a button or span element. The button color and text can be customized by speaking with your customer success manager.

> + Sample usage

```html
<div class='salemove-button'>...</div>
<span class='salemove-button'>...</span>
```

### Custom element external button

> Custom element external button

```html
Attribute: data-sm-show-media-selection-on=[event]
```

To put a SaleMove specific button to the page on any type of element, not just button or span, that will trigger media-selection, use a custom javascript attribute on the element with the desired [DOM event](http://www.w3schools.com/jsref/dom_obj_event.asp).

> + Sample usage

```html
link: <a data-sm-show-media-selection-on="click" href="javascript:void(0);">...</a>
div: <div data-sm-show-media-selection-on="dblclick"><h3>Double-click me to start an engagement!</h3></div>
```

## Hotlink

### Trigger media selection

> Trigger media selection

```html
URL-hash: #sm_show_media_selection
```

To trigger the media selection dialog immediately when the page opens, put a hash at the end of the URL. This can be used, for example, to open the media selection immediately after the site visitor clicks on a link and navigates to a new page.

> + Sample usage

```html
With site address:      http://www.site.com
The ‘hotlink' would be: http://www.site.com#sm_show_media_selection.

<a href='http://www.site.com#sm_show_media_selection'>...</a>
```

### Trigger expand reactive tab for X seconds

> Trigger expand reactive tab for X seconds

```html
URL-hash: #sm_show_reactive_tab_20_seconds
```

To expand the reactive tab for X seconds when the linked page opens, put a hash at the end of the URL. This can be used, for example, to show the operator selector immediately after the visitor clicks on a link and navigates to a new page.

> + Sample usage

```html
With site address:      http://www.site.com
The 'hotlink' would be: http://www.site.com#sm_show_reactive_tab_20_seconds.

<a href='http://www.site.com#sm_show_reactive_tab_20_seconds'>...</a>
```

### Show notification and save visitor contact information when he first comes to the page

> Show notification and save visitor contact information when he first comes to the page

```html
URL-hash: #sm_show_notification
Notification message: #sm_show_notification
```

> Contact information saving:

```html
#sm_show_notification?name=visitor+name&phone=56567775&email=visitor@email.com&note=visitor+note&custom_attributes[attribute1]=attribute1+value&custom_attributes[attribute2]=attribute2+value
```

> Both notification and contact information saving:

```html
#sm_show_notification?message=some+message&name=visitor+name&phone=56567775&email=visitor@email.com&note=visitor+note&custom_attributes[attribute1]=attribute1+value&custom_attributes[attribute2]=attribute2+value
```

To immediately show a notification to operators, or save visitors' contact information when the visitor comes to the site, you can put the hash at the end of the URL. This can be used, for example for high-profile clients who should be contacted immediately after they come to the page and some information about them can already be pre-filled.

The query parameters should be put after the URL-hash, separated with the question mark **'?'** sign from the URL-hash. When using multiple parameters, separate them with the ampersand **'&'** sign.

When you want to **use spaces** in parameter values, you **need to replace spaces with '+' or '%20' signs**. The '+' or '%20' signs will be replaced with spaces automatically.

If some or all contact information parameters are missing, then missing values will not be updated. If no message is given, then a default message will be used for notification.

> The explanation of parameters
This message is shown to the operator:

```html
?message=some+message+to+show+to+the+operator
```

> This name will be saved as the visitor name:

```html
?name=Visitor+Name
```

> This email will be saved as the visitor email:

```html
?email=visitor@email.com 
```

> This phone will be saved as the visitors' phone:

```html
?phone=56565677
```

> This note will be appended to the existing visitors' note:

```html
?note=Some+note+about+the+visitor
```

You can save custom information about the visitor as specified in the 'Update current visitor' section. Each attribute key must be put inside brackets and multiple custom attributes must be separated with the ampersand '&' sign as other parameters.

> Save custom information about the visitor as specified in the 'Update current visitor' section

```html
?custom_attributes[attribute1]=attribute1+value&custom_attributes[attribute2]=attribute2+value
```
