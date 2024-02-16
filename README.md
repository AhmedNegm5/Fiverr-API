# Fiverr-API

It's Application for Node js, Express js and MongoDB

### Deployment link :

> https://fiverr-api-five.vercel.app/

### to install the dependencies run this command

> npm install

## Auth Routes

### Register

```http
  POST /api/auth/register
```

<details>
<summary>request body</summary>
<ul>
<li>username</li>
<li>email</li>
<li>password</li>
<li>country</li>
</ul>
</details>

### Login

```http
  POST /api/auth/login
```

<details>
<summary>request body</summary>
<li>username</li>
<li>password</li>
<ul>
</details>

### Logout

```http
  POST /api/auth/logout
```

## User Routes

### Get User Profile

```http
  GET /api/users/:id
```

### Delete User

```http
  DELETE /api/users/:id
```

### Update User

```http
  PATCH /api/users/:id
```

<details>
<summary>request body</summary>
<ul>
<li>any fieleds to update without password</li>
</ul>
</details>

### Update User Password

```http
  PATCH /api/users/:id/changePassword
```

<details>
<summary>request body</summary>
<ul>
<li>oldPassword</li>
<li>newPassword</li>
</ul>
</details>

## Gig Routes

### Get All Gigs

```http
  GET /api/gigs
```

### Get Gig by Id

```http
  GET /api/gigs/:id
```

### Create Gig

```http
  POST /api/gigs
```

<details>
<summary>request body</summary>
<ul>
<li>title</li>
<li>desc</li>
<li>price</li>
<li>cat</li>
<li>cover</li>
<li>shortTitle</li>
<li>shortDesc</li>
<li>deliveryTime</li>
<li>revisionNumber</li>
</ul>
</details>

### Delete Gig

```http
  DELETE /api/gigs/:id
```

## Order Routes

### Get All Orders

```http
  GET /api/orders
```

### Create Order

```http
  POST /api/orders/create-payment-intent/:id
```

### Confirm Order

```http
  PUT /api/orders/confirm
```

## Review Routes

### Get All Reviews for a specific Gig

```http
  GET /api/reviews/:gigId
```

### Create Review

```http
  POST /api/reviews
```

<details>
<summary>request body</summary>
<ul>
<li>gigId</li>
<li>star</li>
<li>desc</li>
</ul>
</details>

### Delete Review

```http
  DELETE /api/reviews/:id
```

### Update Review

```http
  PATCH /api/reviews/:id
```

<details>
<summary>request body</summary>
<ul>
<li>fieleds to update (star, desc)</li>
</ul>
</details>

## Conversation Routes

### Get All Conversations

```http
  GET /api/conversations
```

### Get Conversation by Id

```http
  GET /api/conversations/:id
```

### Create Conversation

```http
  POST /api/conversations
```

<details>
<summary>request body</summary>
<ul>
<li>to</li>
</ul>
</details>

### Update Conversation (to mark as read)

```http
  PUT /api/conversations/:id
```

## Message Routes

### Get All Messages for a specific Conversation

```http
  GET /api/messages/:id
```

### Create Message

```http
  POST /api/messages
```

<details>
<summary>request body</summary>
<ul>
<li>conversationId</li>
<li>desc</li>
</ul>
</details>
