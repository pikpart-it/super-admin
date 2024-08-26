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
export const UseServiceCenterList = (delay?: number) => {
  const [serviceCentersList, setServiceCentersList] = useState<Garage[]>([]);

  const getServiceCentersList = async () => {
    let url = `${config.baseUrl}/admin/service-centres`;

    try {
      const { data } = await getAuthorized(url);

      if (data?.data?.length) setServiceCentersList(data?.data);
    } catch (error) {}
  };

  useEffect(() => {
    setTimeout(() => {
      getServiceCentersList();
    }, delay);
  }, []);

  return serviceCentersList;
};
