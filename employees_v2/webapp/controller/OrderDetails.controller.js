//@ts-nocheck
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
    
], function(Controller, History){
    
    function _onObjectMatched (oEvent){
        this.getView().bindElement({
            path: "/Orders(" + oEvent.getParameter("arguments").OrderId + ")",
            model: "odataNorthwind"
        });
    }

    return Controller.extend("employeesv2.controller.OrderDetails", {
    
        onInit: function () {  
            let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("RouteOrderDetails").attachPatternMatched(_onObjectMatched, this);          
        },

        onBack: function (oEvent) {
            let oHistory = History.getInstance();
            let sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("RouteApp", true);
            }
        },

        onClearSignature: function (oEvent) {
            let signature = this.byId("signature");
            signature.clear();
        }
    });
});