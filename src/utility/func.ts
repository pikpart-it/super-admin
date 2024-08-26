import { config } from "../config/config";
import { userRoles } from "../config/constants/userRoles";
import { sendEmail } from "../logger/sendMail";
import { getAuthorized } from "../services";

export function isAuthenticated() {
  //return !!localStorage.getItem("AuthToken");
  return true;
}
export const isDistributorOrCenter = (): string => {
  const flag = "productManufacturer";

  return flag;
};
export function validateEmail(email: string) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
export function validatePrice(number: number) {
  const res = /^[1-9][0-9]*(\.[0-9]{0,2})?$/;
  return res.test(String(number));
}
export function validateQuantity(number: number) {
  const res = /^([1-9][0-9]*)$/;
  return res.test(String(number));
}
export function validateVehicleNumber(number: any) {
  const res = /^[a-z,A-Z]{2}\d{2}[a-z,A-Z]{1,2}\d{4}$/;
  return res.test(String(number));
}
export function validatingPrice(number: number) {
  const d = number.toString();
  if (d.includes(".")) {
    const c = d.split(".");
    return c[1].length > 2;
  } else {
    return number <= 0;
  }
}
export function validatingQuantity(number: number) {
  const f = number.toString();
  if (f.includes(".")) {
    return f.includes(".");
  } else {
    return number <= 0;
  }
}

export const userRole = () => {
  let resourceType = JSON.parse(
    localStorage.getItem("user") || "{}"
  )?.resourceType;

  if (resourceType === "ProductManufacturer") {
    return userRoles.ProductManufacturer;
  } else if (resourceType === "MasterSeller") {
    return userRoles.MasterSeller;
  } else if (resourceType === "SuperAdmin") {
    return userRoles.SuperAdmin;
  } else {
    return userRoles.guest;
  }
};

export const roles: any = [
  {
    id: 4,
    isActive: true,
    roleName: "GUEST",
    rolePriority: 1,
    allowedPages: [],
  },
  {
    id: 5,
    isActive: true,
    roleName: "CUSTOMER",
    rolePriority: 2,
    allowedPages: [],
  },
];

