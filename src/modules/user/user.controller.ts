import { Router } from "express";
import { UserService } from "./user.service";

const user_router = Router();
// user_router.use("/user");

const user_service = new UserService();

user_router.get("/user", user_service.getAll);
user_router.get("/user/:id", user_service.get);
user_router.post("/user", user_service.create);
user_router.delete("/user", user_service.delete);
user_router.patch("/user/:id", user_service.update);


export { user_router };