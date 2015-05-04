# Operator public API.
The operators' public API comprises a set of HTTP REST endpoints that can be used from the browser, command line, a server application, or other devices.

## Headers
In order to use the REST API, every request needs to include at least 2 headers: the  ```Authorization``` and the ```Accept```.

### Authorization
Every request needs to include either the operator ```SessionId``` or ```ApiToken```. It is recommended to use the API token which you can request from our support team. The API token is assigned per operator and currently only operators with manager privileges have the token enabled.

#### API token example
The following is an example of a curl request which includes the API token:


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

The API version must be explicitly set in every request via the ```Accept``` header.

    Accept: application/vnd.salemove.v1+json

# REST API

## List engagements

    GET /engagements

Fetches a collection of all engagements that the current manager has access to configure. The manager needs to have access to the site to be able to fetch an engagement from there. The collection is paginated and sorted by id (ascending).

+ Response 200 (application/json)

      {
        'last_page': 'https://api.salemove.com/engagements?page=2',
        'next_page': 'https://api.salemove.com/engagements?page=2',
        'engagements': [
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


## Get single engagement

    GET /enagements/{engagement_id}

Fetches an engagement. The manager needs to have access to the site that the engagement belongs to.

+ Response 200 (application/json)

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

## Get engagement chat transcript

    GET /enagements/{engagement_id}/chat_transcript

Fetches the engagements chat transcript. The manager needs to have access to the site that the engagement belongs to.

+ Response 200 (application/json)

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
            "name": 'Kalle Kaalikas',
            "type": 'operator'
          }
        }
      ]

## Get visitor by id

    GET /visitors/{visitor_id}

Fetches the engagements chat transcript. The manager needs to be able to have access to the site that the visitor visited.

+ Response 200 (application/json)

      {
        "href": "https://api.salemove.com/visitors/1",
        "name": 'John',
        "email": 'test@email.com',
        "phone": '55443322',
        "note": 'some random dude',
        "custom_attributes": {
          # These are custom fields, which you can define yourself. Those shown below are just examples
          ...
          "home_address": 'Winston',
          "vip": "true"
        }
      }

## List operators

    GET /operators

Fetches an operator that the manager can manage and configure. The manager needs to have access to the site in order to fetch the sites' operators.

+ Response 200 (application/json)

      {
        'last_page': 'https://api.salemove.com/operators?page=2',
        'next_page': 'https://api.salemove.com/operators?page=1',
        'operators': [
          {
            "href": "https://api.salemove.com/operators/4",
            "name": 'Manager',
            "email": 'manager@email.com',
            "phone": '55443322',
            "available": true,
            "role": 'manager'
          },
          {
            "href": "https://api.salemove.com/operators/5",
            "name": 'John',
            "email": 'test@email.com',
            "phone": '55443322',
            "available": true,
            "role": 'operator'
          }
        ]
      }


## Get an operator

    GET /operators/{operator_id}

Lists all the operators that the manager can manage and configure. The manager needs to have access to the site in order to fetch the sites' operators. The collection is paginated and sorted by ascending id.

+ Response 200 (application/json)

      {
        "href": "https://api.salemove.com/operators/4",
        "name": 'Manager',
        "email": 'manager@email.com',
        "phone": '55443322',
        "available": true,
        "role": 'manager'
      }

### Update an operator

    PATCH /operators/{operator_id}

+ Request body

        {
          "name": 'Merry John',
          "email": 'some@new.email',
          "phone": '999993333',
          "available": false,
        }


+ Response 200 (application/json)

        {
          "href": "https://api.salemove.com/operators/5",
          "name": 'Merry John',
          "email": 'some@new.email',
          "phone": '999993333',
          "available": false,
          "role": 'operator'
        }


## Create a new site

    POST /sites

The manager can create a new site with default settings in SaleMove platform. After that site is created, the SAML should be created so operators can use the site. The site needs to include SaleMove scripts on its pages for this feature to work.

