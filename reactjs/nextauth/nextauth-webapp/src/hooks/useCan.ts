import { useContext, useReducer } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { validateUserPermissions } from "../utils/validateUserPermissions";

interface UseCanParams {
    permissions?: string[];
    roles?: string[];
}

// hooks só funcionam dentro de componentes, nunca em serverSide functions (next)
export function useCan({ permissions = [], roles = [] }: UseCanParams) {
    const { user, isAuthenticated } = useContext(AuthContext);

    if (!isAuthenticated) {
        return false;
    }

    const userHasValidPermissions = validateUserPermissions({
        user, permissions, roles
    })

    return userHasValidPermissions;

}