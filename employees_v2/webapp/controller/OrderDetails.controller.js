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
        },

        factoryOrderDetails: function (listId, oContext) {
            let objectContext = oContext.getObject();
            objectContext.Currency = "EUR";
            let unitsInStock = oContext.getModel().getProperty("/Products(" + objectContext.ProductID + ")/UnitsInStock");

            if (objectContext.Quantity <= unitsInStock) {
                let objectListItem = new sap.m.ObjectListItem({
                    title: "{odataNorthwind>/Products(" + objectContext.ProductID + ")/ProductName} ({odataNorthwind>Quantity})",
                    number: "{parts: [{path: 'odataNorthwind>UnitPrice'}, {path: 'odataNorthwind>Currency'}], type: 'sap.ui.model.type.Currency', formatOptions: {showMeasure: false}}",
                    numberUnit: "{odataNorthwind>Currency}"
                });

                return objectListItem;

            } else {
                let customListItem = new sap.m.CustomListItem({
                    content: [
                        new sap.m.Bar({
                            contentLeft: new sap.m.Label({
                                text: "{odataNorthwind>/Products(" + objectContext.ProductID + ")/ProductName} ({odataNorthwind>Quantity})",
                            }),
                            contentMiddle: new sap.m.ObjectStatus({
                                text: "{i18n>availableStock} {odataNorthwind>/Products("+ objectContext.ProductID + ")/UnitsInStock}",
                                state: "Error"
                            }),
                            contentRight: new sap.m.Label({
                                text: "{parts: [{path: 'odataNorthwind>UnitPrice'}, {path: 'odataNorthwind>Currency'}], type: 'sap.ui.model.type.Currency'}"
                            })
                        })
                    ]
                });

                return customListItem;
            };
        }
    });
});