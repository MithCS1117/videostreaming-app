import { Stack, Box } from "@mui/material";
import LoopIcon from "@mui/icons-material/Loop";
import React from "react";
import { VideoCard, ChannelCard } from "./";

const Videos = ({ videos, direction }) => {
  if (!videos?.length) return <LoopIcon />;
  return (
    <Stack
      direction= "row"
      flexWrap="wrap"
      justifyContent="start"
      gap={2}
    >
      {videos.map((item, index) => (
        <Box key={index}>
          {item.id.videoId && <VideoCard video={item} />}
          {item.id.channelId && <ChannelCard channelDetails={item} />}
        </Box>
      ))}
    </Stack>
  );
};
export default Videos;
