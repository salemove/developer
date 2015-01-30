# Operator public API.
The operator public API consist of HTTP REST endpoints. This means it can be used through browser, command line, by another server, etc.

## Headers
To use the REST API, the request needs to include at least 2 headers: ```Authorization``` and ```Accept```

### Authorization
To use the REST API, the request needs to include either the operator ```SessionId``` or ```ApiToken```. The preferred approach is using API token, which you can request from our support. The API token is given per operator and currently only operators with manager status have privileges to use them.

#### API token example
To use an API token, request the API token from our support and attach it to the request headers. An example with curl:


    curl -i https://api.salemove.com/engagements --header "Authorization: ApiToken MY_SECRET_API_TOKEN"


Example with javascript:


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


### Accept token

The API version must be explicitly set in the request ```Accept``` header.

    Accept: application/vnd.salemove.v1+json

# REST API

## List engagements

    GET /enagements

Fetches a collection of all engagements that the current manager can see. The manager needs to have access to the site to be able to fetch an engagement from there. The collection is paginated and ordered by ascending ID.

+ Response 200 (application/json)

      {
        'last_page' => 'http://api.salemove.com/engagements?page=1',
        'engagements' => [
          {
            "href" => "http://api.salemove.com/engagements/1",
            "duration" => 30,
            "operators" => [
              {
                "href" => "http://api.salemove.com/operators/4"
              }
            ],
            "visitor" => {
              "href" => "http://api.salemove.com/visitors/1"
            },
            "chat_transcript" =>
            {
              "href" => "http://api.salemove.com/engagements/1/chat_trascript"
            },
            "audio_recording" =>
            {
              "href" => "http://api.salemove.com/recording/url"
            }
          },
          {
            "href" => "http://api.salemove.com/engagements/2",
            "duration" => 30,
            "operators" => [
              {
                "href" => "http://api.salemove.com/operators/5"
              }
            ],
            "visitor" => {
              "href" => "http://api.salemove.com/visitors/6"
            },
            "chat_transcript" =>
            {
              "href" => "http://api.salemove.com/engagements/2/chat_trascript"
            },
            "audio_recording" => { "href" => nil }
          }
        ]
      }


## Get single engagement

    GET /enagement/:engagement_id

Fetches an engagement. The manager needs to have access to the site that the engagement took place on.

+ Response 200 (application/json)

      {
        "href" => "https://api.salemove.com/engagements/2",
        "duration" => 30,
        "operators" => [
          {
            "href" => "https://api.salemove.com/operators/4"
          }
        ],
        "visitor" => {
          "href" => "https://api.salemove.com/visitors/1"
        },
        "chat_transcript" =>
        {
          "href" => "https://api.salemove.com/engagements/2/chat_trascript"
        },
        "audio_recording" =>
        {
          "href" => "https://api.salemove.com/recording/url"
        }
      }

## Get engagement chat transcript

    GET /enagement/:engagement_id/chat_transcript

Fetches the engagements chat transcript. The manager needs to be able to have access site that the chat took place on.

+ Response 200 (application/json)

      [
        {
          "message" => "This",
          "created_at" => message1.created_at,
          "sender" => {
            "href" => "https://api.salemove.com:visitors/1",
            "name" => nil,
            "type" => "visitor"
          }
        },
        {
          "message" => "is",
          "created_at" => message2.created_at,
          "sender" => {
            "href" => "https://api.salemove.com:operators/4",
            "name" => "Kalle Kaalikas",
            "type" => "operator"
          }
        },
        {
          "message" => "chat",
          "created_at" => message3.created_at,
          "sender" => {
            "href" => "https://api.salemove.com:operators/5",
            "name" => 'Kalle Kaalikas',
            "type" => 'operator'
          }
        }
      ]

## Get visitor by id

    GET /visitors/:visitor_id

Fetches the engagements chat transcript. The manager needs to be able to have access to the site that the visitor visited.

+ Response 200 (application/json)

      {
        "href" => "https://api.salemove.com/visitors/1",
        "name" => 'John',
        "email" => 'test@email.com',
        "phone" => '55443322',
        "note" => 'some random dude',
        "custom_attributes" => {
          "home_address" => 'Winston',
          "vip" => "true"
        }
      }

## List operators

    GET /operators

Fetches an operator that the manager can administer. The manager needs to have access to the site to be able to fetch an operator from there.

+ Response 200 (application/json)

      {
        'last_page' => 'http://api.salemove.com/operators?page=1',
        'operators' => [
          {
            "href" => "http://api.salemove.com/operators/4",
            "name" => 'Manager',
            "email" => 'manager@email.com',
            "phone" => '55443322',
            "available" => true,
            "role" => 'manager'
          },
          {
            "href" => "http://api.salemove.com/operators/5",
            "name" => 'John',
            "email" => 'test@email.com',
            "phone" => '55443322',
            "available" => true,
            "role" => 'operator'
          }
        ]
      }


## Get an operator

    GET /operators/:operator_id

Lists all the operators that the manager can administer. The manager needs to have access to the site to be able to fetch an operator from there. The collection is paginated and ordered by ascending ID.

+ Response 200 (application/json)

      {
        "href" => "https://api.salemove.com/operators/4",
        "name" => 'Manager',
        "email" => 'manager@email.com',
        "phone" => '55443322',
        "available" => true,
        "role" => 'manager'
      }

### Update an operator

    PATCH /operators/:operator_id

+ Request body

        {
          "name": 'Merry John',
          "email": 'some@new.email',
          "phone": '999993333',
          "available": false,
        }


+ Response 200 (application/json)

        {
          "href" => "https://api.salemove.com/operators/5",
          "name" => 'Merry John',
          "email" => 'some@new.email',
          "phone" => '999993333',
          "available" => false,
          "role" => 'operator'
        }
