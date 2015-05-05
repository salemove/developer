# Sites public API

## Create a new site

> Create a new site

```shell
POST /sites
```

The manager can create a new site with default settings in SaleMove platform. After that site is created, the SAML should be created so operators can use the site. The site needs to include SaleMove scripts on its pages for this feature to work.

To create a new site, you must supply the site name and domain. Both the name and the domain of the site must be unique or the site creation will fail with appropriate error message. There can be more than 1 domain for a single site. The domains need to be full URIs.

> + Request body

```json
        {
          "name": "New site name",
          "domain": ["http://some.domain.com", "http://other.domain.com"]
        }
```

> + Response 200 (application/json)

```json
        {
          "id": 1,
          "hostnames": ["other.domain.com", "some.domain.com"],
          "name": "New site name"
        }
```

## Create a SAML

> Create a SAML

```shell
POST /saml/{saml_id}
```

The manager can create a SAML for the site in SaleMove platform. The SAML can be created for any site the manager has administrator access.

A single site can only have a single SAML. To update the SAML see [update a SAML](#update-the-saml).

After the SAML is created, you can access it through the subdomain which was provided. e.g. if the requested subdomain is 'mysite', then you will be able to access the site by going to the URL https://mysite.app.salemove.com

To create a SAML for the site, you must provide the following parameters:

* `idp_metadata_url`        *An URL to the SAML Identity provider configuration metadata.*
* `site_id`                 *The id of the site that the SAML will be created on*
* `name_identifier_format`  *The name identifier format of the SAML*
* `subdomain`               *The subdomain of the SAML which will become this sites URL. e.g. 'mysite' will become into 'mysite.app.salemove.com'*

In addition, you can provide these optional SAML parameters:

* `authn_context`           *The authentication context of the SAML*
* `idp_name_attribute`      *The identity provider name attribute*
* `idp_email_attribute`     *The identity provider email attribute*

Once the SAML is created, you can access the SAML metadata by going to your subdomains' /saml/metadata. For example, if your subdomain was mysite, then you can access your SAML metadata by going to the url https://mysite.app.salemove.com/saml/metadata

> + Request body

```json
        {
          "idp_metadata_url": "https://salemove.onelogin.com/saml/metadata/417618",
          "site_id": 1,
          "name_identifier_format": "urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress",
          "subdomain": "mysite",
          "authn_context": "some auth value",
          "idp_name_attribute": "some idp name value",
          "idp_email_attribute": "some idp email value"
        }
```

> + Response 200 (application/json)

```json
        {
          "id": 1,
          "subdomain": "mysite",
          "idp_metadata_url": "https://salemove.onelogin.com/saml/metadata/417618",
          "name_identifier_format": "urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress",
          "authn_context": "some auth value",
          "idp_name_attribute": "some idp name value",
          "idp_email_attribute": "some idp email value"
        }
```

## Update the SAML

> Update the SAML

```shell
POST /saml/{saml_id}
```

The manager can update the SAML.

To update a SAML for the site, you must provide the following parameters:

* `saml_id`                 *The id of the SAML you will change*
* `site_id`                 *The id of the site that the SAML will be created on. The site id is needed for authorization purposes*

In addition, you can provide the following attributes:

* `idp_metadata_url`        *An URL to the SAML Identity provider configuration metadata*
* `name_identifier_format`  *The name identifier format of the SAML*
* `subdomain`               *The subdomain of the SAML which will become this sites URL. e.g. 'mysite' will become into 'mysite.app.salemove.com'*
* `authn_context`           *The authentication context of the SAML*
* `idp_name_attribute`      *The identity provider name attribute*
* `idp_email_attribute`     *The identity provider email attribute*

> + Request body

```json
        {
          "idp_metadata_url": "https://salemove.onelogin.com/saml/metadata/417618",
          "site_id": 1,
          "name_identifier_format": "urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress",
          "subdomain": "mysite",
          "authn_context": "some auth value",
          "idp_name_attribute": "some idp name value",
          "idp_email_attribute": "some idp email value"
        }
```

> + Response 200 (application/json)

```json
        {
          "id": 1,
          "subdomain": "mysite",
          "idp_metadata_url": "https://salemove.onelogin.com/saml/metadata/417618",
          "name_identifier_format": "urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress",
          "authn_context": "some auth value",
          "idp_name_attribute": "some idp name value",
          "idp_email_attribute": "some idp email value"
        }
```