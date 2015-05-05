# Operator public API.
The operators' public API comprises a set of HTTP REST endpoints that can be used from the browser, command line, a server application, or other devices.

## Headers
In order to use the REST API, every request needs to include at least 2 headers: the  ```Authorization``` and the ```Accept```.

### Authorization
Every request needs to include either the operator ```SessionId``` or ```ApiToken```. It is recommended to use the API token which you can request from our support team. The API token is assigned per operator and currently only operators with manager privileges have the token enabled.

> API token example: curl request which includes the API token

```shell
$ curl -i https://api.salemove.com/engagements --header "Authorization: ApiToken MY_SECRET_API_TOKEN"
```

> Example with javascript

```javascript
    $.ajax({
      type: 'GET',
      url: 'https://api.salemove.com/engagements',
      headers: {
        'Authorization': 'ApiToken MY_SECRET_API_TOKEN'
      },
      success: function(response){
          ajaxResponse = response;
      }
    });
```

### Accept token

The API version must be explicitly set in every request via the ```Accept``` header.


> API version in the ```Accept``` header

```shell
Accept: application/vnd.salemove.v1+json
```

## REST API

### List engagements

> List engagements

```shell
GET /engagements
```
Fetches a collection of all engagements that the current manager has access to configure. The manager needs to have access to the site to be able to fetch an engagement from there. The collection is paginated and sorted by id (ascending).

> + Response 200 (application/json)

```json
      {
        "last_page": "https://api.salemove.com/engagements?page=2",
        "next_page": "https://api.salemove.com/engagements?page=2",
        "engagements": [
          {
            "href": "https://api.salemove.com/engagements/1",
            "duration": 30,
            "operators": [
              {
                "href": "https://api.salemove.com/operators/4"
              }
            ],
            "visitor": {
              "href": "https://api.salemove.com/visitors/1"
            },
            "chat_transcript":
            {
              "href": "https://api.salemove.com/engagements/1/chat_trascript"
            }
          },
          {
            "href": "https://api.salemove.com/engagements/2",
            "duration": 30,
            "operators": [
              {
                "href": "https://api.salemove.com/operators/5"
              }
            ],
            "visitor": {
              "href": "https://api.salemove.com/visitors/6"
            },
            "chat_transcript":
            {
              "href": "https://api.salemove.com/engagements/2/chat_trascript"
            }
          }
        ]
      }
```

### Get single engagement

> Get single engagement

```shell
GET /enagements/{engagement_id}
```

Fetches an engagement. The manager needs to have access to the site that the engagement belongs to.


> + Response 200 (application/json)

```json
      {
        "href": "https://api.salemove.com/engagements/2",
        "duration": 30,
        "operators": [
          {
            "href": "https://api.salemove.com/operators/4"
          }
        ],
        "visitor": {
          "href": "https://api.salemove.com/visitors/1"
        },
        "chat_transcript":
        {
          "href": "https://api.salemove.com/engagements/2/chat_trascript"
        }
      }
```

### Get engagement chat transcript

> Get engagement chat transcript

```shell
GET /enagements/{engagement_id}/chat_transcript
```

Fetches the engagements chat transcript. The manager needs to have access to the site that the engagement belongs to.


> + Response 200 (application/json)

```json
      [
        {
          "message": "This",
          "created_at": "2015-03-20T14:21:09.475Z",
          "sender": {
            "href": "https://api.salemove.com/visitors/1",
            "name": null,
            "type": "visitor"
          }
        },
        {
          "message": "is",
          "created_at": "2015-03-20T14:21:09.475Z",
          "sender": {
            "href": "https://api.salemove.com/operators/4",
            "name": "Kalle Kaalikas",
            "type": "operator"
          }
        },
        {
          "message": "chat",
          "created_at": "2015-03-20T14:21:09.475Z",
          "sender": {
            "href": "https://api.salemove.com/operators/5",
            "name": "Kalle Kaalikas",
            "type": "operator"
          }
        }
      ]
```

### Get visitor by id

> Get visitor by id

```shell
GET /visitors/{visitor_id}
```

Fetches the engagements chat transcript. The manager needs to be able to have access to the site that the visitor visited.


> + Response 200 (application/json)

```json
      {
        "href": "https://api.salemove.com/visitors/1",
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

### List operators

> List operators

```shell
GET /operators
```

Fetches an operator that the manager can manage and configure. The manager needs to have access to the site in order to fetch the sites' operators.


> + Response 200 (application/json)

```json
      {
        "last_page": "https://api.salemove.com/operators?page=2",
        "next_page": "https://api.salemove.com/operators?page=1",
        "operators": [
          {
            "href": "https://api.salemove.com/operators/4",
            "name": "Manager",
            "email": "manager@email.com",
            "phone": "55443322",
            "available": true,
            "role": "manager"
          },
          {
            "href": "https://api.salemove.com/operators/5",
            "name": "John",
            "email": "test@email.com",
            "phone": "55443322",
            "available": true,
            "role": "operator"
          }
        ]
      }
```

### Get an operator

> Get an operator

```shell
GET /operators/{operator_id}
```

Lists all the operators that the manager can manage and configure. The manager needs to have access to the site in order to fetch the sites' operators. The collection is paginated and sorted by ascending id.


> + Response 200 (application/json)

```json
      {
        "href": "https://api.salemove.com/operators/4",
        "name": "Manager",
        "email": "manager@email.com",
        "phone": "55443322",
        "available": true,
        "role": "manager"
      }
```

### Update an operator

Updates the specified operator that the manager can manage and configure. The manager needs to have access to the site in order to access the sites' operator.

> Update an operator

```shell
PATCH /operators/{operator_id}
```

> + Request body

```json
        {
          "name": "Merry John",
          "email": "some@new.email",
          "phone": "999993333",
          "available": false
        }
```

> + Response 200 (application/json)

```json
        {
          "href": "https://api.salemove.com/operators/5",
          "name": "Merry John",
          "email": "some@new.email",
          "phone": "999993333",
          "available": false,
          "role": "operator"
        }
```