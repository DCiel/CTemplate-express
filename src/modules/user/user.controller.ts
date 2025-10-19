import { _DefaultRouter } from "@/common/express/router";
import { UserService } from "./user.service";
import { userDeleteSchema, userSchema, userUpdateSchema } from "./user.schemas";
import { validateSchema } from "@/common/validate";

export const userRouter = async () => {
    const userRouter = new _DefaultRouter("/api");
    
    
    const userService = new UserService();

    /**
     * @swagger
     * /api/user:
     *   post:
     *     summary: Create a new user
     *     tags:
     *       - User
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *                 example: "test@example.com"
     *               name:
     *                 type: string
     *                 example: "John Doe"
     *     responses:
     *       200:
     *         description: User created successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 email:
     *                   type: string
     *                   example: "test@example.com"
     *                 name:
     *                   type: string
     *                   example: "John Doe"
     *       400:
     *         description: Validation error
     *         content:
     *           application/json:
     */
    userRouter.post(`/user`, async (req, res) => {
        const createItem = await userService.getAll();
        res.json(createItem);
    });

    /**
     * @swagger
     * /api/user/:id:
     *   get:
     *     summary: Get a user by id
     *     tags:
     *       - User
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: The id of the user
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: User found successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 email:
     *                   type: string
     *                   example: "test@example.com"
     *                 name:
     *                   type: string
     *                   example: "John Doe"
     *       404:
     *         description: User not found
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: "User not found"
     *       500:
     *         description: Internal server error
     */
    userRouter.get(`/user/:id`, async (req, res) => {
        const getItem = await userService.get(req, res);
        res.json(getItem);
    });

    /**
     * @swagger
     * /api/user:
     *   post:
     *     summary: Create a new user
     *     tags:
     *       - User
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *                 example: "test@example.com"
     *               name:
     *                 type: string
     *                 example: "John Doe"
     *     responses:
     *       200:
     *         description: User created successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 email:
     *                   type: string
     *                   example: "test@example.com"
     *                 name:
     *                   type: string
     *                   example: "John Doe"
     *       400:
     *         description: Validation error
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: "User not found"
     *       500:
     *         description: Internal server error
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: "Internal server error"
     */
    userRouter.post(`/user`, async (req, res) => {
        const body = await validateSchema({dto: req.body, schema: userSchema, schemaName: "/user/create"})
        const createItem = await userService.create(body);
        res.json(createItem);
    });

    /**
     * @swagger
     * /api/user:
     *   delete:
     *     summary: Delete a user
     *     tags:
     *       - User
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               id:
     *                 type: string
     *                 example: "1"
     *     responses:
     *       200:
     *         description: User deleted successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: "User deleted successfully"
     *       404:
     *         description: User not found
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message: 
     *                   type: string
     *                   example: "Internal server error"
     */
    userRouter.delete(`/user`, async (req, res) => {
        const body = await validateSchema({dto: req.body, schema: userDeleteSchema, schemaName: "/user/delete"})
        const deleteItem = await userService.delete(body.id);
        res.json(deleteItem);
    });

    /**
     * @swagger
     * /api/user/:id:
     *   patch:
     *     summary: Update a user by id
     *     tags:
     *       - User
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: The id of the user
     *         schema:
     *           type: string
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *                 example: "test@example.com"
     *               name:
     *                 type: string
     *                 example: "John Doe"
     *     responses:
     *       200:
     *         description: User updated successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: "User updated successfully"
     *       404:
     *         description: User not found
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: "User not found"
     *       500:
     *         description: Internal server error
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: "Internal server error"
     */
    userRouter.patch(`/user/:id`, async (req, res) => {
        const body = await validateSchema({dto: req.body, schema: userUpdateSchema, schemaName: "/user/update"})
        const id = Number(req.params.id);
        const updateItem = await userService.update(body, id);
        res.json(updateItem);
    });

    return userRouter.router;
}