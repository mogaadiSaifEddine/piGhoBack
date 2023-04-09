var express = require("express");
const Offres = require("../models/model.offre");
const Users = require("../models/model.user");
const { authorize, AUTH_ROLES } = require("../middleware/auth");
const { USER, COMPANY } = AUTH_ROLES;
var router = express.Router();
const { verifyOwners } = require("../middleware/verifyOwners");
const validate = require("../middleware/schemaValidation");
const { verifyDoc: verifyDoc } = require("../middleware/verfieDocument");
const {
  offreValidator,
  offerSearch,
} = require("../validators/validators.offre");
const {
  addOffre,
  updateOffre,
  deleteOffre,
  applyOffre,
  getAppliers,
  unapplyOffre,
  acceptApplier,
  validOffre,
  invalidOffre,
  unacceptApplier,
  getAccepted,
  getAllOffers,
  searchOffers,
} = require("../controller/controller.offre");
router.delete(
  "/:offreId",
  authorize(COMPANY),
  verifyOwners("offreId", Offres),
  deleteOffre("offreId")
);
router.post("/", authorize(COMPANY), validate(offreValidator), addOffre);
router.put(
  "/update/:offreId",
  authorize(COMPANY),
  verifyOwners("offreId", Offres),
  validate(offreValidator),
  updateOffre("offreId")
);
router.put(
  "/valid/:offreId",
  authorize(COMPANY),
  verifyOwners("offreId", Offres),
  validOffre("offreId")
);
router.put(
  "/invalid/:offreId",
  authorize(COMPANY),
  verifyOwners("offreId", Offres),
  invalidOffre("offreId")
);
router.put(
  "/apply/:offreId/",
  authorize(USER),
  verifyDoc(Offres, "offreId"),
  applyOffre("offreId")
);
router.put(
  "/unapply/:offreId/",
  authorize(USER),
  verifyDoc(Offres, "offreId"),
  unapplyOffre("offreId")
);
router.get(
  "/appliers/:offerId",
  verifyDoc(Offres, "offerId"),
  getAppliers("offerId")
);
router.put(
  "/accept/:offreId/:userId",
  authorize(COMPANY),
  verifyOwners("offreId", Offres),
  verifyDoc(Users, "userId"),
  acceptApplier("offreId", "userId")
);
router.put(
  "/unaccept/:offerId/:userId",
  authorize(COMPANY),
  verifyOwners("offerId", Offres),
  verifyDoc(Users, "userId"),
  unacceptApplier("offerId", "userId")
);
router.get("/accepted/:offerId", verifyDoc(Offres, "offerId"), getAccepted);
router.get("/all", getAllOffers);
router.put("/search", validate(offerSearch), searchOffers);
module.exports = router;
