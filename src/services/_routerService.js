import Widgets from "Routes/widgets";
import AdvanceUIComponents from "Routes/advance-ui-components";
import ChartsComponents from "Routes/charts";
import Components from "Routes/components";
import Icons from "Routes/icons";
import Dashboard from "Routes/dashboard";
import Crm from "Routes/crm";
import Maintenance from "../container/Maintenance";
import NewListAgencies from "../routes/agencies/index";
import NewListBranch from "../routes/branch/index";
import NewListServiceTypes from "../routes/serviceTypes/index";
import NewListTyrePosition from "../routes/tyrePosition/index";
import NewListTyreMake from "../routes/tyreMake/index";
import UserProfile from "../routes/userProfile/index";
import NewListVendor from "../routes/vendor/index";
import NewListCompany from "../routes/company/index";
import NewListTyre from "../routes/tyre/index";
import NewListTyreStock from "../routes/tyreStock/index";
import NewListVehicles from "../routes/vehicles/index";
import NewListServices from "../routes/Services/index";
import NewListTrip from "../routes/trip/index";
import NewListDriver from "../routes/driver/index";
import NewListComingSoon from "../routes/comingsoon/index";
import AgenciesSummary from "../routes/Reports/Agencies/index";
import DriverSummary from "../routes/Reports/Driver/index";
import VehicleSummary from "../routes/Reports/Vehicle/index";
import NewListUser from "../routes/userMember/index";
import VendorSummary from "../routes/Reports/Vendor/index";
import TyreSummary from "../routes/Reports/Tyre/index";
import TeamSummary from "../routes/Reports/Team/index";
import TripSummary from "../routes/Reports/Trip/index";
import ServicesSummary from "../routes/Reports/Services/index";
import SalarySummary from "../routes/Reports/Salary/index";
import VehicleDetail from "../routes/Reports/VehicleDetail/index";
import NewListTyreInspection from "../routes/tyreInspection/index";
import NewListPayment from "../routes/payment/index";
import NewListPaymentDetails from "../routes/paymentDetails/index";
import PaymentSummary from "../routes/Reports/Payment/index";
import NewListPaymentAdvance from "../routes/paymentadvance/index";

import {
    AsyncAboutUsComponent,


} from "Components/AsyncComponent/AsyncComponent";

export default [{
        path: "dashboard",
        component: Dashboard,
    },
    {
        path: "crm",
        component: Crm,
    },
    {
        path: "widgets",
        component: Widgets,
    },
    {
        path: "icons",
        component: Icons,
    },
    {
        path: "about-us",
        component: AsyncAboutUsComponent,
    },
    {
        path: "charts",
        component: ChartsComponents,
    },
    {
        path: "ui-components",
        component: Components,
    },
    {
        path: "advanced-component",
        component: AdvanceUIComponents,
    },
    {
        path: "maintenance",
        component: Maintenance,
    },
    {
        path: "agencies",
        component: NewListAgencies,
    },
    {
        path: "branch",
        component: NewListBranch,
    },
    {
        path: "service-type",
        component: NewListServiceTypes,
    },
    {
        path: "tyre-position",
        component: NewListTyrePosition,
    },
    {
        path: "tyre-make",
        component: NewListTyreMake,
    },
    {
        path: "users",
        component: UserProfile,
    },
    {
        path: "vendor",
        component: NewListVendor,
    },
    {
        path: "company",
        component: NewListCompany,
    },
    {
        path: "tyre",
        component: NewListTyre,
    },
    {
        path: "vehicles",
        component: NewListVehicles,
    },
    {
        path: "services",
        component: NewListServices,
    },
    {
        path: "trip",
        component: NewListTrip,
    },
    {
        path: "driver",
        component: NewListDriver,
    },
    
    {
        path: "commingsoons",
        component: NewListComingSoon,
    },
    {
        path: "comming-soon",
        component: NewListComingSoon,
    },
    {
        path: "agencies-report",
        component: AgenciesSummary,
    },
    {
        path: "driver-report",
        component: DriverSummary,
    },
    {
        path: "vehicle-report",
        component: VehicleSummary,
    },
    {
        path: "user-member",
        component: NewListUser,
    },
    {
        path:"vendor-report",
        component: VendorSummary,
    },
    {
        path: "tyre-report",
        component: TyreSummary,
    },
    {
        path: "team-report",
        component: TeamSummary,
    },
    {
        path: "trip-report",
        component: TripSummary,
    },
    {
        path: "services-report",
        component: ServicesSummary,
    },
    {
        path: "salary-report",
        component: SalarySummary,
    },
    {
        path: "tyre-stock",
        component: NewListTyreStock,
    },
    {
        path: "vehicle-detail-report",
        component: VehicleDetail,
    },
    {
        path: "tyre-inspection",
        component: NewListTyreInspection,
    },
    {
        path: "payment",
        component: NewListPayment,
    },
    {
        path: "payment-details",
        component: NewListPaymentDetails,
    },
    {
        path: "payment-details-report",
        component: PaymentSummary,
    },
    {
        path: "payment-advance",
        component: NewListPaymentAdvance,
    },
];