export const dateIncrement = (date: any, days: number) => {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const vehicleSearchLoad = (inputValue: any, callback: any) => {
  let url = `${config.baseUrl}/utilities/search-vehicle?search=${inputValue}`;
  if (inputValue.length >= 3) {
    getAuthorized(url)
      .then((res: any) => {
        if (res?.data?.data) {
          callback(
            res?.data?.data.map((i: any) => {
              return i;
            })
          );
        } else {
          callback([]);
        }
      })
      .catch((e) => {
        sendEmail({
          subject: `Logger: Unable to get products by search: ${inputValue} on func.tsx line:84`,
          body: e,
        });
        callback([]);
      });
  } else {
    callback([]);
  }
};

export const productSearchLoadOption = (
  inputValue: any,
  callback: any,
  serviceCenterId: any = null,
  flag: any = null,
  vehicleId: any = null
) => {
  let url =
    flag === "Admin"
      ? `${config.baseUrl}/utilities/search-vehicle-master-products?search=${inputValue}&vehicle_id=${vehicleId}`
      : flag === "distributor"
      ? `${
          config.baseUrl
        }/utilities/search-distributor-products?productDistributorId=${
          serviceCenterId ? `${serviceCenterId}` : ""
        }${inputValue ? `&search=${inputValue.toUpperCase()}` : ""}`
      : flag === "manufacturer"
      ? `${
          config.baseUrl
        }/utilities/search-manufacturer-products?manufacturerId=${
          serviceCenterId ? `${serviceCenterId}` : ""
        }${inputValue ? `&search=${inputValue.toUpperCase()}` : ""}`
      : `${config.baseUrl}/utilities/search-center-products?centreId=${
          serviceCenterId ? `${serviceCenterId}` : ""
        }${inputValue ? `&search=${inputValue.toUpperCase()}` : ""}`;
  if (inputValue.length >= 3) {
    getAuthorized(url)
      .then((res: any) => {
        if (res?.data?.data) {
          callback(
            res?.data?.data.map((i: any) => {
              return i;
            })
          );
        } else {
          callback([]);
        }
      })
      .catch((e) => {
        sendEmail({
          subject: `Logger: Unable to get products by search: ${inputValue} on func.tsx line:84`,
          body: e,
        });
        callback([]);
      });
  } else {
    callback([]);
  }
};

export const distributorProductSearchLoadOption = (
  inputValue: any,
  callback: any
) => {
  let url = `${config.baseUrl}/utilities/search-all-master-products?search=${inputValue}`;

  if (inputValue.length >= 3) {
    getAuthorized(url)
      .then((res: any) => {
        if (res?.data?.data) {
          callback(
            res?.data?.data.map((i: any) => {
              return i;
            })
          );
        } else {
          callback([]);
        }
      })
      .catch((e) => {
        sendEmail({
          subject: `Logger: Unable to get products by search: ${inputValue} on func.tsx line:84`,
          body: e,
        });
        callback([]);
      });
  } else {
    callback([]);
  }
};

export const vehicleSearchLoadOption = (inputValue: any, callback: any) => {
  let url = `${config.baseUrl}/utilities/search-vehicle?search=${inputValue}`;
  if (inputValue.length >= 2) {
    getAuthorized(url)
      .then((res: any) => {
        if (res?.data?.data) {
          callback(
            res?.data?.data.map((i: any) => {
              return i;
            })
          );
        } else {
          callback([]);
        }
      })
      .catch((e) => {
        sendEmail({
          subject: `Logger: Unable to get Vehicles by search: ${inputValue} on func.tsx line:84`,
          body: e,
        });
        callback([]);
      });
  } else {
    callback([]);
  }
};

export const serviceProductSearchLoadOption = (
  inputValue: any,
  callback: any,
  serviceCenterId: any = null
) => {
  let url = `${config.baseUrl}/service-centre/searchProductsServices/${
    serviceCenterId ? `${serviceCenterId}` : ""
  }${inputValue ? `?search=${inputValue.toUpperCase()}` : ""}`;
  if (inputValue.length >= 3) {
    getAuthorized(url)
      .then((res: any) => {
        if (res?.data?.data) {
          callback(
            res?.data?.data.map((i: any) => {
              return i;
            })
          );
        } else {
          callback([]);
        }
      })
      .catch((e) => {
        sendEmail({
          subject: `Logger: Unable to get products by search: ${inputValue} on func.tsx line:84`,
          body: e,
        });
        callback([]);
      });
  } else {
    callback([]);
  }
};

export const serviceSearchLoadOption = (
  inputValue: any,
  callback: any,
  cityType?: any
) => {
  let url = `${config.baseUrl}/admin/services/search-services?${
    inputValue ? `search=${inputValue}` : ""
  }&city_type=${cityType}`;
  if (inputValue.length >= 3) {
    getAuthorized(url)
      .then((res: any) => {
        if (res?.data?.data) {
          callback(
            [...res?.data?.data, { name: inputValue, is_active: true }].map(
              (i: any) => {
                return i;
              }
            )
          );
        } else {
          callback([{ name: inputValue, is_active: true }]);
        }
      })
      .catch((e) => {
        sendEmail({
          subject: `Logger: Unable to get products by search: ${inputValue} on func.tsx line:84`,
          body: e,
        });
        callback([]);
      });
  } else {
    callback([]);
  }
};

export const getLang = () => {
  let la = localStorage.getItem("lang");
  if (la) {
    return la;
  } else {
    return "eng";
  }
};

export const camelToNormal = (text: any) => {
  let result = text.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
};

export function number2text(value) {
  var fraction = Math.round(frac(value) * 100);
  var f_text = "";

  if (fraction > 0) {
    f_text = "AND " + convert_number(fraction) + " PAISE";
  }

  return " INR " + convert_number(value) + " RUPEE " + f_text + " ONLY";
}

function frac(f) {
  return f % 1;
}

function convert_number(number) {
  if (number < 0 || number > 999999999) {
    return "NUMBER OUT OF RANGE!";
  }
  var Gn = Math.floor(number / 10000000); /* Crore */
  number -= Gn * 10000000;
  var kn = Math.floor(number / 100000); /* lakhs */
  number -= kn * 100000;
  var Hn = Math.floor(number / 1000); /* thousand */
  number -= Hn * 1000;
  var Dn = Math.floor(number / 100); /* Tens (deca) */
  number = number % 100; /* Ones */
  var tn = Math.floor(number / 10);
  var one = Math.floor(number % 10);
  var res = "";

  if (Gn > 0) {
    res += convert_number(Gn) + " CRORE";
  }
  if (kn > 0) {
    res += (res == "" ? "" : " ") + convert_number(kn) + " LAKH";
  }
  if (Hn > 0) {
    res += (res == "" ? "" : " ") + convert_number(Hn) + " THOUSAND";
  }

  if (Dn) {
    res += (res == "" ? "" : " ") + convert_number(Dn) + " HUNDRED";
  }

  var ones = Array(
    "",
    "ONE",
    "TWO",
    "THREE",
    "FOUR",
    "FIVE",
    "SIX",
    "SEVEN",
    "EIGHT",
    "NINE",
    "TEN",
    "ELEVEN",
    "TWELVE",
    "THIRTEEN",
    "FOURTEEN",
    "FIFTEEN",
    "SIXTEEN",
    "SEVENTEEN",
    "EIGHTEEN",
    "NINETEEN"
  );
  var tens = Array(
    "",
    "",
    "TWENTY",
    "THIRTY",
    "FOURTY",
    "FIFTY",
    "SIXTY",
    "SEVENTY",
    "EIGHTY",
    "NINETY"
  );

  if (tn > 0 || one > 0) {
    if (!(res == "")) {
      res += " AND ";
    }
    if (tn < 2) {
      res += ones[tn * 10 + one];
    } else {
      res += tens[tn];
      if (one > 0) {
        res += "-" + ones[one];
      }
    }
  }

  if (res == "") {
    res = "zero";
  }
  return res;
}

export const giveFinalPrices = (sellPrice, discountPercent, taxRate) => {
  let discountAmount = (sellPrice * (discountPercent || 0)) / 100 || 0;
  let discountedPrice = sellPrice - discountAmount;
  let taxAmount =
    discountedPrice - (discountedPrice * 100) / ((taxRate || 0) + 100);
  let productRate = discountedPrice - taxAmount;
  return { discountAmount, taxAmount, discountedPrice, productRate };
};