To create a new site, you must supply the site name and domain. Both the name and the domain of the site must be unique or the site creation will fail with appropriate error message. There can be more than 1 domain for a single site. The domains need to be full URIs.

+ Request body

        {
          "name": ''New site name',
          "domain": ['http://some.domain.com', 'http://other.domain.com']
        }

+ Response 200 (application/json)

        {
          "id": 1,
          "hostnames": ["other.domain.com", "some.domain.com"],
          "name": "New site name"
        }

## Create a SAML

    POST /saml/{saml_id}

The manager can create a SAML for the site in SaleMove platform. The SAML can be created for any site the manager has administrator access.

A single site can only have a single SAML. To update the SAML see [update a SAML](#update-the-saml).

After the SAML is created, you can access it through the subdomain which was provided. e.g. if the requested subdomain is 'mysite', then you will be able to access the site by going to the URL https://mysite.app.salemove.com

To create a SAML for the site, you must provide the following parameters:

    * idp_metadata_url        # An URL to the SAML Identity provider configuration metadata.
    * site_id                 # The id of the site that the SAML will be created on
    * name_identifier_format  # The name identifier format of the SAML
    * subdomain               # The subdomain of the SAML which will become this sites URL. e.g. 'mysite' will become into 'mysite.app.salemove.com'

    In addition, you can provide these optional SAML parameters:

    * authn_context           # The authentication context of the SAML
    * idp_name_attribute      # The identity provider name attribute
    * idp_email_attribute     # The identity provider email attribute

Once the SAML is created, you can access the SAML metadata by going to your subdomains' /saml/metadata. For example, if your subdomain was mysite, then you can access your SAML metadata by going to the url https://mysite.app.salemove.com/saml/metadata

+ Request body

        {
          "idp_metadata_url": "https://salemove.onelogin.com/saml/metadata/417618",
          "site_id": 1,
          "name_identifier_format": "urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress",
          "subdomain": "mysite",
          "authn_context": "some auth value",
          "idp_name_attribute": "some idp name value",
          "idp_email_attribute": "some idp email value"
        }

+ Response 200 (application/json)

        {
          "id": 1,
          "subdomain": "mysite",
          "idp_metadata_url": "https://salemove.onelogin.com/saml/metadata/417618",
          "name_identifier_format": "urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress",
          "authn_context": "some auth value",
          "idp_name_attribute": "some idp name value",
          "idp_email_attribute": "some idp email value"
        }

## Update the SAML

    POST /saml/{saml_id}

The manager can update the SAML.

To update a SAML for the site, you must provide the following parameters:

    * saml_id                 # The id of the SAML you will change
    * site_id                 # The id of the site that the SAML will be created on. The site id is needed for authorization purposes

In addition, you can provide the following attributes:

    * idp_metadata_url        # An URL to the SAML Identity provider configuration metadata
    * name_identifier_format  # The name identifier format of the SAML
    * subdomain               # The subdomain of the SAML which will become this sites URL. e.g. 'mysite' will become into 'mysite.app.salemove.com'
    * authn_context           # The authentication context of the SAML
    * idp_name_attribute      # The identity provider name attribute
    * idp_email_attribute     # The identity provider email attribute

+ Request body

        {
          "idp_metadata_url": "https://salemove.onelogin.com/saml/metadata/417618",
          "site_id": 1,
          "name_identifier_format": "urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress",
          "subdomain": "mysite",
          "authn_context": "some auth value",
          "idp_name_attribute": "some idp name value",
          "idp_email_attribute": "some idp email value"
        }

+ Response 200 (application/json)

        {
          "id": 1,
          "subdomain": "mysite",
          "idp_metadata_url": "https://salemove.onelogin.com/saml/metadata/417618",
          "name_identifier_format": "urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress",
          "authn_context": "some auth value",
          "idp_name_attribute": "some idp name value",
          "idp_email_attribute": "some idp email value"
        }
