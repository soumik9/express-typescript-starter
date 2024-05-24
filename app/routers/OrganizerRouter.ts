import express from 'express'
const router = express.Router();

// middleware
import auth from '../middleware/auth';

// controllers
import OrganizerController from '../controllers/OrganizerController';

//routes
router.get(
    '/all-under-business',
    auth(),
    OrganizerController.GetOrganizersUnderBusiness
);

router.get(
    '/:organizerId',
    auth(),
    OrganizerController.GetOrganizerById
);

router.post(
    '/create',
    auth(),
    OrganizerController.CreateNewOrganizerToSentInviteToAddUnderBusiness
);

router.patch(
    '/update/:organizerId',
    auth(),
    OrganizerController.UpdateOrganizerUnderBusiness
);

router.delete(
    '/delete/:organizerId',
    auth(),
    OrganizerController.DeleteOrganizer
);

export const OrganizerRouter = router;