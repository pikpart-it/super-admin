import App_Logo from "../assets/images/Final-Logo-white-pikpaprt.png";
import { config } from "../config/config";
import { postAuthorized } from "../services";
import { RoutesPath } from "../config/routes.config";
const user = JSON.parse(localStorage.getItem("user") || "{}");

const loadScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");

    script.src = "https://checkout.razorpay.com/v1/checkout.js";

    script.onload = () => {
      resolve(true);
    };

    script.onerror = () => {
      resolve(false);
    };

    document.body.appendChild(script);
  });
};

export const displayRazorPay = async (payload: any) => {
  const res = await loadScript();

  if (!res) {
    alert("RazorPay did not load correctly");
    return;
  }

  let url = `${config.baseUrl}/customer/createWebServiceCart`;

  try {
    const { data } = await postAuthorized(url, payload);
    if (!data?.error) {
      const options = {
        key: `${config.razorPay.keyId}`,
        currency: "INR",
        name: "Pikpart",
        description: "Select your payment method",
        image: App_Logo,
        amount: `${data?.data?.amount * 100}`,
        order_id: data?.data?.orderId,
        handler: (response: any) => paymentCapture(response, data, true),
        prefill: {
          name: `${user.firstName || ""} ${user.lastName || "Guest"}`,
          email: `${user.email || ""}`,
          contact: `${user.phoneNumber || ""}`,
        },
        theme: {
          color: "#E95210",
        },
      };

      let win = window as any;
      const rzp1: any = new win.Razorpay(options);

      rzp1.open();
    }
  } catch (error) {
    console.log("error");
  }
};

export const razorPayPaymentCapture = async (
  orderId: string,
  amount: number,
  cartId: number
) => {
  const res = await loadScript();

  if (!res) {
    alert("RazorPay did not load correctly");
    return;
  }

  const options = {
    key: `${config.razorPay.keyId}`,
    currency: "INR",
    name: "Pikpart",
    description: "Select your payment method",
    image: App_Logo,
    amount: `${(amount * 100)?.toFixed(0)}`,
    order_id: orderId,
    handler: (response: any) =>
      paymentCapture(response, { orderId, cartId }, false),
    prefill: {
      name: `${user.firstName || ""} ${user.lastName || "Guest"}`,
      email: `${user.email || ""}`,
      contact: `${user.phoneNumber || ""}`,
    },
    theme: {
      color: "#E95210",
    },
  };

  let win = window as any;
  const rzp1: any = new win.Razorpay(options);

  rzp1.open();
};

const paymentCapture = async (response: any, data: any, full: boolean) => {
  const { razorpay_payment_id } = response;

  try {
    const urlC = `${config.baseUrl}/customer/capturePayment`;
    const dataC = {
      object_hash: {
        master_cart_id: full ? data?.data?.masterCartId : undefined,
        cart_id: !full ? data?.cartId : undefined,
        order_id: data?.data?.orderId || data?.orderId,
        payment_id: razorpay_payment_id,
      },
    };

    const res = await postAuthorized(urlC, dataC);
    setTimeout(() => {
      localStorage.removeItem("majorServiceCart");
      localStorage.removeItem("minorServiceCart");
      localStorage.removeItem("sparesList");
      localStorage.removeItem("packagesList");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }, 1000);
  } catch (error) {
    return error;
  }
};
