import { useEffect, useState } from "react";
import { H2Heading } from "../../../components/styled";
import { FlexDiv } from "../../../style/styled";
import KitBasedScheme, {
  schemeApplicationType,
  schemeShoppingType,
} from "./components/KitBasedScheme";
import {
  SchemeBanner,
  SchemeMainDetails,
  schemeBUList,
  schemeBuyerList,
  schemeTypes,
} from "./components/SchemeMainDetails";
import { config } from "../../../config/config";
import {
  getAuthorized,
  postAuthorized,
  putAuthorized,
} from "../../../services";
import DiscountBasedScheme, {
  discountOptions,
} from "./components/DiscountBasedScheme";
import GiftBasedScheme from "./components/GiftBasedScheme";
import { Button } from "@mui/material";
import { Loader } from "../../../components/Loader";
import MsgCard from "../../../components/MsgCard";

export type giftItems = {
  id: number;
  name: string;
  imageUrl: string;
  amount: string | number;
};

export type category_type = {
  id: number;
  name: string;
  vehicleType: string;
  masterCategoryId?: number;
};
export type selected_products_type = {
  vehicle_brand: { name: string; id: number };
  vehicle: { name: string; id: number };
  id: number;
  name: string;
  productCode: string;
  sellingPrice: number;
  selected_product_min_qty: number;
  discount_percent: number;
};
export type schemeType = {
  scheme_business_unit: { name: string; value: string };
  scheme_business_unit_id: { name: string; id: number };
  scheme_buyer: { name: string; value: string };
  name: string;
  scheme_code: string;
  scheme_summary: string;
  scheme_terms: { terms: string }[];
  vehicle_type: { name: string };
  start_date: any;
  end_date: any;
  shipping_percentage: string;
  scheme_type: { name: string; value: string };
  discount_option: { name: string; value: string };
  expiration_period: string;
  scheme_banner: any;
  scheme_icon: any;
  scheme_description: string;
  kit_total_amount: number;
  discount_percent: number;
  kit_discount_amount: number;
  kit_selling_price: number;
  kit_adjusted_amount: number;
  scheme_shopping_type: { name: string; value: string };
  scheme_Applicable_on: { name: string; value: string };
  scheme_gift_items: giftItems[];
  product_search_key: string;
  selected_product: selected_products_type;
  selectedProductsList: selected_products_type[];
  master_category: category_type;
  selected_categories_list: category_type[];
  sub_category: category_type;
  selected_sub_category_list: category_type[];
  min_shopping_amount: number;
  min_cart_value: number;
};

const schemeObj = {
  scheme_business_unit: { name: "", value: "" },
  scheme_business_unit_id: { name: "", id: 0 },
  scheme_buyer: { name: "", value: "" },
  name: "",
  scheme_code: "",
  scheme_summary: "",
  shipping_percentage: "",
  scheme_terms: [{ terms: "" }],
  vehicle_type: { name: "" },
  start_date: "",
  end_date: "",
  scheme_type: { name: "", value: "" },
  discount_option: { name: "", value: "" },
  expiration_period: "",
  scheme_banner: "",
  scheme_icon: "",
  scheme_description: "",
  kit_total_amount: 0,
  discount_percent: 0,
  kit_discount_amount: 0,
  kit_selling_price: 0,
  kit_adjusted_amount: 0,
  scheme_shopping_type: { name: "", value: "" },
  scheme_Applicable_on: { name: "", value: "" },
  scheme_gift_items: [],
  product_search_key: "",
  selected_product: {
    vehicle_brand: { id: 0, name: "" },
    vehicle: { id: 0, name: "" },
    id: 0,
    name: "",
    productCode: "",
    sellingPrice: 0,
    selected_product_min_qty: 0,
    discount_percent: 0,
  },
  selectedProductsList: [],
  master_category: { id: 0, name: "", vehicleType: "" },
  selected_categories_list: [],
  sub_category: { id: 0, masterCategoryId: 0, name: "", vehicleType: "" },
  selected_sub_category_list: [],
  min_shopping_amount: 0,
  min_cart_value: 0,
};

