import { getAuthorized, postAuthorized } from "./../services";
import pikpart from "../assets/images/mob_icons/pikpartLogo2.png";
import { config } from "../config/config";
import { sendEmail } from "../logger/sendMail";

const user = JSON.parse(localStorage.getItem("user") || "{}");
export const RazorPay = async ({ amount, receipt, id, resData }: any) => {
  const url = `${config.baseUrl}/customer/create_order`;
  const data = {
    booking_id: id,
    receipt_id: receipt,
  };

  try {
    const res = await postAuthorized(url, data);
    if (!res?.data?.error) {
      var paymentId = res?.data?.id;
      const options = {
        key: `${config.razorPay.keyId}`,
        currency: "INR",
        name: "Pikpart",
        description: "",
        image: pikpart,
        order_id: res?.data?.order?.id,
        handler: async (response: any) => {
          const { razorpay_payment_id } = response;
          try {
            const urlC = `${config.baseUrl}/customer/payment_capture`;
            const dataC = {
              paymentId: razorpay_payment_id,
              id: paymentId,
            };

            const res = await postAuthorized(urlC, dataC);

            resData(res);
          } catch (error) {
            resData({
              data: { error: true, message: "Unable to capture this payment" },
            });
            sendEmail({
              subject: `Logger: Unable to capture payment for payment Id: ${razorpay_payment_id} on payment.tsx line:43`,
              body: error,
            });

            return error;
          }
        },
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
      // rzp1.on('payment.failed', (response: any) => (result = response))
      // rzp1.on('payment.success', (res: any) => (result = res))
      rzp1.open();
    } else {
      resData(res);
    }
  } catch (e) {
    resData({ data: { error: true, message: "Unable to create order." } });
    sendEmail({
      subject: `Logger: Unable to create order for receipt id: ${receipt} on payment.tsx line:71`,
      body: e,
    });

    return {
      error: true,
      errorData: e,
      message: "Unable to create order",
    };
  }
};

export const AmcRazorPay = async ({ amount, receipt, amcId, resData }: any) => {
  const url = `${config.baseUrl}/customer/create_amc_order`;
  const data = {
    amc_id: amcId,
    receipt_id: receipt,
  };

  try {
    const res = await postAuthorized(url, data);
    if (!res?.data?.error) {
      var customerAMCId = res?.data?.id;

      const options = {
        key: `${config.razorPay.keyId}`,
        currency: "INR",
        name: "Pikpart",
        description: "AMC Payment",
        image: pikpart,
        order_id: res?.data?.order?.id,
        handler: async (response: any) => {
          const { razorpay_payment_id } = response;
          try {
            const urlC = `${config.baseUrl}/customer/capture_amc_payment`;
            const dataC = {
              paymentId: razorpay_payment_id,
              id: customerAMCId,
            };

            const res = await postAuthorized(urlC, dataC);

            resData(res);
          } catch (error) {
            resData({
              data: { error: true, message: "Unable to capture this payment" },
            });
            sendEmail({
              subject: `Logger: Unable to capture payment for payment Id: ${razorpay_payment_id} on payment.tsx line:43`,
              body: error,
            });

            return error;
          }
        },
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
      // rzp1.on('payment.failed', (response: any) => (result = response))
      // rzp1.on('payment.success', (res: any) => (result = res))
      rzp1.open();
    } else {
      resData(res);
    }
  } catch (e) {
    resData({ data: { error: true, message: "Unable to create order." } });
    sendEmail({
      subject: `Logger: Unable to create order for receipt id: ${receipt} on payment.tsx line:71`,
      body: e,
    });

    return {
      error: true,
      errorData: e,
      message: "Unable to create order",
    };
  }
};

export const AmcUpgradeRazorPay = async ({
  amount,
  receipt,
  amcId,
  customerAmc,
  resData,
}: any) => {
  const url = `${config.baseUrl}/customer/create_amc_order`;
  const data = {
    amc_id: amcId,
    receipt_id: receipt,
  };

  try {
    const res = await postAuthorized(url, data);
    if (!res?.data?.error) {
      var customerAMCId = res?.data?.id;
      const options = {
        key: `${config.razorPay.keyId}`,
        currency: "INR",
        name: "Pikpart",
        description: "Upgrade AMC Payment",
        image: pikpart,
        order_id: res?.data?.order?.id,
        handler: async (response: any) => {
          const { razorpay_payment_id } = response;
          try {
            const urlC = `${config.baseUrl}/customer/capture_upgrade_amc_payment`;
            const dataC = {
              paymentId: razorpay_payment_id,
              id: customerAMCId,
              currentCustomerAmcId: customerAmc.id,
            };

            const res = await postAuthorized(urlC, dataC);

            resData(res);
          } catch (error) {
            resData({
              data: { error: true, message: "Unable to capture this payment" },
            });
            sendEmail({
              subject: `Logger: Unable to capture payment for payment Id: ${razorpay_payment_id} on payment.tsx line:43`,
              body: error,
            });

            return error;
          }
        },
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
      rzp1.on("payment.failed", (response: any) =>
        console.log(response, "abv")
      );
      rzp1.on("payment.success", (res: any) => console.log(res, "abv"));
      rzp1.open();
    } else {
      resData(res);
    }
  } catch (e) {
    resData({ data: { error: true, message: "Unable to create order." } });
    sendEmail({
      subject: `Logger: Unable to create order for receipt id: ${receipt} on payment.tsx line:71`,
      body: e,
    });

    return {
      error: true,
      errorData: e,
      message: "Unable to create order",
    };
  }
};
