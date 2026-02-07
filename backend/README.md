# API Documentation

## Overview
This documentation provides a comprehensive guide to the API endpoints available in the application. It includes details about the endpoints, the constraints they meet, and usage examples for developers.

## API Endpoints

### 1. GET /api/examples
**Description:** Fetches a list of examples.

**Constraints:**
- Must be authenticated.

**Usage Example:**
```bash
curl -X GET https://example.com/api/examples -H 'Authorization: Bearer TOKEN' 
```

### 2. POST /api/examples
**Description:** Creates a new example.

**Constraints:**
- Requires a JSON payload with the following fields:
  - `name`: string (required)
  - `value`: string (required)

**Usage Example:**
```bash
curl -X POST https://example.com/api/examples \
-H 'Content-Type: application/json' \
-d '{"name": "New Example", "value": "Example Value"}'
```

### 3. PUT /api/examples/{id}
**Description:** Updates an existing example by ID.

**Constraints:**
- Must include the `id` of the example in the URL.

**Usage Example:**
```bash
curl -X PUT https://example.com/api/examples/1 \
-H 'Content-Type: application/json' \
-d '{"name": "Updated Example", "value": "Updated Value"}'
```

### 4. DELETE /api/examples/{id}
**Description:** Deletes an existing example by ID.

**Constraints:**
- Must include the `id` of the example in the URL.

**Usage Example:**
```bash
curl -X DELETE https://example.com/api/examples/1 -H 'Authorization: Bearer TOKEN' 
```

## Conclusion
This API allows for easy integration and manipulation of example data within the application. Ensure to follow the constraints and usage examples provided for successful API calls.