import React, { useEffect, useState } from "react";
import { config } from "../../../../config/config";
import { getAuthorized, postAuthorized } from "../../../../services";
import { sendEmail } from "../../../../logger/sendMail";
import { RoutesPath } from "../../../../config/routes.config";
import { Loader } from "../../../../components/Loader";
import MsgCard from "../../../../components/MsgCard";
import AddBUHOC from "../component/AddBUHOC";
const serviceCenterData: any = {
  name: "",
  distributor_code: "",
  center_code: "",
  gst: "",
  email: "",
  description: "",
  associate_type: "",
  associated_id: [],
  day_of_week: "01234567",
  opening_hour: "9",
  closing_hour: "18",
  bank_name: "",
  is_super_stockist: false,
  branch_name: "",
  account_number: "",
  ifsc_code: "",
  business_name: "",
  brand_name: "",
  phone_number: "",
  landline: "",
  tier_type: "",
  serve_vehicle_type: "",
  ownership_type: "",
  account_holder_name: "",
  pan: "",
  upi_id: "",
  is_default: true,
  is_active: true,
  // business_associations: {
  //   resource_id: '',
  //   resource_type: '',
  // },
  address: {
    address_line_1: "",
    address_line_2: "",
    country: "",
    landmark: "",
    state: "",
    city: "",
    district: "",
    pincode: "",
    latitude: null,
    longitude: null,
  },
  bigBanner: {
    imageType: "",
  },
};

