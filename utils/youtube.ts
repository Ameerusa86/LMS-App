import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

interface VideoSnippet {
  title: string;
  description: string;
  publishedAt: string;
  thumbnails: {
    default: { url: string };
    medium: { url: string };
    high: { url: string };
  };
  channelTitle: string;
}

interface YouTubeApiResponse {
  items: Array<{
    snippet: VideoSnippet;
  }>;
}

export const getVideoDetails = async (
  videoId: string
): Promise<VideoSnippet> => {
  try {
    const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${API_KEY}&part=snippet`;

    const response = await axios.get<YouTubeApiResponse>(url);

    if (response.data.items.length === 0) {
      throw new Error("No video details found for the provided video ID.");
    }

    return response.data.items[0].snippet;
  } catch (error: any) {
    console.error("Error fetching video details:", error.message);
    throw new Error(
      "Failed to fetch video details. Please check the video ID and API key."
    );
  }
};
