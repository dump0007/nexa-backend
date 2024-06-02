import { Router } from 'express';
import UserService from '../components/User/service';
import { UserComponent } from '../components';

/**
 * @constant {express.Router}
 */
const router: Router = Router();

/**
 * POST method route
 * @example http://localhost:PORT/profiles/checkUser
 *
 * @swagger
 * /profiles/checkUser/:
 *  post:
 *    description: Connect user to application
 *    tags: ["profiles"]
 *    requestBody:
 *      description: walletConnection body
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UserSchema'
 *          example:
 *            docIdReferrer: qwsdffvgbgb
 *    responses:
 *      200:
 *        description: user successfuly logged
 *        content:
 *          appication/json:
 *            example:
 *              status: 200
 *              logged: true
 *              message: Successfully logged!
 *      401:
 *        description: Not logged, invalid credentials
 *        content:
 *          application/json:
 *            example:
 *              status: 401
 *              logged: false
 *              message: Invalid credentials
 */
router.post('/checkUser', UserComponent.checkUser);




/**
 * POST method route
 * @example http://localhost:PORT/profiles/UserPortfolio
 *
 * @swagger
 * /profiles/UserPortfolio/:
 *  post:
 *    description: Connect user to application
 *    tags: ["profiles"]
 *    requestBody:
 *      description: walletConnection body
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UserSchema'
 *          example:
 *            walletAddress: 0x1C98356a26Fe0b15889CA9816C350dF696bb05aC
 *            docIdReferrer: qwsdffvgbgb
 *    responses:
 *      200:
 *        description: user successfuly logged
 *        content:
 *          appication/json:
 *            example:
 *              status: 200
 *              logged: true
 *              message: Successfully logged!
 *      401:
 *        description: Not logged, invalid credentials
 *        content:
 *          application/json:
 *            example:
 *              status: 401
 *              logged: false
 *              message: Invalid credentials
 */
router.post('/UserPortfolio', UserComponent.userPortfolio);



/**
 * POST method route
 * @example http://localhost:PORT/profiles/referreeList
 *
 * @swagger
 * /profiles/referreeList/:
 *  post:
 *    description: Connect user to application
 *    tags: ["profiles"]
 *    requestBody:
 *      description: walletConnection body
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UserSchema'
 *          example:
 *            walletAddress: 0x1C98356a26Fe0b15889CA9816C350dF696bb05aC
 *            docIdReferrer: qwsdffvgbgb
 *    responses:
 *      200:
 *        description: user successfuly logged
 *        content:
 *          appication/json:
 *            example:
 *              status: 200
 *              logged: true
 *              message: Successfully logged!
 *      401:
 *        description: Not logged, invalid credentials
 *        content:
 *          application/json:
 *            example:
 *              status: 401
 *              logged: false
 *              message: Invalid credentials
 */
router.post('/referreeList', UserComponent.refrerralList);

router.post('/levelBreakDown', UserComponent.levelBreakdown);





/**
 * POST method route
 * @example http://localhost:PORT/profiles/userIncome
 *
 * @swagger
 * /profiles/UserPortfolio/:
 *  post:
 *    description: Connect user to application
 *    tags: ["profiles"]
 *    requestBody:
 *      description: walletConnection body
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UserSchema'
 *          example:
 *            walletAddress: 0x1C98356a26Fe0b15889CA9816C350dF696bb05aC
 *            docIdReferrer: qwsdffvgbgb
 *    responses:
 *      200:
 *        description: user successfully logged
 *        content:
 *          application/json:
 *            example:
 *              status: 200
 *              logged: true
 *              message: Successfully logged!
 *      401:
 *        description: Not logged, invalid credentials
 *        content:
 *          application/json:
 *            example:
 *              status: 401
 *              logged: false
 *              message: Invalid credentials
 */

router.post('/userIncome', UserComponent.UserIncome);




/**
 * @export {express.Router}
 */
export default router;
