export function ensureAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next(); // User is authenticated, continue with the request
  } else {
    return res.status(401).json({ message: "Authentication required" });
    // You can send an error response or handle it as per your project's needs
  }
}
export function ensureGuest(req, res, next) {
  if (!req.isAuthenticated()) {
    return next(); // User is not authenticated, continue with the request
  } else {
    return res.status(403).json({ message: "Authentication conflict" });
    // You can send an error response or handle it as per your project's needs
  }
}