const AddScheme = ({ history }) => {
  const detailsId = history?.location?.state?.id;
  const edit: boolean = history?.location?.state?.Edit;
  const [scheme, setScheme] = useState<schemeType>(schemeObj);
  const [productsList, setProductsList] = useState<any[]>([]);
  const [vehicleBrandsList, setVehicleBrandsList] = useState<any[]>([]);
  const [vehicleModelsList, setVehicleModelsList] = useState<any[]>([]);
  const [masterCategory, setMasterCategory] = useState<any[]>([]);
  const [subCategory, setSubCategory] = useState<any[]>([]);
  const [giftsList, setGiftsList] = useState<giftItems[]>([]);
  const [loader, setLoader] = useState({
    error: false,
    msg: "",
    isLoading: false,
  });

  const getBrand = async () => {
    let url = `${config.baseUrl}/admin/vehicle-brands`;
    try {
      const res = await getAuthorized(url);
      setVehicleBrandsList(res?.data?.responseResult?.result?.data);
    } catch (error) {}
  };
  const getModel = async () => {
    let url = `${config.baseUrl}/admin/vehicle-models/${scheme.selected_product.vehicle_brand?.id}`;
    try {
      const res = await getAuthorized(url);
      setVehicleModelsList(res?.data?.responseResult?.result?.data);
    } catch (error) {}
  };

  useEffect(() => {
    if (scheme.selected_product.vehicle_brand?.id) getModel();
  }, [scheme.selected_product.vehicle_brand]);

  const getSchemeDetails = async () => {
    let url = `${config.baseUrl}/admin/schemeDetail?id=${detailsId}`;

    try {
      const { data } = await getAuthorized(url);
      if (data?.data) {
        setDetails(data?.data);
      }
    } catch (error) {}
  };

  const returnSchemeApplicationForDetails = (type: string) => {
    if (type === "All") {
      return schemeApplicationType?.find((i) => i?.value === "all_products");
    }
    if (type === "Sub") {
      return schemeApplicationType?.find((i) => i?.value === "sub_category");
    }

    if (type === "Master") {
      return schemeApplicationType?.find((i) => i?.value === "master_category");
    }

    if (type === "Seller_products") {
      return schemeApplicationType?.find(
        (i) => i?.value === "individual_product"
      );
    }
  };

  const setDetails = (obj) => {
    const schemeMainDetail = obj?.schemeDetail[0];
    const addedItemType =
      obj?.schemeItemDetail[0]?.itemCategoryType ||
      `${obj?.schemeItemDetail[0]?.itemType}_products`;
    const applicableOn = returnSchemeApplicationForDetails(addedItemType);
    const detailsObj = {
      name: obj?.name,
      start_date: obj?.startDate,
      end_date: obj?.endDate,
      shipping_percentage: obj?.schemeDetail[0]?.shippingPercentage,
      scheme_code: obj?.schemeCode,
      scheme_summary: obj?.schemeSummary,
      scheme_terms: obj?.schemeTerms,
      kit_adjusted_amount: obj?.schemeDetail[0]?.adjustmentAmount,
      scheme_business_unit: schemeBUList?.find(
        (i) => i?.value === obj?.businessUnit?.resource_type
      )!,
      scheme_buyer: schemeBuyerList?.find(
        (i) => i?.value === obj?.soldToResourceType
      )!,
      scheme_business_unit_id: { name: "", id: obj?.businessUnit?.id },
      vehicle_type: { name: obj?.vehicleType },
      expiration_period: obj?.expirationPeriod,
      discount_option: discountOptions?.find(
        (i) => i?.value === obj?.schemeDetail[0]?.discountType
      )!,
      min_shopping_amount:
        obj?.schemeDetail[0]?.totalAmount +
        obj?.schemeDetail[0]?.discountAmount,
      min_cart_value:
        obj?.schemeDetail[0]?.totalAmount +
        obj?.schemeDetail[0]?.discountAmount,
      scheme_type: schemeTypes?.find((i) => i?.value === obj?.schemeType)!,
      scheme_description: obj?.description,
      scheme_banner: obj?.imageUrl,
      scheme_shopping_type: schemeShoppingType?.find(
        (i) => i?.value === schemeMainDetail?.shoppingType
      )!,
      scheme_gift_items: obj?.schemeGiftDetail || [],
      discount_percent: schemeMainDetail?.discountPercent,
      kit_discount_amount: schemeMainDetail?.discountAmount,
      kit_selling_price: schemeMainDetail?.totalAmount,
      kit_total_amount: schemeMainDetail?.amount,
      scheme_Applicable_on: applicableOn!,
      selected_categories_list:
        addedItemType === "Master"
          ? obj?.schemeItemDetail?.map((i) => i?.categoryItem)
          : [],
      selected_sub_category_list:
        addedItemType === "Sub"
          ? obj?.schemeItemDetail?.map((i) => i?.categoryItem)
          : [],
      selectedProductsList:
        addedItemType === "Seller_products"
          ? obj?.schemeItemDetail?.map((i) => ({
              ...i?.item,
              selected_product_min_qty: i?.minQty,
              vehicle_brand: { name: i?.brandName, id: 0 },
              vehicle: { name: i?.modelName, id: 0 },
              discount_percent: i?.discountPercent || i?.item?.discountPercent,
            }))
          : [],
    };

    setScheme({ ...scheme, ...detailsObj });
  };
  useEffect(() => {
    if (detailsId) getSchemeDetails();
  }, [detailsId]);
  const getGiftsList = async () => {
    let url = `${config.baseUrl}/admin/getGiftItems`;

    try {
      const { data } = await getAuthorized(url);

      setGiftsList(data?.data);
    } catch (error) {}
  };

  const getMasterCategory = async () => {
    let url = `${config.baseUrl}/admin/masterProductCategory`;

    try {
      const { data } = await getAuthorized(url);

      setMasterCategory(data?.data);
    } catch (error) {}
  };
  const getSubCategory = async () => {
    let url = `${config.baseUrl}/admin/masterProductSubCategories`;

    try {
      const { data } = await getAuthorized(url);

      setSubCategory(data?.data);
    } catch (error) {}
  };

  const onTermsChange = (target, key) => {
    const { name, value }: any = target;

    const newArray = [...scheme.scheme_terms];

    newArray[key] = {
      ...newArray[key],
      [name]: value,
    };

    setScheme({ ...scheme, scheme_terms: newArray });
  };

  const addNewTerm = () => {
    setScheme({
      ...scheme,
      scheme_terms: [...scheme?.scheme_terms, { terms: "" }],
    });
  };
  const deleteTerm = (key) => {
    if (scheme.scheme_terms?.length === 1) {
      alert("Need 1 term atleast");
      return;
    }
    const newItems = remove([...scheme.scheme_terms], key);
    setScheme({
      ...scheme,
      scheme_terms: newItems,
    });
  };
  const onSchemeMainChange = (target) => {
    const { name, value }: any = target;
    if (name === "scheme_banner") {
      setScheme({ ...scheme, [name]: target?.files });
    } else if (name === "scheme_icon") {
      setScheme({ ...scheme, [name]: target?.files[0] });
    } else if (
      ["selected_product_min_qty", "vehicle", "vehicle_brand"].includes(name)
    ) {
      setScheme({
        ...scheme,
        selected_product: { ...scheme.selected_product, [name]: value },
      });
    } else if (name === "selected_product") {
      setScheme({
        ...scheme,
        selected_product: { ...scheme.selected_product, ...value },
      });
    } else if (name === "kit_total_amount") {
      setScheme({ ...scheme, [name]: JSON.parse(value) });
    } else {
      setScheme({ ...scheme, [name]: value });
    }
  };
  const onProductAdd = async () => {
    let kitFinalAmount = scheme.kit_total_amount || 0;
    const { selectedProductsList, selected_product } = scheme;
    if (selectedProductsList.some((prod) => prod.id === selected_product.id)) {
      alert("This product is already added to the list");
      return;
    }
    let newArray = [...scheme.selectedProductsList];
    if (
      scheme.scheme_type.value === "kit_based" &&
      scheme.scheme_Applicable_on.value === "individual_product"
    ) {
      const { sellingPrice, selected_product_min_qty } = selected_product;
      const productTotal = sellingPrice * selected_product_min_qty;
      kitFinalAmount += productTotal;
      newArray = [...newArray, selected_product];
    } else if (
      scheme.scheme_type.value === "kit_gift_based" &&
      scheme.scheme_Applicable_on.value === "individual_product"
    ) {
      const { sellingPrice, selected_product_min_qty, productCode } =
        selected_product;
      const discount = await getProductDiscount(
        selected_product_min_qty,
        productCode
      );
      const productTotalBeforeDiscount =
        sellingPrice * selected_product_min_qty;
      const productTotalAfterDiscount =
        productTotalBeforeDiscount -
        (productTotalBeforeDiscount * discount) / 100;

      kitFinalAmount += productTotalAfterDiscount;

      newArray = [
        ...newArray,
        { ...selected_product, discount_percent: discount },
      ];
    } else {
      newArray = [...newArray, selected_product];
    }

    setScheme({
      ...scheme,
      selectedProductsList: newArray,
      product_search_key: "",
      kit_total_amount: kitFinalAmount,
      selected_product: {
        ...scheme.selected_product,
        id: 0,
        name: "",
        productCode: "",
        sellingPrice: 0,
        selected_product_min_qty: 0,
      },
    });
  };

  const removeProducts = (index: number) => {
    let kitFinalAmount = scheme.kit_total_amount;
    const newItems = remove([...scheme.selectedProductsList], index);
    if (
      scheme.scheme_type.value === "kit_based" &&
      scheme.scheme_Applicable_on.value === "individual_product"
    ) {
      const { sellingPrice, selected_product_min_qty } =
        scheme.selectedProductsList[index];
      const productTotal = sellingPrice * selected_product_min_qty;
      kitFinalAmount -= productTotal;
    } else if (
      scheme.scheme_type.value === "kit_gift_based" &&
      scheme.scheme_Applicable_on.value === "individual_product"
    ) {
      const { sellingPrice, selected_product_min_qty, discount_percent } =
        scheme.selectedProductsList[index];
      const productTotalBeforeDiscount =
        sellingPrice * selected_product_min_qty;
      const productTotalAfterDiscount =
        productTotalBeforeDiscount -
        (productTotalBeforeDiscount * discount_percent) / 100;
      kitFinalAmount -= productTotalAfterDiscount;
    }
    setScheme({
      ...scheme,
      kit_total_amount: kitFinalAmount,
      kit_selling_price: kitFinalAmount,
      selectedProductsList: newItems,
    });
  };
  const getProductDiscount = async (qty: number, code: string) => {
    const { scheme_buyer, scheme_business_unit_id, scheme_business_unit } =
      scheme;
    let url = `${config.baseUrl}/utilities/bulkDiscount?login_id=${scheme_business_unit_id?.id}&login_type=${scheme_business_unit?.value}&resource_type=${scheme_buyer?.value}&qty=${qty}&product_code=${code}`;

    try {
      const { data } = await getAuthorized(url);
      const discount_percent = data?.responseResult?.result?.data;
      return discount_percent;
    } catch (error) {
      return 0;
    }
  };
  const remove = (array: any[], index: number) => {
    array.splice(index, 1);
    return array;
  };

  const addCategories = () => {
    const { selected_categories_list, master_category } = scheme;
    if (
      selected_categories_list.some((prod) => prod.id === master_category.id)
    ) {
      alert("This Category is already added to the list");
      return;
    }

    const newArray = [...scheme.selected_categories_list, master_category];
    setScheme({
      ...scheme,
      selected_categories_list: newArray,
      master_category: { id: 0, name: "", vehicleType: "" },
    });
  };
  const addSubCategories = () => {
    const { selected_sub_category_list, sub_category } = scheme;
    if (
      selected_sub_category_list.some((prod) => prod.id === sub_category.id)
    ) {
      alert("This Category is already added to the list");
      return;
    }

    const newArray = [...scheme.selected_sub_category_list, sub_category];
    setScheme({
      ...scheme,
      selected_sub_category_list: newArray,
      sub_category: { id: 0, name: "", vehicleType: "" },
    });
  };

  const removeSubCategory = (index: number) => {
    const newItems = remove([...scheme.selected_sub_category_list], index);
    setScheme({
      ...scheme,
      selected_sub_category_list: newItems,
    });
  };
  const removeCategories = (index: number) => {
    const newItems = remove([...scheme.selected_categories_list], index);
    setScheme({
      ...scheme,
      selected_categories_list: newItems,
    });
  };
  const searchProducts = async () => {
    let url = `${config.baseUrl}/utilities/searchGalleryProducts`;
    const { vehicle_type, selected_product, product_search_key } = scheme;
    const payload = {
      vehicleType: vehicle_type.name,
      search: product_search_key,
      vehicle: selected_product.vehicle,
      type: "Master",
      itemType: "Product",
    };

    try {
      const { data } = await postAuthorized(url, payload);
      if (!data?.error) {
        setProductsList(data?.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    const searchProductsDebounce = setTimeout(() => {
      if (scheme.product_search_key?.length >= 3) searchProducts();
    }, 1000);

    return () => clearTimeout(searchProductsDebounce);
  }, [
    scheme.product_search_key,
    scheme.selected_product.vehicle,
    scheme.vehicle_type,
  ]);

  const setAmounts = (amount: number) => {
    const { discount_percent, kit_adjusted_amount } = scheme;

    const discountAmout = discount_percent
      ? (amount * discount_percent) / 100
      : 0;
    const finalPrice = amount - discountAmout;
    const minusAdjusted = finalPrice - kit_adjusted_amount;
    const applyAdjustedOrNot = ["kit_based", "kit_gift_based"].includes(
      scheme.scheme_type.value
    )
      ? minusAdjusted
      : finalPrice;
    if (applyAdjustedOrNot < 0) {
      alert("Selling Price Cannot Be Negative!!");
      setScheme({
        ...scheme,
        kit_selling_price: 0,
        kit_discount_amount: 0,
        discount_percent: 0,
        kit_total_amount: 0,
        kit_adjusted_amount: 0,
      });
      return;
    }
    setScheme({
      ...scheme,
      kit_selling_price: applyAdjustedOrNot,
      kit_discount_amount: discountAmout,
    });
  };

  useEffect(() => {
    const { kit_total_amount } = scheme;
    if (kit_total_amount) {
      setAmounts(kit_total_amount);
    }
  }, [
    scheme.discount_percent,
    scheme.kit_total_amount,
    scheme.kit_adjusted_amount,
  ]);
  useEffect(() => {
    const { min_shopping_amount, discount_percent } = scheme;
    if (min_shopping_amount && discount_percent) {
      setAmounts(min_shopping_amount);
    }
  }, [scheme.discount_percent, scheme.kit_total_amount]);

  const returnProductArray = () => {
    return scheme.selectedProductsList?.map((i) => ({
      item_type: "Seller",
      item_id: i?.id,
      compatible_model_id: i?.vehicle?.id,
      min_qty: i?.selected_product_min_qty,
      discount_percent: i?.discount_percent || undefined,
    }));
  };

  const returnMasterCategoryArray = () => {
    return scheme.selected_categories_list?.map((i) => ({
      item_category_type: "Master",
      item_category_id: i?.id,
    }));
  };

  const returnSubCategoryArray = () => {
    return scheme.selected_sub_category_list?.map((i) => ({
      item_category_type: "Sub",
      item_category_id: i?.id,
    }));
  };

  const isSubmitEnabled = () => {
    const {
      name,
      scheme_business_unit_id,
      vehicle_type,
      start_date,
      end_date,
      scheme_type,
      kit_total_amount,
      min_shopping_amount,
      discount_option,
      min_cart_value,
      scheme_shopping_type,
      scheme_banner,
      scheme_icon,
      scheme_Applicable_on,
      selectedProductsList,
      selected_categories_list,
      selected_sub_category_list,
      scheme_description,
      scheme_terms,
      scheme_code,
      scheme_summary,
      shipping_percentage,
      kit_adjusted_amount,
    } = scheme;
    if (
      !name ||
      !scheme_business_unit_id?.id ||
      !vehicle_type?.name ||
      !start_date ||
      !end_date ||
      !scheme_type?.name ||
      !scheme_shopping_type?.value ||
      !scheme_banner ||
      !scheme_icon ||
      !scheme_Applicable_on?.value ||
      !scheme_description ||
      !scheme_terms?.length ||
      !scheme_code ||
      !scheme_summary ||
      !shipping_percentage
    ) {
      return true;
    }

    if (scheme_type?.value === "kit_based" && !kit_total_amount) {
      return true;
    }
    if (
      ["kit_based", "kit_gift_based"].includes(scheme.scheme_type.value) &&
      !kit_adjusted_amount
    ) {
      return true;
    }
    if (
      scheme_type?.value === "discount_based" &&
      !min_shopping_amount &&
      !discount_option?.value
    ) {
      return true;
    }
    if (
      scheme_type?.value === "gift_based" &&
      !min_cart_value &&
      !discount_option?.value
    ) {
      return true;
    }

    if (
      scheme_Applicable_on?.value === "individual_product" &&
      !selectedProductsList?.length
    ) {
      return true;
    }
    if (
      scheme_Applicable_on?.value === "master_category" &&
      !selected_categories_list?.length
    ) {
      return true;
    }
    if (
      scheme_Applicable_on?.value === "sub_category" &&
      !selected_sub_category_list?.length
    ) {
      return true;
    }
    return false;
  };
  const returnSchemeTerms = () => {
    return scheme?.scheme_terms?.map((i) => i?.terms);
  };
  const returnPayload = () => {
    const {
      name,
      scheme_description,
      scheme_banner,
      scheme_type,
      start_date,
      end_date,
      kit_total_amount,
      kit_selling_price,
      scheme_shopping_type,
      vehicle_type,
      discount_percent,
      kit_discount_amount,
      scheme_gift_items,
      scheme_Applicable_on,
      min_cart_value,
      expiration_period,
      discount_option,
      scheme_business_unit,
      scheme_business_unit_id,
      scheme_buyer,
      scheme_icon,
      scheme_summary,
      scheme_code,
      shipping_percentage,
      kit_adjusted_amount,
    } = scheme;
    const payload = new FormData();
    const giftItemIds = scheme_gift_items?.map(({ id }) => id);
    payload.append("name", name);
    payload.append("scheme_summary", scheme_summary);
    payload.append("shipping_percentage", shipping_percentage);
    payload.append("sold_to_resource_type", scheme_buyer?.value);
    payload.append("scheme_code", scheme_code);
    payload.append("scheme_terms", JSON.stringify(returnSchemeTerms()));
    payload.append("description", scheme_description);
    payload.append("resource_type", scheme_business_unit.value);
    payload.append("resource_id", scheme_business_unit_id?.id?.toString());
    payload.append("vehicle_type", vehicle_type.name);
    payload.append("scheme_type", scheme_type.value);
    payload.append("start_date", start_date);
    payload.append("end_date", end_date);
    payload.append("shopping_type", scheme_shopping_type.value);
    payload.append("discount_percent", discount_percent?.toString());
    payload.append("discount_amount", kit_discount_amount?.toString());
    payload.append("schemeIcon", scheme_icon);

    for (let i = 0; i < scheme_banner?.length; i++) {
      payload.append("schemeBanners", scheme_banner[i]);
    }

    if (["kit_based", "kit_gift_based"].includes(scheme.scheme_type.value)) {
      payload.append("adjustment_amount", kit_adjusted_amount?.toString());
    }

    if (["discount_based", "gift_based"].includes(scheme_type.value)) {
      if (scheme?.scheme_shopping_type?.value === "flexible_shopping") {
        payload.append("expiration_period", expiration_period);
      }
      payload.append("discount_type", discount_option.value);
    }
    if (scheme_type.value === "gift_based") {
      payload.append("total_amount", min_cart_value?.toString());
    } else {
      payload.append("amount", kit_total_amount?.toString());
      payload.append("total_amount", kit_selling_price?.toString());
    }
    if (
      ["kit_gift_based", "gift_based"].includes(scheme_type.value) &&
      giftItemIds?.length > 0
    ) {
      payload.append("gift_item_ids", JSON.stringify(giftItemIds));
    }
    if (scheme_Applicable_on.value === "individual_product") {
      payload.append("scheme_items", JSON.stringify(returnProductArray()));
    }
    if (scheme_Applicable_on.value === "master_category") {
      payload.append(
        "scheme_items",
        JSON.stringify(returnMasterCategoryArray())
      );
    }
    if (scheme_Applicable_on.value === "sub_category") {
      payload.append("scheme_items", JSON.stringify(returnSubCategoryArray()));
    }
    if (scheme_Applicable_on.value === "all_products") {
      payload.append(
        "scheme_items",
        JSON.stringify([
          {
            item_category_type: "All",
            item_category_id: 0,
          },
        ])
      );
    }
    return payload;
  };
  const onSchemeSubmit = async () => {
    setLoader({ ...loader, isLoading: true });

    let url = `${config.baseUrl}/admin/addScheme`;

    try {
      const { data } = await postAuthorized(url, returnPayload());
      setLoader({
        ...loader,
        isLoading: false,
        error: data?.error,
        msg: data?.message,
      });

      setTimeout(() => {
        setLoader({ ...loader, msg: "" });
      }, 2000);
    } catch (error) {
      setLoader({ ...loader, isLoading: false, error: true, msg: "Error" });

      setTimeout(() => {
        setLoader({ ...loader, msg: "" });
      }, 2000);
    }
  };

  const onSchemeEdit = async () => {
    setLoader({ ...loader, isLoading: true });

    let url = `${config.baseUrl}/admin/updateScheme`;
    const payload = {
      id: detailsId,
      end_date: scheme?.end_date,
    };
    try {
      const { data } = await putAuthorized(url, payload);
      setLoader({
        ...loader,
        isLoading: false,
        error: data?.error,
        msg: data?.message,
      });
      getSchemeDetails();
      setTimeout(() => {
        setLoader({ ...loader, msg: "" });
      }, 2000);
    } catch (error) {
      setLoader({ ...loader, isLoading: false, error: true, msg: "Error" });

      setTimeout(() => {
        setLoader({ ...loader, msg: "" });
      }, 2000);
    }
  };

  useEffect(() => {
    getMasterCategory();
    getSubCategory();
    getGiftsList();

    setTimeout(() => {
      getBrand();
    }, 2000);
  }, []);
  return (
    <>
      <FlexDiv justifyContentCenter>
        <H2Heading>{detailsId ? "Scheme Details" : "Add Scheme"}</H2Heading>
      </FlexDiv>

      <div
        style={{
          marginBottom: "8%",
        }}
      >
        <SchemeMainDetails
          scheme={scheme}
          onChange={onSchemeMainChange}
          detailsId={Boolean(detailsId)}
          edit={edit}
        />
        {["kit_gift_based", "kit_based"].includes(scheme.scheme_type.value) && (
          <KitBasedScheme
            scheme={scheme}
            onChange={onSchemeMainChange}
            productsList={productsList}
            onProductAdd={onProductAdd}
            removeProducts={removeProducts}
            masterCategoryList={masterCategory}
            addCategories={addCategories}
            removeCategories={removeCategories}
            subCategory={subCategory}
            addSubCategories={addSubCategories}
            removeSubCategory={removeSubCategory}
            detailsId={Boolean(detailsId)}
            brands={vehicleBrandsList}
            models={vehicleModelsList}
            giftsList={giftsList}
          />
        )}
        {scheme.scheme_type.value === "discount_based" && (
          <DiscountBasedScheme
            scheme={scheme}
            onChange={onSchemeMainChange}
            productsList={productsList}
            onProductAdd={onProductAdd}
            removeProducts={removeProducts}
            masterCategoryList={masterCategory}
            addCategories={addCategories}
            removeCategories={removeCategories}
            subCategory={subCategory}
            addSubCategories={addSubCategories}
            removeSubCategory={removeSubCategory}
            detailsId={Boolean(detailsId)}
            brands={vehicleBrandsList}
            models={vehicleModelsList}
          />
        )}
        {scheme.scheme_type.value === "gift_based" && (
          <GiftBasedScheme
            scheme={scheme}
            onChange={onSchemeMainChange}
            productsList={productsList}
            onProductAdd={onProductAdd}
            removeProducts={removeProducts}
            masterCategoryList={masterCategory}
            addCategories={addCategories}
            removeCategories={removeCategories}
            subCategory={subCategory}
            addSubCategories={addSubCategories}
            removeSubCategory={removeSubCategory}
            giftsList={giftsList}
            detailsId={Boolean(detailsId)}
            brands={vehicleBrandsList}
            models={vehicleModelsList}
          />
        )}

        <SchemeBanner
          scheme={scheme}
          onChange={onSchemeMainChange}
          detailsId={detailsId}
          onTermsChange={onTermsChange}
          addNewTerm={addNewTerm}
          deleteTerm={deleteTerm}
        />

        {!detailsId && (
          <FlexDiv justifyContentFlexEnd width="80%" margin="50px 0px">
            <Button
              variant="contained"
              color="success"
              disabled={isSubmitEnabled()}
              onClick={onSchemeSubmit}
            >
              Submit
            </Button>
          </FlexDiv>
        )}
        {edit && (
          <FlexDiv justifyContentFlexEnd width="80%" margin="50px 0px">
            <Button variant="contained" color="success" onClick={onSchemeEdit}>
              Submit
            </Button>
          </FlexDiv>
        )}
      </div>

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

export default AddScheme;
