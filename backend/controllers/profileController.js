const db = require("../config/db");
const { logAction } = require("../src/utils/logger");

exports.getProfile = (req, res) => {
  const userId = req.user?.id;

  if (!userId) {
    console.log("Profile access failed: User ID missing");
    return res.status(400).json({ msg: "User ID missing" });
  }

  console.log(`Fetching profile for user ID: ${userId}`);

  db.query(
    "SELECT id, fullname, email, role FROM users WHERE id = ?",
    [userId],
    (err, results) => {
      if (err) {
        console.error(
          `Profile query error for user ID ${userId}:`,
          err.message
        );
        return res.status(500).json({ msg: "Server error" });
      }

      if (results.length === 0) {
        console.log(`Profile not found for user ID: ${userId}`);
        return res.status(404).json({ msg: "User not found" });
      }

      const profile = results[0];
      console.log(`Profile fetched for user ID ${userId}:`, profile);
      logAction(userId, "Viewed own profile");

      res.json(profile);
    }
  );
};
