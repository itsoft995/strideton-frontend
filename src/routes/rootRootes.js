import Achievement from "./achievement";
import AvtoPedometer from "./avtopedometer";
import Exchange from "./exchange";
import ExchangeStatus from "./exchangeStatus";
import Histories from "./histories";
import Home from "./home";
import Legal from "./legal";
import MenuPage from "./menu";
import AddPaymentMethod from "./menu/addPaymentMethod";
import Faq from "./menu/faq";
import PaymentMethod from "./menu/paymentMethod";
import Profile from "./menu/profile";
import News from "./news";
import NewsSingle from "./news/single";
import Pedometer from "./pedometer";
import Report from "./report";
import Squads from "./squads";
import SquadsCreate from "./squads/create";
import SquadsSearch from "./squads/search";
import SingleDetails from "./squads/single";
import Support from "./support";
import TariffPlan from "./tariffplan";
import ChangedTariff from "./tariffplan/changed";
import Payment from "./tariffplan/payment";
import Tracking from "./tracking";
import Withdraw from "./withdraw";
import WithdrawHistories from "./withdrawHistories";

const rootRoutes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/pedometer",
    element: <Pedometer />,
  },
  {
    path: "/avto-pedometer",
    element: <AvtoPedometer />,
  },
  {
    path: "/exchange",
    element: <Exchange />,
  },
  {
    path: "/exchange/status",
    element: <ExchangeStatus />,
  },
  {
    path: "/tracking",
    element: <Tracking />,
  },
  {
    path: "/report",
    element: <Report />,
  },
  {
    path: "/histories",
    element: <Histories />,
  },
  {
    path: "/squads",
    element: <Squads />,
  },
  {
    path: "/squads/new",
    element: <SquadsCreate />,
  },
  {
    path: "/squads/search",
    element: <SquadsSearch />,
  },
  {
    path: "/squads/details/:id",
    element: <SingleDetails />,
  },
  {
    path: "/achievement",
    element: <Achievement />,
  },
  {
    path: "/menu",
    element: <MenuPage />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  { path: "/payment-method", element: <PaymentMethod /> },
  { path: "/payment-method/:method", element: <AddPaymentMethod /> },
  { path: "/faq", element: <Faq /> },
  { path: "/tarif-plan", element: <TariffPlan /> },
  { path: "/legal", element: <Legal /> },
  { path: "/support", element: <Support /> },
  { path: "/withdraw", element: <Withdraw /> },
  { path: "/withdraw-history", element: <WithdrawHistories /> },
  { path: "/news", element: <News /> },
  { path: "/news/:id", element: <NewsSingle /> },
  { path: "/payment", element: <Payment /> },
  { path: "/tariff-changed", element: <ChangedTariff /> },
];

export default rootRoutes;
