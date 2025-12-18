# Service Files Update Guide

This document helps you update all API service files to use dynamic API URLs for Vercel deployment.

## Pattern to Follow

Every service file should:

1. Import the dynamic API URL
2. Use it to construct endpoints
3. Be compatible with both local and production

## Template

```javascript
import axios from "axios";

// Get API base URL from environment or Vite config
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

export const yourFunction = async (params) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/api/your-endpoint`);
    return res.data;
  } catch (err) {
    throw err;
  }
};
```

## Files to Update

All files in `client/src/services/`:

- [ ] getActivity.js
- [ ] getNotification.js
- [ ] getProject.js
- [ ] getTask.js
- [ ] getTeam.js
- [ ] getUser.js (PRIORITY - used in multiple places)
- [ ] postProject.js
- [ ] postSignIn.js (PRIORITY - login)
- [ ] postSignUp.js (PRIORITY - signup)
- [ ] postTask.js
- [ ] deleteProject.js
- [ ] deleteTask.js
- [ ] deleteUser.js
- [ ] updateProject.js
- [ ] updateTask.js
- [ ] updateTeam.js
- [ ] updateUser.js
- [ ] (any other service files)

## Update Order (by priority)

### Phase 1 (Critical - do first)

1. getUser.js
2. postSignIn.js
3. postSignUp.js

### Phase 2 (Important)

4. getProject.js
5. getTask.js
6. postProject.js
7. postTask.js

### Phase 3 (Rest)

8. All other service files

## Verification

After updating each file:

```bash
# Check syntax
npm run lint

# Test locally
npm run dev

# Then test each API call in browser console or via UI
```

## Quick Update Script (if using Node)

For developers who want to automate this:

```javascript
// update-services.js
const fs = require("fs");
const path = require("path");

const servicesDir = "client/src/services";
const files = fs.readdirSync(servicesDir).filter((f) => f.endsWith(".js"));

files.forEach((file) => {
  let content = fs.readFileSync(path.join(servicesDir, file), "utf8");

  // Add import if not present
  if (!content.includes("API_BASE_URL")) {
    const importCode = `import axios from "axios";\n\nconst API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';\n\n`;
    content = content.replace('import axios from "axios";\n\n', importCode);
  }

  // Replace hardcoded URLs
  content = content.replace(
    /["']http:\/\/localhost:3001\/api\//g,
    "`${API_BASE_URL}/api/"
  );
  content = content.replace(
    /["']http:\/\/localhost:3001["']/g,
    "`${API_BASE_URL}`"
  );

  fs.writeFileSync(path.join(servicesDir, file), content);
  console.log(`✓ Updated ${file}`);
});

console.log("\n✅ All service files updated!");
```

Run with: `node update-services.js`

## Testing

Test each critical function after updating:

```javascript
// In browser console while on deployed app
fetch("/api/users/user"); // Should work without hardcoded localhost
```

## Common Patterns

### GET requests

```javascript
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

export const getData = async (id) => {
  const res = await axios.get(`${API_BASE_URL}/api/endpoint/${id}`);
  return res.data;
};
```

### POST requests

```javascript
export const postData = async (payload) => {
  const res = await axios.post(`${API_BASE_URL}/api/endpoint`, payload);
  return res.data;
};
```

### With Authorization Header

```javascript
export const getProtectedData = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get(`${API_BASE_URL}/api/protected`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
```

## Done? ✅

Once all files are updated:

1. Run `npm run build` to check for errors
2. Test locally thoroughly
3. Push to GitHub
4. Deploy to Vercel

Your app should now work seamlessly in both local and production environments!
