import { handleError } from "./handlerErrors.middleware"
import validateSchema from "./validateSchema.middleware"

const sharedMiddlewares = {
    handleError,
    validateSchema
}

export default sharedMiddlewares