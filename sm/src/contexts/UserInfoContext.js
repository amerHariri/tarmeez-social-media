import { createContext,useContext,useState } from "react";

const UserInfoContext = createContext({})

export const UseInfoProvider = ({children})=>{
    const [userInfo, setUserInfo] = useState({
        user:{
          comments_count:0,
          email:'',
          id:0,
          name:'',
          posts_count:0,
          profile_image:{},
          username:''
        }
      });


      return(
        <UserInfoContext.Provider value={{userInfo,setUserInfo}}>
            {children}
        </UserInfoContext.Provider>
      )
}

export const useUserInfo = ()=>{
    return useContext(UserInfoContext);
}