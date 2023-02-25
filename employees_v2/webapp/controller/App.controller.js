sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     * @param {typeof sap.ui.model.Filter} Filter
     * @param {typeof sap.ui.model.FilterOperator} FilterOperator
     */
    function (Controller, Filter, FilterOperator) {
        "use strict";

        function onInit () {
            let oJSONModel = new sap.ui.model.json.JSONModel();
            let oView = this.getView();
            //let i18nBundle = oView.getModel("i18n").getResourceBundle();
            
            oJSONModel.loadData("./localService/mockdata/Employees.json");
            // oJSONModel.attachRequestCompleted(function(oEventModel){
            //     console.log(JSON.stringify(oJSONModel.getData()));
            // });
            oView.setModel(oJSONModel);
        };

        function onFilter () {
            let oJSON = this.getView().getModel().getData();
            let filter = [];

            if (oJSON.EmployeeId !== "") {
                filter.push(new Filter("EmployeeID", FilterOperator.EQ, oJSON.EmployeeId));
            }

            if (oJSON.CountryKey !== "") {
                filter.push(new Filter("Country", FilterOperator.EQ, oJSON.CountryKey));
            }

            let oList = this.getView().byId("tableEmployee");
            let oBinding = oList.getBinding("items");
            oBinding.filter(filter);
        };

        function onClearFilter () {
            let oModel = this.getView().getModel();
            oModel.setProperty("/EmployeeId", "");
            oModel.setProperty("/CountryKey", "");

            let filter = [];
            let oList = this.getView().byId("tableEmployee");
            let oBinding = oList.getBinding("items");
            oBinding.filter(filter);
        };

        function showPostalCode (oEvent) {
            let itemPressed = oEvent.getSource();
            let oContext = itemPressed.getBindingContext();
            let objectContext = oContext.getObject();

            sap.m.MessageToast.show(objectContext.PostalCode);
        };

        let Main = Controller.extend("employeesv2.controller.App", {});
            
        Main.prototype.onValidate = function () {
            let inputEmployee = this.byId("inputEmployee");
            let valueEmployee = inputEmployee.getValue();

            if (valueEmployee.length === 6) {
                //inputEmployee.setDescription("OK");
                this.getView().byId("labelCountry").setVisible(true);
                this.getView().byId("slCountry").setVisible(true);
            } else {
                //inputEmployee.setDescription("NOT OK");
                this.getView().byId("labelCountry").setVisible(false);
                this.getView().byId("slCountry").setVisible(false);
            }
        };

        Main.prototype.onInit = onInit;
        Main.prototype.onFilter = onFilter;
        Main.prototype.onClearFilter = onClearFilter;
        Main.prototype.showPostalCode = showPostalCode;
        return Main; 
    });
