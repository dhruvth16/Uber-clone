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
