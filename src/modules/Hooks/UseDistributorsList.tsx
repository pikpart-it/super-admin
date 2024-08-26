import { useState, useEffect } from "react";
import { config } from "../../config/config";
import { getAuthorized } from "../../services";

type Distributor = {
  id: number;
  name: string;
  tierType: string;
  resourceType: string;
  phoneNumber: string;
};
export const UseDistributorsList = (delay?: number) => {
  const [distributorsList, setDistributorsList] = useState<Distributor[]>([]);

  const getDistributorsList = async () => {
    let url = `${config.baseUrl}/admin/product-distributor?resource_type=ProductDistributor`;

    try {
      const { data } = await getAuthorized(url);

      if (data?.data?.length) {
        const list = data?.data?.map((i) => ({
          ...i?.productDistributor,
          address: { ...i?.addresses[0]! },
        }));
        setDistributorsList(list);
      }
    } catch (error) {}
  };

  useEffect(() => {
    setTimeout(() => {
      getDistributorsList();
    }, delay);
  }, []);

  return distributorsList;
};
