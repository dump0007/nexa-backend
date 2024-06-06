import { Router } from 'express';
import { AdminComponent } from '../components';
import * as authMiddleware from '../middlewares/auth.middleware';

/**
 * @constant {express.Router}
 */
const router: Router = Router();

/**
 * POST method route
 * @example http://localhost:PORT/signup
 * @swagger
 * /auth/signup/:
 *  post:
 *    description: sign up user to application
 *    tags: ["auth"]
 *    requestBody:
 *      description: sign up body
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UserSchema'
 *          example:
 *            email: test.user@mail.com
 *            password: test_test
 *    responses:
 *      200:
 *        description: user successfuly signed in
 *        content:
 *          appication/json:
 *            example:
 *              status: 200
 *              logged: true
 *              message: Sign in successfull!!
 *      400:
 *        description: sign in failed
 *        content:
 *          application/json:
 *            example:
 *              status: 400
 *              logged: false
 *              message: Email already exists
 */
router.post('/fetchLockedIncomes', AdminComponent.fetchLockedIncomes);

router.post('/stakePerDayHistory', AdminComponent.stakesPerDay);



router.post('/sendotp', AdminComponent.sendotp)

router.post('/verifyOTP', AdminComponent.verifyOtp)

router.post("/unlockedIncome", AdminComponent.unlockedIncomePerUser)



/**
 * @export {express.Router}
 */
export default router;
