
# Learnings
- In Dev mode React StrictMode causes useEffect to run twice on mount. This can lead to duplicate API calls if not handled properly. In prod this will not happen