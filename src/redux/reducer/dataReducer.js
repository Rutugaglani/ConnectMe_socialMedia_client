import {
  SET_SCREAMS,
  LOADING_DATA,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  DELETE_SCREAM,
  POST_SCREAM,
  SET_SCREAM,
  SUBMIT_COMMENT,
  SEND_MESSAGE,
  GET_MESSAGES,
  GET_USERS,
} from "../types";

const initialState ={
    screams : [],
    scream : {},
    message:[],
    messages:[],
    users:[],
    loading : false

};

export default function( state =initialState , action){
    switch(action.type)
    {
        case LOADING_DATA:
            return{
                ...state,
                loading:true
            }

        case SET_SCREAMS:
            return {
                ...state,
                loading:false,
                screams:action.payload

            }
        case SET_SCREAM:
            return {
                ...state,
                scream:action.payload,
            }
            //doubt
         case LIKE_SCREAM:
         case UNLIKE_SCREAM:
            var index = state.screams.findIndex((scream)=> scream.screamId === action.payload.screamId);
            state.screams[index] = action.payload;
            //doubt
            if(state.scream.screamId === action.payload.screamId)
            {
                state.scream=action.payload
            }
             return{
                 ...state,
             }

        case DELETE_SCREAM:
             index= state.screams.findIndex( (scream) => scream.screamId === action.payload )
            state.screams.splice(index, 1)
            return{
                ...state
            }
        case POST_SCREAM:
            return{
                ...state,
                screams:[
                    action.payload,
                    ...state.screams
                ]
            }
        
        case SEND_MESSAGE:
            return{
                ...state,
                messages:[...state.messages,action.payload],
            }
        case GET_MESSAGES:
            return{
                ...state,
                messages:action.payload,
                loading:false
            }

        case SUBMIT_COMMENT:{
            return{
                ...state,
                scream:{
                    ...state.scream,
                    comments:[action.payload,...state.scream.comments]
                }
            }
        }

        case GET_USERS : {
            return {
                ...state,
                loading:false,
                users:action.payload
            }
        }

        default:
            return state
            
        
           
    }
}