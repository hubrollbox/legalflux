
# Important Instructions for TypeScript Configuration

Since `tsconfig.json` is marked as a read-only file, please manually update it with the content from `src/tsconfig.json.temp`.

The main changes needed are:
1. Add `"allowSyntheticDefaultImports": true` to compiler options
2. Add `"downlevelIteration": true` to compiler options
3. Add path mapping for "@" to point to "./src/*"

These changes will fix the React import issues and the module resolution problems.
