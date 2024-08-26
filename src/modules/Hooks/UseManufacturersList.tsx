import { useState, useEffect } from "react";
import { config } from "../../config/config";
import { getAuthorized } from "../../services";

type Manufacturer = {
  id: number;
  name: string;
  tierType: string;
  resourceType: string;
  phoneNumber: string;
};
export const UseManufacturersList = (delay?: number) => {
  const [manufacturersList, setManufacturersList] = useState<Manufacturer[]>(
    []
  );

  const getManufacturersList = async () => {
    let url = `${config.baseUrl}/admin/manufacturer?resource_type=Manufacturer`;

    try {
      const { data } = await getAuthorized(url);

      if (data?.data?.length) setManufacturersList(data?.data);
    } catch (error) {}
  };

  useEffect(() => {
    setTimeout(() => {
      getManufacturersList();
    }, delay);
  }, []);

  return manufacturersList;
};
