# Copilot Instructions for RotaPlanner

## Project Architecture

- **Backend** is a Node.js/Express app (see `backend/`).
- **Major components:**
  - `controllers/`: Route handlers (e.g., `groupController.js`)
  - `models/`: Database logic (e.g., `groupModel.js`, `adminModel.js`)
  - `routes/`: Route definitions (e.g., `groupRoutes.js`)
  - `middleware/`: Express middleware (e.g., authentication)
  - `utils/`: Utility functions (e.g., `adminAuth.js`, `tokenUtils.js`)
  - `config/db.js`: Database pool setup (PostgreSQL)
- **Data flow:**
  - HTTP request → route → controller → model (DB) → response
  - Auth middleware attaches `req.user` (with `adminId`) for protected routes

## Key Patterns & Conventions

- **Controllers** validate input (Joi schemas in `utils/validators/`), call models, and handle errors with JSON responses.
- **Models** use async/await and transactions for multi-step DB operations. Always rollback on error.
- **Admin-group relationship:** Each admin can have at most one group (`group_id` in `admins` table). Creating a group links it to the admin.
- **Error handling:** Always rollback DB transactions on error. Return user-friendly error messages from controllers.
- **Logging:** Use `console.log` for debugging, especially for DB results and critical variables.
- **Token auth:** JWT tokens are expected in the `Authorization` header. Middleware decodes and attaches user info to `req.user`.

## Developer Workflows

- **Start backend:**
  ```sh
  cd backend
  npm install
  node server.js
  ```
- **DB setup:**
  - Uses PostgreSQL. Connection config in `config/db.js`.
  - Ensure tables (`admins`, `groups`, etc.) exist with correct columns.
- **Debugging:**
  - Add `console.log` in controllers/models to inspect flow and DB results.
  - Check for `undefined` values in `req.user` if auth issues arise.

## Integration Points

- **External:**
  - PostgreSQL database
  - JWT for authentication
- **Internal:**
  - Controllers call models directly
  - Middleware attaches user context

## Examples

- **Creating a group:**
  - Controller: `groupController.js` → Model: `groupModel.js`
  - Checks if admin already has a group before creating
- **Validating input:**
  - Uses Joi schemas in `utils/validators/`

## Tips for AI Agents

- Always check if `req.user` is set before using `adminId` in controllers.
- When updating DB, check the result rows to confirm changes.
- Use transactions for multi-step DB changes; always rollback on error.
- Reference `groupModel.js` and `groupController.js` for canonical patterns.
