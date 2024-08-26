import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import moment from "moment";
import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
// import { isDistributorOrCenter } from "../../../../utility/func";
import CustomDateRangeModal from "../component/CustomDateRangeModal";
import HeaderButtons from "../component/HeaderButtons";
import OrderDateRange from "../component/OrderDateRange";
import OrdersListingComponent from "../component/OrderListingComponent";
import TablePreferencesModal from "../component/TablePreferencesModal";
import {
  customerOption,
  dateRangeOptions,
  orderDateOptions,
  orderDetailsOptions,
  orderSortOptions,
  ordersPerPageOptions,
  productNameOption,
} from "./OrdersHelper";
import FuzzySearch from "fuzzy-search";
import _ from "lodash";
import styled from "styled-components";
import { FlexDiv } from "../../../../style/styled";
import { config } from "../../../../config/config";
import { isDistributorOrCenter } from "../../../../utility/func";
import { getAuthorized, putAuthorized } from "../../../../services";
import ModalConfirmation from "../component/ModalConfirmation";
import { Loader } from "../../../../components/Loader";
import MsgCard from "../../../../components/MsgCard";

export const Div = styled.div`
  font-weight: bold;
`;
const TablePreferanceButton = styled.button`
  border-radius: 11px;
  width: 150px;
  padding: 10px;
  font-size: 14px;
  font-weight: bolder;
  max-height: 35px;
  border: none;
  cursor: pointer;
`;

export const ManageOrderBox = styled.div`
  width: 95%;
  margin: auto;
  margin-top: 8px;
  border-radius: 8px;
  border: 2px solid #7d7d7d;
  background: #f8f8f8;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px;
`;

export const BigHeader = styled.div`
  font-size: 1.2rem;
  border-radius: 8px;
  background: #f8f8f8;
  color: #ff5c00;
  font-size: 27px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Select = styled.select<{ field: string }>`
  width: ${(props) =>
    props.field === "dateRange" || props.field === "sort" ? "170px" : "70px"};
  height: ${(props) => (props.field === "perPage" ? "30px" : "34px")};
  background: #eeeeee;
  margin: ${(props) => (props.field === "sort" ? "0px" : "0px 10px")};
  border-radius: 8px;
  border: none;
  padding: 5px;
