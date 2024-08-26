import { useState, useEffect } from "react";
import { config } from "../../config/config";
import { getAuthorized } from "../../services";

type Garage = {
  id: number;
  name: string;
  tierType: string;
  resourceType: string;
  phoneNumber: string;
};
export const UseRetailersList = (delay?: number) => {
  const [retailersList, setRetailersList] = useState<Garage[]>([]);

  const getRetailersList = async () => {
    let url = `${config.baseUrl}/admin/product-distributor?resource_type=Retailer`;

    try {
      const { data } = await getAuthorized(url);

      if (data?.data?.length) setRetailersList(data?.data);
    } catch (error) {}
  };

  useEffect(() => {
    setTimeout(() => {
      getRetailersList();
    }, delay);
  }, []);

  return retailersList;
};
