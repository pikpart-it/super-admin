import { postAuthorized } from "./../services";
import { config } from "./../config/config";

export const loggerMailIds = [
  { email: "bdeepak@pikpart.com" },
  { email: "droidmaster27@gmail.com" },
];

const getEmail = (email: Array<object>) => {
  let text = "";
  email.map((i: any) => {
    text += `${i?.email}, `;
  });

  let lastIndex = text.lastIndexOf(", ");

  let content = text.substring(0, lastIndex);

  return content;
};

export const sendEmail = async ({
  email = [],
  subject = "Logger",
  body,
  attachments = {},
}: any) => {
  let data = [...loggerMailIds, ...email];

  let url = `${config.baseUrl}/utilities/send-email`;

  let content = typeof body === "string" ? body : JSON.stringify(body);

  const payload = {
    customerEmail: getEmail(data),
    //process.env.REACT_APP_ENV.charAt(0).toLocaleUpperCase() returns Object is possibly undefined
    subject: `${
      process.env.REACT_APP_ENV === "development"
        ? `Development |`
        : process.env.REACT_APP_ENV === "production"
        ? "Production"
        : "Local"
    } ${subject}`,
    content,
    // attachments
  };
  try {
    const res = await postAuthorized(url, payload);
    if (res?.data?.error) {
      console.log(res);
    }
  } catch (error) {
    console.error(error);
  }
};
