import { post } from "../assets/js/fetchAPI";

export const generateInsideSharingParams = ({
  description,
  widgetId,
  image,
  deepLink,
  title
}) => {
  const msg_body = {
    messages: [
      {
        raw_message: {
          mime_type: 81,
          content: description,
          metadata: {
            application_x_beanfun_interactive_metadata: {
              service_id: widgetId,
              image_info: {
                mime_type: 10,
                uri: image,
                thumbnail_uri: image
              },
              once: false,
              forwardable: true,
              expired_hint: "新聞過期",
              options: [
                {
                  opt_key: "app_link_option_key",
                  opt_type: 2,
                  description: title,
                  uri: deepLink
                }
              ],
              interactive_key: "sdk_interactive_key"
            }
          },
          expired_time: -1
        }
      }
    ]
  };
  const select_opt = {
    title: "轉傳至",
    target: {
      friend: 1,
      group: 1,
      fun_chat: 1,
      nickname_group: 1,
      game: 1
    },
    max_selected_count: -1
  };
  return {
    msg_body,
    select_opt
  };
};

export const generateOutsideSharingParamsPromise = ({
  title,
  description,
  image,
  deepLink,
  api
}) => {
  const encodedDeepLink = encodeURIComponent(deepLink);
  const defaultLink = `https://beanfunstor.blob.core.windows.net/redirect/appCheck.html?url=${encodedDeepLink}`;
  const body = {
    seo: {
      title,
      description,
      image
    },
    defaultLink
  };
  return post("shortlink", body, api);
};
