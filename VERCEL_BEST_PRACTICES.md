# Vercel Deployment - Best Practices & Configuration

## 🎯 Pre-Deployment Checklist

### Code Quality

- [ ] All console.log() statements removed or moved to debug mode
- [ ] No hardcoded API URLs (all use environment variables)
- [ ] No secrets in code (use environment variables)
- [ ] All imports use correct paths
- [ ] ESLint passes without errors

### Dependencies

- [ ] All required dependencies in package.json
- [ ] No unused dependencies
- [ ] package-lock.json is committed
- [ ] Versions are compatible

### Testing

- [ ] Local build works: `npm run build`
- [ ] Local server runs: `npm start`
- [ ] Frontend connects to backend
- [ ] Critical flows tested (login, create project, etc.)

### Database

- [ ] MongoDB Atlas cluster created
- [ ] Database user created with strong password
- [ ] Connection string obtained
- [ ] IP whitelist includes Vercel IPs (or 0.0.0.0/0)

## 📦 Build Configuration

### vercel.json Reference

```json
{
  "version": 2,
  "buildCommand": "cd client && npm install && npm run build",
  "outputDirectory": "client/dist",
  "installCommand": "npm install && cd client && npm install",
  "env": {
    "MONGODB_URI": "@mongodb_uri",
    "JWT_SECRET": "@jwt_secret"
  },
  "functions": {
    "api/**/*.js": {
      "runtime": "nodejs20.x"
    }
  }
}
```

**Explanation:**

- `buildCommand`: Builds your React frontend
- `outputDirectory`: Serves the Vite build folder
- `installCommand`: Installs all dependencies
- `env`: References to secrets (use @ prefix)
- `functions`: Maps serverless functions

## 🔐 Security Best Practices

### Environment Variables

**Never commit .env files!** Vercel Dashboard only:

1. **MONGODB_URI** - Full connection string

   ```
   mongodb+srv://username:password@cluster.mongodb.net/taskmate?retryWrites=true&w=majority
   ```

2. **JWT_SECRET** - Strong random string (32+ characters)
   ```
   Generate at: https://generate-random.org/
   ```

### Secure Headers

If needed, add to your Express app:

```javascript
import helmet from "helmet";
app.use(helmet());
```

## ⚡ Performance Optimization

### Frontend

- ✅ Vite already optimizes builds
- ✅ CSS is tree-shaked
- ✅ Code splitting works automatically

### Backend

- ✅ MongoDB connection pooling
- ✅ Serverless functions auto-scale
- ✅ No cold start issues after first request

### Database

- ✅ Use indexes on frequently queried fields
- ✅ Limit query results
- ✅ Use projections to fetch only needed fields

## 🐛 Debugging Deployed Apps

### View Logs

```bash
# Using Vercel CLI
vercel logs [deployment-url]

# Real-time logs
vercel logs [deployment-url] --follow
```

### Check Errors

1. Go to Vercel Dashboard
2. Select your project
3. Click "Deployments" tab
4. Click specific deployment
5. View build logs and runtime logs

### Test API Endpoints

```bash
# In browser console
fetch('https://your-project.vercel.app/api/users/user')
  .then(r => r.json())
  .then(console.log)
```

## 📊 Monitoring

### Vercel Analytics

- Enable in Project Settings > Analytics
- Monitor function duration and errors
- Track Web Vitals

### MongoDB

- Check Atlas dashboard for slow queries
- Monitor connection pool
- View database size and usage

## 🔄 Continuous Deployment

### Auto-Deploy Setup

1. Go to Project Settings
2. Git Integration > Connected to GitHub
3. Auto-deploy from main branch enabled
4. Each push to main automatically deploys

### Manual Deployment

```bash
git push origin main
# Vercel automatically detects and deploys
```

## 📝 Production Configuration

### Suggested Production Environment

```env
# .env.production (DO NOT COMMIT)
NODE_ENV=production
VITE_API_BASE_URL=https://your-project.vercel.app
```

### Vite Production Build

```bash
npm run build
# Creates optimized bundle in client/dist
```

## 🆘 Common Issues & Solutions

### Issue: MongoDB Connection Timeout

**Solution:**

- Add Vercel IPs to MongoDB whitelist
- Or use 0.0.0.0/0 (less secure, test only)
- Verify connection string format
- Check database user permissions

### Issue: Cold Start Delays

**Solution:**

- Normal behavior for serverless
- First request takes 1-3 seconds
- Subsequent requests are fast
- Consider keeping function warm (paid feature)

### Issue: Build Fails

**Solution:**

- Check build logs in Vercel Dashboard
- Verify all dependencies installed
- Ensure Node version compatibility
- Run `npm run build` locally first

### Issue: Frontend 404 Errors

**Solution:**

- Ensure outputDirectory in vercel.json is correct
- Check that client/dist exists after build
- Verify Vite build completes successfully

### Issue: CORS Errors

**Solution:**

- CORS already configured in Express
- Ensure API_BASE_URL matches domain
- Check browser console for exact error
- Verify preflight requests are handled

## 📈 Scaling Considerations

### When You Need Better Scaling

1. **More Database Connections**

   - Upgrade MongoDB cluster tier
   - Increase connection pool

2. **Faster API Responses**

   - Add Redis caching
   - Optimize database queries
   - Add indexes to collections

3. **More Concurrent Users**
   - Vercel automatically scales functions
   - Monitor usage in Vercel Analytics
   - Consider upgrading plan

## 🚀 Advanced Configurations

### Custom Domain

1. Go to Project Settings > Domains
2. Add your domain
3. Update DNS records
4. SSL certificate auto-generated

### Environment-Specific Builds

```json
{
  "buildCommand": "npm run build:$VERCEL_ENV"
}
```

### Preview Deployments

- Automatic on pull requests
- Different URLs for testing
- Staging environment before production

## 📚 Resources

- Vercel Docs: https://vercel.com/docs
- Vercel Best Practices: https://vercel.com/docs/best-practices
- MongoDB Performance: https://www.mongodb.com/docs/manual/
- Node.js Best Practices: https://nodejs.org/en/docs/guides/

## ✨ Final Checklist Before Going Live

- [ ] All API services updated with dynamic URLs
- [ ] Environment variables set in Vercel Dashboard
- [ ] Local testing completed successfully
- [ ] GitHub repository created and pushed
- [ ] Vercel project created and configured
- [ ] MongoDB Atlas cluster and user created
- [ ] First deployment successful
- [ ] All critical features tested on production
- [ ] Custom domain configured (optional)
- [ ] Monitoring and analytics enabled
- [ ] Team members have access to Vercel project
- [ ] Documentation updated

**You're ready to deploy! 🎉**
