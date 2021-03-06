import {
    LOG_IN,
    LOG_OUT,
    STORE_CONTRACT,
    STORE_USER_ADDRESS,
    STORE_USER_PLANES,
    TOGGLE_CHAT_VISIBILITY,
    STORE_PLANES,
    SELECT_PLANE,
    SAVE_SOCKET,
} from "../constants/action-types";

const initialState = {
    loggedIn: false,
    id: null,
    userAddress: '0x0',
    userPlanes: [ [999999, 50000071117] ],
    chatVisible: false,
    selectedPlane: 50000071117,
    gameSocket: null,
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_IN:
            return { ...state, 
                id: action.payload.id,
                username: action.payload.username,
                profilePicture: action.payload.profilePicture,
                fullName: action.payload.fullName,
                totalPoints: action.payload.totalPoints,
                createdAt: action.payload.createdAt,
                userAddress: action.payload.blockchainAddress,
                tokenLogin: action.payload.tokenLogin
            };
        case LOG_OUT: 
            return {
                ...state, 
                id: null,
                username: null,
                profilePicture: null,
                fullName: null,
                userAddress: null,
                totalPoints: null,
                createdAt: null
            };
        case STORE_CONTRACT: 
            return {
                ...state, 
                contract: action.payload,
            };
        case STORE_USER_ADDRESS: 
            return {
                ...state, 
                userAddress: action.payload,
            };
        case STORE_USER_PLANES:
            return {
                ...state,
                contract: action.payload.contract,
                userAddress: action.payload.userAddress,
                userPlanes: action.payload.userPlanes,
            };
        case STORE_PLANES: 
            let planes = [ [999999, 50000071117] ]
            planes = planes.concat(action.payload.planes);
            return {
                ...state,
                userPlanes: planes,
            };
        case TOGGLE_CHAT_VISIBILITY:
            return {
                ...state,
                chatVisible: action.payload
            };
        case SELECT_PLANE: 
            return {
                ...state, 
                selectedPlane: action.payload,
            };
        case SAVE_SOCKET: 
            return {
                ...state, 
                gameSocket: action.payload,
            };
        default:
            return state;
    }
};

export default rootReducer;