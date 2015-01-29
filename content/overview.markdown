---
title: Overview
---

### Salemove public API.
Welcome to SaleMove public API

### API types

The Salemove has 2 types of API-s. The visitor side and the operator side API.

The visitor side API can be accessed directly through the visitor browser. The API contains both public REST endpoints and javascript API. The REST endpoints require visitor session id for authentication.

The operator side API contains public REST endpoints that can be accessed by an operator with manager privileges. To use the REST endpoints, either the operator authentication or api token must be used for authentication. The api token can be received by contacting our support.

### Current version

The current api version is **v1** and this must be explicitly set in the request ```Accept``` header.
```
Accept: application/vnd.salemove.v1+json
```

### Schema

All API access is over HTTPS and accessed from ```api.salemove.com``` domain. All data is sent and received as JSON

```
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
```

Blank fields are included as null instead of being omitted.

All timestamps are returned in ISO 8601 format:
```
YYYY-MM-DDTHH:MM:SSZ
```

## Collections or list of resources

Requests that return multiple items will be paginated to 30 items by default. You can specify further pages with the ?page parameter. FYou can also set a custom page size up to 100 with the ?per_page parameter.

# Example
When you fetch all the operators that a manager can manage, then the first 30 operators are returned:
```
GET /operators
```
To get the second page of the operators, add a ```page=2``` to the request, e.g.:
```
GET /operators?page=2
```

### Client errors

When a request throws an error, it also returns a JSON describing that error. Often the JSON contains both error and a debug message, which can help you diagnose problems better.
```
HTTP/1.1 400 400
{
  error: 'BadRequest',
  message: 'Invalid api version used',
  debug_message: 'Invalid api version used. Make sure you set the "Accept" header with API version e.g. "application/vnd.salemove.v1+json"'
}
```

### HTTP Verbs

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

### Cross Origin Resource Sharing

The API supports Cross Origin Resource Sharing (CORS) for AJAX requests from any origin. You can read the CORS W3C Recommendation, or this intro from the HTML 5 Security Guide.

