import { format } from "date-fns";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import {
  Typography,
  Box,
  Paper,
  Grid,
  IconButton,
  Avatar,
  LinearProgress,
  Button,
} from "@mui/material";
import { CheckCircle, VisibilityOutlined } from "@mui/icons-material";
import { ThumbUpAltOutlined } from "@mui/icons-material";

import { Videos } from ".";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { demoProfilePicture } from "../utils/constants";


const VideoDetail = () => {
  const { id } = useParams();
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState([]);
  const [channelDetails, setChannelDetails] = useState(null);

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`).then((data) =>
      setVideoDetail(data.items[0])
    );
    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`).then(
      (data) => setVideos(data.items)
    );
  }, [id]);

  useEffect(() => {
    if (!videoDetail) return;
    const {
      snippet: { channelId },
    } = videoDetail;

    fetchFromAPI(`channels?part=snippet&id=${channelId}`).then((data) =>
      setChannelDetails(data?.items[0])
    );
  }, [videoDetail]);

  if (!videoDetail || !videos?.length)
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress sx={{ backgroundColor: "#9403fc" }} />
      </Box>
    );

  const {
    snippet: { title, channelId, channelTitle, description, publishedAt },
    statistics: { viewCount, likeCount },
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
              zIndex: 0,
            }}
          >
            {/* Video player component */}
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
              sx={{ marginTop: "16px", color: "#fff", mb: 2 }}
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
              <Link
                to={`/channel/${channelId}`}
                style={{ display: "flex", alignItems: "center" }}
              >
                <Avatar
                  src={
                    channelDetails?.snippet?.thumbnails?.high?.url ||
                    demoProfilePicture
                  }
                  alt="Channel Logo"
                  p={2}
                />

                <Typography
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
                {/* Likes */}
                <IconButton
                  variant="contained"
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
                  style={{
                    color: "#fff",
                    marginLeft: "16px",
                    bgcolor: "#424242",
                  }}
                >
                  <VisibilityOutlined />

                  <Typography
                    variant="body2"
                    style={{
                      marginLeft: "4px",
                      color: "#fff",
                    }}
                  >
                    {parseInt(viewCount).toLocaleString()}
                  </Typography>
                </IconButton>

                {/* Subscriber */}
                <Button
                  variant="contained"
                  size="small"
                  aria-label="subscriber"
                  sx={{
                    color: "#fff",
                    marginLeft: "15px",
                    bgcolor: "#424242",
                    textTransform: "none",
                  }}
                >
                  <Typography sx={{ color: "white" }}>
                    {parseInt(
                      channelDetails?.statistics.subscriberCount
                    ).toLocaleString()}{" "}
                    subscribers
                  </Typography>
                </Button>
              </div>
            </div>

            {/* Description */}
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
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} px={2} alignItems="center">
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
