import { z } from "zod";

import schemas from "../schemas/users.schemas";

type TUser = z.infer<typeof schemas.user>;

type TUserRequest = z.infer<typeof schemas.request>;

type TUserResponse = z.infer<typeof schemas.response>;

type TUserLoggedResponse = z.infer<typeof schemas.responseLoggedUser>

type TUserUpdate = z.infer<typeof schemas.update>;

type TLogin = z.infer<typeof schemas.login>;

type TToken = z.infer<typeof schemas.token>;

type TTokenObject = { token: string };

export {
	TUser,
	TUserRequest,
	TUserResponse,
	TUserLoggedResponse,
	TUserUpdate,
	TLogin,
	TToken,
	TTokenObject,
};
