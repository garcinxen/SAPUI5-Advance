sap.ui.define([
    "sap/ui/core/mvc/Controller"
    
], function(Controller){
    "use strict";

    return Controller.extend("employeesv2.controller.App", {
        onInit: function(){
            let oView = this.getView();
            
            let oJSONModelEmpl = new sap.ui.model.json.JSONModel();
            oJSONModelEmpl.loadData("./localService/mockdata/Employees.json");
            oView.setModel(oJSONModelEmpl, "jsonEmployees");

            let oJSONModelCoun = new sap.ui.model.json.JSONModel();
            oJSONModelCoun.loadData("./localService/mockdata/Countries.json");
            oView.setModel(oJSONModelCoun, "jsonCountries");

            let oJSONModelLayout = new sap.ui.model.json.JSONModel();
            oJSONModelLayout.loadData("./localService/mockdata/Layout.json");
            oView.setModel(oJSONModelLayout, "jsonLayout");

            let oJSONModelConfig = new sap.ui.model.json.JSONModel({
                visibleID: true,
                visibleName: true,
                visibleCountry: true,
                visibleCity: false,
                visibleBtnShowCity: true,
                visibleBtnHideCity: false
            });
            oView.setModel(oJSONModelConfig, "jsonConfig");

            this._bus = sap.ui.getCore().getEventBus();
            this._bus.subscribe("flexible", "onShowEmployee", this.showEmployeeDetails, this);
        },

        showEmployeeDetails: function (category, nameEvent, path){
            let detailView = this.getView().byId("employeeDetailsView");
            detailView.bindElement("jsonEmployees>" + path);
            this.getView().getModel("jsonLayout").setProperty("/ActiveKey", "TwoColumnsMidExpanded");

            let incidenceModel = new sap.ui.model.json.JSONModel([]);
            detailView.setModel(incidenceModel, "incidenceModel");
            detailView.byId("tableIncidence").removeAllContent();
        }
    });
});