import { loadUsersRequest, deleteUsersRequest } from "./axios-driver";

export function loadUsers() {
    return loadUsersRequest("LOAD_USERS_SUCCESS");
}

export function deleteUser(uuid) {
    return deleteUsersRequest("DELETE_USERS_SUCCESS", uuid);
}