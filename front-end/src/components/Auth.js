const authHelper = {
  authenticated: false,
  authenticate(cb) {
    this.authenticated = true;
    setTimeout(cb, 100); // fake async
  },
  isAuthenticated() {
    const user = localStorage.getItem('knownComputer');
    if (user) {
      this.authenticated = true;
    }
    return this.authenticated;
  },
  signout(cb) {
    this.authenticated = false;
    localStorage.clear();
    setTimeout(cb, 100);
  },
};

export default authHelper;