`;

function B2BOrder({ history }: { history?: number }) {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = React.useState({
    error: false,
    msg: "",
    isLoading: false,
  });
  const [orderDateOptionsArray, setOrderDateOptionsArray] =
    React.useState(orderDateOptions);
  const [orderDetailsOptionsArray, setOrderDetailsOptionsArray] =
    React.useState(orderDetailsOptions);
  const [orderProductNameArray, setOrderProductNameArray] =
    React.useState(productNameOption);
  const [orderCustomerOptionsArray, setOrderCustomerOptionsArray] =
    React.useState(customerOption);

  const [filterdOrderDateOptionsArray, setFilterdOrderDateOptionsArray] =
    React.useState<Array<any>>();
  const [filterdOrderDetailsOptionsArray, setFilterdOrderDetailsOptionsArray] =
    React.useState<Array<any>>();
  const [filterdProductNameOptionsArray, setFilterdProductNameOptionsArray] =
    React.useState<Array<any>>();
  const [filterdCustomerOptionsArray, setFilterdCustomerOptionsArray] =
    React.useState<Array<any>>();
  const [customDateRangeSelection, setCustomDateRangeSelection] =
    React.useState([
      {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      },
    ]);
  const [cancelOrderModal, setCancelOrderModal] = React.useState<any>({
    show: false,
    type: "confirm",
    id: "",
  });
  const [stage, setStage] = React.useState("pending");
  const [preferencesModal, setPreferencesModal] = React.useState(false);
  const [customDateRangeModal, setCustomDateRangeModal] = React.useState({
    open: false,
    for: "",
  });
  const [allOptionsChecked, setAllOptionsChecked] = React.useState(false);
  const [dates, setDates] = React.useState<any>({
    from_date: "",
    to_date: "",
  });
  const [ordersPerPage, setOrdersPerPage] = React.useState(50);
  const [page, setPage] = React.useState(1);
  const [ordersList, setOrdersList] = React.useState<Array<any>>([]);
  const [search, setSearch] = React.useState<any>("");

  const onPreferenceModalChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: number
  ) => {
    if (event.target.name === "orderDate") {
      const newArray = [...orderDateOptionsArray];
      newArray[key] = {
        ...newArray[key],
        checked: event.target.checked,
      };
      setOrderDateOptionsArray(newArray);
    } else if (event.target.name === "orderDetails") {
      const newArray = [...orderDetailsOptionsArray];
      newArray[key] = {
        ...newArray[key],
        checked: event.target.checked,
      };
      setOrderDetailsOptionsArray(newArray);
    } else if (event.target.name === "productName") {
      const newArray = [...orderProductNameArray];
      newArray[key] = {
        ...newArray[key],
        checked: event.target.checked,
      };
      setOrderProductNameArray(newArray);
    } else if (event.target.name === "customerOptions") {
      const newArray = [...orderCustomerOptionsArray];
      newArray[key] = {
        ...newArray[key],
        checked: event.target.checked,
      };
      setOrderCustomerOptionsArray(newArray);
    }
  };
  const filterArrays = (arr: Array<any>) => {
    return arr.filter((item) => item.checked === true);
  };
  let sortData = _.reverse(_.sortBy(ordersList, ["orderTime"]));
  const searchDate = new FuzzySearch(sortData, [
    "orderId",
    "orderNo",
    "productCode",
    "name",
    "trackingNumber",
    "salesChannel",
  ]);
  const ordersListFromSearch = searchDate.search(search);

  React.useEffect(() => {
    setFilterdOrderDetailsOptionsArray(filterArrays(orderDetailsOptionsArray));
  }, [orderDetailsOptionsArray]);
  React.useEffect(() => {
    setFilterdOrderDateOptionsArray(filterArrays(orderDateOptionsArray));
  }, [orderDateOptionsArray]);
  React.useEffect(() => {
    setFilterdProductNameOptionsArray(filterArrays(orderProductNameArray));
  }, [orderProductNameArray]);
  React.useEffect(() => {
    setFilterdCustomerOptionsArray(filterArrays(orderCustomerOptionsArray));
  }, [orderCustomerOptionsArray]);

  const getOrders = async () => {
    let type = "B2B";
    setLoading(true);

    let url = `${
      config.baseUrl
    }/${isDistributorOrCenter()}/orders?status=${stage}&type=${type}&id=${
      user?.id
    }&resource_type=${
      user?.resourceType
    }&per_page=${ordersPerPage}&page=${page}`;

    try {
      const res = await getAuthorized(url);
      const mergedData = res?.data?.data.map((item) => {
        return { ...item, ...item?.customer, status: item?.status };
      });
      setOrdersList(mergedData);
      setLoading(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  // function that changes the order status to be moved to the next stage

  const changeOrderStatus = async (id: number, status: string) => {
    setLoader({ ...loader, isLoading: true });
    let url = `${
      config.baseUrl
    }/${isDistributorOrCenter()}/updateOrderStatus?order_id=${id}&status=${status}`;
    try {
      const res = await putAuthorized(url, {});
      setLoader({
        ...loader,
        isLoading: false,
        error: false,
        msg: res?.data?.message,
      });
      setTimeout(() => {
        getOrders();
        setLoader({ ...loader, msg: "" });
      }, 2000);
    } catch (error) {
      setLoader({ ...loader, isLoading: false, error: true, msg: "Failed" });
      setTimeout(() => {
        setLoader({ ...loader, msg: "" });
      }, 3000);
    }
  };

  // function that return the orders based on the selected dates
  const getFilterdOrders = async () => {
    setLoader({ ...loader, isLoading: true });
    let url = `${
      config.baseUrl
    }/${isDistributorOrCenter()}/filteredOrders?status=${stage}&per_page=${ordersPerPage}&page=${page}&from_date=${
      dates?.from_date
    }&to_date=${dates?.to_date}&filter_type=date`;

    try {
      const res = await getAuthorized(url);
      if (res?.data?.data?.length) {
        setLoader({ ...loader, isLoading: false, msg: res?.data?.message });
        setTimeout(() => {
          setOrdersList(res?.data?.data);
          onCustomDateRangeModalClose();
          setLoader({ ...loader, msg: "" });
        }, 2000);
      } else {
        onCustomDateRangeModalClose();
        setLoader({
          ...loader,
          isLoading: false,
          error: true,
          msg: "No Orders Available For Download",
        });
        setTimeout(() => {
          setLoader({ ...loader, msg: "" });
        }, 2000);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const onDateChange = (target) => {
    setDates({ ...dates, [target?.name]: target?.value });
  };

  const onDateRangeSelect = (target) => {
    if (target === "custom") {
      setCustomDateRangeModal({
        ...customDateRangeModal,
        open: true,
        for: "filter",
      });
    } else {
      setDates({
        ...dates,
        from_date: getDateRange(new Date(), target),
        to_date: moment(new Date()).format("L"),
      });
    }
  };

  // Function used to close the date modal and clear the relative states
  const onCustomDateRangeModalClose = () => {
    setCustomDateRangeModal({ ...customDateRangeModal, open: false, for: "" });
    setDates({ ...dates, from_date: "", to_date: "" });
  };

  // custom date range modal selection function
  const onCustomDateRangeChange = (item) => {
    setCustomDateRangeSelection([item.selection]);

    setDates({
      ...dates,
      from_date: moment(item.selection?.startDate).format("L"),
      to_date: moment(item.selection?.endDate).format("L"),
    });
  };
  // function to get the correct date by deducting certin number from today's date
  const getDateRange = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() - days);
    const formatedDate = moment(result).format("L");
    return formatedDate;
  };
  // Table preferance close modal funtion
  const onTablePreferenceModalCancel = () => {
    setPreferencesModal(false);
  };

  // use Effect to get initial list orders
  React.useEffect(() => {
    getOrders();
  }, [stage, ordersPerPage, page]);

  // function that exports orders to csv files
  const exportOrders = (orders) => {
    const workBook = XLSX.utils.book_new();
    const workSheet = XLSX.utils.json_to_sheet(orders);

    XLSX.utils.book_append_sheet(workBook, workSheet, "Orders");

    XLSX.writeFile(workBook, "orders.csv");
  };

  // function that gives the orders based on the selected dates
  const downloadOrders = async () => {
    setLoader({ ...loader, isLoading: true });

    let url = `${
      config.baseUrl
    }/${isDistributorOrCenter()}/filteredRackOrders?status=${stage}&from_date=${
      dates?.from_date
    }&to_date=${dates?.to_date}&resource_type=${user.resourceType}&id=${
      user.id
    }`;

    try {
      const res = await getAuthorized(url);
      if (res?.data?.data?.length) {
        setLoader({ ...loader, isLoading: false, msg: res?.data?.message });
        setTimeout(() => {
          exportOrders(res?.data?.data);
          onCustomDateRangeModalClose();
          setLoader({ ...loader, msg: "" });
        }, 2000);
      } else {
        onCustomDateRangeModalClose();
        setLoader({
          ...loader,
          isLoading: false,
          msg: "No Orders Available For Download",
        });
        setTimeout(() => {
          setLoader({ ...loader, msg: "" });
        }, 2000);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const moveToPickup = async (orderId) => {
    setLoading(true);
    let url = `${
      config.baseUrl
    }/${isDistributorOrCenter()}/updateOrderStatus?status=wip&order_id=${orderId}`;
    try {
      const res = await putAuthorized(url, {});
      getOrders();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <div style={{ marginTop: "1rem" }}>
        <HeaderButtons stage={stage} setStage={setStage} history={history} />
      </div>

      
      {/* <FlexDiv
        justifyContentSpaceBetween
        style={{ width: "95%", margin: "auto", marginTop: "10px" }}
      >
        <FlexDiv>
          <Button
            title="download"
            onClick={() =>
              setCustomDateRangeModal({
                ...customDateRangeModal,
                open: true,
                for: "download",
              })
            }
            variant="outlined"
            style={{
              width: "180px",
              textTransform: "none",
              fontSize: "12px",
            }}
            endIcon={<CloudDownloadIcon style={{ marginTop: "-2px" }} />}
          >
            Download Orders
          </Button>
          <Select
            field="dateRange"
            onChange={({ target }: any) => onDateRangeSelect(target?.value)}
          >
            {dateRangeOptions?.map((item, index: number) => (
              <option key={index} value={item?.value}>
                {item?.name}
              </option>
            ))}
          </Select>
          <Select field="sort">
            {orderSortOptions?.map((item, index: number) => (
              <option key={index}>{item}</option>
            ))}
          </Select>
          <Select
            field="perPage"
            value={ordersPerPage}
            onChange={({ target }: any) => setOrdersPerPage(target?.value)}
          >
            {ordersPerPageOptions.map((item, index: number) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </Select>
          <TablePreferanceButton onClick={() => setPreferencesModal(true)}>
            Set Table Prefrences
          </TablePreferanceButton>
        </FlexDiv>
      </FlexDiv> */}

      <FlexDiv>
        <OrderDateRange
          ordersLength={ordersList?.length}
          dates={dates}
          onDateChange={onDateChange}
          getOrders={getOrders}
        />
      </FlexDiv>
      <FlexDiv justifyContentCenter>
        <OrdersListingComponent
          ordersList={ordersListFromSearch}
          stage={stage}
          history={history}
          cancelOrderModal={cancelOrderModal}
          setCancelOrderModal={setCancelOrderModal}
          filterdOrderDateOptionsArray={filterdOrderDateOptionsArray}
          filterdOrderDetailsOptionsArray={filterdOrderDetailsOptionsArray}
          filterdProductNameOptionsArray={filterdProductNameOptionsArray}
          filterdCustomerOptionsArray={filterdCustomerOptionsArray}
          changeOrderStatus={changeOrderStatus}
          moveToPickup={moveToPickup}
          loading={loading}
          orderType={"B2B"}
        />
      </FlexDiv>
      <CustomDateRangeModal
        submit={
          customDateRangeModal?.for === "download"
            ? downloadOrders
            : getFilterdOrders
        }
        {...{
          customDateRangeModal,
          onCustomDateRangeModalClose,
          customDateRangeSelection,
          onCustomDateRangeChange,
        }}
      />
      <TablePreferencesModal
        {...{
          preferencesModal,
          setPreferencesModal,
          onTablePreferenceModalCancel,
          allOptionsChecked,
          setAllOptionsChecked,
          onPreferenceModalChange,
          orderDateOptionsArray,
          orderDetailsOptionsArray,
          orderProductNameArray,
          orderCustomerOptionsArray,
        }}
      />
      <ModalConfirmation
        toggleModal={cancelOrderModal.show}
        setToggleModal={() =>
          setCancelOrderModal({ ...cancelOrderModal, show: false })
        }
        setModal={setCancelOrderModal}
        modal={cancelOrderModal}
        onConfirm={(item) => changeOrderStatus(cancelOrderModal.id, "declined")}
        onCancel={() =>
          setCancelOrderModal({ ...cancelOrderModal, show: false })
        }
        header="Cancel Order"
        body="Are you sure you want to cancel this order?"
      />
      <Loader variant="m" isLoading={loader.isLoading} />
      <MsgCard
        msg={loader?.msg}
        variant={loader?.error ? "danger" : "success"}
        ghost
        card
      />
    </React.Fragment>
  );
}

export default B2BOrder;
