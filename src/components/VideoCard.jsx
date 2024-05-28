import { Link } from "react-router-dom";
import { Typography, Card, CardContent, CardMedia } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

import {
  demoThumbnailUrl,
  demoVideoUrl,
  demoVideoTitle,
  demoChannelUrl,
  demoChannelTitle,
} from "../utils/constants";

const VideoCard = ({
  video: {
    id: { videoId },
    snippet,
  },
  md,
  lg,
  hmd,
}) => {
  const thumbnailUrl = snippet?.thumbnails?.high?.url || demoThumbnailUrl;
  const videoTitle = snippet?.title || demoVideoTitle;

  return (
    <Card
      sx={{
        width: { xs: "100%", sm: "320px", md: md, lg: lg },
        boxShadow: "none",
        borderRadius: 0,
      }}
    >
      <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
        {/* Thumbnail */}
        <CardMedia
          image={thumbnailUrl}
          alt={videoTitle}
          sx={{
            width: { xs: "100%", sm: "320px", md: md, lg: lg },
            height: { xs: "180px", md: hmd },
          }}
        />
        {/* Title */}
        <CardContent
          sx={{ backgroundColor: "#242424", height: { xs: "100px", md: hmd } }}
        >
          <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}></Link>
          <Typography variant="subtitle1" fontWeight="bold" color="#FFF">
            {videoTitle.slice(0, 60) || demoVideoTitle.slice(0, 60)}
          </Typography>

          {/* Channel Name */}
          <Link
            to={
              snippet?.channelId
                ? `/channel/${snippet?.channelId}`
                : demoChannelUrl
            }
          >
            <Typography
              variant="subtitle2"
              fontWeight="bold"
              color="gray"
              mt={2}
            >
              {snippet?.channelTitle || demoChannelTitle}
              <CheckCircle sx={{ fontSize: 12, color: "gray", ml: "5px" }} />
            </Typography>
          </Link>
        </CardContent>
      </Link>
    </Card>
  );
};

export default VideoCard;
