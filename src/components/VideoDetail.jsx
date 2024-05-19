import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Button, Box, Stack } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

import { Videos } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const VideoDetail = () => {
  const { id } = useParams();
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`).then((data) =>
      setVideoDetail(data.items[0])
    );
  }, [id]);

  if (!videoDetail?.snippet) return "Loading..";

  const {
    snippet: { title, channelId, channelTitle, description },
    statistics: { viewCount, likeCount, subscriberCount },
  } = videoDetail;

  return (
    <Box minHeight="100vh">
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
          <Box
            sx={{
              widht: "100%",
              position: "sticky",
              top: "86px",
            }}
          >
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              className="react-player"
              controls
            />
            <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
              {title}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ color: "#fff" }}
              py={1}
              px={2}
            >
              <Link to={`/channel/${channelId}`}>
                <Typography
                  variant={{ sm: "subtitle1", md: "h6" }}
                  color="#fff"
                >
                  {channelTitle}
                  <CheckCircle
                    sx={{ fontSize: "20px", color: "gray", ml: "5px" }}
                  />
                </Typography>
              </Link>
              {/* Channel stats */}
              {subscriberCount && (
                <Typography color="#fff">
                  {parseInt(subscriberCount).toLocaleString()} Subscribers
                </Typography>
              )}
              <Stack direction="row" gap="20px" alignItems="center">
                <Button
                  variant="outlined"
                  color="secondary"
                  startIcon={<VisibilityOutlinedIcon />}
                >
                  {parseInt(viewCount).toLocaleString()} views
                </Button>
                <Button variant="outlined" startIcon={<ThumbUpOutlinedIcon />}>
                  {parseInt(likeCount).toLocaleString()}
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box
          px={2}
          py={{ md: 1, xs: 5 }}
          justifyContent="center"
          alignItems="center"
        >
          <Videos videos={videos} direction="column" />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
