# Jpoints Balance Query API

JoyID offers a straightforward API endpoint for projects to query their Jpoints balance. This guide explains how to use this interface.

## API Request

To query the balance, you need to make a `curl` request to the following API endpoint:

```bash
curl 'https://api.joy.id/api/v1/quest/points/{address}' \
  -H 'accept: application/json' \
  -H 'origin: https://app.joy.id' \
  -H 'referer: https://app.joy.id/' \
  -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36'
```

Replace **`{address}`** with your actual wallet address. The **`{address}`** can be a BTC, ETH, or CKB address.

## **Request Headers**

The request includes the following headers:

- **`accept`**: Specifies the content type of the server's response, here it is **`application/json`**.
- **`origin`**: Indicates the origin of the request, which is **`https://app.joy.id`** here.
- **`referer`**: Typically used to indicate the page from which the request was linked, which is **`https://app.joy.id/`** here.
- **`user-agent`**: Contains information about the requester, here is an example of a Chrome browser.

## **Response**

A successful response will be a JSON object containing the user's Jpoints balance information.
