//@ts-nocheck
sap.ui.define([
    "employeesv2/controller/Base.controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     * @param {typeof sap.ui.model.Filter} Filter
     * @param {typeof sap.ui.model.FilterOperator} FilterOperator
     */
    function (Base, Filter, FilterOperator) {
        "use strict";

        function onInit () {            
            this._bus = sap.ui.getCore().getEventBus();
        };

        function onFilter () {
            let oJSONCountries = this.getView().getModel("jsonCountries").getData();
            let filter = [];

            if (oJSONCountries.EmployeeId !== "") {
                filter.push(new Filter("EmployeeID", FilterOperator.EQ, oJSONCountries.EmployeeId));
            }

            if (oJSONCountries.CountryKey !== "") {
                filter.push(new Filter("Country", FilterOperator.EQ, oJSONCountries.CountryKey));
            }

            let oList = this.getView().byId("tableEmployee");
            let oBinding = oList.getBinding("items");
            oBinding.filter(filter);
        };

        function onClearFilter () {
            let oModelCountries = this.getView().getModel("jsonCountries");
            oModelCountries.setProperty("/EmployeeId", "");
            oModelCountries.setProperty("/CountryKey", "");

            let filter = [];
            let oList = this.getView().byId("tableEmployee");
            let oBinding = oList.getBinding("items");
            oBinding.filter(filter);
        };

        function showPostalCode (oEvent) {
            let itemPressed = oEvent.getSource();
            let oContext = itemPressed.getBindingContext("odataNorthwind");
            let objectContext = oContext.getObject();

            sap.m.MessageToast.show(objectContext.PostalCode);
        };

        function onShowCity () {
            let oJSONModelConfig = this.getView().getModel("jsonConfig");
            oJSONModelConfig.setProperty("/visibleCity", true);
            oJSONModelConfig.setProperty("/visibleBtnShowCity", false);
            oJSONModelConfig.setProperty("/visibleBtnHideCity", true);
        };

        function onHideCity () {
            let oJSONModelConfig = this.getView().getModel("jsonConfig");
            oJSONModelConfig.setProperty("/visibleCity", false);
            oJSONModelConfig.setProperty("/visibleBtnShowCity", true);
            oJSONModelConfig.setProperty("/visibleBtnHideCity", false);
        };

        function onShowOrders (oEvent) {
            // let ordersTable = this.getView().byId("ordersTable");
            // //limpiar items para que esté limpio
            // ordersTable.destroyItems();
            
            // let itemPressed = oEvent.getSource();
            // let oContext = itemPressed.getBindingContext("jsonEmployees");
            // let objectContext = oContext.getObject();
            // let orders = objectContext.Orders;
            // let rows = [];

            // for (let i in orders) {
            //     rows.push(new sap.m.ColumnListItem({
            //         cells: [
            //             new sap.m.Label({text: orders[i].OrderID}),
            //             new sap.m.Label({text: orders[i].Freight}),
            //             new sap.m.Label({text: orders[i].ShipAddress})
            //         ]
            //     }));
            // }

            // let newTable = new sap.m.Table({
            //     width: "auto",
            //     columns: [
            //         new sap.m.Column({header: new sap.m.Label({text: "{i18n>orderID}"})}),
            //         new sap.m.Column({header: new sap.m.Label({text: "{i18n>freight}"})}),
            //         new sap.m.Column({header: new sap.m.Label({text: "{i18n>shipAddress}"})}),
            //     ],
            //     items: rows
            // }).addStyleClass("sapUiSmallMargin");

            // ordersTable.addItem(newTable);

            // let newTableJSON = new sap.m.Table();
            // newTableJSON.setWidth("auto");
            // newTableJSON.addStyleClass("sapUiSmallMargin");

            // let columnOrderID = new sap.m.Column();
            // let labelOrderId = new sap.m.Label();
            // labelOrderId.bindProperty("text", "i18n>orderID"); 
            // columnOrderID.setHeader(labelOrderId);
            // newTableJSON.addColumn(columnOrderID);

            // let columnFreight = new sap.m.Column();
            // let labelFreight = new sap.m.Label();
            // labelFreight.bindProperty("text", "i18n>freight"); 
            // columnFreight.setHeader(labelFreight);
            // newTableJSON.addColumn(columnFreight);

            // let columnShipAddress = new sap.m.Column();
            // let labelShipAddress = new sap.m.Label();
            // labelShipAddress.bindProperty("text", "i18n>shipAddress"); 
            // columnShipAddress.setHeader(labelShipAddress);
            // newTableJSON.addColumn(columnShipAddress);

            // let columnListItem = new sap.m.ColumnListItem();

            // let cellOrderID = new sap.m.Label();
            // cellOrderID.bindProperty("text", "jsonEmployees>OrderID");
            // columnListItem.addCell(cellOrderID);

            // let cellFreight = new sap.m.Label();
            // cellFreight.bindProperty("text", "jsonEmployees>Freight");
            // columnListItem.addCell(cellFreight);

            // let cellShipAddress = new sap.m.Label();
            // cellShipAddress.bindProperty("text", "jsonEmployees>ShipAddress");
            // columnListItem.addCell(cellShipAddress);

            // let oBindingInfo = {
            //     model: "jsonEmployees",
            //     path: "Orders",
            //     template: columnListItem
            // };

            // newTableJSON.bindAggregation("items", oBindingInfo);
            // newTableJSON.bindElement("jsonEmployees>" + oContext.getPath());

            // ordersTable.addItem(newTableJSON);

            let iconPressed = oEvent.getSource();
            let oContext = iconPressed.getBindingContext("odataNorthwind");

            if (!this._oDialogOrders) {
                this._oDialogOrders = sap.ui.xmlfragment("employeesv2.fragment.DialogOrders", this);
                this.getView().addDependent(this._oDialogOrders);
            }
            
            this._oDialogOrders.bindElement("odataNorthwind>" + oContext.getPath());  
            this._oDialogOrders.open();
        };

        function onCloseOrders () {
            this._oDialogOrders.close();
        };

        function onShowEmployee (oEvent) {
            let path = oEvent.getSource().getBindingContext("odataNorthwind").getPath();
            this._bus.publish("flexible", "onShowEmployee", path);            
        };

        let Main = Base.extend("employeesv2.controller.MasterEmployee", {});
            
        // Main.prototype.onValidate = function () {
        //     let inputEmployee = this.byId("inputEmployee");
        //     let valueEmployee = inputEmployee.getValue();

        //     if (valueEmployee.length === 6) {
        //         //inputEmployee.setDescription("OK");
        //         this.getView().byId("labelCountry").setVisible(true);
        //         this.getView().byId("slCountry").setVisible(true);
        //     } else {
        //         //inputEmployee.setDescription("NOT OK");
        //         this.getView().byId("labelCountry").setVisible(false);
        //         this.getView().byId("slCountry").setVisible(false);
        //     }
        // };

        Main.prototype.onInit = onInit;
        Main.prototype.onFilter = onFilter;
        Main.prototype.onClearFilter = onClearFilter;
        Main.prototype.showPostalCode = showPostalCode;
        Main.prototype.onShowCity = onShowCity;
        Main.prototype.onHideCity = onHideCity;
        Main.prototype.onShowOrders = onShowOrders;
        Main.prototype.onCloseOrders = onCloseOrders;
        Main.prototype.onShowEmployee = onShowEmployee;

        return Main; 
    });
