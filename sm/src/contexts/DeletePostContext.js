import { createContext, useContext } from "react";
import { useState } from "react";

import DeletePost from "../components/DeletePost";

const DeletePostContext = createContext();

export const  DeletePostProvider = ({children}) =>{
    const [showDeleteDialog,setShowDeleteDialog] = useState(false);
    const [deletePostId,setDeletePostId] = useState();

    return(
        <DeletePostContext.Provider value={{showDeleteDialog,setShowDeleteDialog,setDeletePostId,deletePostId}}>
            <DeletePost />
            {children}
        </DeletePostContext.Provider>       
    )
}

export const useDeletePost = ()=>{
    return useContext(DeletePostContext);
}