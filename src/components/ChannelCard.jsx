import { Link } from "react-router-dom";
import { Typography, CardContent, CardMedia, Box } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { demoChannelTitle, demoProfilePicture } from "../utils/constants";

const ChannelCard = ({ channelDetails, marginTop }) => {
  const profilePicture =
    channelDetails?.snippet?.thumbnails?.high?.url || demoProfilePicture;
  const channelTitle = channelDetails?.snippet?.title || demoChannelTitle;

  return (
    <Box
      sx={{
        boxShadow: "none",
        borderRadius: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: { xs: "300px", sm: "320px" },
        height: "326px",
        margin: "auto",
        marginTop: marginTop,
      }}
    >
      <Link to={`/channel/${channelDetails?.id.channelId}`}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
            color: "#fff",
          }}
        >
          <CardMedia
            image={profilePicture}
            alt={channelTitle}
            sx={{
              borderRadius: "50%",
              height: "180px",
              width: "180px",
              mb: 2,
              border: "1px solid #e3e3e3",
            }}
          />
          <Typography variant="h6">
            {channelTitle}
            <CheckCircle sx={{ fontSize: 12, color: "gray", ml: "5px" }} />
          </Typography>

          {/* Channel stats */}
          {channelDetails?.statistics?.subscriberCount && (
            <Typography>
              {parseInt(
                channelDetails?.statistics.subscriberCount
              ).toLocaleString()}{" "}
              Subscribers
            </Typography>
          )}
        </CardContent>
      </Link>
    </Box>
  );
};

export default ChannelCard;
