import { useState } from 'react';
import styles from '../../styles/Admin.module.css'

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple password check (replace with secure auth in production)
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className={styles.loginContainer}>
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="password"
            placeholder="Enter Admin Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className={styles.input}
          />
          <button type="submit" className={styles.button}>Login</button>
        </form>
        {error && <p className={styles.error}>{error}</p>}
      </div>
    );
  }

  // Placeholder for upload functionality
  return (
    <div className={styles.adminPanel}>
      <h2>Welcome, Admin!</h2>
      <p>Upload images and videos here. (Social sync coming soon!)</p>
      <form className={styles.uploadForm}>
        <input type="file" multiple className={styles.input} />
        <button type="submit" className={styles.button}>Upload</button>
      </form>
    </div>
  );
}
