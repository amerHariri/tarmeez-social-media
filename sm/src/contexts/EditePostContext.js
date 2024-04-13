import { createContext, useContext } from "react";
import { useState } from "react";

import EditePost from "../components/EditePost";

const EditePostContext = createContext();

export const  EditePostProvider = ({children}) =>{
    const [showEditeDialog,setShowEditeDialog] = useState(false);
    const [editePost, setEditePost] = useState({
        body: '',
        image: '',
      });

    return(
        <EditePostContext.Provider value={{showEditeDialog,setShowEditeDialog,editePost,setEditePost}}>
            <EditePost />
            {children}
        </EditePostContext.Provider>       
    )
}

export const useEditePost = ()=>{
    return useContext(EditePostContext);
}