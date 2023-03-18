//@ts-nocheck
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "employeesv2/model/formatter"
    
], function(Controller, formatter){
    "use strict";

    function onInit () {

    };

    function onCreateIncidence () {
        let tableIncidence = this.getView().byId("tableIncidence");
        let newIncidence = sap.ui.xmlfragment("employeesv2.fragment.NewIncidence", this);
        let incidenceModel = this.getView().getModel("incidenceModel");
        let odata = incidenceModel.getData();
        let index = odata.length;
        odata.push({index : index + 1});
        incidenceModel.refresh();
        newIncidence.bindElement("incidenceModel>/" + index);
        tableIncidence.addContent(newIncidence);
    };

    function onDeleteIncidence (oEvent) {
        let tableIncidence = this.getView().byId("tableIncidence");
        let rowIncidence = oEvent.getSource().getParent().getParent();
        let incidenceModel = this.getView().getModel("incidenceModel");
        let odata = incidenceModel.getData();
        let contextObj = rowIncidence.getBindingContext("incidenceModel");

        odata.splice(contextObj.index-1, 1);
        for (let i in odata) {
            odata[i].index = parseInt(i) + 1;
        };

        incidenceModel.refresh();
        tableIncidence.removeContent(rowIncidence);

        for (let j in tableIncidence.getContent()) {
            tableIncidence.getContent()[j].bindElement("incidenceModel>/" + j);
        };
    };

    let EmployeeDetails = Controller.extend("employeesv2.controller.EmployeeDetails", {});

    EmployeeDetails.prototype.onInit = onInit;
    EmployeeDetails.prototype.onCreateIncidence = onCreateIncidence;
    EmployeeDetails.prototype.Formatter = formatter;
    EmployeeDetails.prototype.onDeleteIncidence = onDeleteIncidence;

    return EmployeeDetails;
});