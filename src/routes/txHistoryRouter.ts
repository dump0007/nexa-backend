import { Router } from 'express';
import { DepositComponent } from '../components';

/**
 * @constant {express.Router}
 */
const router: Router = Router();

/**
 * POST method route
 * @example http://localhost:PORT/txHistory/checkUser
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
router.post('/depositTxHistory',  DepositComponent.depositTx);

router.post('/withdrawTxHistory', DepositComponent.withdrawTx);

router.post('/claimTxHistory', DepositComponent.claimTx);

router.post('/skippedIncomeTxHistory', DepositComponent.skippedIncomeTx);




/**
 * @export {express.Router}
 */
export default router;
