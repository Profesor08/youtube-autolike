import store, { IChannel } from "../store";

export function getVideoId(): string | null {
  let url = new URL(document.location.href);

  return url.searchParams.get("v");
}

export async function getApiResponse(
  url: string,
): Promise<IYouTubeDataApiVideoResponse | null> {
  try {
    const response = await fetch(url);

    const data = await response.json();

    if (data.error === undefined) {
      return data as IYouTubeDataApiVideoResponse;
    } else {
      console.warn(data);
    }
  } catch (err) {
    console.warn(err);
  }

  return null;
}

export async function getVideoInfo() {
  const key = "AIzaSyCP824trnz1NyDOVSpUZdac4f7fQj87g_0";
  const id = getVideoId();

  if (id) {
    const response = await getApiResponse(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=${key}`,
    );

    if (response !== null) {
      if (response.items.length > 0) {
        return response.items[0];
      }
    }
  }

  return null;
}

export async function getChannelId(): Promise<IChannel | null> {
  const video = await getVideoInfo();

  if (video) {
    return {
      id: video.snippet.channelId,
      name: video.snippet.channelTitle,
    };
  }

  return null;
}

getChannelId();

export async function getChannel(): Promise<IChannel | null> {
  const id = await getChannelId();

  if (id) {
    return id;
  } else {
    const videoOwner = document.querySelector(
      "#meta-contents #upload-info #channel-name .yt-simple-endpoint",
    );

    if (videoOwner instanceof HTMLElement) {
      const channelUrl = videoOwner.getAttribute("href");
      const name = videoOwner.innerText.trim();

      if (channelUrl && name && channelUrl.length > 0 && name.length > 0) {
        const regex = /^.*channel\/([a-zA-Z0-9\-_]{1,})/gm;

        const matches = regex.exec(channelUrl);

        if (matches && matches[1] !== undefined) {
          return {
            id: matches[1],
            name,
          };
        }
      }
    }
  }

  return null;
}

let likeTimeoutHandle: NodeJS.Timeout;

export async function pageUpdated() {
  clearTimeout(likeTimeoutHandle);
  store.channel = await getChannel();
  likeVideo();
}

export function likeVideo(): void {
  const like = (): boolean => {
    const buttons = Array.from(
      document.querySelectorAll(
        "#info #menu-container #top-level-buttons .ytd-menu-renderer",
      ),
    );

    if (buttons.length >= 2) {
      const likeButton = buttons[0];
      const dislikeButton = buttons[1];

      // do nothing if video is disliked
      if (dislikeButton.classList.contains("style-default-active")) {
        return true;
      }

      // do nothing if video is liked
      if (likeButton.classList.contains("style-default-active")) {
        return true;
      }

      if (likeButton instanceof HTMLElement) {
        likeButton.click();
        return true;
      }
    }

    return false;
  };

  clearTimeout(likeTimeoutHandle);

  setTimeout(async () => {
    if (store.likeAll) {
      like();
    } else {
      const channel = await getChannel();

      if (channel && store.hasChannel(channel)) {
        like();
      }
    }
  }, Math.round((1 - Math.log10(11 - store.likeDelay)) * 600) * 1000);
}
