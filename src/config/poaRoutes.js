import WelcomePackageCatalog from "../pages/WelcomePackageCatalog";
import MainMenu from "../pages/MainMenu";
import IdScanning from "../pages/IdScanning";
import IdScanningInstruction from "../pages/IdScanningInstruction";
import ProofScanningConfirmation from "../pages/ProofScanningConfirmation";
import RevisitInformation from "../pages/RevisitInformation";
import SimScanning from "../pages/SimScanning";
import IdRearScanning from "../pages/IdRearScanning";
import ContractScanningConfirmation from '../pages/ContractScanningConfirmation';
import ContractScanning from '../pages/ContractScanning';
import PageNotFound from '../pages/PageNotFound';
import SplashScreen from "../components/pages/SplashScreen";

export const poaRouteconfig = {
    "py": [
       
        {
            "path": "/WelcomePackage",
            "component": WelcomePackageCatalog
        },
        {
            "path": "/IdRearScanning",
            "component": IdRearScanning
        },
        {
            "path": "/IdScanning",
            "component": IdScanning
        },
        {
            "path": "/SimScanning",
            "component": SimScanning
        },
        {
            "path": "/IdScanningInstruction",
            "component": IdScanningInstruction
        },
        {
            "path": "/RevisitInformation",
            "component": RevisitInformation
        },
        {
            "path": "/ProofScanningConfirmation",
            "component": ProofScanningConfirmation
        },
        {
            "path": "/ContractScanningConfirmation",
            "component": ContractScanningConfirmation
        },
        {
            "path": "/ContractScanning",
            "component": ContractScanning
        },
        {
           "path": "/",
            "component": MainMenu
        }
    ]
}