const error = {
  name: "",
  distributor_code: "",
  email: "",
  day_of_week: "01234567",
  opening_hour: "",
  description: "",
  bank_name: "",
  branch_name: "",
  account_number: "",
  ifsc_code: "",
  closing_hour: "",
  business_name: "",
  phone_number: "",
  address: {
    address_line_1: "",
    address_line_2: "",
    landmark: "",
    state: "",
    city: "",
    district: "",
    pincode: "",
  },
  bigBanner: {
    imageType: "",
  },
};
const AddBusinessUnit = ({ history }) => {
  const [serviceCenter, setServiceCenter] = useState([
    { serviceCenterData, error },
  ]);
  const [distributorsList, setDistributorsList] = useState<any>([]);
  const [serviceCentersList, setServiceCentersList] = useState<any>([]);
  const [manufacturers, setManufacturers] = useState([]);
  const [selectedAssociates, setSelectedAssociates] = useState({
    distributors: [],
    manufacturers: [],
    serviceCenters: [],
  });
  const [newLocation, setLocation] = useState(false);
  const [loader, setLoader] = React.useState({
    error: false,
    msg: "",
    isLoading: false,
  });
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [selectedUser, setSelectedUser] = React.useState<any>("");
  const [brandsList, setBrandslist] = React.useState<any>([]);
  const logo = React.useState<any>([{ ...ImageData }]);
  const icon = React.useState<any>([{ ...ImageData }]);
  const bigBanner = React.useState<any>([{ ...ImageData }]);
  const banners = React.useState<any>([{ ...ImageData }]);
  const resetForm = () => setServiceCenter([{ serviceCenterData, error }]);
  const [bannerSelected, setBannerSelected] = useState<any>(null);
  const [brandLogoSelected, setBrandLogoSelected] = useState<any>(null);
  const [brandIconSelected, setBrandIconSelected] = useState<any>(null);
  
  const getBrands = async () => {
    try {
      let url = `${config.baseUrl}/admin/vehicle-Brands?vehicleType=${serviceCenter[0]?.serviceCenterData?.serve_vehicle_type}`;
      const response = await getAuthorized(url);

      if (response?.data?.error) {
        sendEmail({
          subject: `Logger: ${response?.data?.message} on Bike capacity in Recommended parts`,
          body: response,
        });
      } else {
        setBrandslist(response.data.responseResult.result.data);
      }
    } catch (error) {
      sendEmail({
        subject: `Logger: Unable to get Bike capacity in Recommended parts`,
        body: error,
      });
    }
  };
  const onImagesSelect = (target, val?) => {
    let newData = serviceCenter[0];

    if (target?.name === "banners") {
      newData = {
        ...newData,
        serviceCenterData: {
          ...newData.serviceCenterData,
          [target.name]: target?.files,
        },
      };
      setBannerSelected(URL.createObjectURL(target.files[0]));
    } else {
      newData = {
        ...newData,
        serviceCenterData: {
          ...newData.serviceCenterData,
          [target.name]: target?.files[0],
        },
      };
      if (val === "brandlogo") {
        setBrandLogoSelected(URL.createObjectURL(target.files[0]));
      } else if (val === "brandIcon") {
        setBrandIconSelected(URL.createObjectURL(target.files[0]));
      }
    }
    setServiceCenter([newData]);
  };
  const handleBUTypeChange = (
    event: React.SyntheticEvent | null,
    newValue: Array<string> | string | null
  ) => {
    setSelectedUser(newValue);
  };
  const handleNameChange = (
    event: React.SyntheticEvent | null,
    newValue: Array<string> | string | null
  ) => {
    setServiceCenter([
      {
        ...serviceCenter[0],
        serviceCenterData: {
          ...serviceCenter[0].serviceCenterData,
          address: {
            ...serviceCenter[0].serviceCenterData.address,
            state: newValue,
          },
        },
      },
    ]);
  };
  const handleCountryChange = (
    event: React.SyntheticEvent | null,
    newValue: Array<string> | string | null
  ) => {
    setServiceCenter([
      {
        ...serviceCenter[0],
        serviceCenterData: {
          ...serviceCenter[0].serviceCenterData,
          address: {
            ...serviceCenter[0].serviceCenterData.address,
            country: newValue,
          },
        },
      },
    ]);
  };
  const handleServeVehicleTypeChange = (
    event: React.SyntheticEvent | null,
    newValue: Array<string> | string | null
  ) => {
    setServiceCenter([
      {
        ...serviceCenter[0],
        serviceCenterData: {
          ...serviceCenter[0].serviceCenterData,
          serve_vehicle_type: newValue,
        },
      },
    ]);
  };
  const handleBrandChange = (
    event: React.SyntheticEvent | null,
    newValue: Array<string> | string | null
  ) => {
    setServiceCenter([
      {
        ...serviceCenter[0],
        serviceCenterData: {
          ...serviceCenter[0].serviceCenterData,
          brand_name: newValue,
        },
      },
    ]);
  };
  const handleTierChange = (
    event: React.SyntheticEvent | null,
    newValue: Array<string> | string | null
  ) => {
    setServiceCenter([
      {
        ...serviceCenter[0],
        serviceCenterData: {
          ...serviceCenter[0].serviceCenterData,
          tier_type: newValue,
        },
      },
    ]);
  };
  const handleOwnershipChange = (
    event: React.SyntheticEvent | null,
    newValue: Array<string> | string | null
  ) => {
    setServiceCenter([
      {
        ...serviceCenter[0],
        serviceCenterData: {
          ...serviceCenter[0].serviceCenterData,
          ownership_type: newValue,
        },
      },
    ]);
  };
  const handleAssociateType = (
    event: React.SyntheticEvent | null,
    newValue: Array<string> | string | null
  ) => {
    setServiceCenter([
      {
        ...serviceCenter[0],
        serviceCenterData: {
          ...serviceCenter[0].serviceCenterData,
          associate_type: newValue,
        },
      },
    ]);
  };
  const onChange = (target: any, type: any) => {
    let newData = serviceCenter[0];
    newData =
      target.name === "serve_vehicle_type" ||
      target.name === "ownership_type" ||
      target.name === "brand_name"
        ? {
            ...newData,
            serviceCenterData: {
              ...newData.serviceCenterData,
              [target.name]: target.value.name,
            },
          }
        : target?.name === "is_super_stockist"
        ? {
            ...newData,
            serviceCenterData: {
              ...newData.serviceCenterData,
              [target.name]: target?.checked,
            },
          }
        : target.name === "tier_type"
        ? {
            ...newData,
            serviceCenterData: {
              ...newData.serviceCenterData,
              [target.name]: target.value?.value,
            },
          }
        : type === "data"
        ? {
            ...newData,
            serviceCenterData: {
              ...newData.serviceCenterData,
              [target.name]: target.value,
            },
          }
        : type === "bigBanner" && target.name === "imageType"
        ? {
            ...newData,
            serviceCenterData: {
              ...newData.serviceCenterData,
              bigBanner: {
                [target.name]: target.value.name,
              },
            },
          }
        : (type === "address" && target.name === "state") ||
          target.name === "country"
        ? {
            ...newData,
            serviceCenterData: {
              ...newData.serviceCenterData,
              address: {
                ...newData.serviceCenterData.address,
                [target.name]: target.value.label || target?.value?.name,
              },
            },
          }
        : {
            ...newData,
            serviceCenterData: {
              ...newData.serviceCenterData,
              address: {
                ...newData.serviceCenterData.address,
                [target.name]: target.value,
              },
            },
          };
    setServiceCenter([newData]);
  };
  const handleIsSuperStockIst = (event: any) => {
    setServiceCenter([
      {
        ...serviceCenter[0],
        serviceCenterData: {
          ...serviceCenter[0].serviceCenterData,
          is_super_stockist: event?.target?.checked,
        },
      },
    ]);
  };
  const prepareAssociates = () => {
    const { distributors, manufacturers, serviceCenters } = selectedAssociates;
    let allData = [...distributors, ...manufacturers, ...serviceCenters];

    return allData?.map((i: any) => ({
      resourceType: i?.resourceType,
      resourceId: i?.id,
    }));
  };
  const goToNewManufacturerDashboard = () => {
    resetForm();
    history.push(RoutesPath.Dashboard);
  };
  const onSubmit = async () => {
    let newData1 = serviceCenter[0].serviceCenterData;
    if (
      newData1.name === "" ||
      newData1.gst === "" ||
      newData1.pan === "" ||
      newData1.upi_id === "" ||
      newData1.account_holder_name === "" ||
      newData1.email === "" ||
      newData1.description === "" ||
      newData1.business_name === "" ||
      newData1.phone_number === "" ||
      newData1.tier_type === "" ||
      newData1.serve_vehicle_type === "" ||
      newData1.ownership_type === "" ||
      newData1.address.country === "" ||
      newData1.address.address_line_1 === "" ||
      newData1.address.address_line_2 === "" ||
      newData1.address.landmark === "" ||
      newData1.address.state === "" ||
      newData1.address.city === "" ||
      newData1.address.pincode === "" ||
      newData1.address.latitude === null ||
      newData1.address.longitude === null
    ) {
      alert("Complete The Form!!");
    } else {
      setLoader({ ...loader, isLoading: true });

      let resourceType;
      if (selectedUser?.id === 1) {
        resourceType = "ProductDistributor";
      } else if (selectedUser?.id === 4) {
        resourceType = "BusinessCustomer";
      } else if (selectedUser?.id === 5) {
        resourceType = "Dealer";
      } else if (selectedUser?.id === 2) {
        resourceType = "Manufacturer";
      } else if (selectedUser?.id === 3) {
        resourceType = "OEM";
      } else {
        resourceType = "ServiceCentre";
      }
      const buPayload = {
        login_id: user?.id,
        login_type: user?.resourceType,
        phone_number: serviceCenter[0].serviceCenterData.phone_number,
        landline: serviceCenter[0]?.serviceCenterData?.landline,
        name: serviceCenter[0]?.serviceCenterData?.name,
        bu_code:
          serviceCenter[0]?.serviceCenterData?.distributor_code ||
          serviceCenter[0]?.serviceCenterData?.center_code,
        gst: serviceCenter[0]?.serviceCenterData?.gst,
        email: serviceCenter[0]?.serviceCenterData?.email,
        business_name: serviceCenter[0]?.serviceCenterData?.business_name,
        resource_type: resourceType,
        tier_type: serviceCenter[0]?.serviceCenterData?.tier_type,
        serve_vehicle_type:
          serviceCenter[0]?.serviceCenterData?.serve_vehicle_type,
        ownership_type: serviceCenter[0]?.serviceCenterData?.ownership_type,
        description: serviceCenter[0]?.serviceCenterData?.description,
        account_number: serviceCenter[0]?.serviceCenterData?.account_number,
        ifsc_code: serviceCenter[0]?.serviceCenterData?.ifsc_code,
        bank_name: serviceCenter[0]?.serviceCenterData?.bank_name,
        branch_name: serviceCenter[0]?.serviceCenterData?.branch_name,
        //is_super_stockist: Implementation Remaining,
        business_associations: JSON.stringify(prepareAssociates()),
        account_holder_name:
          serviceCenter[0]?.serviceCenterData?.account_holder_name,
        pan_no: serviceCenter[0]?.serviceCenterData?.pan,
        upi_id: serviceCenter[0]?.serviceCenterData?.upi_id,
      };
      let newData = {
        ...serviceCenter[0].serviceCenterData,
        resource_type: resourceType,
        associate_type:
          serviceCenter[0].serviceCenterData?.associate_type?.value,
        business_associations: JSON.stringify(prepareAssociates()),
      };
      let payloadData = new FormData();
      let buPayloadData = new FormData();

      payloadData.append("login_id", user?.id);
      payloadData.append("login_type", user?.resourceType);
      if (serviceCenter[0]?.serviceCenterData?.distributor_code) {
        payloadData.append(
          "bu_code",
          serviceCenter[0]?.serviceCenterData?.distributor_code
        );
      } else {
        payloadData.append(
          "bu_code",
          serviceCenter[0]?.serviceCenterData?.center_code
        );
      }
      if (
        selectedUser?.id === 1 ||
        selectedUser?.id === 4 ||
        selectedUser?.id === 5
      ) {
        payloadData.append("productDistributorLogo", newData?.brand_logo);
        payloadData.append("productDistributorIcon", newData?.icon);
        for (let i = 0; i < newData?.banners?.length; i++) {
          payloadData.append("productDistributorBanner", newData?.banners[i]);
        }
      } else if (selectedUser?.id === 2 || selectedUser?.id === 3) {
        payloadData.append("manufacturerLogo", newData?.brand_logo);
        payloadData.append("manufacturerIcon", newData?.icon);
        for (let i = 0; i < newData?.banners?.length; i++) {
          payloadData.append("manufacturerBanner", newData?.banners[i]);
        }
      } else {
        payloadData.append("serviceCentreLogo", newData?.brand_logo);
        payloadData.append("serviceCentreIcon", newData?.icon);
        for (let i = 0; i < newData?.banners?.length; i++) {
          payloadData.append("serviceCentreBanner", newData?.banners[i]);
        }
      }
      for (let [name, value] of Object.entries(newData)) {
        if (name === "address") {
          payloadData.append(`${name}`, JSON.stringify(newData.address));
        } else if (
          name !== "bigBanner" &&
          name !== "banners" &&
          name !== "brand_logo" &&
          name !== "icon" &&
          name !== "associated_id"
        ) {
          payloadData.append(`${name}`, `${value}`);
        }
      }

      let url = `${config.baseUrl}/manufacturer/addBusinessUnit`;
      console.log("check payloadData", payloadData);
      try {
        const response = await postAuthorized(url, payloadData);
        setLoader({ ...loader, error: false, msg: response?.data?.message });
        setTimeout(() => {
          setLoader({ ...loader, msg: "" });
        }, 3000);
      } catch (error) {
        setLoader({
          ...loader,
          isLoading: false,
          error: true,
          msg: "Failed",
        });
        setTimeout(() => {
          setLoader({ ...loader, msg: "" });
        }, 3000);
        sendEmail({
          subject: `Logger:Failed`,
          body: error,
        });
      }
    }
  };
  useEffect(() => {
    if (serviceCenter[0]?.serviceCenterData?.serve_vehicle_type) {
      getBrands();
    }
  }, [serviceCenter[0]?.serviceCenterData?.serve_vehicle_type]);
  return (
    <>
      <AddBUHOC
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        handleBUTypeChange={handleBUTypeChange}
        serviceCenter={serviceCenter}
        handleNameChange={handleNameChange}
        onChange={onChange}
        handleServeVehicleTypeChange={handleServeVehicleTypeChange}
        handleBrandChange={handleBrandChange}
        brandsList={brandsList}
        handleTierChange={handleTierChange}
        handleOwnershipChange={handleOwnershipChange}
        handleAssociateType={handleAssociateType}
        onImagesSelect={onImagesSelect}
        bannerSelected={bannerSelected}
        brandLogoSelected={brandLogoSelected}
        brandIconSelected={brandIconSelected}
        goToNewManufacturerDashboard={goToNewManufacturerDashboard}
        onSubmit={onSubmit}
        handleCountryChange={handleCountryChange}
        handleIsSuperStockIst={handleIsSuperStockIst}
      />
      <Loader variant="m" isLoading={loader.isLoading} />
      <MsgCard
        style={{
          container: {
            width: "20%",
          },
        }}
        msg={loader?.msg}
        variant={loader?.error ? "danger" : "success"}
        ghost
        card
      />
    </>
  );
};

export default AddBusinessUnit;
