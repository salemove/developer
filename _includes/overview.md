# SaleMove public API.
Welcome to SaleMove public API

# API types

SaleMove provides of APIs to be used in both the visitor's and the operator's browsers.

The visitor side API endpoints can be accessed directly through the visitor browser. The API includes both public REST endpoints and javascript API. The REST endpoints require the visitor session id to be sent along with the requests for authentication purposes.

he operator side API includes a set of public REST endpoints that can be accessed by an operator who has been granted with manager privileges. In order to use the REST endpoints, the requests should include either the operator session token or the api token for authentication purposes. The API token can be received by contacting our support.


# Current version

The current api version is **v1**  and this must be explicitly set while sending a request ```Accept```  header.


    Accept: application/vnd.salemove.v1+json


# Schema

All API access is over HTTPS and accessed from ```api.salemove.com``` domain. All data is sent and received as JSON


    $ curl -i https://api.salemove.com/engagements HEADER_DATA

    HTTP/1.1 200 OK
    Date: Thu, 29 Jan 2015 11:44:37 GMT
    Status: 200 OK
    Connection: close
    Content-Type: text/html;charset=utf-8
    Access-Control-Allow-Origin: http://sm.dev:3001
    Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS, PATCH
    Access-Control-Allow-Headers: *, Content-Type, Accept, AUTHORIZATION, Cache-Control, X-Salemove-Visit-Session-Id
    Access-Control-Allow-Credentials: true
    Access-Control-Max-Age: 1728000
    Access-Control-Expose-Headers: Cache-Control, Content-Language, Content-Type, Expires, Last-Modified, Pragma
    Content-Length: 0
    X-XSS-Protection: 1; mode=block
    X-Content-Type-Options: nosniff
    X-Frame-Options: SAMEORIGIN

    []

Blank fields are included as null instead of being omitted.

## DateTime
All timestamps are formatted to ISO-8601

    YYYY-MM-DDTHH:MM:SSZ


## Collections or list of resources

Requests that return multiple items are paginated to 30 items by default. You can specify further pages by setting the ?page parameter. In addition, It is possible to set a custom page size up to 100 with the ?per_page parameter.


### Example
When you fetch all the operators then the response includes the first 30 operators:

    GET /operators

In order to get the second page of the operators set the parameter ```page``` to ```page=2```, e.g.:

    GET /operators?page=2

### Next and last page links
The response of the paginated collections always contains the ```last_page``` href and, if available, the ```next_page<``` href. It is strongly recommended to follow these references, instead of constructing your own URLs.

####Example
An example of an arbitarty collection response:

    {
        'next_page' => 'http://api.salemove.com/collections?page=2',
        'last_page' => 'http://api.salemove.com/collections?page=3',
        'collection' => [
          {
            "href" => "http://api.salemove.com/collections/1',
            "attribute" => 'value,
            ...
          },
          {
            "href" => "http://api.salemove.com/collections/2',
            "attribute" => 'value',
            ...
          },
        ]
    }


# Client errors

When a request throws an error, it returns a JSON describing the error. In addition, in most of the cases the response includes both the error and a debug message. This information can be further used to troubleshoot problems better.


    HTTP/1.1 400 400
    {
      error: 'BadRequest',
      message: 'Invalid api version used',
      debug_message: 'Invalid api version used. Make sure you set the "Accept" header with API version e.g. "application/vnd.salemove.v1+json"'
    }


# HTTP Verbs

Where possible, API v3 strives to use appropriate HTTP verbs for each
action.

Verb | Description
-----|-----------
`HEAD` | Can be issued against any resource to get just the HTTP header info.
`GET` | Used for retrieving resources.
`POST` | Used for creating resources.
`PATCH` | Used for updating resources with partial JSON data.  For instance, an Issue resource has `title` and `body` attributes.  A PATCH request may accept one or more of the attributes to update the resource.  PATCH is a relatively new and uncommon HTTP verb, so resource endpoints also accept `POST` requests.
`PUT` | Used for replacing resources or collections. For `PUT` requests with no `body` attribute, be sure to set the `Content-Length` header to zero.
`DELETE` |Used for deleting resources.

# Cross Origin Resource Sharing

The API supports Cross Origin Resource Sharing (CORS) for AJAX requests from any origin. You can read the CORS W3C Recommendation, or this intro from the HTML 5 Security Guide.
