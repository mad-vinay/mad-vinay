import MainPage from "../../src/components/pages/Main";
import MainMenu from '../../src/components/pages/MainMenu';
import SalesSummary from '../../src/components/pages/SalesSummary';
import PackagesCategories  from "../../src/components/pages/PackagesCategories";
import ChangePin  from "../../src/components/pages/ChangePin"

export const posRouteconfig = {
    "gt": [
        {
            "path": "/",
            "component": MainPage
            // "status": Start_Screen
        },
        {
            "path": "/MainMenu",
            "component": MainMenu
            // "status": Start_Screen
        },
        {
            "path": "/SalesSummary",
            "component": SalesSummary
        },
        {
            "path": "/PackagesCategories",
            "component": PackagesCategories
        },
        {
            "path": "/ChangePin",
            "component": ChangePin
        },
    ]
}