import { format, differenceInMonths } from "date-fns";

import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import {
  Typography,
  Box,
  Stack,
  Paper,
  Grid,
  IconButton,
  Avatar,
  LinearProgress,
} from "@mui/material";
import {
  CheckCircle,
  VisibilityOutlined,
  CalendarMonthOutlined,
} from "@mui/icons-material";
import {
  ThumbUpAltOutlined,
  VisibilityOutlinedIcon,
} from "@mui/icons-material";

import { Videos } from ".";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { demoProfilePicture } from "../utils/constants";

const VideoDetail = () => {
  const { id } = useParams();
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`).then((data) =>
      setVideoDetail(data.items[0])
    );
    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`).then(
      (data) => setVideos(data.items)
    );
  }, [id]);

  if (!videos?.length)
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress sx={{ backgroundColor: "#9403fc" }} />
      </Box>
    );

  const {
    snippet: { title, channelId, channelTitle, description, publishedAt },
    statistics: { viewCount, likeCount, subscriberCount },
  } = videoDetail;

  const formattedDate = format(new Date(publishedAt), "dd-MM-yyyy");

  return (
    <Box minHeight="100vh">
      <Grid container spacing={1}>
        <Grid item xs={12} md={8}>
          <Paper
            sx={{
              bgcolor: "#212121",
              p: 1,
              marginBottom: 1,
              marginLeft: 1.5,
            }}
          >
            {/* Video player component */}
            {/* <Box style={{ padding: "56.25% 0 0 0", position: "relative" }}> */}
            <div
              sx={{
                width: "100%",
              }}
            >
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${id}`}
                className="react-player"
                controls
              />
            </div>
            {/* Video details */}
            <Typography
              variant="h6"
              style={{ marginTop: "16px", color: "#fff" }}
            >
              {title}
            </Typography>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "8px",
              }}
            >
              <Link to={`/channel/${channelId}`}>
                {/* <Avatar src="" alt="Channel Logo" /> */}
                <Typography
                  // variant={{ sm: "subtitle1", md: "h6" }}
                  variant="subtitle1"
                  sx={{ marginLeft: "8px", color: "#fff" }}
                >
                  {channelTitle}
                  <CheckCircle
                    sx={{ fontSize: "20px", color: "gray", ml: "5px" }}
                  />
                </Typography>
              </Link>
              {/* Channel stats */}
              <div
                style={{
                  marginLeft: "auto",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {/* {subscriberCount && (
                  <Typography color="#fff">
                    {parseInt(subscriberCount).toLocaleString()} Subscribers
                  </Typography>
                )} */}

                {/* Likes */}
                <IconButton
                  size="small"
                  aria-label="like"
                  style={{ color: "#fff", marginLeft: "8px" }}
                >
                  <ThumbUpAltOutlined />
                </IconButton>
                <Typography
                  variant="body2"
                  style={{ marginLeft: "4px", color: "#fff" }}
                >
                  {parseInt(likeCount).toLocaleString()}
                </Typography>

                {/* Views */}
                <IconButton
                  size="small"
                  aria-label="views"
                  style={{ color: "#fff", marginLeft: "16px" }}
                >
                  <VisibilityOutlined />
                </IconButton>
                <Typography
                  variant="body2"
                  style={{
                    marginLeft: "4px",
                    marginRight: "4px",
                    color: "#fff",
                  }}
                >
                  {parseInt(viewCount).toLocaleString()}
                </Typography>
              </div>
            </div>
            <div style={{ marginTop: "16px" }}>
              <Typography
                variant="subtitle1"
                gutterBottom
                style={{ color: "#fff", marginBottom: "16px" }}
              >
                Date Published: {formattedDate}
              </Typography>
              <Typography variant="body1" style={{ color: "#fff" }}>
                {description}
              </Typography>
            </div>
            {/* Comment section */}
            {/* <Typography
                variant="h6"
                style={{ marginTop: "24px", color: "#fff" }}
              >
                Comments
              </Typography>
              {comments.map((comment, index) => (
                <Paper
                  key={index}
                  style={{
                    backgroundColor: "#333",
                    padding: "8px",
                    marginTop: "8px",
                  }}
                >
                  <Typography variant="subtitle1" style={{ color: "#fff" }}>
                    {comment.author}
                  </Typography>
                  <Typography variant="body1" style={{ color: "#fff" }}>
                    {comment.text}
                  </Typography>
                </Paper>
              ))} */}
          </Paper>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          px={2}
          // py={{ md: 1, xs: 5 }}
          // justifyContent="center"
          alignItems="center"
        >
          <Paper
            style={{
              backgroundColor: "#181818",
              padding: "16px",
              marginBottom: "16px",
            }}
          >
            {/* Related videos */}
            <Typography
              variant="h6"
              sx={{ color: "#fff", marginBottom: "10px" }}
            >
              Related Videos
            </Typography>
            {/* List of related videos */}
            <Videos videos={videos} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default VideoDetail;
