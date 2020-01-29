declare module "*.svg";

interface IYouTubeDataApiErrorResponse {
  error: IYouTubeDataApiError;
}

interface IYouTubeDataApiVideoResponse {
  kind: string;
  etag: string;
  pageInfo: IYouTubeDataApiPageInfo;
  items: IYouTubeVideo[];
}

interface IYouTubeDataApiErrorType {
  domain: string;
  reason: string;
  message: string;
}

interface IYouTubeDataApiError {
  errors: IYouTubeDataApiErrorType[];
  code: number;
  message: string;
}

interface IYouTubeDataApiPageInfo {
  totalResults: number;
  resultsPerPage: number;
}

interface IYouTubeVideo {
  kind: string;
  etag: string;
  id: string;
  snippet: IYouTubeVideoSnippet;
}

interface IYouTubeVideoSnippet {
  publishedAt: string;
  channelId: string;
  channelTitle: string;
  title: string;
  description: string;
}
