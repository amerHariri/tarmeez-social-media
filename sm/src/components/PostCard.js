import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import EditIcon from '@mui/icons-material/Edit';
import CommentIcon from '@mui/icons-material/Comment';
import DeleteIcon from '@mui/icons-material/Delete';


import { Link} from "react-router-dom";


import { useUserInfo } from "../contexts/UserInfoContext";
import { useEditePost } from "../contexts/EditePostContext";
import { useDeletePost } from "../contexts/DeletePostContext";


export default function PostCard({ post }) {
  
  const {setShowEditeDialog,setEditePost} = useEditePost()
  const {setShowDeleteDialog,setDeletePostId} = useDeletePost()
  const {userInfo} = useUserInfo()
  const tags = post.tags;
  const putTags = tags.map((tag)=>{
    return(
      <div style={{marginLeft:'8px',backgroundColor:'#305252',fontSize:'16px',color:'white'}}>{tag.name}</div>
    )
  })

  function showEditePostDialog(){
    setShowEditeDialog(true);
    setEditePost(post);
  }

  function showDeletePostDialog(){
    setShowDeleteDialog(true);
    setDeletePostId(post.id);
  }

  return (
    <Card sx={{ maxWidth: "90%", minWidth: "90%", margin: "5px 0" }}>
      <div
        id="post-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 15px",
        }}
      >
        
          <Link key={post.id} to={`/users/${post.author.id}`}  style={{textDecoration:'none',color: "inherit"}}>
          <div
          id="user-info"
          style={{
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
          }}
        >
            <img
              src={post.author.profile_image}
              alt=""
              style={{
                border: "0.8px solid #f7f7f7",
                marginRight: "10px",
                backgroundColor: "#305252",
                width: "50px",
                height: "50px",
                borderRadius: "50%",
              }}
            ></img>
          
          <div style={{ fontWeight: "bold" }}>{post.author.name}</div>
        </div>
        </Link>
              
        <div>
          <Link key={post.id} to={`/posts/${post.id}`}>
            {post.created_at}
          </Link>
        </div>
      </div>
      <img
        src={post.image}
        alt=""
        style={{
          backgroundSize: "cover",
          border: "0.8px solid #f7f7f7",
          marginRight: "10px",
          backgroundColor: "#305252",
          height:'auto',
          width: "100%",
        }}
      ></img>

      <CardContent>
        <Typography variant="body5" color="text.secondary">
          {post.body}
        </Typography>
      </CardContent>
      <CardActions
        disableSpacing
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "15px",
        }}
      >
        <div>
          {userInfo.user.name == post.author.name ? (
            <>
              <IconButton
                onClick={showEditePostDialog}
                aria-label="update post"
                style={{ color: "#305252" }}
              >
                <EditIcon />
              </IconButton>

              <IconButton
                onClick={showDeletePostDialog}
                aria-label="delete post"
                style={{ color: "#305252" }}
              >
                <DeleteIcon />
              </IconButton>
            </>
          ) : (
            ""
          )}

          <IconButton aria-label="share" style={{ color: "#305252" }}>
            <CommentIcon />
            <div style={{ fontSize: "18px", marginLeft: "8px" }}>
              {post.comments_count}
            </div>
          </IconButton>

          <IconButton>{putTags}</IconButton>
        </div>
      </CardActions>
    </Card>
  );
}
