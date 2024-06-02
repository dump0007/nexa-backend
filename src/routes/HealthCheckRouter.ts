import { Router } from 'express';
import { HealthCheckComponent } from '../components';

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
router.get('/', HealthCheckComponent.healthCheck);


/**
 * @export {express.Router}
 */
export default router;
