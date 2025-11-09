export default defineNuxtPlugin(() => {
  if (process.client) {
    const token = localStorage.getItem('auth-token');

    if (token) {
      // Try a quick auth check on startup
      fetch(window.location.origin + '/api/profile', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }).then(response => {
        if (response.status === 401) {
          console.error('Token invalid on startup, clearing and redirecting to login');
          localStorage.removeItem('auth-token');
          window.location.href = '/login';
        }
      }).catch(() => {
        // Network error, ignore
      });
    }
  }
});
