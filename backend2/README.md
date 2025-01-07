# User API Guide

## Endpoints

1. **Register**  
   **POST** `/api/users/register`  
   Registers a new user.  
   **Request Body**:
   ```json
   {
     "fullname": { "firstname": "string", "lastname": "string" },
     "email": "string",
     "password": "string"
   }
   ```
2. **Login**  
    **POST** `/api/users/login`
   **Request Body**:

   ```json
   {
     "email": "string",
     "password": "string"
   }
   ```

3. **Profile**
   **GET** `/api/users/profile`
   Retrieves the logged-in user's profile.

4. **Logout**
   **GET** `/api/users/logout`
   Logs out the current user

# Captain API Guide

## Endpoints

1. **Register**  
   **POST** `/api/captains/register`  
   Registers a new captain with vehicle details.  
   **Request Body**:

   ```json
   {
     "fullname": { "firstname": "string", "lastname": "string" },
     "email": "string",
     "password": "string",
     "vehicle": {
       "color": "string",
       "plate": "string",
       "capacity": "number",
       "vehicleType": "string"
     }
   }
   ```

2. **Login**  
    **POST** `/api/captains/login`
   **Request Body**:

   ```json
   {
     "email": "string",
     "password": "string"
   }
   ```

3. **Profile**
   **GET** `/api/captains/profile`
   Retrieves the logged-in user's profile.

4. **Logout**
   **GET** `/api/captains/logout`
   Logs out the current user.

# Uber Clone API - Map & Ride Routes

## Map Routes

### Get Coordinates

Get coordinates for a given address.

**Endpoint:** `GET /api/map/get-coordinates`

**Query Parameters:**

```json
{
  "address": "string (min 3 characters)"
}
```

**Response:**

```json
{
  "coordinates": [
    {
      "lat": "number",
      "lng": "number",
      "place_name": "string"
    }
  ]
}
```

### Get Distance-Time

Get distance and time between two coordinates.

**Endpoint:** `GET /api/map/get-distance-time`

**Query Parameters:**

```json
{
  "origin": "string (coordinates)",
  "destination": "string (coordinates)"
}
```

**Response:**

```json
{
  "origin": "string (coordinates)",
  "destination": "string (coordinates)"
}
```

## Get Suggestions

Get address suggestions based on input text.

**Endpoint:** `GET /api/map/get-suggestions`
**Query Parameters:**

```json
{
  "input": "string (min 3 characters)"
}
```

**Response:**

```json
{
  "suggestions": [
    {
      "place_name": "string",
      "coordinates": [number, number]
    }
  ]
}
```

## Ride Routes

### Get Fare

Calculate fare for a ride.
**Endpoint:** `GET /api/rides/get-fare`
**Query Parameters:**

```json
{
  "pickupAddress": "string",
  "destinationAddress": "string"
}
```

**Response:**

```json
{
  "auto": "number",
  "car": "number",
  "bike": "number"
}
```

### Create Ride

Create a new ride.

**Endpoint:** `GET /api/rides/create`
**Request Body:**

```json
{
  "user": "string",
  "pickupAddress": "string",
  "destinationAddress": "string",
  "vehicleType": "string"
}
```

**Response:**

```json
{
  "rideId": "string",
  "fare": number,
  "otp": "string",
  "status": "pending"
}
```
