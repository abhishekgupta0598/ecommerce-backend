const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");

const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");

// If a local credential file is available, use that to connect to firestore.
// On GCP, no credential is needed.
let creds = null;
if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  const serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);
  creds = cert(serviceAccount);
} else {
  creds = applicationDefault();
}

initializeApp({
  credential: creds,
});

const db = getFirestore();

module.exports = db;
