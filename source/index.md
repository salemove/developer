---
title: Salemove API

includes:
  - operator_api
  - visitor_api
  - sites_api

search: true
---

#SaleMove public API.
Welcome to SaleMove public API documentation!

## API types

SaleMove provides number of APIs to be used in both the visitors' and the operators' browsers.

The visitor side API endpoints can be accessed directly through the visitor browser. The API includes both public REST endpoints and javascript API. The REST endpoints require the visitor session id to be sent along with the requests for authentication purposes.

The operator side API includes a set of public REST endpoints that can be accessed by an operator who has been granted with manager privileges. In order to use the REST endpoints, the requests should include either the operator session token or the API token for authentication purposes. The API token can be received by contacting our support.


## Current version

The current API version is **v1**  and this must be explicitly set while sending a request ```Accept```  header.

> ```Accept```  header

```shell
Accept: application/vnd.salemove.v1+json
```

## Schema

All APIs are accessed over HTTPS from ```api.salemove.com``` domain. All data is sent and received as JSON.

> Access API via curl

```shell
$ curl -i https://api.salemove.com/engagements HEADER_DATA
```
```http
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
```

Blank fields are included as null instead of being omitted.

### DateTime
All timestamps are formatted to ISO-8601

> Timestamp format

```shell
YYYY-MM-DDTHH:MM:SSZ
```

### Collections or list of resources

Requests that return multiple items are paginated to 30 items by default. You can specify further pages by setting the ?page parameter. In addition, it is possible to set a custom page size up to 100 with the ?per_page parameter.

Fetching for all the operators returns the first 30 operators

>Fetching all the operators, returns the first 30 operators

```shell
GET /operators
```

>Get the second page of the operators, set the parameter ```page``` to ```page=2```

```shell
GET /operators?page=2
```

#### Next and last page links
The response of the paginated collections always contains the ```last_page``` element and, if available, the ```next_page``` element with corresponding URI. It is strongly recommended to follow these references, instead of constructing your own URLs.

>Arbitrary collection response

```json
[
  {
      "next_page" : "http://api.salemove.com/collections?page=2",
      "last_page" : "http://api.salemove.com/collections?page=3",
      "collection" : [
        {
          "href" : "http://api.salemove.com/collections/1",
          "attribute" : "value",
          "..." : "..."
        },
        {
          "href" : "http://api.salemove.com/collections/2",
          "attribute" : "value",
          "..." : "..."
        },
      ]
  }
]
```

## Client errors

In case of invalid request, an error is thrown. The response is returned as JSON describing the error. In addition, in most of the cases the response includes both the error and a debug message. This information can be further used to troubleshoot problems.

```http
HTTP/1.1 400 400
```
```json
[
  {
    "error": "BadRequest",
    "message": "Invalid api version used",
    "debug_message": "Invalid api version used. Make sure you set the 'Accept' header with API version e.g. 'application/vnd.salemove.v1+json'"
  }
]
```

## HTTP Verbs

Where possible, API strives to use appropriate HTTP verbs for each
action.

HTTP_Verbs | Description
---------|-----------
`HEAD` | Can be issued against any resource to get just the HTTP header info.
`GET` | Used for retrieving resources.
`POST` | Used for creating resources.
`PATCH` | Used for updating resources with partial JSON data.  For instance, an Issue resource has `title` and `body` attributes.  A PATCH request may accept one or more of the attributes to update the resource.  PATCH is a relatively new and uncommon HTTP verb, so resource endpoints also accept `POST` requests.
`PUT` | Used for replacing resources or collections. For `PUT` requests with no `body` attribute, be sure to set the `Content-Length` header to zero.
`DELETE` |Used for deleting resources.

## Cross Origin Resource Sharing

The API supports Cross Origin Resource Sharing (CORS) for AJAX requests from any origin. You can read the CORS W3C Recommendation, or the intro from the HTML 5 Security Guide.
